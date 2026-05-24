'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div style={{ y: photoY, scale }} className="absolute inset-0">
        <Image
          src="/header-img.jpg"
          alt="Aurum cafe interior with warm lighting and artisan coffee bar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(0.5) saturate(0.9)' }}
        />
        <div className="absolute inset-0 bg-[#1A0F0A]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A]/75 via-[#1A0F0A]/25 to-[#1A0F0A]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/55 via-transparent to-[#1A0F0A]/45" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#B8922A]" />
          <span className="text-[10px] tracking-[0.6em] text-[#D4AF6A] uppercase">Since 2008</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#B8922A]" />
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="display text-[clamp(72px,14vw,160px)] font-light leading-none tracking-tight text-[#F5F0E8]"
          >
            Aurum
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="display italic text-[clamp(20px,4vw,42px)] font-light text-[#D4AF6A] tracking-wide"
          >
            A sanctuary of exceptional taste
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 text-[13px] tracking-[0.2em] text-[#8C7B6B] uppercase max-w-sm mx-auto leading-loose"
        >
          Single-origin beans · Artisanal craft · Timeless ritual
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          <Link
            href="/menu"
            className="text-[11px] tracking-[0.4em] uppercase bg-[#B8922A] text-[#1A0F0A] px-10 py-4 hover:bg-[#D4AF6A] transition-colors duration-400 font-medium"
          >
            Explore Menu
          </Link>
          <a
            href="#story"
            className="text-[11px] tracking-[0.4em] uppercase border border-[#EDE8DC]/30 text-[#EDE8DC] px-10 py-4 hover:border-[#B8922A] hover:text-[#D4AF6A] transition-all duration-400"
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[9px] tracking-[0.5em] text-[#8C7B6B] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#B8922A] to-transparent"
        />
      </motion.div>
    </section>
  )
}
