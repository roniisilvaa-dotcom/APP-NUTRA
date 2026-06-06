export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { diarioRegistros, patients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const body = await req.json()
  const [patient] = await db.select().from(patients).where(eq(patients.userId, Number(session.user.id)))
  if (!patient) return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })

  const [log] = await db.insert(diarioRegistros).values({
    patientId: patient.id,
    ...body,
  }).returning()

  return NextResponse.json({ log }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const [patient] = await db.select().from(patients).where(eq(patients.userId, Number(session.user.id)))
  if (!patient) return NextResponse.json({ logs: [] })

  const logs = await db.select().from(diarioRegistros).where(eq(diarioRegistros.patientId, patient.id))
  return NextResponse.json({ logs })
}
