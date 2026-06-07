'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', crm: '', role: 'medico' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Erro ao criar conta.')
      return
    }
    router.push('/login?registered=1')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-400 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-950" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">NUTRA</span>
          </div>
          <p className="text-emerald-300 text-sm">Crie sua conta e comece agora</p>
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
          <h1 className="text-white text-xl font-semibold mb-6">Criar conta</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-emerald-300 text-sm mb-1.5">Você é:</label>
              <div className="grid grid-cols-2 gap-2">
                {(['medico', 'paciente'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set('role', r)}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition ${
                      form.role === r
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white/10 border-white/20 text-white/60 hover:text-white'
                    }`}
                  >
                    {r === 'medico' ? '👨‍⚕️ Médico / Nutricionista' : '👤 Paciente'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-emerald-300 text-sm mb-1.5">Nome completo</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition"
                placeholder="Dr. João Silva"
                required
              />
            </div>

            <div>
              <label className="block text-emerald-300 text-sm mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition"
                placeholder="dr@clinica.com"
                required
              />
            </div>

            {form.role === 'medico' && (
              <div>
                <label className="block text-emerald-300 text-sm mb-1.5">CRM (opcional)</label>
                <input
                  type="text"
                  value={form.crm}
                  onChange={(e) => set('crm', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition"
                  placeholder="CRM/SP 123456"
                />
              </div>
            )}

            <div>
              <label className="block text-emerald-300 text-sm mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition"
                  placeholder="Mínimo 8 caracteres"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold rounded-xl py-3 transition"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Já tem conta?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
