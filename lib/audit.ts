import { db } from '@/lib/db'
import { auditLogs } from '@/lib/db/schema'

export type AuditAction = 'view' | 'create' | 'update' | 'delete' | 'export' | 'login' | 'logout' | 'consent' | 'revoke'

interface AuditInput {
  actorId?: number | null
  actorEmail?: string | null
  actorRole?: string | null
  acao: AuditAction
  entidade?: string
  entidadeId?: number | null
  patientId?: number | null
  detalhes?: Record<string, unknown>
  ip?: string | null
  userAgent?: string | null
}

/**
 * Registra uma ação no log de auditoria LGPD.
 * Nunca lança erro para não quebrar a operação principal.
 */
export async function audit(input: AuditInput): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      actorId: input.actorId ?? null,
      actorEmail: input.actorEmail ?? null,
      actorRole: input.actorRole ?? null,
      acao: input.acao,
      entidade: input.entidade,
      entidadeId: input.entidadeId ?? null,
      patientId: input.patientId ?? null,
      detalhes: input.detalhes ?? {},
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
    })
  } catch (e) {
    console.error('[audit] falha ao registrar log:', (e as Error).message)
  }
}

/** Extrai IP e User-Agent de uma Request. */
export function reqMeta(req: Request): { ip: string | null; userAgent: string | null } {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null
  return { ip, userAgent: req.headers.get('user-agent') }
}
