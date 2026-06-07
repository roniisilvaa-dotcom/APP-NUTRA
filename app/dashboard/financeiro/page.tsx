'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Wallet, ArrowLeft, Plus, TrendingUp, TrendingDown, Clock, Check, Trash2 } from 'lucide-react'

interface Rec { id: number; descricao: string; tipo: string; valor: number; status: string; vencimento?: string | null; createdAt?: string }
interface Resumo { receitas: number; despesas: number; saldo: number; pendente: number }

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function FinanceiroPage() {
  const [records, setRecords] = useState<Rec[]>([])
  const [resumo, setResumo] = useState<Resumo | null>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ descricao: '', valor: '', tipo: 'receita', status: 'pago' })
  const [err, setErr] = useState('')

  const load = () => fetch('/api/financeiro').then(async (r) => {
    if (r.status === 403) { setErr('Você não tem permissão para o financeiro.'); return }
    const d = await r.json(); setRecords(d.records || []); setResumo(d.resumo || null)
  })
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!form.descricao || !form.valor) return
    const res = await fetch('/api/financeiro', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { setOpen(false); setForm({ descricao: '', valor: '', tipo: 'receita', status: 'pago' }); load() }
  }
  const marcarPago = async (r: Rec) => { await fetch('/api/financeiro', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: r.id, status: 'pago' }) }); load() }
  const remover = async (r: Rec) => { await fetch('/api/financeiro', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: r.id }) }); load() }

  if (err) return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6] flex items-center justify-center">
      <div className="text-center"><Wallet className="w-12 h-12 mx-auto mb-3 text-red-400 opacity-60" /><p className="text-gray-300">{err}</p><Link href="/dashboard" className="mt-4 inline-block text-emerald-400 text-sm">← Voltar</Link></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A1410] text-[#F2EFE6]">
      <header className="border-b border-white/10 bg-white/[0.03]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="p-2 rounded-xl bg-emerald-500/10"><Wallet className="w-6 h-6 text-emerald-400" /></div>
          <div><h1 className="text-lg font-bold">Financeiro</h1><p className="text-xs text-gray-400">Receitas, despesas e pagamentos</p></div>
          <button onClick={() => setOpen(true)} className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold" style={{ background: 'linear-gradient(92deg,#F4E2A8,#D4AF37)', color: '#07110D' }}><Plus className="w-4 h-4" /> Lançamento</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {resumo && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card icon={<TrendingUp className="w-4 h-4" />} label="Receitas (pago)" value={brl(resumo.receitas)} color="#10B981" />
            <Card icon={<TrendingDown className="w-4 h-4" />} label="Despesas (pago)" value={brl(resumo.despesas)} color="#E0876F" />
            <Card icon={<Wallet className="w-4 h-4" />} label="Saldo" value={brl(resumo.saldo)} color="#D4AF37" />
            <Card icon={<Clock className="w-4 h-4" />} label="A receber" value={brl(resumo.pendente)} color="#38BDF8" />
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-left font-mono-data text-[10px] uppercase tracking-wider text-gray-500">
              <tr><th className="px-4 py-3">Descrição</th><th className="px-4 py-3">Tipo</th><th className="px-4 py-3">Valor</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3">{r.descricao}</td>
                  <td className="px-4 py-3"><span className={r.tipo === 'receita' ? 'text-emerald-400' : 'text-orange-400'}>{r.tipo}</span></td>
                  <td className="px-4 py-3 font-semibold">{brl(r.valor)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${r.status === 'pago' ? 'text-emerald-400' : r.status === 'pendente' ? 'text-amber-400' : 'text-gray-400'}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {r.status !== 'pago' && <button onClick={() => marcarPago(r)} className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-400 inline-flex items-center gap-1"><Check className="w-3 h-3" /> Pago</button>}
                      <button onClick={() => remover(r)} className="rounded-full bg-red-500/10 p-1.5 text-red-400"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {records.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Nenhum lançamento. Adicione o primeiro.</td></tr>}
            </tbody>
          </table>
        </div>
      </main>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1F18] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif-display text-xl font-semibold mb-4">Novo lançamento</h2>
            <div className="space-y-3">
              <input placeholder="Descrição (ex: Consulta Ana Costa)" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-emerald-400/40" />
              <input placeholder="Valor (R$)" type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-emerald-400/40" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none"><option value="receita">Receita</option><option value="despesa">Despesa</option></select>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none"><option value="pago">Pago</option><option value="pendente">Pendente</option></select>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm">Cancelar</button>
              <button onClick={add} className="flex-1 rounded-full px-4 py-2.5 text-sm font-semibold" style={{ background: 'linear-gradient(92deg,#F4E2A8,#D4AF37)', color: '#07110D' }}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-1.5 font-mono-data text-[10px] uppercase tracking-wider" style={{ color }}>{icon} {label}</div>
      <div className="mt-1 font-serif-display text-2xl font-semibold">{value}</div>
    </div>
  )
}
