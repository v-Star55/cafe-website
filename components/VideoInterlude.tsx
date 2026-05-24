'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function VideoInterlude() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="py-10 px-6">
      <motion.div
        style={{ scale, opacity }}
        className="relative max-w-7xl mx-auto overflow-hidden"
      >
        <div className="relative aspect-[21/9] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) saturate(0.7)' }}
          >
            <source src="/detail.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="display text-[clamp(28px,5vw,64px)] font-light text-[#F5F0E8] italic mb-4">
                Every detail, considered.
              </div>
              <div className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF6A]">
                From kitchen to bar
              </div>
            </div>
          </div>
          {/* Border frame */}
          <div className="absolute inset-4 border border-[#B8922A]/20 pointer-events-none" />
        </div>
      </motion.div>
    </section>
  )
}
