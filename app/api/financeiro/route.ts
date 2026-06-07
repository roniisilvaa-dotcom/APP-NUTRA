export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { financialRecords } from '@/lib/db/schema'
import { eq, and, desc, sql } from 'drizzle-orm'

function ctx(session: { user: { id: string; role: string; permissions?: Record<string, boolean>; doctorId?: number } } | null) {
  if (!session?.user) return null
  const role = session.user.role
  if (role === 'medico') return { doctorId: Number(session.user.id), uid: Number(session.user.id) }
  if (role === 'secretaria' && session.user.permissions?.financeiro) return { doctorId: Number(session.user.doctorId), uid: Number(session.user.id) }
  return null
}

export async function GET() {
  const session = await auth()
  const c = ctx(session as never)
  if (!c) return NextResponse.json({ error: 'Sem permissão para o financeiro' }, { status: 403 })

  const records = await db.select().from(financialRecords).where(eq(financialRecords.doctorId, c.doctorId)).orderBy(desc(financialRecords.createdAt))
  const [resumo] = await db.select({
    receitas: sql<number>`coalesce(sum(valor) filter (where tipo='receita' and status='pago'),0)::float`,
    despesas: sql<number>`coalesce(sum(valor) filter (where tipo='despesa' and status='pago'),0)::float`,
    pendente: sql<number>`coalesce(sum(valor) filter (where tipo='receita' and status='pendente'),0)::float`,
  }).from(financialRecords).where(eq(financialRecords.doctorId, c.doctorId))
  return NextResponse.json({ records, resumo: { ...resumo, saldo: (resumo.receitas - resumo.despesas) } })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  const c = ctx(session as never)
  if (!c) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  const b = await req.json()
  if (!b.descricao || !b.valor) return NextResponse.json({ error: 'Descrição e valor obrigatórios' }, { status: 400 })
  const [rec] = await db.insert(financialRecords).values({
    doctorId: c.doctorId,
    patientId: b.patientId ? Number(b.patientId) : null,
    descricao: b.descricao, tipo: b.tipo || 'receita', valor: Number(b.valor),
    status: b.status || 'pendente', metodoPagamento: b.metodoPagamento, vencimento: b.vencimento,
    pagoEm: b.status === 'pago' ? new Date().toISOString().slice(0, 10) : null,
  }).returning()
  return NextResponse.json({ record: rec }, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  const c = ctx(session as never)
  if (!c) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  const { id, status } = await req.json()
  const [rec] = await db.update(financialRecords)
    .set({ status, pagoEm: status === 'pago' ? new Date().toISOString().slice(0, 10) : null })
    .where(and(eq(financialRecords.id, Number(id)), eq(financialRecords.doctorId, c.doctorId)))
    .returning()
  return NextResponse.json({ record: rec })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  const c = ctx(session as never)
  if (!c) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  const { id } = await req.json()
  await db.delete(financialRecords).where(and(eq(financialRecords.id, Number(id)), eq(financialRecords.doctorId, c.doctorId)))
  return NextResponse.json({ ok: true })
}
