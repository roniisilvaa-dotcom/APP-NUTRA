export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { chatMessages } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const { text, patientId } = await req.json()
  const role = session.user.role as 'medico' | 'paciente'

  const [message] = await db.insert(chatMessages).values({
    patientId: Number(patientId),
    doctorId: role === 'medico' ? Number(session.user.id) : 0,
    senderId: Number(session.user.id),
    senderRole: role,
    text,
  }).returning()

  return NextResponse.json({ message }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const patientId = Number(searchParams.get('patientId'))

  const messages = await db.select().from(chatMessages).where(eq(chatMessages.patientId, patientId))
  return NextResponse.json({ messages })
}
