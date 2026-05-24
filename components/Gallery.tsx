'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    alt: 'Cafe interior',
    span: 'row-span-2',
    aspect: 'aspect-auto h-full',
  },
  {
    src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80',
    alt: 'Espresso cup',
    span: '',
    aspect: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1507915600431-5292809c5ab7?w=600&q=80',
    alt: 'Latte art',
    span: '',
    aspect: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    alt: 'Coffee and book',
    span: 'col-span-2',
    aspect: 'aspect-[2/1]',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-40 px-6 bg-[#0D0704]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="gold-line" />
            <span className="text-[10px] tracking-[0.5em] text-[#B8922A] uppercase">Our Space</span>
            <div className="gold-line" />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(42px,6vw,80px)] font-light text-[#F5F0E8]"
            >
              The Ambiance
            </motion.h2>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-3 gap-3 auto-rows-[280px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.75) saturate(0.8)' }}
              />
              <div className="absolute inset-0 bg-[#1A0F0A]/0 group-hover:bg-[#1A0F0A]/20 transition-colors duration-500" />
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#B8922A]/0 group-hover:border-[#B8922A]/60 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#B8922A]/0 group-hover:border-[#B8922A]/60 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mt-24 max-w-2xl mx-auto"
        >
          <div className="display text-3xl italic font-light text-[#D4AF6A] leading-relaxed mb-6">
            "Coffee is not a beverage. It is a philosophy, a way of seeing the world through the lens of the moment."
          </div>
          <div className="text-[10px] tracking-[0.5em] text-[#8C7B6B] uppercase">— Marco Aureli, Founder</div>
        </motion.blockquote>
      </div>
    </section>
  )
}
