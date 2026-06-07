import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NUTRA — Medicina Nutricional de Precisão',
    short_name: 'NUTRA',
    description: 'Plataforma clínica de nutrição de precisão: antropometria, IA NUTRA CA.RO, prontuário e acompanhamento.',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#07110D',
    theme_color: '#0E2A22',
    orientation: 'portrait',
    lang: 'pt-BR',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
