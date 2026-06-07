'use client'

import { useState, useEffect } from 'react'
import { Play, X, Ruler, Activity, MessageSquare, LayoutDashboard, Lock } from 'lucide-react'

const gold = '#D4AF37'
const emerald = '#10B981'

// Para encaixar um vídeo real depois: cole a URL de embed (YouTube/Vimeo/MP4) aqui.
const VIDEO_URL = '' // ex: 'https://www.youtube.com/embed/XXXXXXXX'

const SCREENS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'antropometria', label: 'Antropometria', icon: Ruler },
  { key: 'chat', label: 'Chat privado', icon: MessageSquare },
] as const

export default function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setActive((a) => (a + 1) % SCREENS.length), 3200)
    return () => clearInterval(t)
  }, [auto])

  const pick = (i: number) => { setActive(i); setAuto(false) }

  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <div className="font-mono-data text-[11px] uppercase tracking-[0.2em]" style={{ color: emerald }}>Veja em ação</div>
        <h2 className="mt-3 font-serif-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight">
          O app por dentro. <span className="lux-gold-text">Sem promessa vazia.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg" style={{ color: '#9DB3AA' }}>
          Tour ao vivo pelas telas reais — dashboard clínico, avaliação de precisão e chat privado com o paciente.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {SCREENS.map((s, i) => {
          const Icon = s.icon
          return (
            <button key={s.key} onClick={() => pick(i)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
              style={active === i
                ? { background: `linear-gradient(92deg,#F4E2A8,${gold})`, color: '#07110D' }
                : { border: '1px solid #ffffff1A', color: '#9DB3AA' }}>
              <Icon className="h-4 w-4" /> {s.label}
            </button>
          )
        })}
      </div>

      {/* Janela de navegador */}
      <div className="lux-glass relative overflow-hidden rounded-2xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: '#ffffff0E', background: '#ffffff05' }}>
          <span className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <span className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
          <div className="ml-3 flex-1 rounded-md px-3 py-1 text-center font-mono-data text-[11px]" style={{ background: '#ffffff08', color: '#7FA595' }}>
            nutra.carostudio.com.br/dashboard
          </div>
          <button onClick={() => setModal(true)} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: '#10B98115', color: emerald }}>
            <Play className="h-3 w-3" /> Tour
          </button>
        </div>
        <div className="relative h-[420px] md:h-[480px]" style={{ background: '#0A1712' }}>
          <ScreenSwitcher active={active} />
        </div>
      </div>

      {/* Faixa de telas (mobile + módulos) */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Mini title="App do paciente" sub="Diário, hidratação e evolução">
          <PhoneMock />
        </Mini>
        <Mini title="Controle de dados" sub="Auditoria e LGPD nativa">
          <DataMock />
        </Mini>
        <Mini title="Avaliação de precisão" sub="Composição corporal ao vivo">
          <AntropoMini />
        </Mini>
      </div>

      {/* Modal de vídeo / tour */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4" onClick={() => setModal(false)}>
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl" style={{ background: '#0A1712', border: '1px solid #ffffff15' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(false)} className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60">
              <X className="h-4 w-4" />
            </button>
            {VIDEO_URL ? (
              <div className="aspect-video w-full">
                <iframe src={VIDEO_URL} className="h-full w-full" allow="autoplay; encrypted-media" allowFullScreen title="NUTRA" />
              </div>
            ) : (
              <div className="relative h-[420px] md:h-[520px]">
                <ScreenSwitcher active={active} big />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 p-4">
                  {SCREENS.map((s, i) => (
                    <button key={s.key} onClick={() => pick(i)} className="rounded-full px-3 py-1.5 text-xs font-semibold transition"
                      style={active === i ? { background: gold, color: '#07110D' } : { background: '#ffffff15', color: '#9DB3AA' }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function ScreenSwitcher({ active, big }: { active: number; big?: boolean }) {
  return (
    <div className="absolute inset-0">
      {[<DashboardMock key="d" big={big} />, <AntropoMock key="a" big={big} />, <ChatMock key="c" big={big} />].map((el, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? 'auto' : 'none' }}>
          {el}
        </div>
      ))}
    </div>
  )
}

/* ---------- Mockups (UI real reproduzida) ---------- */

function DashboardMock({ big }: { big?: boolean }) {
  const pacientes = [
    { n: 'Ana Costa', a: 68, c: gold }, { n: 'Carlos Lima', a: 45, c: '#F59E0B' },
    { n: 'Maria Santos', a: 91, c: emerald }, { n: 'João Pereira', a: 23, c: '#E0876F' },
    { n: 'Fernanda Rocha', a: 85, c: emerald },
  ]
  return (
    <div className="flex h-full">
      <div className="hidden w-44 flex-shrink-0 flex-col gap-1 border-r p-3 sm:flex" style={{ borderColor: '#ffffff0A', background: '#0E1F18' }}>
        <div className="mb-2 font-mono-data text-[9px] uppercase tracking-wider text-gray-500">Menu do Nutrólogo</div>
        {['📊 Visão Geral', '👥 Pacientes', '➕ Protocolo', '📅 Agenda', '💳 Planos'].map((t, i) => (
          <div key={t} className="rounded-lg px-2.5 py-2 text-[11px] font-bold uppercase tracking-wide" style={i === 0 ? { background: '#10B98112', color: emerald } : { color: '#6E857B' }}>{t}</div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden p-5">
        <div className="font-serif-display text-2xl font-semibold text-[#F2EFE6]">Bom dia, Dra. Marina</div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[{ l: 'Pacientes', v: '38' }, { l: 'Consultas hoje', v: '6' }, { l: 'Adesão média', v: '74%' }].map((s) => (
            <div key={s.l} className="rounded-xl border p-3" style={{ borderColor: '#ffffff0E', background: '#ffffff05' }}>
              <div className="font-mono-data text-[9px] uppercase tracking-wider text-gray-500">{s.l}</div>
              <div className="font-serif-display text-2xl font-semibold text-[#F2EFE6]">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 font-mono-data text-[10px] uppercase tracking-wider text-gray-500">Adesão ao protocolo</div>
        <div className="mt-2 space-y-2.5">
          {pacientes.map((p) => (
            <div key={p.n}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#D6E4DD]">{p.n}</span>
                <span style={{ color: p.c }}>{p.a}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full" style={{ background: '#ffffff0E' }}>
                <div className="h-full rounded-full" style={{ width: `${p.a}%`, background: p.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AntropoMock({ big }: { big?: boolean }) {
  const metrics = [
    { l: 'IMC', v: '22.4', s: 'Normal' }, { l: '% Gordura', v: '24.1', s: 'Fitness' },
    { l: 'TMB', v: '1.412', s: 'kcal' }, { l: 'Massa magra', v: '46.8', s: 'kg' },
    { l: 'GET', v: '2.189', s: 'kcal' }, { l: 'Cintura/Quadril', v: '0.78', s: 'Baixo risco' },
  ]
  return (
    <div className="h-full overflow-hidden p-5">
      <div className="flex items-center gap-2"><Ruler className="h-5 w-5" style={{ color: emerald }} /><span className="font-serif-display text-xl font-semibold text-[#F2EFE6]">Avaliação Antropométrica</span></div>
      <div className="mt-1 font-mono-data text-[10px] uppercase tracking-wider text-gray-500">Protocolo Pollock 7 dobras · cálculo ao vivo</div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.l} className="rounded-xl border p-3" style={{ borderColor: '#ffffff0E', background: 'linear-gradient(160deg,#ffffff08,#ffffff02)' }}>
            <div className="font-mono-data text-[9px] uppercase tracking-wider text-gray-500">{m.l}</div>
            <div className="font-serif-display text-2xl font-semibold text-[#F2EFE6]">{m.v}</div>
            <div className="text-[10px]" style={{ color: emerald }}>{m.s}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border p-4" style={{ borderColor: '#ffffff0E', background: '#ffffff05' }}>
        <div className="mb-2 flex items-center justify-between"><span className="font-mono-data text-[10px] uppercase tracking-wider text-gray-500">Evolução de peso</span><span className="text-[11px] font-semibold" style={{ color: emerald }}>−6,2 kg</span></div>
        <svg viewBox="0 0 320 60" className="h-12 w-full"><polyline points="0,12 53,20 106,18 160,32 213,38 266,46 320,52" fill="none" stroke={emerald} strokeWidth="2.5" strokeLinecap="round" /></svg>
      </div>
    </div>
  )
}

function ChatMock({ big }: { big?: boolean }) {
  const convos = [{ n: 'Ana Costa', m: 'Doutora, tomei o ômega hoje', u: 2 }, { n: 'Carlos Lima', m: 'Posso trocar o almoço?', u: 0 }, { n: 'Maria Santos', m: 'Obrigada! 🙏', u: 0 }]
  return (
    <div className="flex h-full">
      <div className="w-48 flex-shrink-0 border-r p-3" style={{ borderColor: '#ffffff0A', background: '#0E1F18' }}>
        <div className="mb-2 flex items-center gap-1.5 font-mono-data text-[9px] uppercase tracking-wider text-gray-500"><Lock className="h-3 w-3" /> Conversas privadas</div>
        {convos.map((c, i) => (
          <div key={c.n} className="mb-1 rounded-lg p-2" style={i === 0 ? { background: '#10B98112' } : {}}>
            <div className="flex items-center justify-between"><span className="text-[12px] font-semibold text-[#D6E4DD]">{c.n}</span>{c.u > 0 && <span className="rounded-full px-1.5 text-[9px] font-bold" style={{ background: emerald, color: '#07110D' }}>{c.u}</span>}</div>
            <div className="truncate text-[10px] text-gray-500">{c.m}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="border-b pb-2 font-serif-display text-lg font-semibold text-[#F2EFE6]" style={{ borderColor: '#ffffff0A' }}>Ana Costa</div>
        <div className="flex flex-1 flex-col justify-end gap-2 py-3">
          <Bubble who="p">Doutora, posso tomar o ômega em jejum?</Bubble>
          <Bubble who="m">Pode sim, Ana. Inclusive melhora a absorção 👍</Bubble>
          <Bubble who="p">Perfeito, obrigada!</Bubble>
        </div>
        <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] text-gray-500" style={{ borderColor: '#ffffff12' }}>Mensagem para Ana Costa…</div>
      </div>
    </div>
  )
}

function Bubble({ who, children }: { who: 'p' | 'm'; children: React.ReactNode }) {
  const mine = who === 'm'
  return (
    <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-[12px] ${mine ? 'self-end' : 'self-start'}`}
      style={mine ? { background: emerald, color: '#07110D' } : { background: '#ffffff0E', color: '#D6E4DD' }}>
      {children}
    </div>
  )
}

function Mini({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="lux-glass rounded-2xl p-4">
      <div className="h-56 overflow-hidden rounded-xl" style={{ background: '#0A1712' }}>{children}</div>
      <div className="mt-3 font-semibold text-[#F2EFE6]">{title}</div>
      <div className="font-mono-data text-[11px] uppercase tracking-wider" style={{ color: '#7FA595' }}>{sub}</div>
    </div>
  )
}

function PhoneMock() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-52 w-28 rounded-[1.4rem] border-4 p-2" style={{ borderColor: '#1a2b24', background: '#0E1F18' }}>
        <div className="font-mono-data text-[7px] uppercase tracking-wider text-gray-500">Hoje</div>
        <div className="mt-1 rounded-lg p-1.5" style={{ background: '#10B98112' }}>
          <div className="text-[8px] font-bold text-[#D6E4DD]">💧 Água</div>
          <div className="mt-0.5 h-1 rounded-full" style={{ background: '#ffffff14' }}><div className="h-full w-3/4 rounded-full" style={{ background: emerald }} /></div>
        </div>
        <div className="mt-1.5 rounded-lg p-1.5" style={{ background: '#ffffff08' }}>
          <div className="text-[8px] font-bold text-[#D6E4DD]">💊 Suplementos</div>
          <div className="text-[7px] text-gray-500">3 de 4 tomados</div>
        </div>
        <div className="mt-1.5 rounded-lg p-1.5" style={{ background: '#ffffff08' }}>
          <div className="text-[8px] font-bold text-[#D6E4DD]">⚖️ Peso</div>
          <svg viewBox="0 0 80 20" className="mt-0.5 h-4 w-full"><polyline points="0,4 20,7 40,6 60,11 80,14" fill="none" stroke={emerald} strokeWidth="2" /></svg>
        </div>
      </div>
    </div>
  )
}

function DataMock() {
  const logs = [{ a: 'EXPORT', c: gold }, { a: 'UPDATE', c: '#F59E0B' }, { a: 'VIEW', c: '#38BDF8' }, { a: 'CONSENT', c: emerald }]
  return (
    <div className="h-full p-3">
      <div className="flex items-center gap-1.5 font-mono-data text-[9px] uppercase tracking-wider text-gray-500"><span className="h-1.5 w-1.5 rounded-full" style={{ background: emerald }} /> Auditoria ao vivo</div>
      <div className="mt-2 space-y-1.5">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono-data text-[9px]" style={{ background: '#ffffff06' }}>
            <span className="rounded px-1 font-bold" style={{ color: l.c, background: `${l.c}1A` }}>{l.a}</span>
            <span className="text-gray-500">paciente · dados</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AntropoMini() {
  return (
    <div className="grid h-full grid-cols-2 gap-2 p-3">
      {[{ l: 'IMC', v: '22.4' }, { l: '% Gord.', v: '24.1' }, { l: 'TMB', v: '1.412' }, { l: 'Magra', v: '46.8' }].map((m) => (
        <div key={m.l} className="rounded-lg border p-2" style={{ borderColor: '#ffffff0E', background: '#ffffff05' }}>
          <div className="font-mono-data text-[8px] uppercase text-gray-500">{m.l}</div>
          <div className="font-serif-display text-lg font-semibold text-[#F2EFE6]">{m.v}</div>
        </div>
      ))}
    </div>
  )
}
