// Autorização de plataforma (super-admin / desenvolvedor)

/** E-mails com acesso ao Painel do Desenvolvedor (super-admin da plataforma). */
export function superAdminEmails(): string[] {
  return (process.env.SUPERADMIN_EMAILS || 'ronysiilvaa1@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isSuperAdmin(email?: string | null): boolean {
  if (!email) return false
  return superAdminEmails().includes(email.toLowerCase())
}

/** Permissões padrão de uma secretária (tudo liberado exceto clínico). */
export const DEFAULT_SECRETARY_PERMISSIONS = {
  agenda: true,
  financeiro: true,
  pacientes: true,
  prontuario: false,
  mensagens: false,
}

export type Permission = keyof typeof DEFAULT_SECRETARY_PERMISSIONS
