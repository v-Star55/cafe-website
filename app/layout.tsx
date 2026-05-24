import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aurum — Café, Kitchen & Bar',
  description:
    'Coffee, iced drinks, pasta, pizza, burgers, pastries, and craft cocktails — all day in the heart of the city.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
