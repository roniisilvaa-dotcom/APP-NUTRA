import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PricingPlans from '../components/PricingPlans'

export const metadata = {
  title: 'Planos — NUTRA',
  description: 'Planos do NUTRA a partir de R$790/mês. Mensal ou anual, sem fidelidade.',
}

export default function PricingPage() {
  return (
    <div className="lux-mesh relative min-h-screen overflow-x-hidden" style={{ color: '#F2EFE6' }}>
      <div className="lux-grid absolute inset-0" />
      <div className="relative z-10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ borderColor: '#D4AF3755', background: 'linear-gradient(160deg,#0E1F18,#07110D)' }}>
              <span className="font-serif-display text-lg font-bold lux-gold-text">N</span>
            </div>
            <span className="font-serif-display text-xl font-semibold tracking-tight">NUTRA</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm" style={{ color: '#9DB3AA' }}>
            <ArrowLeft className="h-4 w-4" /> Início
          </Link>
        </nav>

        <header className="mx-auto max-w-3xl px-6 pt-10 pb-4 text-center">
          <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#10B981' }}>Planos</div>
          <h1 className="mt-3 font-serif-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-tight tracking-tight">
            Investimento à altura <span className="lux-gold-text">da sua clínica.</span>
          </h1>
          <p className="mt-3 text-lg" style={{ color: '#9DB3AA' }}>A partir de R$790/mês. Sem fidelidade, cancele quando quiser.</p>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-24">
          <PricingPlans />
        </main>
      </div>
    </div>
  )
}
