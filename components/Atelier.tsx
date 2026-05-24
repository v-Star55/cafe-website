'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const experiences = [
  {
    title: 'Cupping Sessions',
    description: 'Guided tasting rituals led by our head barista. Learn to discern terroir, process, and roast through all five senses.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    duration: '90 min',
    guests: '4–8',
  },
  {
    title: 'Latte Art Masterclass',
    description: 'From rosetta to swan — master the choreography of steam wand and milk under the guidance of our artisans.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    duration: '2 hrs',
    guests: '2–6',
  },
  {
    title: 'Private Roastery Tour',
    description: 'Step behind the velvet rope into our roastery. Witness green beans transform into the liquid gold of your morning.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    duration: '3 hrs',
    guests: '2–4',
  },
]

export default function Atelier() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="atelier" ref={sectionRef} className="py-40 px-6 relative overflow-hidden">
      {/* Side text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none">
        <span className="text-[10px] tracking-[0.8em] text-[#2C1810] uppercase whitespace-nowrap">Atelier · Experience</span>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="gold-line" />
              <span className="text-[10px] tracking-[0.5em] text-[#B8922A] uppercase">Exclusive Experiences</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="display text-[clamp(42px,6vw,80px)] font-light leading-tight text-[#F5F0E8]"
              >
                The Atelier
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[#8C7B6B] leading-loose text-[15px] lg:pb-4"
          >
            Beyond the cup lies a universe of craft and knowledge. Our atelier offers intimate 
            encounters with the art of coffee — for the curious, the connoisseur, and those 
            who simply wish to slow down and taste more deeply.
          </motion.p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-1">
          {experiences.map((exp, i) => (
            <ExperienceRow key={exp.title} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceRow({ exp, index }: { exp: typeof experiences[0], index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#2C1810] hover:border-[#B8922A]/40 transition-colors duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="lg:col-span-2 relative h-64 lg:min-h-[280px] overflow-hidden">
        <motion.div style={{ x }} className="absolute inset-0">
          <Image
            src={exp.image}
            alt={exp.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            style={{ filter: 'brightness(0.6) saturate(0.75)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A0F0A]/60 hidden lg:block" />
      </div>

      {/* Content */}
      <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-center">
        <div className="display text-[10px] tracking-[0.5em] text-[#B8922A] uppercase mb-4">
          0{index + 1}
        </div>
        <h3 className="display text-3xl font-light text-[#F5F0E8] mb-4">{exp.title}</h3>
        <p className="text-[#8C7B6B] text-[14px] leading-loose mb-8">{exp.description}</p>

        <div className="flex items-center gap-10">
          <div>
            <div className="text-[9px] tracking-[0.4em] uppercase text-[#8C7B6B] mb-1">Duration</div>
            <div className="display text-[#D4AF6A]">{exp.duration}</div>
          </div>
          <div className="w-px h-8 bg-[#2C1810]" />
          <div>
            <div className="text-[9px] tracking-[0.4em] uppercase text-[#8C7B6B] mb-1">Group Size</div>
            <div className="display text-[#D4AF6A]">{exp.guests}</div>
          </div>
          <div className="ml-auto">
            <motion.button
              whileHover={{ x: 6 }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF6A] border-b border-[#D4AF6A]/30 pb-1 hover:border-[#D4AF6A] transition-colors"
            >
              Book Experience
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
