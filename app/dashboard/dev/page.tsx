'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Terminal, ArrowLeft, Check, X, Search, Shield } from 'lucide-react'

interface U {
  id: number; name: string; email: string; role: string; plan: string
  ativo: boolean | null; doctorId: number | null; createdAt?: string
}
interface Stats { total: number; medicos: number; pacientes: number; secretarias: number; ativos: number; prontuarios: number }

const ROLE_COR: Record<string, string> = {
  medico: 'text-sky-400 bg-sky-500/10',
  paciente: 'text-emerald-400 bg-emerald-500/10',
  secretaria: 'text-violet-400 bg-violet-500/10',
}

export default function DevPanel() {
  const [users, setUsers] = useState<U[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')

  const load = () => fetch('/api/admin/users').then(async (r) => {
    if (r.status === 403) { setErr('Acesso restrito ao desenvolvedor.'); return }
    const d = await r.json(); setUsers(d.users || []); setStats(d.stats || null)
  })
  useEffect(() => { load() }, [])

  const toggle = async (u: U) => {
    await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id, ativo: !(u.ativo !== false) }) })
    load()
  }
  const setPlan = async (u: U, plan: string) => {
    await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id, plan }) })
    load()
  }

  const filtered = users.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase()))

  if (err) return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6] flex items-center justify-center">
      <div className="text-center">
        <Shield className="w-12 h-12 mx-auto mb-3 text-red-400 opacity-60" />
        <p className="text-gray-300">{err}</p>
        <Link href="/dashboard" className="mt-4 inline-block text-emerald-400 text-sm">← Voltar</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6]">
      <header className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="p-2 rounded-xl bg-amber-500/10"><Terminal className="w-6 h-6 text-amber-400" /></div>
          <div>
            <h1 className="text-lg font-bold">Painel do Desenvolvedor</h1>
            <p className="text-xs text-gray-400">Controle global da plataforma · todas as contas</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Stats */}
        {stats && (
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-6">
            {[
              { l: 'Total contas', v: stats.total }, { l: 'Médicos', v: stats.medicos },
              { l: 'Pacientes', v: stats.pacientes }, { l: 'Secretárias', v: stats.secretarias },
              { l: 'Ativas', v: stats.ativos }, { l: 'Prontuários', v: stats.prontuarios },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-serif-display text-3xl font-semibold lux-gold-text">{s.v}</div>
                <div className="font-mono-data text-[10px] uppercase tracking-wider text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
        )}

        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome ou email..." className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-white/10 bg-white/5 outline-none focus:border-emerald-400/40" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-left font-mono-data text-[10px] uppercase tracking-wider text-gray-500">
              <tr><th className="px-4 py-3">Nome</th><th className="px-4 py-3">Papel</th><th className="px-4 py-3">Plano</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3"><div className="font-medium">{u.name}</div><div className="text-xs text-gray-500">{u.email}</div></td>
                  <td className="px-4 py-3"><span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${ROLE_COR[u.role] || 'text-gray-400 bg-white/10'}`}>{u.role}</span></td>
                  <td className="px-4 py-3">
                    {u.role === 'medico' ? (
                      <select value={u.plan} onChange={(e) => setPlan(u, e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs outline-none">
                        {['free', 'clinica', 'advanced'].map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    ) : <span className="text-xs text-gray-500">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs ${u.ativo !== false ? 'text-emerald-400' : 'text-red-400'}`}>
                      {u.ativo !== false ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {u.ativo !== false ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toggle(u)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${u.ativo !== false ? 'bg-red-500/15 text-red-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                      {u.ativo !== false ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Nenhuma conta.</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
