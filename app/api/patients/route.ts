export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { patients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

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

  const body = await req.json()
  const [patient] = await db.insert(patients).values({
    doctorId: Number(session.user.id),
    ...body,
  }).returning()

  return NextResponse.json({ patient }, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  const { id, ...data } = await req.json()
  const [patient] = await db
    .update(patients)
    .set(data)
    .where(eq(patients.id, id))
    .returning()

  return NextResponse.json({ patient })
}
