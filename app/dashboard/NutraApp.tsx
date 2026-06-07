'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  Sun, Moon, LogOut, Ruler, Shield, Plus, Clipboard, Activity, MessageSquare,
  Users, Terminal,
} from 'lucide-react'

import { PACIENTES, PROTOCOLO_DEMO, AGENDA_DEMO, REGISTROS_DIARIOS_DEMO, MOCK_CHATS } from '@/src/demoData'
import type { Patient, Protocol, Consulta, DiárioRegistro } from '@/src/types'
import { DoctorViews } from '@/src/components/DoctorViews'
import { PatientViews } from '@/src/components/PatientViews'

interface NutraUser {
  id: string
  name: string
  email: string
  role: 'medico' | 'paciente'
  plan: string
}

interface Props {
  user: NutraUser
  initialData: Record<string, unknown>
  isDev?: boolean
}

export default function NutraApp({ user, initialData, isDev }: Props) {
  const [darkMode, setDarkMode] = useState(true) // escuro por padrão (legibilidade + marca)

  const [patients, setPatients] = useState<Patient[]>(
    (initialData.patients as Patient[])?.length ? (initialData.patients as Patient[]) : PACIENTES
  )
  const [protocol, setProtocol] = useState<Protocol>(
    (initialData.protocol as Protocol) ?? PROTOCOLO_DEMO
  )
  const [agenda, setAgenda] = useState<Consulta[]>(
    (initialData.consultas as Consulta[])?.length ? (initialData.consultas as Consulta[]) : AGENDA_DEMO
  )
  const [dailyLogs, setDailyLogs] = useState<DiárioRegistro[]>(
    (initialData.logs as DiárioRegistro[])?.length ? (initialData.logs as DiárioRegistro[]) : REGISTROS_DIARIOS_DEMO
  )
  const [chats, setChats] = useState<{ id: number; sender: string; text: string; time: string }[]>(
    (initialData.chats as { id: number; sender: string; text: string; time: string }[])?.length
      ? (initialData.chats as { id: number; sender: string; text: string; time: string }[])
      : MOCK_CHATS
  )

  const [doctorView, setDoctorView] = useState('dashboard')
  const [patientView, setPatientView] = useState('inicio')
  const [currentPatientId, setCurrentPatientId] = useState(
    user.role === 'paciente' ? Number((initialData.patient as Patient)?.id ?? 1) : 1
  )

  const activePatient = patients.find((p) => p.id === currentPatientId) ?? patients[0]

  const handleSetPatient = useCallback((p: Patient) => {
    setPatients((prev) => prev.map((x) => (x.id === p.id ? p : x)))
  }, [])

  // Carrega preferência salva
  useEffect(() => {
    const saved = localStorage.getItem('nutra-theme')
    if (saved) setDarkMode(saved === 'dark')
  }, [])

  // Aplica/remove a classe .dark no <html> e salva preferência
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('nutra-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const navItem = (key: string, label: string, emoji: string, active: boolean) => (
    <button
      onClick={() => setDoctorView(key)}
      className={`w-full text-left font-bold text-[11px] py-2.5 px-3 rounded-lg transition-all uppercase tracking-wider flex items-center gap-2 ${
        active
          ? 'bg-brand-emerald-glow text-brand-emerald border-r-[3px] border-brand-emerald rounded-r-none pr-2'
          : 'text-gray-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:text-gray-800 dark:hover:text-gray-200'
      }`}
    >
      <span>{emoji}</span> {label}
    </button>
  )

  const patientNavBtn = (key: string, label: string, Icon: React.ElementType, active: boolean) => (
    <button
      onClick={() => setPatientView(key)}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-brand-emerald scale-105' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0A1410] text-gray-100' : 'bg-[#E7EBF1] text-gray-900'}`}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-emerald flex items-center justify-center">
              <span className="font-serif text-white font-black text-lg">N</span>
            </div>
            <span className="font-serif text-xl font-black tracking-tight">NUTRA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:block mr-1">
              {user.name} · <span className="capitalize">{user.plan}</span>
            </span>
            {user.role === 'medico' && (
              <>
                <Link href="/dashboard/antropometria" className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-105 transition-all text-indigo-500" title="Avaliação Antropométrica">
                  <Ruler className="w-4 h-4" />
                </Link>
                <Link href="/dashboard/equipe" className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-105 transition-all text-violet-500" title="Equipe & Acessos (ADM)">
                  <Users className="w-4 h-4" />
                </Link>
                <Link href="/dashboard/dados" className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-105 transition-all text-emerald-500" title="Centro de Controle de Dados (LGPD)">
                  <Shield className="w-4 h-4" />
                </Link>
              </>
            )}
            {isDev && (
              <Link href="/dashboard/dev" className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-105 transition-all text-amber-500" title="Painel do Desenvolvedor">
                <Terminal className="w-4 h-4" />
              </Link>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-105 transition-all text-gray-500">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-105 transition-all text-gray-500 hover:text-red-500" title="Sair">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 pb-24 md:pb-12">
        {user.role === 'medico' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-1 bg-white dark:bg-brand-card-dark p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-left">
              <div className="pb-2.5 border-b border-black/[0.04] dark:border-white/[0.05] mb-2.5 ml-1.5 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Menu do Nutrólogo</span>
                <span className="text-[9px] text-brand-emerald bg-brand-emerald/10 px-1.5 py-0.5 rounded font-extrabold uppercase">SaaS</span>
              </div>
              {navItem('dashboard', 'Visão Geral', '📊', doctorView === 'dashboard')}
              {navItem('pacientes', `Pacientes (${patients.length})`, '👥', doctorView === 'pacientes' || doctorView === 'paciente-perfil')}
              {navItem('novo-protocolo', 'Prescrever Protocolo', '➕', doctorView === 'novo-protocolo')}
              {navItem('agenda', `Agenda (${agenda.length})`, '📅', doctorView === 'agenda')}
              {navItem('planos', 'Planos e Assinatura', '💳', doctorView === 'planos')}
            </aside>

            {/* Content */}
            <div className="lg:col-span-9">
              <DoctorViews
                patients={patients}
                setPatients={setPatients}
                currentPatientId={currentPatientId}
                setCurrentPatientId={setCurrentPatientId}
                view={doctorView}
                setView={setDoctorView}
                protocol={protocol}
                setProtocol={setProtocol as React.Dispatch<React.SetStateAction<Protocol>>}
                agenda={agenda}
                setAgenda={setAgenda}
                chats={chats}
                setChats={setChats}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <PatientViews
              patient={activePatient}
              setPatient={handleSetPatient}
              patients={patients}
              setPatients={setPatients}
              protocol={protocol}
              view={patientView}
              setView={setPatientView}
              dailyLogs={dailyLogs}
              setDailyLogs={setDailyLogs}
              chats={chats}
              setChats={setChats}
            />

            {/* Bottom nav (paciente) */}
            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-brand-card-dark border-t border-gray-100 dark:border-gray-800/80 px-4 py-2 flex justify-around items-center">
              {patientNavBtn('inicio', 'Início', Activity, patientView === 'inicio')}
              {patientNavBtn('protocolo', 'Protocolo', Clipboard, patientView === 'protocolo')}
              <button
                onClick={() => setPatientView('registrar')}
                className="flex flex-col items-center justify-center -mt-6 w-12 h-12 bg-brand-emerald text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all scale-110 border-4 border-white dark:border-[#0D1117]"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
              </button>
              {patientNavBtn('evolucao', 'Evolução', Activity, patientView === 'evolucao')}
              {patientNavBtn('mensagens', 'Chat', MessageSquare, patientView === 'mensagens')}
            </footer>
          </div>
        )}
      </main>
    </div>
  )
}
