import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))

        if (!user) return null

        // Bloqueia membros desativados pelo ADM/desenvolvedor
        if (user.ativo === false) return null

        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        if (!valid) return null

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          plan: user.plan,
          doctorId: user.doctorId ?? null,
          permissions: user.permissions ?? {},
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
        token.plan = (user as { plan?: string }).plan
        token.doctorId = (user as { doctorId?: number | null }).doctorId ?? null
        token.permissions = (user as { permissions?: Record<string, boolean> }).permissions ?? {}
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.plan = token.plan as string
        ;(session.user as { doctorId?: number | null }).doctorId = (token.doctorId as number | null) ?? null
        ;(session.user as { permissions?: Record<string, boolean> }).permissions = (token.permissions as Record<string, boolean>) ?? {}
      }
      return session
    },
  },
})
