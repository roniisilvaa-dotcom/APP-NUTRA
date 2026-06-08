'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Quando o app é aberto como PWA instalado (tela inicial do celular) e cai na
 * landing page, redireciona direto para o app (/dashboard).
 * Resolve o caso do iOS, que usa a URL atual ao "Adicionar à Tela de Início".
 */
export default function StandaloneGuard() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true
    if (standalone && (pathname === '/' || pathname === '')) {
      router.replace('/dashboard')
    }
  }, [pathname, router])

  return null
}
