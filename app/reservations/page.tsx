import type { Metadata } from 'next'
import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Reservations from '@/components/Reservations'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Reservations — Aurum',
  description: 'Request a table at Aurum. We confirm reservations within 24 hours.',
}

export default function ReservationsPage() {
  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      <Cursor />
      <Navigation />
      <div className="pt-24">
        <Reservations />
      </div>
      <Footer />
    </main>
  )
}
