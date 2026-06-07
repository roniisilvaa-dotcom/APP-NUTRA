export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { notifications, patients } from '@/lib/db/schema'
import { eq, desc, or, and } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'

/** Lista avisos: médico vê os que criou; paciente vê os da sua clínica. */
export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  const role = session.user.role as string
  const uid = Number(session.user.id)

  if (role === 'paciente') {
    const [me] = await db.select().from(patients).where(eq(patients.userId, uid))
    if (!me) return NextResponse.json({ avisos: [] })
    const list = await db.select().from(notifications)
      .where(and(eq(notifications.doctorId, me.doctorId),
        or(eq(notifications.publico, 'todos_pacientes'), eq(notifications.patientId, me.id))))
      .orderBy(desc(notifications.createdAt)).limit(50)
    return NextResponse.json({ avisos: list })
  }

  const doctorId = role === 'secretaria' ? Number((session.user as { doctorId?: number }).doctorId) : uid
  const list = await db.select().from(notifications).where(eq(notifications.doctorId, doctorId)).orderBy(desc(notifications.createdAt)).limit(50)
  return NextResponse.json({ avisos: list })
}

/** Médico cria um aviso (para todos os pacientes ou um específico). */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user.role !== 'medico')) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const { titulo, corpo, patientId } = await req.json()
  if (!titulo?.trim() || !corpo?.trim()) return NextResponse.json({ error: 'Título e mensagem obrigatórios' }, { status: 400 })

  const [aviso] = await db.insert(notifications).values({
    doctorId, autorId: doctorId, titulo: titulo.trim(), corpo: corpo.trim(),
    publico: patientId ? 'paciente_especifico' : 'todos_pacientes',
    patientId: patientId ? Number(patientId) : null,
  }).returning()

  const meta = reqMeta(req)
  await audit({ actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico', acao: 'create', entidade: 'aviso', entidadeId: aviso.id, ...meta })

  return NextResponse.json({ aviso }, { status: 201 })
}
