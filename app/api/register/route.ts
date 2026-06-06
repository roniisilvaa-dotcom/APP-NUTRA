export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, crm } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Campos obrigatórios' }, { status: 400 })
    }

    const [existing] = await db.select().from(users).where(eq(users.email, email))
    if (existing) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const [user] = await db
      .insert(users)
      .values({ name, email, passwordHash, role: role ?? 'medico', crm })
      .returning({ id: users.id, name: users.name, email: users.email, role: users.role })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
