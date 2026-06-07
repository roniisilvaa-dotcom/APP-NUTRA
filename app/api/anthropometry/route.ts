export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { anthropometry, patients } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'
import {
  calcIMC, tmbMifflin, gorduraPollock7, gorduraPollock3,
  massaGorda, massaMagra, relacaoCinturaQuadril, type Sexo, type Dobras,
} from '@/lib/clinical/calculations'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const patientId = Number(req.nextUrl.searchParams.get('patientId'))
  if (!patientId) return NextResponse.json({ error: 'patientId obrigatório' }, { status: 400 })

  const rows = await db.select().from(anthropometry)
    .where(and(eq(anthropometry.patientId, patientId), eq(anthropometry.doctorId, doctorId)))
    .orderBy(desc(anthropometry.data))
  return NextResponse.json({ avaliacoes: rows })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const body = await req.json()
  const { patientId, data, peso, altura, idade, sexo, dobras, protocoloDobras, circunferencias } = body

  const [patient] = await db.select().from(patients).where(eq(patients.id, Number(patientId)))
  if (!patient || patient.doctorId !== doctorId) {
    return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
  }

  // Cálculos automáticos server-side (fonte da verdade)
  const imc = peso && altura ? calcIMC(peso, altura) : null
  const tmb = peso && altura && idade && sexo ? tmbMifflin(peso, altura, idade, sexo as Sexo) : null
  let pctGordura: number | null = null
  if (dobras && idade && sexo) {
    pctGordura = protocoloDobras === 'pollock3'
      ? gorduraPollock3(dobras as Dobras, idade, sexo as Sexo)
      : gorduraPollock7(dobras as Dobras, idade, sexo as Sexo)
  }
  const mGorda = peso && pctGordura != null ? massaGorda(peso, pctGordura) : null
  const mMagra = peso && pctGordura != null ? massaMagra(peso, pctGordura) : null
  const rcq = circunferencias?.cintura && circunferencias?.quadril
    ? relacaoCinturaQuadril(circunferencias.cintura, circunferencias.quadril) : null
  const somaDobras = dobras ? Object.values(dobras as Record<string, number>).reduce((a, b) => a + (Number(b) || 0), 0) : null

  const [row] = await db.insert(anthropometry).values({
    patientId: Number(patientId), doctorId, data,
    peso, altura, imc,
    percentualGordura: pctGordura, massaMagra: mMagra, massaGorda: mGorda,
    taxaMetabolicaBasal: tmb,
    dobras: dobras || {}, protocoloDobras, somaDobras,
    circunferencias: circunferencias || {}, relacaoCinturaQuadril: rcq,
    observacoes: body.observacoes,
  }).returning()

  const meta = reqMeta(req)
  await audit({
    actorId: doctorId, actorEmail: session.user.email, actorRole: 'medico',
    acao: 'create', entidade: 'anthropometry', entidadeId: row.id, patientId: Number(patientId), ...meta,
  })

  return NextResponse.json({ avaliacao: row }, { status: 201 })
}
