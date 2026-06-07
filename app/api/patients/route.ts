export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { patients } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'

export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  const data = await db.select().from(patients).where(eq(patients.doctorId, Number(session.user.id)))
  return NextResponse.json({ patients: data })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  const doctorId = Number(session.user.id)
  const body = await req.json()
  const [patient] = await db.insert(patients).values({
    ...body,
    doctorId, // força o dono — ignora qualquer doctorId vindo do cliente
  }).returning()

  const meta = reqMeta(req)
  await audit({
    actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico',
    acao: 'create', entidade: 'patient', entidadeId: patient.id, patientId: patient.id, ...meta,
  })

  return NextResponse.json({ patient }, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  const doctorId = Number(session.user.id)
  const { id, doctorId: _ignore, ...data } = await req.json()

  // Verifica titularidade antes de atualizar (corrige IDOR)
  const [existing] = await db.select().from(patients).where(eq(patients.id, Number(id)))
  if (!existing || existing.doctorId !== doctorId) {
    return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
  }

  const [patient] = await db
    .update(patients)
    .set(data)
    .where(and(eq(patients.id, Number(id)), eq(patients.doctorId, doctorId)))
    .returning()

  const meta = reqMeta(req)
  await audit({
    actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico',
    acao: 'update', entidade: 'patient', entidadeId: Number(id), patientId: Number(id), ...meta,
  })

  return NextResponse.json({ patient })
}
