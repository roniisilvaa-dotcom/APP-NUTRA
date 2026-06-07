export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { auditLogs } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'

/**
 * Histórico de auditoria — quem acessou/alterou dados e quando.
 * O médico vê os logs das ações que ele praticou (prestação de contas LGPD).
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'medico') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }
  const doctorId = Number(session.user.id)
  const patientId = req.nextUrl.searchParams.get('patientId')

  const where = patientId
    ? and(eq(auditLogs.actorId, doctorId), eq(auditLogs.patientId, Number(patientId)))
    : eq(auditLogs.actorId, doctorId)

  const logs = await db
    .select()
    .from(auditLogs)
    .where(where)
    .orderBy(desc(auditLogs.createdAt))
    .limit(200)

  return NextResponse.json({ logs })
}
