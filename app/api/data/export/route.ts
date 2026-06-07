export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import {
  patients, protocols, consultas, diarioRegistros, chatMessages,
  anthropometry, labExams, mealPlans, anamnese, appointments,
  financialRecords, consents, attachments, auditLogs,
} from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'

/**
 * Exportação total dos dados de um paciente (LGPD Art. 18, II e V — portabilidade).
 * Retorna TODO o dado do titular em JSON estruturado.
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const patientId = Number(req.nextUrl.searchParams.get('patientId'))
  if (!patientId) return NextResponse.json({ error: 'patientId obrigatório' }, { status: 400 })

  // Verifica titularidade: o paciente pertence a este médico
  const [patient] = await db.select().from(patients).where(eq(patients.id, patientId))
  if (!patient || patient.doctorId !== doctorId) {
    return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
  }

  const [
    protocolsData, consultasData, diarioData, chatData, anthroData,
    labData, mealData, anamneseData, apptData, finData, consentData, attachData,
  ] = await Promise.all([
    db.select().from(protocols).where(eq(protocols.patientId, patientId)),
    db.select().from(consultas).where(eq(consultas.patientId, patientId)),
    db.select().from(diarioRegistros).where(eq(diarioRegistros.patientId, patientId)),
    db.select().from(chatMessages).where(eq(chatMessages.patientId, patientId)),
    db.select().from(anthropometry).where(eq(anthropometry.patientId, patientId)),
    db.select().from(labExams).where(eq(labExams.patientId, patientId)),
    db.select().from(mealPlans).where(eq(mealPlans.patientId, patientId)),
    db.select().from(anamnese).where(eq(anamnese.patientId, patientId)),
    db.select().from(appointments).where(eq(appointments.patientId, patientId)),
    db.select().from(financialRecords).where(eq(financialRecords.patientId, patientId)),
    db.select().from(consents).where(eq(consents.patientId, patientId)),
    db.select().from(attachments).where(eq(attachments.patientId, patientId)),
  ])

  const dump = {
    _meta: {
      exportadoEm: new Date().toISOString(),
      titular: patient.nome,
      formato: 'NUTRA Data Export v1 (LGPD Art. 18)',
      geradoPor: session.user.email,
    },
    cadastro: patient,
    antropometria: anthroData,
    examesLaboratoriais: labData,
    protocolos: protocolsData,
    planosAlimentares: mealData,
    anamnese: anamneseData,
    diarioAlimentar: diarioData,
    consultas: consultasData,
    agendamentos: apptData,
    financeiro: finData,
    mensagens: chatData,
    consentimentos: consentData,
    anexos: attachData,
  }

  const meta = reqMeta(req)
  await audit({
    actorId: doctorId,
    actorEmail: session.user.email,
    actorRole: 'medico',
    acao: 'export',
    entidade: 'patient',
    entidadeId: patientId,
    patientId,
    detalhes: { registros: Object.keys(dump).length },
    ...meta,
  })

  return new NextResponse(JSON.stringify(dump, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="nutra-dados-${patient.nome.replace(/\s+/g, '_')}-${patientId}.json"`,
    },
  })
}
