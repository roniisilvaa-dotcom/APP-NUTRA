'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Check, Zap, Building2 } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 'R$0',
    period: '/mês',
    icon: Leaf,
    color: 'emerald',
    description: 'Para começar e testar a plataforma',
    cta: 'Começar grátis',
    features: [
      'Até 3 pacientes ativos',
      'Dashboard básico',
      'Protocolos de suplementação',
      'App do paciente',
    ],
    disabled: ['IA clínica', 'Chat ilimitado', 'Relatórios avançados', 'Suporte prioritário'],
  },
  {
    id: 'clinica',
    name: 'Clínica',
    price: 'R$397',
    period: '/mês',
    icon: Building2,
    color: 'teal',
    badge: 'Mais popular',
    description: 'Para clínicas e consultórios em crescimento',
    cta: 'Assinar Clínica',
    features: [
      'Até 30 pacientes ativos',
      'Dashboard completo',
      'IA clínica (Gemini)',
      'Chat médico-paciente',
      'Relatórios PDF',
      'Agenda de consultas',
      'Até 3 médicos',
      'Suporte por email',
    ],
    disabled: [],
  },
  {
    id: 'advanced',
    name: 'CLI Advanced',
    price: 'R$797',
    period: '/mês',
    icon: Zap,
    color: 'violet',
    description: 'Para grandes clínicas e grupos médicos',
    cta: 'Assinar Advanced',
    features: [
      'Pacientes ilimitados',
      'Tudo do Clínica',
      'Médicos ilimitados',
      'API de integração',
      'White-label',
      'Onboarding dedicado',
      'Suporte 24/7',
      'SLA garantido',
    ],
    disabled: [],
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function subscribe(planId: string) {
    if (planId === 'free') {
      router.push('/register')
      return
    }
    setLoading(planId)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planId }),
    })
    const data = await res.json()
    if (res.status === 401) {
      router.push('/login')
      return
    }
    if (data.url) window.location.href = data.url
    setLoading(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-emerald-950" />
          </div>
          <span className="text-white font-bold text-lg">NUTRA</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-white/60 hover:text-white text-sm transition">Entrar</Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            Criar conta
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Planos para cada tamanho de clínica
          </h1>
          <p className="text-emerald-300 text-lg max-w-2xl mx-auto">
            Comece gratuitamente. Escale conforme cresce. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isPopular = !!plan.badge
            return (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur border rounded-2xl p-8 flex flex-col ${
                  isPopular ? 'border-teal-400 ring-1 ring-teal-400' : 'border-white/10'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal-400 text-teal-950 text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-${plan.color}-400/20 flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 text-${plan.color}-400`} />
                  </div>
                  <h2 className="text-white text-xl font-bold">{plan.name}</h2>
                  <p className="text-white/50 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-white/80 text-sm">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.disabled.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-white/25 text-sm line-through">
                      <Check className="w-4 h-4 text-white/20 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => subscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50 ${
                    isPopular
                      ? 'bg-teal-400 hover:bg-teal-300 text-teal-950'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {loading === plan.id ? 'Redirecionando...' : plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-white/30 text-sm mt-12">
          Pagamento seguro via Stripe · Cancele quando quiser · Sem fidelidade
        </p>
      </div>
    </div>
  )
}
