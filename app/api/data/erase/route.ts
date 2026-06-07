export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import {
  patients, protocols, consultas, diarioRegistros, chatMessages,
  anthropometry, labExams, mealPlans, anamnese, appointments,
  financialRecords, consents, attachments,
} from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'

/**
 * Direito ao esquecimento (LGPD Art. 18, VI — eliminação).
 * Exige confirmação explícita do nome do paciente.
 * O log de auditoria do evento de exclusão é PRESERVADO (registro legal).
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const { patientId, confirmacao } = await req.json()
  if (!patientId) return NextResponse.json({ error: 'patientId obrigatório' }, { status: 400 })

  const [patient] = await db.select().from(patients).where(eq(patients.id, Number(patientId)))
  if (!patient || patient.doctorId !== doctorId) {
    return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
  }

  // Confirmação anti-acidente: precisa digitar o nome exato
  if (confirmacao !== patient.nome) {
    return NextResponse.json(
      { error: 'Confirmação inválida. Digite o nome exato do paciente.' },
      { status: 400 }
    )
  }

  const pid = Number(patientId)
  await Promise.all([
    db.delete(protocols).where(eq(protocols.patientId, pid)),
    db.delete(consultas).where(eq(consultas.patientId, pid)),
    db.delete(diarioRegistros).where(eq(diarioRegistros.patientId, pid)),
    db.delete(chatMessages).where(eq(chatMessages.patientId, pid)),
    db.delete(anthropometry).where(eq(anthropometry.patientId, pid)),
    db.delete(labExams).where(eq(labExams.patientId, pid)),
    db.delete(mealPlans).where(eq(mealPlans.patientId, pid)),
    db.delete(anamnese).where(eq(anamnese.patientId, pid)),
    db.delete(appointments).where(eq(appointments.patientId, pid)),
    db.delete(financialRecords).where(eq(financialRecords.patientId, pid)),
    db.delete(consents).where(eq(consents.patientId, pid)),
    db.delete(attachments).where(eq(attachments.patientId, pid)),
  ])
  await db.delete(patients).where(eq(patients.id, pid))

  // Registro legal da eliminação (preservado para prestação de contas)
  const meta = reqMeta(req)
  await audit({
    actorId: doctorId,
    actorEmail: session.user.email,
    actorRole: 'medico',
    acao: 'delete',
    entidade: 'patient',
    entidadeId: pid,
    patientId: pid,
    detalhes: { motivo: 'direito_ao_esquecimento', titular: patient.nome },
    ...meta,
  })

  return NextResponse.json({ ok: true, message: 'Todos os dados do titular foram eliminados.' })
}
