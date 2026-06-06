import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NUTRA — Sistema de Apoio Clínico de Precisão',
  description: 'Plataforma avançada de nutrição clínica para médicos nutrólogos e seus pacientes.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
