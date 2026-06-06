export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const PLANS: Record<string, string> = {
    clinica: process.env.STRIPE_PRICE_CLINICA!,
    advanced: process.env.STRIPE_PRICE_ADVANCED!,
  }

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { plan } = await req.json()
  const priceId = PLANS[plan]
  if (!priceId) {
    return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId: session.user.id, plan },
  })

  return NextResponse.json({ url: checkout.url })
}
