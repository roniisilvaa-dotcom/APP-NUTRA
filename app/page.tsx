import Link from 'next/link'
import { Leaf, Check, Zap, Shield, Brain, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-emerald-950" />
          </div>
          <span className="font-bold text-lg">NUTRA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <Link href="/pricing" className="hover:text-white transition">Planos</Link>
          <Link href="#features" className="hover:text-white transition">Funcionalidades</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-white/70 hover:text-white text-sm transition">Entrar</Link>
          <Link
            href="/register"
            className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-4 py-1.5 text-emerald-300 text-sm mb-8">
          <Zap className="w-3.5 h-3.5" />
          Sistema de Apoio Clínico de Precisão
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
          Nutrição clínica de{' '}
          <span className="text-emerald-400">alto padrão</span>{' '}
          para médicos nutrólogos
        </h1>
        <p className="text-emerald-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Gerencie pacientes, protocolos de suplementação, agenda e acompanhamento de evolução
          — tudo em uma plataforma desenhada para a medicina de precisão.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition w-full sm:w-auto text-center"
          >
            Criar conta gratuita
          </Link>
          <Link
            href="/pricing"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg transition w-full sm:w-auto text-center"
          >
            Ver planos →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Tudo que sua clínica precisa</h2>
        <p className="text-emerald-300 text-center mb-16">Uma plataforma completa, do médico ao paciente.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: 'Gestão de Pacientes',
              desc: 'Cadastro completo, histórico clínico, status de adesão e alertas automáticos para pacientes em risco.',
            },
            {
              icon: Brain,
              title: 'IA Clínica (Gemini)',
              desc: 'Análise inteligente de correlações entre biomarcadores, sugestões de protocolo e insights baseados em evidências.',
            },
            {
              icon: Shield,
              title: 'Protocolos de Precisão',
              desc: 'Monte protocolos de suplementação, plano alimentar e prescrição de exercícios com total controle clínico.',
            },
            {
              icon: Zap,
              title: 'App do Paciente',
              desc: 'O paciente registra diário, acompanha evolução de peso, adesão a suplementos e se comunica com o médico.',
            },
            {
              icon: Check,
              title: 'Agenda Integrada',
              desc: 'Gestão de consultas presenciais e online, com visão semanal e notificações automáticas.',
            },
            {
              icon: Leaf,
              title: 'Relatórios & Gráficos',
              desc: 'Evolução de peso, adesão semanal, correlações de biomarcadores — tudo em gráficos interativos.',
            },
          ].map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-400/30 transition">
                <div className="w-10 h-10 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Pronto para elevar sua clínica?</h2>
          <p className="text-emerald-200 mb-8">
            Comece gratuitamente. Sem cartão de crédito. Sem burocracia.
          </p>
          <Link
            href="/register"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-10 py-4 rounded-xl text-lg transition"
          >
            Começar agora →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/30 text-sm">
        © 2025 NUTRA — Medicina Nutricional de Precisão · Todos os direitos reservados
      </footer>
    </div>
  )
}
