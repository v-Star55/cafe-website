'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function Story() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const imageRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section id="story" ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Background text */}
      <div className="absolute top-20 left-0 right-0 text-center pointer-events-none select-none overflow-hidden">
        <span className="display text-[18vw] font-light text-[#2C1810]/30 tracking-[0.2em] whitespace-nowrap">
          STORY
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left - Images */}
          <div ref={imageRef} className="relative">
            {/* Main image */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={imageInView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/coffee-in-mug.jpg"
                alt="Espresso pouring into a cup with steam rising"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/40 to-transparent" />
            </motion.div>

            {/* Floating secondary image */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40 }}
              animate={imageInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -right-10 w-48 h-64 overflow-hidden border-4 border-[#1A0F0A]"
            >
              <Image
                src="/beans.jpg"
                alt="Close-up of roasted coffee beans"
                fill
                className="object-cover"
                sizes="192px"
              />
            </motion.div>

            {/* Gold accent */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={imageInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -left-4 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-[#B8922A] to-transparent origin-top"
            />
          </div>

          {/* Right - Text */}
          <div className="lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="gold-line" />
              <span className="text-[10px] tracking-[0.5em] text-[#B8922A] uppercase">Our Heritage</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="display text-[clamp(42px,6vw,72px)] font-light leading-tight text-[#F5F0E8]"
              >
                Born from a love
                <br />
                <span className="italic text-[#D4AF6A]">of the ritual</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[#8C7B6B] leading-loose text-[15px] mb-6"
            >
              Aurum was founded on a singular conviction: that coffee, prepared with reverence 
              and served with grace, is among life's most profound pleasures. We source only 
              the most exceptional single-origin beans — from the volcanic highlands of Ethiopia 
              to the misty slopes of Guatemalan mountains.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="text-[#8C7B6B] leading-loose text-[15px] mb-10"
            >
              Every cup is a conversation between the earth's terroir and the barista's art — 
              a fleeting meditation in a world that moves too quickly.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-10 border-t border-[#2C1810]"
            >
              {[
                { number: '16', label: 'Origins sourced' },
                { number: '8', label: 'Master baristas' },
                { number: '34k', label: 'Cups monthly' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="display text-3xl font-light text-[#D4AF6A] mb-1">{stat.number}</div>
                  <div className="text-[10px] tracking-[0.3em] text-[#8C7B6B] uppercase">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
