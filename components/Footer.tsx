'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer ref={ref} className="py-24 px-6 border-t border-[#2C1810]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="display text-4xl font-light tracking-[0.3em] text-[#D4AF6A] mb-3">AURUM</div>
            <div className="text-[9px] tracking-[0.5em] text-[#8C7B6B] uppercase mb-6">Refined Coffee Experience</div>
            <p className="text-[#8C7B6B] text-[13px] leading-loose max-w-xs">
              A sanctuary of exceptional coffee, artisanal pastries, and timeless elegance 
              in the heart of the city.
            </p>
          </div>

          {/* Hours */}
          <div>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8922A] mb-6">Hours</div>
            <div className="space-y-3">
              {[
                { day: 'Mon – Fri', hours: '7:00 – 21:00' },
                { day: 'Saturday', hours: '8:00 – 22:00' },
                { day: 'Sunday', hours: '9:00 – 20:00' },
              ].map((item) => (
                <div key={item.day} className="flex justify-between gap-4">
                  <span className="text-[12px] text-[#8C7B6B]">{item.day}</span>
                  <span className="text-[12px] text-[#EDE8DC]">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8922A] mb-6">Find Us</div>
            <address className="not-italic">
              <p className="text-[13px] text-[#EDE8DC] mb-2">12 Rue de la Paix</p>
              <p className="text-[13px] text-[#8C7B6B] mb-6">Paris, France 75001</p>
              <p className="text-[13px] text-[#8C7B6B]">+33 1 42 00 00 00</p>
              <p className="text-[13px] text-[#8C7B6B]">hello@aurum.cafe</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2C1810] gap-4">
          <div className="text-[10px] tracking-[0.3em] text-[#8C7B6B] uppercase">
            2024 Aurum. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            {['Instagram', 'Pinterest', 'Newsletter'].map((link) => (
              <a
                key={link}
                href="#"
                className="hover-underline text-[10px] tracking-[0.3em] uppercase text-[#8C7B6B] hover:text-[#D4AF6A] transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
