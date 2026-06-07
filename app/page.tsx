import Link from 'next/link'
import {
  Activity, Shield, Brain, Ruler, ArrowRight, Check, X, Lock,
  FlaskConical, LineChart, Sparkles, FileClock, Stethoscope,
  Clock, TrendingUp, Star, Quote, Zap, HeartPulse, ChevronDown,
} from 'lucide-react'

export const metadata = {
  title: 'NUTRA — Medicina Nutricional de Precisão para Nutrólogos',
  description:
    'A plataforma clínica que transforma sua consulta em ciência. Antropometria de precisão, cálculo energético, IA clínica e controle de dados LGPD. Comece grátis, sem cartão.',
}

const ink = '#0E2A22'

export default function LandingPage() {
  return (
    <div className="lp-grain relative min-h-screen overflow-x-hidden" style={{ background: '#FAF7F0', color: ink }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full opacity-30 blur-[120px]" style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }} />
        <div className="absolute top-[55%] -left-40 h-[420px] w-[420px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #C9A227, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* ===== NAV ===== */}
        <nav className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ borderColor: '#0E2A2212', background: '#FAF7F0CC' }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: ink }}>
                <span className="font-serif-display text-lg font-bold text-[#FAF7F0]">N</span>
              </div>
              <span className="font-serif-display text-xl font-semibold tracking-tight">NUTRA</span>
            </div>
            <div className="hidden items-center gap-9 text-sm md:flex" style={{ color: '#3B5249' }}>
              <a href="#plataforma" className="transition hover:opacity-60">Plataforma</a>
              <a href="#como" className="transition hover:opacity-60">Como funciona</a>
              <a href="#planos" className="transition hover:opacity-60">Planos</a>
              <a href="#faq" className="transition hover:opacity-60">Dúvidas</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden text-sm transition hover:opacity-60 sm:block" style={{ color: '#3B5249' }}>Entrar</Link>
              <Link href="/register" className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#FAF7F0] transition hover:scale-[1.03]" style={{ background: ink }}>
                Começar grátis
              </Link>
            </div>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div>
            <div className="lp-up d1 mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: '#1F4A3A33', color: '#1F4A3A' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#10B981', animation: 'lpPulse 2s infinite' }} />
              Sistema de apoio clínico de precisão
            </div>
            <h1 className="lp-up d2 font-serif-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              Dobre o valor da sua consulta —
              <span className="italic" style={{ color: '#0F7857' }}> sem trabalhar mais</span>.
            </h1>
            <p className="lp-up d3 mt-6 max-w-md text-lg leading-relaxed" style={{ color: '#3B5249' }}>
              O NUTRA reúne antropometria, cálculo energético, IA clínica e o app do paciente numa só plataforma. Você atende com precisão de elite e o paciente sente a diferença na primeira consulta.
            </p>
            <div className="lp-up d4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-[#FAF7F0] transition hover:scale-[1.03]" style={{ background: ink }}>
                Começar grátis agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#planos" className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-base font-semibold transition hover:bg-black/[0.03]" style={{ borderColor: '#1F4A3A33', color: ink }}>
                Ver planos
              </a>
            </div>
            <div className="lp-up d5 mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: '#0F7857' }} /> Grátis para começar</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: '#0F7857' }} /> Sem cartão</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" style={{ color: '#0F7857' }} /> Dados no Brasil · LGPD</span>
            </div>
          </div>

          {/* Prévia do produto */}
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
              <div className="mt-5 rounded-xl border p-4" style={{ borderColor: '#0E2A2210' }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono-data text-[10px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>Evolução de peso</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: '#0F7857' }}><LineChart className="h-3 w-3" /> −6,2 kg em 90 dias</span>
                </div>
                <svg viewBox="0 0 280 60" className="h-14 w-full" fill="none">
                  <polyline points="0,12 47,20 93,18 140,32 187,38 233,46 280,52" stroke="#0F7857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'lpDraw 2s ease 0.6s forwards' }} />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-xl sm:flex" style={{ borderColor: '#0E2A2215' }}>
              <Shield className="h-5 w-5" style={{ color: '#C9A227' }} />
              <div>
                <div className="text-xs font-semibold">Auditoria ativa</div>
                <div className="font-mono-data text-[9px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>Cada acesso registrado</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAIXA DE PROVA ===== */}
        <section className="border-y" style={{ borderColor: '#0E2A2212', background: ink }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4" style={{ background: '#ffffff10' }}>
            {[
              { n: '+38%', l: 'percepção de valor da consulta' },
              { n: '5 min', l: 'avaliação completa, não 30' },
              { n: '4', l: 'protocolos de TMB validados' },
              { n: '100%', l: 'conformidade LGPD' },
            ].map((s) => (
              <div key={s.l} className="px-6 py-8 text-center" style={{ background: ink }}>
                <div className="font-serif-display text-3xl font-semibold text-[#FAF7F0] sm:text-4xl">{s.n}</div>
                <div className="mt-1 font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#7FA595' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DOR ===== */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#B0392F' }}>O problema</div>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
            Você é um clínico de excelência preso a ferramentas de amador.
          </h2>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-3">
            {[
              { t: 'Planilhas que se perdem', d: 'Dados do paciente espalhados em Excel, papel e WhatsApp. Retrabalho a cada consulta.' },
              { t: 'Cálculos manuais e lentos', d: 'TMB, % de gordura e macros feitos na calculadora — sujeitos a erro e tempo perdido.' },
              { t: 'Paciente que some', d: 'Sem app, sem acompanhamento entre consultas. A adesão cai e os resultados também.' },
            ].map((p) => (
              <div key={p.t} className="rounded-2xl border bg-white/60 p-6" style={{ borderColor: '#B0392F22' }}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: '#B0392F12' }}>
                  <X className="h-5 w-5" style={{ color: '#B0392F' }} />
                </div>
                <h3 className="font-serif-display text-lg font-semibold">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: '#3B5249' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PLATAFORMA / SOLUÇÃO ===== */}
        <section id="plataforma" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-14 max-w-2xl">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#0F7857' }}>A solução</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight">
              Uma plataforma. Toda a sua clínica. Zero remendos.
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#3B5249' }}>
              Cada módulo construído sobre fórmulas validadas — para você decidir com dados, não com achismo.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Ruler, title: 'Antropometria de precisão', desc: 'Dobras (Pollock 7/3), circunferências e composição corporal com cálculo automático ao vivo.' },
              { icon: FlaskConical, title: 'Cálculo energético validado', desc: 'TMB por Mifflin, Harris-Benedict, Cunningham e Tinsley. GET e macros num clique.' },
              { icon: Brain, title: 'IA clínica', desc: 'Correlação de biomarcadores, leitura de exames e sugestão de condutas baseadas em evidência.' },
              { icon: Stethoscope, title: 'Prontuário & protocolos', desc: 'Anamnese, plano alimentar, suplementação e exercícios num histórico clínico único.' },
              { icon: Activity, title: 'App do paciente', desc: 'Diário, hidratação, evolução de peso e canal direto com você — adesão que não cai.' },
              { icon: LineChart, title: 'Relatórios & evolução', desc: 'Gráficos de adesão e biomarcadores que provam resultado e encantam o paciente.' },
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

        {/* ===== COMO FUNCIONA ===== */}
        <section id="como" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-14 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#0F7857' }}>Como funciona</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
              No ar em minutos. Não em meses.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { n: '01', icon: Zap, t: 'Crie sua conta grátis', d: 'Sem cartão, sem instalação. Você entra e já começa a cadastrar pacientes.' },
              { n: '02', icon: Ruler, t: 'Avalie com precisão', d: 'Faça a antropometria e o cálculo energético — os resultados aparecem ao vivo.' },
              { n: '03', icon: HeartPulse, t: 'Acompanhe e fidelize', d: 'O paciente recebe o app, registra o dia a dia e você vê a evolução em gráficos.' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.n} className="relative rounded-2xl border bg-white/70 p-7" style={{ borderColor: '#0E2A2215' }}>
                  <span className="font-serif-display text-5xl font-semibold" style={{ color: '#0F785725' }}>{s.n}</span>
                  <div className="mt-3 flex items-center gap-2">
                    <Icon className="h-5 w-5" style={{ color: '#0F7857' }} />
                    <h3 className="font-serif-display text-xl font-semibold">{s.t}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3B5249' }}>{s.d}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ===== CONTROLE DE DADOS ===== */}
        <section id="dados" className="relative overflow-hidden" style={{ background: ink }}>
          <div className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #C9A227, transparent 70%)' }} />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
            <div>
              <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#C9A227' }}>Controle de dados</div>
              <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-tight text-[#FAF7F0]">
                Dados clínicos são sagrados. Tratamos como tal.
              </h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: '#A9C2B8' }}>
                Enquanto os outros prometem &ldquo;segurança&rdquo;, o NUTRA entrega controle real — conformidade LGPD nativa e visível a cada clique. Um argumento de confiança que fecha pacientes.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: FileClock, t: 'Trilha de auditoria completa', d: 'Cada visualização, alteração e exportação registrada com autor, data e IP.' },
                  { icon: Shield, t: 'Direito ao esquecimento', d: 'Eliminação definitiva sob demanda, com registro legal preservado.' },
                  { icon: Lock, t: 'Portabilidade total', d: 'Exporte todos os dados de um paciente em um clique — como a LGPD exige.' },
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

        {/* ===== COMPARATIVO ===== */}
        <section className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-12 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#0F7857' }}>Por que NUTRA</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
              A diferença entre parecer e ser de elite.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: '#0E2A2215' }}>
            <div className="grid grid-cols-[1.6fr_1fr_1fr] text-sm">
              <div className="p-4" />
              <div className="p-4 text-center font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6B7E76', background: '#FAF7F0' }}>Planilhas</div>
              <div className="p-4 text-center font-serif-display text-base font-semibold text-[#FAF7F0]" style={{ background: ink }}>NUTRA</div>
              {[
                'Antropometria com cálculo automático',
                'TMB, GET e macros validados',
                'App e acompanhamento do paciente',
                'IA clínica e leitura de exames',
                'Auditoria e conformidade LGPD',
                'Visual que valoriza sua consulta',
              ].map((row, i) => (
                <div key={row} className="contents">
                  <div className="border-t p-4" style={{ borderColor: '#0E2A2210', background: i % 2 ? '#FAF7F060' : '#fff' }}>{row}</div>
                  <div className="flex items-center justify-center border-t p-4" style={{ borderColor: '#0E2A2210', background: i % 2 ? '#FAF7F060' : '#fff' }}>
                    <X className="h-4 w-4" style={{ color: '#B0392F88' }} />
                  </div>
                  <div className="flex items-center justify-center border-t p-4" style={{ borderColor: '#ffffff15', background: '#0E2A22' }}>
                    <Check className="h-4 w-4" style={{ color: '#10B981' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <div className="mb-2 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#C9A227' }} />)}
            </div>
            <h2 className="font-serif-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight">
              Quem leva a clínica a sério, leva NUTRA.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { q: 'Reduzi o tempo de avaliação pela metade e o paciente sai da consulta impressionado com o relatório.', n: 'Dra. Marina Albuquerque', r: 'Nutróloga · São Paulo' },
              { q: 'O app manteve meus pacientes engajados entre as consultas. A adesão subiu e os resultados apareceram.', n: 'Dr. Rafael Tavares', r: 'Nutrólogo · Belo Horizonte' },
              { q: 'O controle de dados em LGPD virou argumento de venda. Passa uma seriedade que nenhum concorrente tem.', n: 'Dra. Camila Reis', r: 'Nutricionista clínica · Curitiba' },
            ].map((t) => (
              <figure key={t.n} className="rounded-2xl border bg-white/70 p-7" style={{ borderColor: '#0E2A2215' }}>
                <Quote className="h-6 w-6" style={{ color: '#C9A227' }} />
                <blockquote className="mt-3 text-[15px] leading-relaxed" style={{ color: '#23362F' }}>&ldquo;{t.q}&rdquo;</blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold">{t.n}</div>
                  <div className="font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6B7E76' }}>{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ===== PLANOS ===== */}
        <section id="planos" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-14 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#0F7857' }}>Planos</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
              Comece grátis. Cresça quando quiser.
            </h2>
            <p className="mt-3 text-lg" style={{ color: '#3B5249' }}>Sem cartão para começar. Cancele quando quiser.</p>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-3">
            {[
              { name: 'Gratuito', price: 'R$0', per: '/mês', desc: 'Para testar a plataforma', feats: ['Até 3 pacientes', 'Antropometria e cálculos', 'App do paciente', 'Protocolos de suplementação'], cta: 'Começar grátis', hot: false },
              { name: 'Clínica', price: 'R$397', per: '/mês', desc: 'Para clínicas em crescimento', feats: ['Até 30 pacientes', 'IA clínica (Gemini)', 'Chat médico-paciente', 'Relatórios PDF · Agenda', 'Até 3 médicos', 'Centro de dados LGPD'], cta: 'Assinar Clínica', hot: true },
              { name: 'Advanced', price: 'R$797', per: '/mês', desc: 'Para grandes clínicas e grupos', feats: ['Pacientes ilimitados', 'Médicos ilimitados', 'API de integração', 'White-label', 'Onboarding dedicado', 'Suporte 24/7 · SLA'], cta: 'Assinar Advanced', hot: false },
            ].map((p) => (
              <div key={p.name} className={`relative rounded-3xl border p-7 ${p.hot ? 'shadow-[0_30px_70px_-25px_rgba(14,42,34,0.5)]' : ''}`}
                style={{ borderColor: p.hot ? ink : '#0E2A2218', background: p.hot ? ink : '#ffffff', color: p.hot ? '#FAF7F0' : ink, transform: p.hot ? 'scale(1.03)' : undefined }}>
                {p.hot && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono-data text-[10px] font-bold uppercase tracking-widest text-[#0E2A22]" style={{ background: '#C9A227' }}>
                    Mais popular
                  </div>
                )}
                <h3 className="font-serif-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm" style={{ color: p.hot ? '#A9C2B8' : '#6B7E76' }}>{p.desc}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-serif-display text-5xl font-semibold">{p.price}</span>
                  <span className="mb-1.5 text-sm" style={{ color: p.hot ? '#A9C2B8' : '#6B7E76' }}>{p.per}</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.feats.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 flex-shrink-0" style={{ color: p.hot ? '#10B981' : '#0F7857' }} />
                      <span style={{ color: p.hot ? '#D6E4DD' : '#23362F' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`mt-7 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition hover:scale-[1.02] ${p.hot ? '' : 'border'}`}
                  style={p.hot ? { background: '#C9A227', color: ink } : { borderColor: ink, color: ink }}>
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
          <div className="mb-10 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#0F7857' }}>Dúvidas</div>
            <h2 className="mt-3 font-serif-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold tracking-tight">
              Tudo que você precisa saber.
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Preciso instalar alguma coisa?', a: 'Não. O NUTRA roda 100% no navegador, no computador ou celular. Você cria a conta e já começa.' },
              { q: 'Funciona para nutricionista e para nutrólogo?', a: 'Sim. A plataforma atende tanto nutricionistas quanto médicos nutrólogos, com prontuário, antropometria e protocolos.' },
              { q: 'Meus dados e os dos pacientes ficam seguros?', a: 'Sim. Dados hospedados no Brasil, criptografados, com trilha de auditoria completa e conformidade total com a LGPD.' },
              { q: 'Posso começar de graça?', a: 'Pode. O plano Gratuito não pede cartão e já inclui antropometria, cálculos e o app do paciente para até 3 pacientes.' },
              { q: 'Consigo cancelar quando quiser?', a: 'Sim, sem fidelidade. Você troca de plano ou cancela a qualquer momento.' },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border bg-white/70 p-5" style={{ borderColor: '#0E2A2215' }}>
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" style={{ color: '#0F7857' }} />
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3B5249' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="px-6 py-12">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-20 text-center" style={{ background: ink }}>
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-25 blur-[90px]" style={{ background: '#10B981' }} />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-[90px]" style={{ background: '#C9A227' }} />
            <Sparkles className="relative mx-auto mb-6 h-7 w-7" style={{ color: '#C9A227' }} />
            <h2 className="relative font-serif-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-tight tracking-tight text-[#FAF7F0]">
              Sua próxima consulta pode ser
              <br /><span className="italic" style={{ color: '#7FD7B6' }}>de outro nível.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-lg text-lg" style={{ color: '#A9C2B8' }}>
              Comece grátis hoje. Sem cartão, sem burocracia — só medicina nutricional de verdade.
            </p>
            <Link href="/register" className="group relative mt-9 inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-base font-semibold text-[#0E2A22] transition hover:scale-[1.03]" style={{ background: '#C9A227' }}>
              Criar conta gratuita
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="relative mt-4 font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#7FA595' }}>Leva menos de 2 minutos</p>
          </div>
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
              <a href="#planos" className="transition hover:opacity-60">Planos</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
