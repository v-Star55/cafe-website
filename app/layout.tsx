import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aurum — Refined Coffee Experience',
  description: 'A sanctuary of exceptional coffee, artisanal pastries, and timeless elegance.',
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
