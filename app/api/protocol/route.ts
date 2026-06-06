export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { protocols, patients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const body = await req.json()
  const { patientId, ...data } = body

  await db
    .update(protocols)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(protocols.patientId, patientId))

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const patientId = Number(searchParams.get('patientId'))

  const [protocol] = await db.select().from(protocols).where(eq(protocols.patientId, patientId))
  return NextResponse.json({ protocol: protocol ?? null })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const body = await req.json()
  const [protocol] = await db.insert(protocols).values({
    doctorId: Number(session.user.id),
    ...body,
  }).returning()

  return NextResponse.json({ protocol }, { status: 201 })
}
