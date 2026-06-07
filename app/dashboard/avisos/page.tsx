'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Megaphone, ArrowLeft, Send, Users } from 'lucide-react'

interface Aviso { id: number; titulo: string; corpo: string; publico: string; createdAt?: string }

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([])
  const [titulo, setTitulo] = useState('')
  const [corpo, setCorpo] = useState('')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  const load = () => fetch('/api/avisos').then((r) => r.json()).then((d) => setAvisos(d.avisos || []))
  useEffect(() => { load() }, [])

  const publicar = async () => {
    if (!titulo.trim() || !corpo.trim()) { setToast('Preencha título e mensagem.'); return }
    setBusy(true)
    const res = await fetch('/api/avisos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ titulo, corpo }) })
    setBusy(false)
    if (res.ok) { setTitulo(''); setCorpo(''); setToast('Aviso enviado a todos os pacientes.'); load(); setTimeout(() => setToast(''), 3000) }
  }

  return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6]">
      <header className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="p-2 rounded-xl bg-amber-500/10"><Megaphone className="w-6 h-6 text-amber-400" /></div>
          <div>
            <h1 className="text-lg font-bold">Mural de Avisos</h1>
            <p className="text-xs text-gray-400">Comunicados enviados a todos os seus pacientes</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Compositor */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Users className="w-4 h-4 text-amber-400" /> Novo aviso para todos os pacientes</div>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título (ex: Recesso de fim de ano)" className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-amber-400/40" />
          <textarea value={corpo} onChange={(e) => setCorpo(e.target.value)} placeholder="Mensagem..." rows={3} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-amber-400/40" />
          <div className="mt-3 flex justify-end">
            <button onClick={publicar} disabled={busy} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50" style={{ background: 'linear-gradient(92deg,#F4E2A8,#D4AF37)', color: '#07110D' }}>
              <Send className="w-4 h-4" /> {busy ? 'Enviando...' : 'Publicar aviso'}
            </button>
          </div>
        </div>

        {/* Histórico */}
        <div className="space-y-3">
          {avisos.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">Nenhum aviso publicado ainda.</p>
          ) : avisos.map((a) => (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-lg font-semibold">{a.titulo}</h3>
                <span className="text-[10px] uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{a.publico === 'todos_pacientes' ? 'Todos' : 'Específico'}</span>
              </div>
              <p className="mt-1 text-sm text-gray-300">{a.corpo}</p>
              <div className="mt-2 text-[11px] text-gray-500">{a.createdAt ? new Date(a.createdAt).toLocaleString('pt-BR') : ''}</div>
            </div>
          ))}
        </div>
      </main>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg z-50">{toast}</div>}
    </div>
  )
}
