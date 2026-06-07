export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { users, patients } from '@/lib/db/schema'
import { eq, desc, sql } from 'drizzle-orm'
import { isSuperAdmin } from '@/lib/authz'
import { audit, reqMeta } from '@/lib/audit'

// Painel do Desenvolvedor — lista TODAS as contas da plataforma
export async function GET() {
  const session = await auth()
  if (!isSuperAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'Acesso restrito ao desenvolvedor' }, { status: 403 })
  }

  const allUsers = await db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role, plan: users.plan, ativo: users.ativo, doctorId: users.doctorId, createdAt: users.createdAt })
    .from(users)
    .orderBy(desc(users.createdAt))

  const [stats] = await db.select({
    total: sql<number>`count(*)::int`,
    medicos: sql<number>`count(*) filter (where role = 'medico')::int`,
    pacientes: sql<number>`count(*) filter (where role = 'paciente')::int`,
    secretarias: sql<number>`count(*) filter (where role = 'secretaria')::int`,
    ativos: sql<number>`count(*) filter (where ativo is not false)::int`,
  }).from(users)

  const [pcount] = await db.select({ n: sql<number>`count(*)::int` }).from(patients)

  return NextResponse.json({ users: allUsers, stats: { ...stats, prontuarios: pcount.n } })
}

// Ativa/desativa conta ou muda plano (qualquer conta da plataforma)
export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!isSuperAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'Acesso restrito ao desenvolvedor' }, { status: 403 })
  }
  const { id, ativo, plan } = await req.json()
  const patch: Record<string, unknown> = {}
  if (typeof ativo === 'boolean') patch.ativo = ativo
  if (plan) patch.plan = plan
  if (!Object.keys(patch).length) return NextResponse.json({ error: 'Nada para atualizar' }, { status: 400 })

  const [updated] = await db.update(users).set(patch).where(eq(users.id, Number(id)))
    .returning({ id: users.id, name: users.name, email: users.email, role: users.role, plan: users.plan, ativo: users.ativo })

  const meta = reqMeta(req)
  await audit({ actorId: Number(session!.user.id), actorEmail: session!.user.email, actorRole: 'superadmin', acao: 'update', entidade: 'user', entidadeId: Number(id), detalhes: patch, ...meta })

  return NextResponse.json({ user: updated })
}
