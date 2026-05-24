import type { Metadata } from 'next'
import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Menu — Aurum',
  description:
    'Coffee, iced drinks, pasta, pizza, burgers, cocktails, pastries, and brunch — explore the full Aurum menu.',
}

export default function MenuPage() {
  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      <Cursor />
      <Navigation />
      <div className="pt-24">
        <Menu />
      </div>
      <Footer />
    </main>
  )
}
