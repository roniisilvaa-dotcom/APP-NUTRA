export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq, and, ne } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { audit, reqMeta } from '@/lib/audit'
import { DEFAULT_SECRETARY_PERMISSIONS } from '@/lib/authz'

// Lista os membros (secretárias) da clínica do médico logado
export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const team = await db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role, ativo: users.ativo, permissions: users.permissions, createdAt: users.createdAt })
    .from(users)
    .where(and(eq(users.doctorId, doctorId), eq(users.role, 'secretaria')))
  return NextResponse.json({ team })
}

// Cadastra uma secretária vinculada ao médico
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const { name, email, password, permissions } = await req.json()
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Nome, email e senha são obrigatórios' }, { status: 400 })
  }

  const [existing] = await db.select().from(users).where(eq(users.email, email))
  if (existing) return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 })

  const passwordHash = await bcrypt.hash(password, 12)
  const [member] = await db.insert(users).values({
    name, email, passwordHash,
    role: 'secretaria',
    doctorId,
    ativo: true,
    permissions: permissions ?? DEFAULT_SECRETARY_PERMISSIONS,
  }).returning({ id: users.id, name: users.name, email: users.email, role: users.role, ativo: users.ativo, permissions: users.permissions })

  const meta = reqMeta(req)
  await audit({ actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico', acao: 'create', entidade: 'team_member', entidadeId: member.id, ...meta })

  return NextResponse.json({ member }, { status: 201 })
}

// Ativa/desativa ou ajusta permissões de um membro da clínica
export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const { id, ativo, permissions } = await req.json()

  // Garante que o membro pertence a este médico
  const [member] = await db.select().from(users).where(eq(users.id, Number(id)))
  if (!member || member.doctorId !== doctorId || member.role !== 'secretaria') {
    return NextResponse.json({ error: 'Membro não encontrado' }, { status: 404 })
  }

  const patch: Record<string, unknown> = {}
  if (typeof ativo === 'boolean') patch.ativo = ativo
  if (permissions) patch.permissions = permissions

  const [updated] = await db.update(users).set(patch)
    .where(and(eq(users.id, Number(id)), eq(users.doctorId, doctorId), ne(users.id, doctorId)))
    .returning({ id: users.id, name: users.name, email: users.email, ativo: users.ativo, permissions: users.permissions })

  return NextResponse.json({ member: updated })
}
