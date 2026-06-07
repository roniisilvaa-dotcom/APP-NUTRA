'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, ArrowLeft, UserPlus, Check, X, ShieldCheck } from 'lucide-react'

interface Member {
  id: number; name: string; email: string; ativo: boolean | null
  permissions: Record<string, boolean>
}

const PERMS: { key: string; label: string }[] = [
  { key: 'agenda', label: 'Agenda' },
  { key: 'financeiro', label: 'Financeiro' },
  { key: 'pacientes', label: 'Pacientes' },
  { key: 'prontuario', label: 'Prontuário clínico' },
  { key: 'mensagens', label: 'Mensagens' },
]

export default function EquipePage() {
  const [team, setTeam] = useState<Member[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [perms, setPerms] = useState<Record<string, boolean>>({ agenda: true, financeiro: true, pacientes: true, prontuario: false, mensagens: false })
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () => fetch('/api/team').then((r) => r.json()).then((d) => setTeam(d.team || []))
  useEffect(() => { load() }, [])
  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3000) }

  const create = async () => {
    if (!form.name || !form.email || !form.password) return flash('Preencha todos os campos.')
    setBusy(true)
    const res = await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, permissions: perms }) })
    setBusy(false)
    if (res.ok) { flash('Membro cadastrado e ativado.'); setOpen(false); setForm({ name: '', email: '', password: '' }); load() }
    else { const e = await res.json(); flash(e.error || 'Erro ao cadastrar.') }
  }

  const toggleActive = async (m: Member) => {
    await fetch('/api/team', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: m.id, ativo: !(m.ativo !== false) }) })
    load()
  }
  const togglePerm = async (m: Member, key: string) => {
    const next = { ...m.permissions, [key]: !m.permissions?.[key] }
    await fetch('/api/team', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: m.id, permissions: next }) })
    load()
  }

  return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6]">
      <header className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="p-2 rounded-xl bg-emerald-500/10"><Users className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <h1 className="text-lg font-bold">Equipe & Acessos</h1>
            <p className="text-xs text-gray-400">Cadastre sua secretária e defina o que ela pode acessar</p>
          </div>
          <button onClick={() => setOpen(true)} className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold" style={{ background: 'linear-gradient(92deg,#F4E2A8,#D4AF37)', color: '#07110D' }}>
            <UserPlus className="w-4 h-4" /> Novo membro
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6">
        {team.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            Nenhum membro ainda. Cadastre sua secretária para dar acesso com permissões controladas.
          </div>
        ) : (
          <div className="space-y-4">
            {team.map((m) => (
              <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{m.name} <span className="ml-2 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Secretária</span></div>
                    <div className="text-xs text-gray-400">{m.email}</div>
                  </div>
                  <button onClick={() => toggleActive(m)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${m.ativo !== false ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                    {m.ativo !== false ? <><Check className="w-3 h-3" /> Ativo</> : <><X className="w-3 h-3" /> Inativo</>}
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PERMS.map((p) => {
                    const on = m.permissions?.[p.key]
                    return (
                      <button key={p.key} onClick={() => togglePerm(m, p.key)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition ${on ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/5 text-gray-500'}`}>
                        {on ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {p.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1F18] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif-display text-xl font-semibold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-400" /> Novo membro</h2>
            <div className="space-y-3">
              <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-emerald-400/50" />
              <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-emerald-400/50" />
              <input placeholder="Senha (mín. 8 caracteres)" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-emerald-400/50" />
              <div>
                <div className="text-xs text-gray-400 mb-2">Permissões</div>
                <div className="flex flex-wrap gap-2">
                  {PERMS.map((p) => (
                    <button key={p.key} onClick={() => setPerms({ ...perms, [p.key]: !perms[p.key] })}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs ${perms[p.key] ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/5 text-gray-500'}`}>
                      {perms[p.key] ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm">Cancelar</button>
              <button onClick={create} disabled={busy} className="flex-1 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-50" style={{ background: 'linear-gradient(92deg,#F4E2A8,#D4AF37)', color: '#07110D' }}>
                {busy ? 'Cadastrando...' : 'Cadastrar e ativar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg z-50">{toast}</div>}
    </div>
  )
}
