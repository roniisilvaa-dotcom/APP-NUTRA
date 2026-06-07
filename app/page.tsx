import Link from 'next/link'
import {
  Activity, Shield, Brain, Ruler, ArrowRight, Check, X, Lock,
  FlaskConical, LineChart, Sparkles, FileClock, Stethoscope,
  Star, Quote, Zap, HeartPulse, ChevronDown,
} from 'lucide-react'
import PricingPlans from './components/PricingPlans'

export const metadata = {
  title: 'NUTRA — Medicina Nutricional de Precisão para Nutrólogos',
  description:
    'A plataforma clínica que transforma sua consulta em ciência. Antropometria de precisão, cálculo energético, IA clínica e controle de dados LGPD. Comece grátis, sem cartão.',
}

const gold = '#D4AF37'
const emerald = '#10B981'
const cream = '#F2EFE6'

export default function LandingPage() {
  return (
    <div className="lux-mesh relative min-h-screen overflow-x-hidden" style={{ color: cream }}>
      <div className="lux-grid absolute inset-0" />

      <div className="relative z-10">
        {/* ===== NAV ===== */}
        <nav className="sticky top-0 z-40 border-b" style={{ borderColor: '#ffffff10', background: 'rgba(7,17,13,0.72)', backdropFilter: 'blur(12px)' }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ borderColor: '#D4AF3755', background: 'linear-gradient(160deg,#0E1F18,#07110D)' }}>
                <span className="font-serif-display text-lg font-bold lux-gold-text">N</span>
              </div>
              <span className="font-serif-display text-xl font-semibold tracking-tight">NUTRA</span>
            </div>
            <div className="hidden items-center gap-9 text-sm md:flex" style={{ color: '#9DB3AA' }}>
              <a href="#plataforma" className="transition hover:text-white">Plataforma</a>
              <a href="#como" className="transition hover:text-white">Como funciona</a>
              <a href="#planos" className="transition hover:text-white">Planos</a>
              <a href="#faq" className="transition hover:text-white">Dúvidas</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden text-sm transition hover:text-white sm:block" style={{ color: '#9DB3AA' }}>Entrar</Link>
              <Link href="/register" className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.03]" style={{ background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D' }}>
                Teste grátis
              </Link>
            </div>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div>
            <div className="lp-up d1 mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: '#D4AF3733', color: '#E6D9A8', background: '#D4AF3708' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: emerald, animation: 'lpPulse 2s infinite' }} />
              Sistema de apoio clínico de precisão
            </div>
            <h1 className="lp-up d2 font-serif-display text-[clamp(2.6rem,5.5vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
              Dobre o valor da
              <br />sua consulta —
              <br /><span className="italic lux-gold-text lux-shimmer">sem trabalhar mais</span>.
            </h1>
            <p className="lp-up d3 mt-6 max-w-md text-lg leading-relaxed" style={{ color: '#A9C2B8' }}>
              O NUTRA reúne antropometria, cálculo energético, IA clínica e o app do paciente numa só plataforma. Precisão de elite — e o paciente sente a diferença na primeira consulta.
            </p>
            <div className="lp-up d4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition hover:scale-[1.03]" style={{ background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D', boxShadow: '0 20px 50px -20px rgba(212,175,55,0.5)' }}>
                Testar grátis por 7 dias
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#planos" className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-base font-semibold transition hover:bg-white/5" style={{ borderColor: '#ffffff22', color: cream }}>
                Ver planos
              </a>
            </div>
            <div className="lp-up d5 mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6E857B' }}>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: emerald }} /> 7 dias grátis</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: emerald }} /> Sem cartão</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" style={{ color: emerald }} /> Dados no Brasil · LGPD</span>
            </div>
          </div>

          {/* Prévia do produto — glass */}
          <div className="lp-in d4 relative">
            <div className="lp-float lux-glass relative rounded-3xl p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#7FA595' }}>Avaliação · composição corporal</div>
                  <div className="font-serif-display text-xl font-semibold">Ana Costa</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ borderColor: '#10B98133', background: '#10B98112' }}>
                  <Ruler className="h-5 w-5" style={{ color: emerald }} />
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
                  <div key={m.l} className="rounded-xl border p-3" style={{ borderColor: '#ffffff0E', background: '#ffffff05' }}>
                    <div className="font-mono-data text-[9px] uppercase tracking-wider" style={{ color: '#7FA595' }}>{m.l}</div>
                    <div className="font-serif-display text-2xl font-semibold leading-tight">{m.v}</div>
                    <div className="text-[10px]" style={{ color: emerald }}>{m.s}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border p-4" style={{ borderColor: '#ffffff0E', background: '#ffffff05' }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono-data text-[10px] uppercase tracking-wider" style={{ color: '#7FA595' }}>Evolução de peso</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: emerald }}><LineChart className="h-3 w-3" /> −6,2 kg em 90 dias</span>
                </div>
                <svg viewBox="0 0 280 60" className="h-14 w-full" fill="none">
                  <defs><linearGradient id="lg" x1="0" x2="1"><stop stopColor="#10B981" /><stop offset="1" stopColor="#D4AF37" /></linearGradient></defs>
                  <polyline points="0,12 47,20 93,18 140,32 187,38 233,46 280,52" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'lpDraw 2s ease 0.6s forwards' }} />
                </svg>
              </div>
            </div>
            <div className="lux-glass absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl px-4 py-3 sm:flex">
              <Shield className="h-5 w-5" style={{ color: gold }} />
              <div>
                <div className="text-xs font-semibold">Auditoria ativa</div>
                <div className="font-mono-data text-[9px] uppercase tracking-wider" style={{ color: '#7FA595' }}>Cada acesso registrado</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAIXA DE PROVA ===== */}
        <section className="border-y" style={{ borderColor: '#ffffff10', background: 'rgba(255,255,255,0.02)' }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {[
              { n: '+38%', l: 'percepção de valor da consulta' },
              { n: '5 min', l: 'avaliação completa, não 30' },
              { n: '4', l: 'protocolos de TMB validados' },
              { n: '100%', l: 'conformidade LGPD' },
            ].map((s, i) => (
              <div key={s.l} className="px-6 py-9 text-center" style={{ borderLeft: i ? '1px solid #ffffff0E' : undefined }}>
                <div className="font-serif-display text-3xl font-semibold sm:text-4xl lux-gold-text">{s.n}</div>
                <div className="mt-1 font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#7FA595' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DOR ===== */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: '#E0876F' }}>O problema</div>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
            Você é um clínico de excelência preso a ferramentas de amador.
          </h2>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-3">
            {[
              { t: 'Planilhas que se perdem', d: 'Dados espalhados em Excel, papel e WhatsApp. Retrabalho a cada consulta.' },
              { t: 'Cálculos manuais e lentos', d: 'TMB, % de gordura e macros na calculadora — sujeitos a erro e tempo perdido.' },
              { t: 'Paciente que some', d: 'Sem app, sem acompanhamento. A adesão cai e os resultados também.' },
            ].map((p) => (
              <div key={p.t} className="rounded-2xl border p-6" style={{ borderColor: '#E0876F22', background: 'rgba(224,135,111,0.04)' }}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: '#E0876F18' }}>
                  <X className="h-5 w-5" style={{ color: '#E0876F' }} />
                </div>
                <h3 className="font-serif-display text-lg font-semibold">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: '#9DB3AA' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PLATAFORMA ===== */}
        <section id="plataforma" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-14 max-w-2xl">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: emerald }}>A solução</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight">
              Uma plataforma. Toda a sua clínica. <span className="lux-gold-text">Zero remendos.</span>
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#9DB3AA' }}>
              Cada módulo sobre fórmulas validadas — para decidir com dados, não com achismo.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Ruler, title: 'Antropometria de precisão', desc: 'Dobras (Pollock 7/3), circunferências e composição corporal com cálculo ao vivo.' },
              { icon: FlaskConical, title: 'Cálculo energético validado', desc: 'TMB por Mifflin, Harris-Benedict, Cunningham e Tinsley. GET e macros num clique.' },
              { icon: Brain, title: 'IA clínica', desc: 'Correlação de biomarcadores, leitura de exames e condutas baseadas em evidência.' },
              { icon: Stethoscope, title: 'Prontuário & protocolos', desc: 'Anamnese, plano alimentar, suplementação e exercícios num histórico único.' },
              { icon: Activity, title: 'App do paciente', desc: 'Diário, hidratação, evolução e canal direto — adesão que não cai.' },
              { icon: LineChart, title: 'Relatórios & evolução', desc: 'Gráficos que provam resultado e encantam o paciente.' },
            ].map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="lux-glass lux-card-hover group rounded-2xl p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border transition group-hover:scale-110" style={{ borderColor: '#10B98133', background: '#10B9810F' }}>
                    <Icon className="h-5 w-5" style={{ color: emerald }} />
                  </div>
                  <h3 className="font-serif-display text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#9DB3AA' }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section id="como" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-14 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: emerald }}>Como funciona</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
              No ar em minutos. <span className="lux-gold-text">Não em meses.</span>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { n: '01', icon: Zap, t: 'Crie sua conta grátis', d: 'Sem cartão, sem instalação. Entrou, já cadastra pacientes.' },
              { n: '02', icon: Ruler, t: 'Avalie com precisão', d: 'Antropometria e cálculo energético com resultados ao vivo.' },
              { n: '03', icon: HeartPulse, t: 'Acompanhe e fidelize', d: 'O paciente recebe o app e você vê a evolução em gráficos.' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.n} className="lux-glass relative rounded-2xl p-7">
                  <span className="font-serif-display text-5xl font-semibold lux-gold-text" style={{ opacity: 0.5 }}>{s.n}</span>
                  <div className="mt-3 flex items-center gap-2">
                    <Icon className="h-5 w-5" style={{ color: emerald }} />
                    <h3 className="font-serif-display text-xl font-semibold">{s.t}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#9DB3AA' }}>{s.d}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ===== CONTROLE DE DADOS ===== */}
        <section id="dados" className="relative overflow-hidden border-y" style={{ borderColor: '#ffffff10', background: 'rgba(0,0,0,0.25)' }}>
          <div className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full opacity-25 blur-[110px]" style={{ background: gold }} />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
            <div>
              <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: gold }}>Controle de dados</div>
              <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-tight">
                Dados clínicos são sagrados. <span className="lux-gold-text">Tratamos como tal.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: '#A9C2B8' }}>
                Enquanto os outros prometem &ldquo;segurança&rdquo;, o NUTRA entrega controle real — conformidade LGPD nativa e visível a cada clique. Um argumento de confiança que fecha pacientes.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: FileClock, t: 'Trilha de auditoria completa', d: 'Cada acesso, alteração e exportação registrada com autor, data e IP.' },
                  { icon: Shield, t: 'Direito ao esquecimento', d: 'Eliminação definitiva sob demanda, com registro legal preservado.' },
                  { icon: Lock, t: 'Portabilidade total', d: 'Exporte todos os dados de um paciente em um clique.' },
                ].map((i) => {
                  const Icon = i.icon
                  return (
                    <div key={i.t} className="flex gap-4">
                      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border" style={{ borderColor: '#D4AF3733', background: '#D4AF3712' }}>
                        <Icon className="h-4 w-4" style={{ color: gold }} />
                      </div>
                      <div>
                        <div className="font-semibold">{i.t}</div>
                        <div className="text-sm" style={{ color: '#7FA595' }}>{i.d}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="lux-glass rounded-3xl p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono-data text-[10px] uppercase tracking-widest" style={{ color: '#7FA595' }}>Trilha de auditoria · ao vivo</span>
                <span className="flex items-center gap-1.5 font-mono-data text-[10px]" style={{ color: emerald }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: emerald, animation: 'lpPulse 1.5s infinite' }} /> REC
                </span>
              </div>
              <div className="space-y-2.5 font-mono-data text-xs">
                {[
                  { a: 'EXPORT', c: '#D4AF37', e: 'paciente · Ana Costa', t: '14:32' },
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
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: emerald }}>Por que NUTRA</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
              A diferença entre parecer e <span className="lux-gold-text">ser de elite.</span>
            </h2>
          </div>
          <div className="lux-glass overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] text-sm">
              <div className="p-4" />
              <div className="p-4 text-center font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#7FA595' }}>Planilhas</div>
              <div className="p-4 text-center font-serif-display text-base font-semibold lux-gold-text" style={{ background: '#ffffff06' }}>NUTRA</div>
              {[
                'Antropometria com cálculo automático',
                'TMB, GET e macros validados',
                'App e acompanhamento do paciente',
                'IA clínica e leitura de exames',
                'Auditoria e conformidade LGPD',
                'Visual que valoriza sua consulta',
              ].map((row) => (
                <div key={row} className="contents">
                  <div className="border-t p-4" style={{ borderColor: '#ffffff0E' }}>{row}</div>
                  <div className="flex items-center justify-center border-t p-4" style={{ borderColor: '#ffffff0E' }}>
                    <X className="h-4 w-4" style={{ color: '#E0876F88' }} />
                  </div>
                  <div className="flex items-center justify-center border-t p-4" style={{ borderColor: '#ffffff0E', background: '#ffffff06' }}>
                    <Check className="h-4 w-4" style={{ color: emerald }} />
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
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: gold }} />)}
            </div>
            <h2 className="font-serif-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-tight">
              Quem leva a clínica a sério, <span className="lux-gold-text">leva NUTRA.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { q: 'Reduzi o tempo de avaliação pela metade e o paciente sai impressionado com o relatório.', n: 'Dra. Marina Albuquerque', r: 'Nutróloga · São Paulo' },
              { q: 'O app manteve meus pacientes engajados entre consultas. A adesão subiu e os resultados apareceram.', n: 'Dr. Rafael Tavares', r: 'Nutrólogo · Belo Horizonte' },
              { q: 'O controle de dados LGPD virou argumento de venda. Passa uma seriedade que ninguém tem.', n: 'Dra. Camila Reis', r: 'Nutricionista · Curitiba' },
            ].map((t) => (
              <figure key={t.n} className="lux-glass rounded-2xl p-7">
                <Quote className="h-6 w-6" style={{ color: gold }} />
                <blockquote className="mt-3 text-[15px] leading-relaxed" style={{ color: '#D6E4DD' }}>&ldquo;{t.q}&rdquo;</blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold">{t.n}</div>
                  <div className="font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#7FA595' }}>{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ===== PLANOS ===== */}
        <section id="planos" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-14 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: emerald }}>Planos</div>
            <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
              Investimento à altura <span className="lux-gold-text">da sua clínica.</span>
            </h2>
            <p className="mt-3 text-lg" style={{ color: '#9DB3AA' }}>Teste grátis por 7 dias. Cancele quando quiser.</p>
          </div>
          <PricingPlans />
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
          <div className="mb-10 text-center">
            <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: emerald }}>Dúvidas</div>
            <h2 className="mt-3 font-serif-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold tracking-tight">
              Tudo que você precisa saber.
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Preciso instalar alguma coisa?', a: 'Não. O NUTRA roda 100% no navegador, no computador ou celular. Cria a conta e já começa.' },
              { q: 'Funciona para nutricionista e nutrólogo?', a: 'Sim, para os dois — com prontuário, antropometria e protocolos.' },
              { q: 'Meus dados e os dos pacientes ficam seguros?', a: 'Sim. Dados no Brasil, criptografados, com auditoria completa e conformidade total com a LGPD.' },
              { q: 'Posso começar de graça?', a: 'Pode. O plano Gratuito não pede cartão e já inclui antropometria, cálculos e o app do paciente.' },
              { q: 'Consigo cancelar quando quiser?', a: 'Sim, sem fidelidade. Troca de plano ou cancela a qualquer momento.' },
            ].map((f) => (
              <details key={f.q} className="lux-glass group rounded-2xl p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" style={{ color: emerald }} />
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#9DB3AA' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="px-6 py-12">
          <div className="lux-glass relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-20 text-center">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-[90px]" style={{ background: emerald }} />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-25 blur-[90px]" style={{ background: gold }} />
            <Sparkles className="relative mx-auto mb-6 h-7 w-7" style={{ color: gold }} />
            <h2 className="relative font-serif-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-tight tracking-tight">
              Sua próxima consulta pode ser
              <br /><span className="italic lux-gold-text">de outro nível.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-lg text-lg" style={{ color: '#A9C2B8' }}>
              Teste grátis por 7 dias. Sem cartão, sem burocracia — só medicina nutricional de verdade.
            </p>
            <Link href="/register" className="group relative mt-9 inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-base font-semibold transition hover:scale-[1.03]" style={{ background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D', boxShadow: '0 20px 50px -20px rgba(212,175,55,0.5)' }}>
              Começar teste grátis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="relative mt-4 font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#7FA595' }}>Leva menos de 2 minutos</p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t" style={{ borderColor: '#ffffff10' }}>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ borderColor: '#D4AF3755', background: 'linear-gradient(160deg,#0E1F18,#07110D)' }}>
                <span className="font-serif-display text-sm font-bold lux-gold-text">N</span>
              </div>
              <span className="font-serif-display text-lg font-semibold">NUTRA</span>
            </div>
            <p className="font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#6E857B' }}>
              © 2026 NUTRA · Medicina Nutricional de Precisão
            </p>
            <div className="flex gap-6 text-sm" style={{ color: '#9DB3AA' }}>
              <Link href="/login" className="transition hover:text-white">Entrar</Link>
              <a href="#planos" className="transition hover:text-white">Planos</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
