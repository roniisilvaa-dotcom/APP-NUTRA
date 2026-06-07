export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { chatMessages, patients } from '@/lib/db/schema'
import { eq, and, desc, asc } from 'drizzle-orm'
import { audit, reqMeta } from '@/lib/audit'

/**
 * GET sem patientId  → lista de conversas (médico: seus pacientes; paciente: seu médico)
 * GET com patientId  → thread privada daquele paciente (escopo verificado)
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  const role = session.user.role as string
  const uid = Number(session.user.id)
  const patientIdParam = req.nextUrl.searchParams.get('patientId')

  // ---- PACIENTE: só pode ver a própria thread ----
  if (role === 'paciente') {
    const [me] = await db.select().from(patients).where(eq(patients.userId, uid))
    if (!me) return NextResponse.json({ messages: [] })
    const msgs = await db.select().from(chatMessages).where(eq(chatMessages.patientId, me.id)).orderBy(asc(chatMessages.createdAt))
    return NextResponse.json({ messages: msgs, patient: { id: me.id, nome: me.nome } })
  }

  // ---- MÉDICO / SECRETÁRIA (com permissão) ----
  if (role !== 'medico' && !(role === 'secretaria' && (session.user as { permissions?: Record<string, boolean> }).permissions?.mensagens)) {
    // secretária sem permissão de mensagens
    if (role === 'secretaria') return NextResponse.json({ error: 'Sem permissão para mensagens' }, { status: 403 })
  }
  const doctorId = role === 'secretaria' ? Number((session.user as { doctorId?: number }).doctorId) : uid

  if (patientIdParam) {
    const patientId = Number(patientIdParam)
    // verifica que o paciente é deste médico
    const [p] = await db.select().from(patients).where(eq(patients.id, patientId))
    if (!p || p.doctorId !== doctorId) return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
    const msgs = await db.select().from(chatMessages)
      .where(and(eq(chatMessages.patientId, patientId), eq(chatMessages.doctorId, doctorId)))
      .orderBy(asc(chatMessages.createdAt))
    const meta = reqMeta(req)
    await audit({ actorId: uid, actorEmail: session.user.email, actorRole: role, acao: 'view', entidade: 'chat', patientId, ...meta })
    return NextResponse.json({ messages: msgs, patient: { id: p.id, nome: p.nome } })
  }

  // lista de conversas: pacientes do médico + última mensagem
  const pts = await db.select({ id: patients.id, nome: patients.nome }).from(patients).where(eq(patients.doctorId, doctorId))
  const convos = await Promise.all(pts.map(async (p) => {
    const [last] = await db.select().from(chatMessages)
      .where(and(eq(chatMessages.patientId, p.id), eq(chatMessages.doctorId, doctorId)))
      .orderBy(desc(chatMessages.createdAt)).limit(1)
    return { patientId: p.id, nome: p.nome, ultima: last?.text ?? null, em: last?.createdAt ?? null }
  }))
  convos.sort((a, b) => (b.em ? new Date(b.em).getTime() : 0) - (a.em ? new Date(a.em).getTime() : 0))
  return NextResponse.json({ conversations: convos })
}

/** Envia mensagem na thread privada de um paciente específico. */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  const role = session.user.role as string
  const uid = Number(session.user.id)
  const { patientId, text } = await req.json()
  if (!text?.trim()) return NextResponse.json({ error: 'Mensagem vazia' }, { status: 400 })

  let pid: number, doctorId: number
  if (role === 'paciente') {
    const [me] = await db.select().from(patients).where(eq(patients.userId, uid))
    if (!me) return NextResponse.json({ error: 'Paciente não vinculado' }, { status: 404 })
    pid = me.id; doctorId = me.doctorId
  } else {
    doctorId = role === 'secretaria' ? Number((session.user as { doctorId?: number }).doctorId) : uid
    const [p] = await db.select().from(patients).where(eq(patients.id, Number(patientId)))
    if (!p || p.doctorId !== doctorId) return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 })
    pid = p.id
  }

  const [message] = await db.insert(chatMessages).values({
    patientId: pid, doctorId, senderId: uid, senderRole: role === 'secretaria' ? 'medico' : (role as 'medico' | 'paciente'), text: text.trim(),
  }).returning()

  return NextResponse.json({ message }, { status: 201 })
}
