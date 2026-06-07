import Link from 'next/link'
import {
  Activity, Shield, Brain, Ruler, ArrowRight, Check, Lock,
  FlaskConical, LineChart, Sparkles, FileClock, Stethoscope,
} from 'lucide-react'

export const metadata = {
  title: 'NUTRA — Medicina Nutricional de Precisão',
  description:
    'A plataforma clínica mais completa para nutrólogos e nutricionistas. Antropometria de precisão, cálculo energético, IA clínica e controle de dados em conformidade total com a LGPD.',
}

const ink = '#0E2A22'

export default function LandingPage() {
  return (
    <div className="lp-grain relative min-h-screen overflow-x-hidden" style={{ background: '#FAF7F0', color: ink }}>
      {/* Atmosfera de fundo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full opacity-30 blur-[120px]" style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }} />
        <div className="absolute top-[60%] -left-40 h-[420px] w-[420px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #C9A227, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* ===== NAV ===== */}
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: ink }}>
              <span className="font-serif-display text-lg font-bold text-[#FAF7F0]">N</span>
            </div>
            <span className="font-serif-display text-xl font-semibold tracking-tight">NUTRA</span>
          </div>
          <div className="hidden items-center gap-9 text-sm md:flex" style={{ color: '#3B5249' }}>
            <a href="#plataforma" className="transition hover:opacity-60">Plataforma</a>
            <a href="#dados" className="transition hover:opacity-60">Controle de dados</a>
            <Link href="/pricing" className="transition hover:opacity-60">Planos</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm transition hover:opacity-60" style={{ color: '#3B5249' }}>Entrar</Link>
            <Link href="/register" className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#FAF7F0] transition hover:scale-[1.03]" style={{ background: ink }}>
              Começar grátis
            </Link>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
          <div>
            <div className="lp-up d1 mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: '#1F4A3A33', color: '#1F4A3A' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#10B981', animation: 'lpPulse 2s infinite' }} />
              Sistema de apoio clínico de precisão
            </div>
            <h1 className="lp-up d2 font-serif-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              A nutrição clínica
              <br />
              <span className="italic" style={{ color: '#0F7857' }}>como ciência</span>,
              <br />
              não como planilha.
            </h1>
            <p className="lp-up d3 mt-7 max-w-md text-lg leading-relaxed" style={{ color: '#3B5249' }}>
              Antropometria de precisão, cálculo energético validado, IA clínica e o controle de dados mais rigoroso do mercado — em uma única plataforma para nutrólogos e nutricionistas.
            </p>
            <div className="lp-up d4 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-[#FAF7F0] transition hover:scale-[1.03]" style={{ background: ink }}>
                Criar conta gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#plataforma" className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-base font-semibold transition hover:bg-black/[0.03]" style={{ borderColor: '#1F4A3A33', color: ink }}>
                Ver a plataforma
              </Link>
            </div>
            <div className="lp-up d5 mt-8 flex items-center gap-6 font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: '#0F7857' }} /> Sem cartão</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" style={{ color: '#0F7857' }} /> LGPD nativo</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: '#0F7857' }} /> Dados no Brasil</span>
            </div>
          </div>

          {/* Prévia do produto — card de avaliação */}
          <div className="lp-in d4 relative">
            <div className="lp-float relative rounded-3xl border bg-white p-6 shadow-[0_30px_80px_-20px_rgba(14,42,34,0.35)]" style={{ borderColor: '#0E2A2215' }}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#6B7E76' }}>Avaliação · composição corporal</div>
                  <div className="font-serif-display text-xl font-semibold">Ana Costa</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: '#0F785712' }}>
                  <Ruler className="h-5 w-5" style={{ color: '#0F7857' }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: 'IMC', v: '22.4', s: 'Normal' },
                  { l: '% Gordura', v: '24.1', s: 'Fitness' },
                  { l: 'TMB', v: '1.412', s: 'kcal' },
                  { l: 'Massa magra', v: '46.8', s: 'kg' },
                  { l: 'GET', v: '2.189', s: 'kcal' },
                  { l: 'Água', v: '2.3', s: 'litros' },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl border p-3" style={{ borderColor: '#0E2A2210' }}>
                    <div className="font-mono-data text-[9px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>{m.l}</div>
                    <div className="font-serif-display text-2xl font-semibold leading-tight">{m.v}</div>
                    <div className="text-[10px]" style={{ color: '#0F7857' }}>{m.s}</div>
                  </div>
                ))}
              </div>
              {/* mini gráfico */}
              <div className="mt-5 rounded-xl border p-4" style={{ borderColor: '#0E2A2210' }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono-data text-[10px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>Evolução de peso</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: '#0F7857' }}><LineChart className="h-3 w-3" /> −6,2 kg</span>
                </div>
                <svg viewBox="0 0 280 60" className="h-14 w-full" fill="none">
                  <polyline points="0,12 47,20 93,18 140,32 187,38 233,46 280,52" stroke="#0F7857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'lpDraw 2s ease 0.6s forwards' }} />
                </svg>
              </div>
            </div>
            {/* selo flutuante */}
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-xl sm:flex" style={{ borderColor: '#0E2A2215' }}>
              <Shield className="h-5 w-5" style={{ color: '#C9A227' }} />
              <div>
                <div className="text-xs font-semibold">Auditoria ativa</div>
                <div className="font-mono-data text-[9px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>Cada acesso registrado</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAIXA DE CONFIANÇA ===== */}
        <section className="border-y" style={{ borderColor: '#0E2A2212', background: ink }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4" style={{ background: '#ffffff10' }}>
            {[
              { n: '4', l: 'protocolos de TMB' },
              { n: '7', l: 'dobras · Pollock' },
              { n: '100%', l: 'conformidade LGPD' },
              { n: '∞', l: 'pacientes e dados' },
            ].map((s) => (
              <div key={s.l} className="px-6 py-8 text-center" style={{ background: ink }}>
                <div className="font-serif-display text-4xl font-semibold text-[#FAF7F0]">{s.n}</div>
                <div className="mt-1 font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#7FA595' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PLATAFORMA / FEATURES ===== */}
        <section id="plataforma" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#0F7857' }}>A plataforma</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight">
              Tudo que a clínica de elite precisa — sem remendos.
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#3B5249' }}>
              Cada módulo construído sobre fórmulas validadas e dados que você controla por completo.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Ruler, title: 'Antropometria de precisão', desc: 'Dobras cutâneas (Pollock 7/3), circunferências, composição corporal e relação cintura-quadril com cálculo automático ao vivo.' },
              { icon: FlaskConical, title: 'Cálculo energético validado', desc: 'TMB por Mifflin, Harris-Benedict, Cunningham e Tinsley. GET com fator de atividade e ajuste por objetivo.' },
              { icon: Brain, title: 'IA clínica', desc: 'Análise de correlações entre biomarcadores, leitura de exames e sugestão de condutas baseadas em evidência.' },
              { icon: Stethoscope, title: 'Prontuário & protocolos', desc: 'Anamnese, recordatório, plano alimentar, suplementação e prescrição de exercícios num histórico único.' },
              { icon: Activity, title: 'App do paciente', desc: 'Diário alimentar, hidratação, evolução de peso e canal direto com o profissional — engajamento contínuo.' },
              { icon: LineChart, title: 'Relatórios & evolução', desc: 'Gráficos de adesão, peso e biomarcadores. Decisões clínicas guiadas por dados, não por achismo.' },
            ].map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="group rounded-2xl border bg-white/70 p-7 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(14,42,34,0.3)]" style={{ borderColor: '#0E2A2215' }}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-110" style={{ background: '#0F785710' }}>
                    <Icon className="h-5 w-5" style={{ color: '#0F7857' }} />
                  </div>
                  <h3 className="font-serif-display text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3B5249' }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ===== CONTROLE DE DADOS (diferencial) ===== */}
        <section id="dados" className="relative overflow-hidden" style={{ background: ink }}>
          <div className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #C9A227, transparent 70%)' }} />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
            <div>
              <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#C9A227' }}>Controle de dados</div>
              <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-tight text-[#FAF7F0]">
                Dados clínicos são sagrados. Tratamos como tal.
              </h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: '#A9C2B8' }}>
                Enquanto os outros prometem &ldquo;segurança&rdquo;, o NUTRA entrega controle real — em conformidade total com a LGPD e visível para você a cada clique.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: FileClock, t: 'Trilha de auditoria completa', d: 'Cada visualização, alteração e exportação é registrada com autor, data e IP.' },
                  { icon: Shield, t: 'Direito ao esquecimento', d: 'Eliminação definitiva dos dados do titular sob demanda, com registro legal preservado.' },
                  { icon: Lock, t: 'Portabilidade total', d: 'Exporte todos os dados de um paciente em um clique — do jeito que a LGPD exige.' },
                ].map((i) => {
                  const Icon = i.icon
                  return (
                    <div key={i.t} className="flex gap-4">
                      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: '#C9A22718' }}>
                        <Icon className="h-4 w-4" style={{ color: '#C9A227' }} />
                      </div>
                      <div>
                        <div className="font-semibold text-[#FAF7F0]">{i.t}</div>
                        <div className="text-sm" style={{ color: '#8FA89D' }}>{i.d}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* mock do log de auditoria */}
            <div className="rounded-3xl border bg-[#0A211B] p-6 shadow-2xl" style={{ borderColor: '#ffffff12' }}>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#7FA595' }}>Trilha de auditoria · ao vivo</span>
                <span className="flex items-center gap-1.5 font-mono-data text-[10px]" style={{ color: '#10B981' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: 'lpPulse 1.5s infinite' }} /> REC
                </span>
              </div>
              <div className="space-y-2.5 font-mono-data text-xs">
                {[
                  { a: 'EXPORT', c: '#C9A227', e: 'paciente · Ana Costa', t: '14:32' },
                  { a: 'UPDATE', c: '#F59E0B', e: 'antropometria #214', t: '14:30' },
                  { a: 'VIEW', c: '#38BDF8', e: 'exame laboratorial', t: '14:28' },
                  { a: 'CONSENT', c: '#10B981', e: 'tratamento de dados', t: '14:21' },
                  { a: 'CREATE', c: '#10B981', e: 'plano alimentar #88', t: '14:15' },
                ].map((l, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: '#ffffff06' }}>
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ color: l.c, background: `${l.c}1A` }}>{l.a}</span>
                    <span style={{ color: '#A9C2B8' }}>{l.e}</span>
                    <span className="ml-auto" style={{ color: '#5C746A' }}>{l.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="mx-auto max-w-4xl px-6 py-28 text-center">
          <Sparkles className="mx-auto mb-6 h-7 w-7" style={{ color: '#C9A227' }} />
          <h2 className="font-serif-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-tight tracking-tight">
            Eleve sua clínica ao
            <br /><span className="italic" style={{ color: '#0F7857' }}>padrão de precisão.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg" style={{ color: '#3B5249' }}>
            Comece gratuitamente hoje. Sem cartão de crédito, sem burocracia — só medicina nutricional de verdade.
          </p>
          <Link href="/register" className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-base font-semibold text-[#FAF7F0] transition hover:scale-[1.03]" style={{ background: ink }}>
            Criar conta gratuita
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t" style={{ borderColor: '#0E2A2212' }}>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: ink }}>
                <span className="font-serif-display text-sm font-bold text-[#FAF7F0]">N</span>
              </div>
              <span className="font-serif-display text-lg font-semibold">NUTRA</span>
            </div>
            <p className="font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>
              © 2026 NUTRA · Medicina Nutricional de Precisão
            </p>
            <div className="flex gap-6 text-sm" style={{ color: '#3B5249' }}>
              <Link href="/login" className="transition hover:opacity-60">Entrar</Link>
              <Link href="/pricing" className="transition hover:opacity-60">Planos</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
