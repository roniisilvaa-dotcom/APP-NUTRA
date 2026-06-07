'use client'

import { useEffect, useState } from 'react'
import { Download, X, Share } from 'lucide-react'

interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: string }>
}

export default function InstallPWA() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null)
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // registra o service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS
      window.navigator.standalone === true
    if (standalone) { setInstalled(true); return }

    const ua = window.navigator.userAgent.toLowerCase()
    const ios = /iphone|ipad|ipod/.test(ua)
    setIsIOS(ios)

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BIPEvent)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', () => { setInstalled(true); setShow(false) })

    // iOS não dispara beforeinstallprompt — mostra instrução
    if (ios && !sessionStorage.getItem('nutra-ios-dismiss')) setShow(true)

    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    setShow(false)
    setDeferred(null)
  }

  const dismiss = () => {
    setShow(false)
    if (isIOS) sessionStorage.setItem('nutra-ios-dismiss', '1')
  }

  if (installed || !show) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[92%] max-w-md -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0E2A22] px-4 py-3 text-[#F2EFE6] shadow-2xl backdrop-blur">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(160deg,#0E1F18,#07110D)', border: '1px solid #D4AF3755' }}>
          <Download className="h-5 w-5" style={{ color: '#D4AF37' }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">Instalar o app NUTRA</div>
          {isIOS ? (
            <div className="flex items-center gap-1 text-[11px] text-[#9DB3AA]">
              Toque em <Share className="inline h-3 w-3" /> e &ldquo;Adicionar à Tela de Início&rdquo;
            </div>
          ) : (
            <div className="text-[11px] text-[#9DB3AA]">Acesse direto da tela inicial do celular</div>
          )}
        </div>
        {!isIOS && (
          <button onClick={install} className="flex-shrink-0 rounded-full px-4 py-2 text-xs font-semibold" style={{ background: 'linear-gradient(92deg,#F4E2A8,#D4AF37)', color: '#07110D' }}>
            Instalar
          </button>
        )}
        <button onClick={dismiss} className="flex-shrink-0 text-[#7FA595] hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
