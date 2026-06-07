'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Ruler, ArrowLeft, Save, Activity, Flame, Droplets, Scale, TrendingUp } from 'lucide-react'
import {
  avaliacaoCompleta, FATORES_ATIVIDADE, type Sexo, type NivelAtividade, type Dobras,
} from '@/lib/clinical/calculations'

interface Patient { id: number; nome: string; idade?: number | null; genero?: string | null }

const DOBRAS_P7: { key: keyof Dobras; label: string }[] = [
  { key: 'peitoral', label: 'Peitoral' },
  { key: 'axilarMedia', label: 'Axilar média' },
  { key: 'triceps', label: 'Tríceps' },
  { key: 'subescapular', label: 'Subescapular' },
  { key: 'abdominal', label: 'Abdominal' },
  { key: 'suprailiaca', label: 'Suprailíaca' },
  { key: 'coxa', label: 'Coxa' },
]

const CIRC: { key: string; label: string }[] = [
  { key: 'pescoco', label: 'Pescoço' }, { key: 'torax', label: 'Tórax' },
  { key: 'cintura', label: 'Cintura' }, { key: 'abdomen', label: 'Abdômen' },
  { key: 'quadril', label: 'Quadril' }, { key: 'bracoContraido', label: 'Braço' },
  { key: 'coxa', label: 'Coxa' }, { key: 'panturrilha', label: 'Panturrilha' },
]

export default function AntropometriaPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [pid, setPid] = useState<number | null>(null)
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState<Sexo>('masculino')
  const [nivel, setNivel] = useState<NivelAtividade>('moderado')
  const [dobras, setDobras] = useState<Record<string, string>>({})
  const [circ, setCirc] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch('/api/patients').then((r) => r.json()).then((d) => setPatients(d.patients || []))
  }, [])

  const onSelectPatient = (id: number) => {
    setPid(id)
    const p = patients.find((x) => x.id === id)
    if (p?.idade) setIdade(String(p.idade))
    if (p?.genero) setSexo(p.genero.toLowerCase().startsWith('f') ? 'feminino' : 'masculino')
  }

  const num = (s: string) => (s === '' ? undefined : Number(s))
  const dobrasNum = useMemo(() => {
    const o: Dobras = {}
    for (const k in dobras) if (dobras[k]) (o as Record<string, number>)[k] = Number(dobras[k])
    return o
  }, [dobras])

  const result = useMemo(() => {
    const p = num(peso), a = num(altura), i = num(idade)
    if (!p || !a || !i) return null
    return avaliacaoCompleta({
      peso: p, altura: a, idade: i, sexo, nivelAtividade: nivel,
      dobras: Object.keys(dobrasNum).length ? dobrasNum : undefined,
      protocoloDobras: 'pollock7',
      cintura: num(circ.cintura), quadril: num(circ.quadril),
    })
  }, [peso, altura, idade, sexo, nivel, dobrasNum, circ])

  const save = async () => {
    if (!pid || !result) return
    setBusy(true)
    const res = await fetch('/api/anthropometry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: pid, data: new Date().toISOString().slice(0, 10),
        peso: num(peso), altura: num(altura), idade: num(idade), sexo,
        dobras: dobrasNum, protocoloDobras: 'pollock7',
        circunferencias: Object.fromEntries(Object.entries(circ).filter(([, v]) => v).map(([k, v]) => [k, Number(v)])),
      }),
    })
    setBusy(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-gray-800">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="p-2 rounded-xl bg-indigo-50"><Ruler className="w-6 h-6 text-indigo-600" /></div>
          <div>
            <h1 className="text-lg font-bold">Avaliação Antropométrica</h1>
            <p className="text-xs text-gray-500">Composição corporal · Cálculo energético · Protocolo Pollock 7 dobras</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Formulário */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold mb-4">Dados básicos</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Paciente" full>
                <select value={pid ?? ''} onChange={(e) => onSelectPatient(Number(e.target.value))} className="inp">
                  <option value="">Selecione...</option>
                  {patients.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </Field>
              <Field label="Peso (kg)"><input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} className="inp" /></Field>
              <Field label="Altura (cm)"><input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} className="inp" /></Field>
              <Field label="Idade"><input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} className="inp" /></Field>
              <Field label="Sexo">
                <select value={sexo} onChange={(e) => setSexo(e.target.value as Sexo)} className="inp">
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </Field>
              <Field label="Nível de atividade" full>
                <select value={nivel} onChange={(e) => setNivel(e.target.value as NivelAtividade)} className="inp">
                  {Object.entries(FATORES_ATIVIDADE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </Field>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold mb-1">Dobras cutâneas (mm)</h2>
            <p className="text-xs text-gray-500 mb-4">Protocolo Jackson & Pollock — 7 dobras</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DOBRAS_P7.map((d) => (
                <Field key={d.key} label={d.label}>
                  <input type="number" value={dobras[d.key] ?? ''} onChange={(e) => setDobras((p) => ({ ...p, [d.key]: e.target.value }))} className="inp" />
                </Field>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold mb-4">Circunferências (cm)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CIRC.map((c) => (
                <Field key={c.key} label={c.label}>
                  <input type="number" value={circ[c.key] ?? ''} onChange={(e) => setCirc((p) => ({ ...p, [c.key]: e.target.value }))} className="inp" />
                </Field>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados ao vivo */}
        <aside className="space-y-4 lg:sticky lg:top-6 h-fit">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Resultados</h2>
            {!result ? (
              <p className="text-indigo-100 text-sm">Preencha peso, altura e idade para ver os cálculos.</p>
            ) : (
              <div className="space-y-3">
                <Metric icon={<Scale className="w-4 h-4" />} label="IMC" value={`${result.imc}`} sub={result.imcClasse.classe} />
                {result.percentualGordura != null && (
                  <>
                    <Metric icon={<Activity className="w-4 h-4" />} label="% Gordura" value={`${result.percentualGordura}%`} sub={result.gorduraClasse?.classe} />
                    <Metric label="Massa magra" value={`${result.massaMagra} kg`} />
                    <Metric label="Massa gorda" value={`${result.massaGorda} kg`} />
                  </>
                )}
                <div className="h-px bg-white/20 my-1" />
                <Metric icon={<Flame className="w-4 h-4" />} label="TMB (Mifflin)" value={`${result.tmbMifflin} kcal`} sub={`Harris-Benedict: ${result.tmbHarris}`} />
                <Metric label="GET estimado" value={`${result.getModerado} kcal`} sub={FATORES_ATIVIDADE[nivel].label} />
                <Metric icon={<Droplets className="w-4 h-4" />} label="Água recomendada" value={`${(result.aguaMl / 1000).toFixed(1)} L`} />
                {result.rcq != null && <Metric label="Cintura/Quadril" value={`${result.rcq}`} sub={result.rcqClasse?.classe} />}
                <Metric label="Peso ideal" value={`${result.pesoIdeal.min}–${result.pesoIdeal.max} kg`} />
              </div>
            )}
          </div>

          <button
            onClick={save} disabled={!pid || !result || busy}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium disabled:opacity-40 hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4" /> {busy ? 'Salvando...' : saved ? 'Salvo ✓' : 'Salvar avaliação'}
          </button>
          {!pid && <p className="text-xs text-center text-gray-400">Selecione um paciente para salvar.</p>}
        </aside>
      </main>

      <style jsx global>{`
        .inp { width:100%; padding:0.5rem 0.75rem; font-size:0.875rem; border:1px solid #e5e7eb; border-radius:0.5rem; outline:none; }
        .inp:focus { box-shadow:0 0 0 2px #c7d2fe; border-color:#a5b4fc; }
      `}</style>
    </div>
  )
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-xs font-medium text-gray-500 mb-1 block">{label}</span>
      {children}
    </label>
  )
}

function Metric({ icon, label, value, sub }: { icon?: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-indigo-100 flex items-center gap-1.5">{icon}{label}</span>
      <span className="text-right">
        <span className="font-semibold">{value}</span>
        {sub && <span className="block text-[11px] text-indigo-200">{sub}</span>}
      </span>
    </div>
  )
}
