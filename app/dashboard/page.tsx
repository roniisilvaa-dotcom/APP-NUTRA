import { auth } from '@/auth'
import { db } from '@/lib/db'
import { patients, protocols, consultas, diarioRegistros, chatMessages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import NutraApp from './NutraApp'

export default async function DashboardPage() {
  const session = await auth()
  const userId = Number(session!.user.id)
  const role = session!.user.role as 'medico' | 'paciente'

  let initialData: Record<string, unknown> = {}

  if (role === 'medico') {
    const [patientsData, consultasData] = await Promise.all([
      db.select().from(patients).where(eq(patients.doctorId, userId)),
      db.select().from(consultas).where(eq(consultas.doctorId, userId)),
    ])
    initialData = { patients: patientsData, consultas: consultasData }
  } else {
    const [patientRows] = await db.select().from(patients).where(eq(patients.userId, userId))
    if (patientRows) {
      const [protocolRow, logsData, chatsData] = await Promise.all([
        db.select().from(protocols).where(eq(protocols.patientId, patientRows.id)),
        db.select().from(diarioRegistros).where(eq(diarioRegistros.patientId, patientRows.id)),
        db.select().from(chatMessages).where(eq(chatMessages.patientId, patientRows.id)),
      ])
      initialData = {
        patient: patientRows,
        protocol: protocolRow[0] ?? null,
        logs: logsData,
        chats: chatsData,
      }
    }
  }

  return (
    <NutraApp
      user={{ id: String(userId), name: session!.user.name, email: session!.user.email, role, plan: session!.user.plan }}
      initialData={initialData}
    />
  )
}
