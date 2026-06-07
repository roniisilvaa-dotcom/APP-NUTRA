'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Shield, Download, Trash2, FileClock, FileCheck2, ArrowLeft,
  Search, AlertTriangle, Eye, Plus, RefreshCw, Lock,
} from 'lucide-react'

interface Patient { id: number; nome: string; cpf?: string | null }
interface AuditLog {
  id: number; acao: string; entidade?: string; entidadeId?: number | null
  patientId?: number | null; ip?: string | null; createdAt?: string
}
interface Consent {
  id: number; tipo: string; finalidade?: string | null; concedido: boolean
  concedidoEm?: string; revogadoEm?: string | null
}

const ACAO_LABEL: Record<string, { txt: string; cor: string }> = {
  view: { txt: 'Visualização', cor: 'text-sky-600 bg-sky-50' },
  create: { txt: 'Criação', cor: 'text-emerald-600 bg-emerald-50' },
  update: { txt: 'Alteração', cor: 'text-amber-600 bg-amber-50' },
  delete: { txt: 'Eliminação', cor: 'text-red-600 bg-red-50' },
  export: { txt: 'Exportação', cor: 'text-violet-600 bg-violet-50' },
  consent: { txt: 'Consentimento', cor: 'text-emerald-600 bg-emerald-50' },
  revoke: { txt: 'Revogação', cor: 'text-red-600 bg-red-50' },
  login: { txt: 'Login', cor: 'text-gray-600 bg-gray-100' },
}

export default function DataControlCenter() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selected, setSelected] = useState<Patient | null>(null)
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [consents, setConsents] = useState<Consent[]>([])
  const [search, setSearch] = useState('')
  const [eraseConfirm, setEraseConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/patients').then((r) => r.json()).then((d) => setPatients(d.patients || []))
  }, [])

  const loadDetail = useCallback(async (p: Patient) => {
    setSelected(p)
    setEraseConfirm('')
    const [a, c] = await Promise.all([
      fetch(`/api/audit?patientId=${p.id}`).then((r) => r.json()),
      fetch(`/api/consent?patientId=${p.id}`).then((r) => r.json()),
    ])
    setLogs(a.logs || [])
    setConsents(c.consents || [])
  }, [])

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3500) }

  const exportData = (p: Patient) => {
    window.open(`/api/data/export?patientId=${p.id}`, '_blank')
    flash('Exportação iniciada — download em andamento.')
    if (selected?.id === p.id) setTimeout(() => loadDetail(p), 1200)
  }

  const addConsent = async (tipo: string, finalidade: string) => {
    if (!selected) return
    await fetch('/api/consent', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId: selected.id, tipo, finalidade, versaoTermo: 'v1' }),
    })
    flash('Consentimento registrado.')
    loadDetail(selected)
  }

  const revokeConsent = async (consentId: number) => {
    await fetch('/api/consent', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consentId }),
    })
    flash('Consentimento revogado.')
    if (selected) loadDetail(selected)
  }

  const eraseData = async () => {
    if (!selected) return
    setBusy(true)
    const res = await fetch('/api/data/erase', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId: selected.id, confirmacao: eraseConfirm }),
    })
    setBusy(false)
    if (res.ok) {
      flash('Dados do titular eliminados com sucesso.')
      setPatients((prev) => prev.filter((x) => x.id !== selected.id))
      setSelected(null)
    } else {
      const e = await res.json()
      flash(e.error || 'Falha na eliminação.')
    }
  }

  const filtered = patients.filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-gray-800">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-2 rounded-xl bg-emerald-50">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Centro de Controle de Dados</h1>
            <p className="text-xs text-gray-500">Conformidade LGPD · Auditoria · Portabilidade · Direito ao esquecimento</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" /> Dados criptografados em trânsito e repouso
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-[320px_1fr] gap-6">
        {/* Lista de titulares */}
        <aside className="bg-white rounded-2xl border border-gray-200 p-4 h-fit">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar titular..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.id} onClick={() => loadDetail(p)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  selected?.id === p.id ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{p.nome}</div>
                {p.cpf && <div className="text-xs text-gray-400">CPF {p.cpf}</div>}
              </button>
            ))}
            {filtered.length === 0 && <p className="text-sm text-gray-400 px-3 py-4">Nenhum titular.</p>}
          </div>
        </aside>

        {/* Detalhe */}
        <section>
          {!selected ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-30" />
              Selecione um titular para gerenciar seus dados, consentimentos e auditoria.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ações de direitos do titular */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="font-semibold mb-1">{selected.nome}</h2>
                <p className="text-xs text-gray-500 mb-4">Direitos do titular (LGPD Art. 18)</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => exportData(selected)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors text-left"
                  >
                    <Download className="w-5 h-5 text-violet-600" />
                    <div>
                      <div className="text-sm font-medium">Exportar todos os dados</div>
                      <div className="text-xs text-gray-500">Portabilidade — JSON completo</div>
                    </div>
                  </button>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
                    <FileClock className="w-5 h-5 text-sky-600" />
                    <div>
                      <div className="text-sm font-medium">{logs.length} registros de auditoria</div>
                      <div className="text-xs text-gray-500">Rastreabilidade completa</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consentimentos */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-emerald-600" /> Consentimentos</h3>
                  <div className="flex gap-2">
                    <button onClick={() => addConsent('tratamento_dados', 'Tratamento de dados clínicos')} className="text-xs inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                      <Plus className="w-3 h-3" /> Tratamento
                    </button>
                    <button onClick={() => addConsent('comunicacao', 'Envio de comunicações e lembretes')} className="text-xs inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                      <Plus className="w-3 h-3" /> Comunicação
                    </button>
                  </div>
                </div>
                {consents.length === 0 ? (
                  <p className="text-sm text-gray-400">Nenhum consentimento registrado.</p>
                ) : (
                  <div className="space-y-2">
                    {consents.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-gray-50">
                        <div>
                          <span className="font-medium capitalize">{c.tipo.replace('_', ' ')}</span>
                          {c.finalidade && <span className="text-gray-500"> · {c.finalidade}</span>}
                          <div className="text-xs text-gray-400">
                            {c.concedido ? 'Concedido' : 'Revogado'} {c.concedidoEm ? new Date(c.concedidoEm).toLocaleDateString('pt-BR') : ''}
                          </div>
                        </div>
                        {c.concedido && (
                          <button onClick={() => revokeConsent(c.id)} className="text-xs text-red-600 hover:underline">Revogar</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Auditoria */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2"><Eye className="w-4 h-4 text-sky-600" /> Trilha de auditoria</h3>
                  <button onClick={() => loadDetail(selected)} className="text-gray-400 hover:text-gray-600"><RefreshCw className="w-4 h-4" /></button>
                </div>
                {logs.length === 0 ? (
                  <p className="text-sm text-gray-400">Nenhuma ação registrada ainda.</p>
                ) : (
                  <div className="space-y-1.5 max-h-72 overflow-y-auto">
                    {logs.map((l) => {
                      const a = ACAO_LABEL[l.acao] || { txt: l.acao, cor: 'text-gray-600 bg-gray-100' }
                      return (
                        <div key={l.id} className="flex items-center gap-3 text-sm py-1.5">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${a.cor}`}>{a.txt}</span>
                          <span className="text-gray-600">{l.entidade}</span>
                          <span className="text-xs text-gray-400 ml-auto">
                            {l.createdAt ? new Date(l.createdAt).toLocaleString('pt-BR') : ''} {l.ip ? `· ${l.ip}` : ''}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Zona de perigo — direito ao esquecimento */}
              <div className="bg-white rounded-2xl border border-red-200 p-5">
                <h3 className="font-semibold flex items-center gap-2 text-red-700 mb-1">
                  <AlertTriangle className="w-4 h-4" /> Direito ao esquecimento
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Elimina permanentemente TODOS os dados do titular. Ação irreversível. O registro legal da eliminação é preservado.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={eraseConfirm} onChange={(e) => setEraseConfirm(e.target.value)}
                    placeholder={`Digite "${selected.nome}" para confirmar`}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <button
                    onClick={eraseData}
                    disabled={eraseConfirm !== selected.nome || busy}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" /> {busy ? 'Eliminando...' : 'Eliminar dados'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
