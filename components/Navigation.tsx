'use client'

import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Story', href: '/#story' },
  { label: 'Menu', href: '/menu' },
  { label: 'Atelier', href: '/#atelier' },
  { label: 'Reservations', href: '/reservations' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80))
  }, [scrollY])

  const closeMobileMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 transition-all duration-700"
        style={{
          background: scrolled ? 'rgba(26, 15, 10, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184, 146, 42, 0.15)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="display text-2xl font-light tracking-[0.3em] text-[#D4AF6A]">AURUM</span>
          <span className="text-[9px] tracking-[0.5em] text-[#8C7B6B] uppercase mt-0.5">Est. 2008</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.6 }}
            >
              <Link
                href={link.href}
                className="hover-underline text-[11px] tracking-[0.35em] text-[#EDE8DC] uppercase font-light hover:text-[#D4AF6A] transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Reserve CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="hidden md:block"
        >
          <Link
            href="/reservations"
            className="text-[10px] tracking-[0.4em] uppercase border border-[#B8922A] text-[#D4AF6A] px-6 py-2.5 hover:bg-[#B8922A] hover:text-[#1A0F0A] transition-all duration-400"
          >
            Reserve
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="block w-6 h-px bg-[#D4AF6A] origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-px bg-[#D4AF6A]"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="block w-6 h-px bg-[#D4AF6A] origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ clipPath: menuOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-[#1A0F0A] flex flex-col items-center justify-center gap-10"
      >
        {navLinks.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 30 }}
            transition={{ delay: menuOpen ? i * 0.08 + 0.2 : 0 }}
          >
            <Link
              href={link.href}
              onClick={closeMobileMenu}
              className="display text-5xl font-light text-[#EDE8DC] hover:text-[#D4AF6A] transition-colors italic"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
