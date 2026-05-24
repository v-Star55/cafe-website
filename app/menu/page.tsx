import type { Metadata } from 'next'
import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Menu — Aurum',
  description: 'Explore our curated selection of single-origin coffee, pastries, and seasonal offerings.',
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
