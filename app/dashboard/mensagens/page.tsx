'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, ArrowLeft, Send, Lock, Search } from 'lucide-react'

interface Convo { patientId: number; nome: string; ultima: string | null; em: string | null }
interface Msg { id: number; text: string; senderRole: string; createdAt?: string }

export default function MensagensPage() {
  const [convos, setConvos] = useState<Convo[]>([])
  const [active, setActive] = useState<Convo | null>(null)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [text, setText] = useState('')
  const [q, setQ] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { fetch('/api/messages').then((r) => r.json()).then((d) => setConvos(d.conversations || [])) }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const open = async (c: Convo) => {
    setActive(c)
    const d = await fetch(`/api/messages?patientId=${c.patientId}`).then((r) => r.json())
    setMsgs(d.messages || [])
  }

  const send = async () => {
    if (!text.trim() || !active) return
    const body = text.trim(); setText('')
    const d = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patientId: active.patientId, text: body }) }).then((r) => r.json())
    if (d.message) setMsgs((m) => [...m, d.message])
  }

  const filtered = convos.filter((c) => c.nome.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6]">
      <header className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="p-2 rounded-xl bg-emerald-500/10"><MessageSquare className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <h1 className="text-lg font-bold">Mensagens</h1>
            <p className="text-xs text-gray-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Conversa privada com cada paciente</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid h-[calc(100vh-73px)] grid-cols-1 md:grid-cols-[320px_1fr]">
        {/* Lista */}
        <aside className={`border-r border-white/10 ${active ? 'hidden md:block' : ''}`}>
          <div className="relative p-3">
            <Search className="w-4 h-4 absolute left-6 top-6 text-gray-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar paciente..." className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-white/10 bg-white/5 outline-none focus:border-emerald-400/40" />
          </div>
          <div className="overflow-y-auto">
            {filtered.length === 0 && <p className="px-4 py-6 text-sm text-gray-500">Nenhum paciente ainda.</p>}
            {filtered.map((c) => (
              <button key={c.patientId} onClick={() => open(c)} className={`w-full border-b border-white/[0.04] px-4 py-3 text-left transition ${active?.patientId === c.patientId ? 'bg-emerald-500/10' : 'hover:bg-white/[0.03]'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{c.nome}</span>
                  {c.em && <span className="text-[10px] text-gray-500">{new Date(c.em).toLocaleDateString('pt-BR')}</span>}
                </div>
                <div className="truncate text-xs text-gray-500">{c.ultima || 'Iniciar conversa'}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Thread */}
        <section className={`flex flex-col ${active ? '' : 'hidden md:flex'}`}>
          {!active ? (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              <div className="text-center"><Lock className="w-10 h-10 mx-auto mb-2 opacity-30" />Selecione uma conversa</div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <button onClick={() => setActive(null)} className="md:hidden text-gray-400"><ArrowLeft className="w-5 h-5" /></button>
                <span className="font-serif-display text-lg font-semibold">{active.nome}</span>
                <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-400"><Lock className="w-3 h-3" /> Privado</span>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-5">
                {msgs.length === 0 && <p className="text-center text-sm text-gray-500">Nenhuma mensagem. Diga olá 👋</p>}
                {msgs.map((m) => {
                  const mine = m.senderRole === 'medico'
                  return (
                    <div key={m.id} className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${mine ? 'ml-auto' : ''}`} style={mine ? { background: '#10B981', color: '#07110D' } : { background: '#ffffff0E', color: '#D6E4DD' }}>
                      {m.text}
                      <div className="mt-0.5 text-[9px] opacity-60">{m.createdAt ? new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                    </div>
                  )
                })}
                <div ref={endRef} />
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 p-3">
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={`Mensagem para ${active.nome}…`} className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-emerald-400/40" />
                <button onClick={send} className="rounded-full p-2.5" style={{ background: '#10B981', color: '#07110D' }}><Send className="w-4 h-4" /></button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}
