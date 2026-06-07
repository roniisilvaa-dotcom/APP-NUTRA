import type { Metadata, Viewport } from 'next'
import './globals.css'
import InstallPWA from './components/InstallPWA'

export const metadata: Metadata = {
  title: 'NUTRA — Medicina Nutricional de Precisão',
  description: 'Plataforma de nutrição clínica de precisão com IA NUTRA CA.RO, antropometria, prontuário e acompanhamento.',
  icons: {
    icon: '/icon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NUTRA',
  },
}

export const viewport: Viewport = {
  themeColor: '#0E2A22',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <InstallPWA />
      </body>
    </html>
  )
}
