export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { consents, patients } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const patientId = Number(req.nextUrl.searchParams.get('patientId'))
  if (!patientId) return NextResponse.json({ error: 'patientId obrigatório' }, { status: 400 })
  const rows = await db.select().from(consents).where(eq(consents.patientId, patientId)).orderBy(desc(consents.concedidoEm))
  return NextResponse.json({ consents: rows })
}

/** Registra um consentimento do titular. */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const { patientId, tipo, finalidade, versaoTermo } = await req.json()
  if (!patientId || !tipo) return NextResponse.json({ error: 'patientId e tipo obrigatórios' }, { status: 400 })

  const [patient] = await db.select().from(patients).where(eq(patients.id, Number(patientId)))
  if (!patient || patient.doctorId !== doctorId) {
    return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
  }

  const meta = reqMeta(req)
  const [consent] = await db.insert(consents).values({
    patientId: Number(patientId),
    tipo,
    finalidade,
    versaoTermo,
    concedido: true,
    ip: meta.ip,
  }).returning()

  await audit({
    actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico',
    acao: 'consent', entidade: 'consent', entidadeId: consent.id, patientId: Number(patientId),
    detalhes: { tipo, finalidade }, ...meta,
  })

  return NextResponse.json({ consent }, { status: 201 })
}

/** Revoga um consentimento. */
export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const { consentId } = await req.json()
  const [updated] = await db.update(consents)
    .set({ concedido: false, revogadoEm: new Date() })
    .where(eq(consents.id, Number(consentId)))
    .returning()

  const meta = reqMeta(req)
  await audit({
    actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico',
    acao: 'revoke', entidade: 'consent', entidadeId: Number(consentId),
    patientId: updated?.patientId, ...meta,
  })

  return NextResponse.json({ consent: updated })
}
