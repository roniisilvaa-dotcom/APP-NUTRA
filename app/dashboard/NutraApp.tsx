'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Sun, Moon, LogOut, Ruler, Shield } from 'lucide-react'

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
}

export default function NutraApp({ user, initialData }: Props) {
  const [darkMode, setDarkMode] = useState(false)

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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-[#0D1117] text-gray-100' : 'bg-[#F8F9FC] text-gray-800'
      }`}
    >
      {/* Top bar */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <span className="text-xs text-gray-400 hidden sm:block">
          {user.name} · <span className="capitalize">{user.plan}</span>
        </span>
        {user.role === 'medico' && (
          <>
            <Link
              href="/dashboard/antropometria"
              className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:scale-105 transition-all text-indigo-500"
              title="Avaliação Antropométrica"
            >
              <Ruler className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/dados"
              className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:scale-105 transition-all text-emerald-500"
              title="Centro de Controle de Dados (LGPD)"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:scale-105 transition-all text-gray-500"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:scale-105 transition-all text-gray-500 hover:text-red-500"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {user.role === 'medico' ? (
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
      ) : (
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
      )}
    </div>
  )
}
