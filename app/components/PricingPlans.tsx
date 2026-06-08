'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const gold = '#D4AF37'
const emerald = '#10B981'
const cream = '#F2EFE6'

type Cycle = 'mensal' | 'anual'

interface Plan {
  name: string
  desc: string
  monthly: number
  annual: number // total cobrado no ano (12x o mensal)
  feats: string[]
  cta: string
  hot: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Essencial',
    desc: 'Para o consultório individual',
    monthly: 790,
    annual: 9480,
    feats: ['Até 50 pacientes', 'Antropometria e cálculos', 'App do paciente', 'Protocolos e prontuário', 'Centro de dados LGPD'],
    cta: 'Começar agora',
    hot: false,
  },
  {
    name: 'Clínica',
    desc: 'Para clínicas em crescimento',
    monthly: 1490,
    annual: 17880,
    feats: ['Pacientes ilimitados', 'IA clínica NUTRA CA.RO', 'Chat médico-paciente', 'Relatórios PDF · Agenda', 'Até 5 profissionais', 'Suporte prioritário'],
    cta: 'Assinar Clínica',
    hot: true,
  },
  {
    name: 'Elite',
    desc: 'Para grupos e grandes clínicas',
    monthly: 2900,
    annual: 34800,
    feats: ['Tudo do Clínica', 'Profissionais ilimitados', 'API de integração', 'White-label', 'Onboarding dedicado', 'Suporte 24/7 · SLA'],
    cta: 'Falar com vendas',
    hot: false,
  },
]

const fmt = (n: number) => n.toLocaleString('pt-BR')

export default function PricingPlans() {
  const [cycle, setCycle] = useState<Cycle>('mensal')

  return (
    <div>
      {/* Toggle */}
      <div className="mb-12 flex items-center justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border p-1" style={{ borderColor: '#ffffff1A', background: '#ffffff06' }}>
          {(['mensal', 'anual'] as Cycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className="relative rounded-full px-5 py-2 text-sm font-semibold transition"
              style={cycle === c
                ? { background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D' }
                : { color: '#9DB3AA' }}
            >
              {c === 'mensal' ? 'Mensal' : 'Anual'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-end gap-6 md:grid-cols-3">
        {PLANS.map((p) => {
          const precoMes = cycle === 'mensal' ? p.monthly : Math.round(p.annual / 12)
          return (
            <div
              key={p.name}
              className="lux-glass relative rounded-3xl p-7"
              style={{
                borderColor: p.hot ? '#D4AF3766' : undefined,
                boxShadow: p.hot ? '0 40px 80px -30px rgba(212,175,55,0.35)' : undefined,
                transform: p.hot ? 'scale(1.04)' : undefined,
                background: p.hot ? 'linear-gradient(160deg, rgba(212,175,55,0.08), rgba(255,255,255,0.02))' : undefined,
              }}
            >
              {p.hot && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono-data text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D' }}>
                  Mais popular
                </div>
              )}
              <h3 className="font-serif-display text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm" style={{ color: '#7FA595' }}>{p.desc}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="mb-1.5 text-lg font-semibold" style={{ color: '#7FA595' }}>R$</span>
                <span className={`font-serif-display text-5xl font-semibold leading-none ${p.hot ? 'lux-gold-text' : ''}`}>{fmt(precoMes)}</span>
                <span className="mb-1.5 text-sm" style={{ color: '#7FA595' }}>/mês</span>
              </div>
              <div className="mt-1.5 h-5 text-xs" style={{ color: '#7FA595' }}>
                {cycle === 'anual' ? <>Cobrado R$ {fmt(p.annual)}/ano</> : <>&nbsp;</>}
              </div>

              <ul className="mt-6 space-y-2.5 text-sm">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: p.hot ? gold : emerald }} />
                    <span style={{ color: '#D6E4DD' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-7 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition hover:scale-[1.02]"
                style={p.hot
                  ? { background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D' }
                  : { border: '1px solid #ffffff22', color: cream }}
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-center font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6E857B' }}>
        Sem fidelidade · cancele quando quiser · suporte especializado
      </p>
    </div>
  )
}
