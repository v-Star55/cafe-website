'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  ADDRESS_FULL,
  CAFE_LOCATION_LABEL,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  PHONE,
  PHONE_PLACEHOLDER,
} from '@/lib/location'

const hours = [
  { day: 'Monday — Friday', time: '7:00 AM — 9:00 PM' },
  { day: 'Saturday', time: '8:00 AM — 10:00 PM' },
  { day: 'Sunday', time: '9:00 AM — 8:00 PM' },
  { day: 'Public Holidays', time: '10:00 AM — 6:00 PM' },
]

const details = [
  { label: 'Address', value: ADDRESS_FULL },
  { label: 'Phone', value: PHONE },
  { label: 'Email', value: 'hello@aurum.cafe' },
  { label: 'Dress Code', value: 'Smart casual' },
]

type ServicePeriod = 'brunch' | 'snacks' | 'dinner' | 'late-night'

const SERVICE_PERIODS: { value: ServicePeriod; label: string; start: number; end: number }[] = [
  { value: 'brunch', label: 'Brunch', start: 10 * 60, end: 16 * 60 },
  { value: 'snacks', label: 'Snacks', start: 16 * 60, end: 19 * 60 },
  { value: 'dinner', label: 'Dinner', start: 19 * 60, end: 22 * 60 },
  { value: 'late-night', label: 'Late Night Dinner', start: 22 * 60, end: 24 * 60 },
]

const SLOT_DURATION_MINUTES = 45

function formatMinutes12h(totalMinutes: number): string {
  const h24 = Math.floor(totalMinutes / 60) % 24
  const mins = totalMinutes % 60
  const period = h24 >= 12 ? 'PM' : 'AM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${mins.toString().padStart(2, '0')} ${period}`
}

function minutesToTimeValue(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

function generateTimeSlots(startMinutes: number, endMinutes: number): { value: string; label: string }[] {
  const slots: { value: string; label: string }[] = []
  let current = startMinutes
  while (current + SLOT_DURATION_MINUTES <= endMinutes) {
    slots.push({
      value: minutesToTimeValue(current),
      label: formatMinutes12h(current),
    })
    current += SLOT_DURATION_MINUTES
  }
  return slots
}

function getSlotsForPeriod(period: ServicePeriod | '') {
  if (!period) return []
  const config = SERVICE_PERIODS.find((p) => p.value === period)
  if (!config) return []
  return generateTimeSlots(config.start, config.end)
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function formatTimeFromValue(timeValue: string): string {
  const [h, m] = timeValue.split(':').map(Number)
  return formatMinutes12h(h * 60 + m)
}

export default function Reservations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    servicePeriod: '' as ServicePeriod | '',
    timeSlot: '',
    guests: '',
    occasion: '',
    message: '',
  })

  const timeSlots = getSlotsForPeriod(form.servicePeriod)
  const selectedPeriodLabel = SERVICE_PERIODS.find((p) => p.value === form.servicePeriod)?.label

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.servicePeriod || !form.timeSlot) return
    setSubmitted(true)
  }

  return (
    <section id="reservations" ref={ref} className="py-40 px-6 bg-[#0D0704] relative overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="display text-[20vw] font-light text-[#1A0F0A] tracking-widest whitespace-nowrap">
          RESERVE
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="gold-line" />
            <span className="text-[10px] tracking-[0.5em] text-[#B8922A] uppercase">Secure Your Table</span>
            <div className="gold-line" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(42px,6vw,80px)] font-light text-[#F5F0E8]"
            >
              Reservations
            </motion.h2>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">

          {/* LEFT — Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col"
          >
            {/* Cafe photo */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src="/modern-cafe-house.jpg"
                alt="Aurum cafe interior"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.7) saturate(0.75)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0704] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <div className="display text-sm italic text-[#D4AF6A]">{CAFE_LOCATION_LABEL}</div>
              </div>
            </div>

            {/* Hours block */}
            <div className="bg-[#120A06] border border-[#2C1810] border-t-0 p-8 flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-px bg-[#B8922A]" />
                <span className="text-[9px] tracking-[0.5em] uppercase text-[#B8922A]">Opening Hours</span>
              </div>

              <div className="space-y-5 mb-10">
                {hours.map((h, i) => (
                  <motion.div
                    key={h.day}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start justify-between gap-4 pb-5 border-b border-[#1E1008] last:border-0 last:pb-0"
                  >
                    <span className="text-[12px] text-[#8C7B6B] leading-relaxed">{h.day}</span>
                    <span className="text-[12px] text-[#EDE8DC] text-right flex-shrink-0">{h.time}</span>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#2C1810] to-transparent mb-8" />

              {/* Details */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-px bg-[#B8922A]" />
                <span className="text-[9px] tracking-[0.5em] uppercase text-[#B8922A]">Visit Us</span>
              </div>

              <div className="space-y-4">
                {details.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.08 }}
                  >
                    <div className="text-[9px] tracking-[0.4em] uppercase text-[#4A3020] mb-1">{d.label}</div>
                    <div className="text-[13px] text-[#EDE8DC]">{d.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.3 }}
                className="mt-10 pt-6 border-t border-[#1E1008]"
              >
                <p className="text-[11px] text-[#4A3020] leading-loose italic">
                  Walk-ins are welcomed subject to availability. We recommend reserving at least 48 hours in advance for weekend visits.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Form + map */}
          <div className="lg:col-span-3 flex flex-col gap-1">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center text-center py-20 border border-[#B8922A]/30"
              >
                <div>
                  <div className="display text-3xl font-light text-[#D4AF6A] italic mb-4">Thank you, {form.name}.</div>
                  <p className="text-[#8C7B6B] text-sm tracking-wide">
                    {form.date && selectedPeriodLabel && form.timeSlot && (
                      <>
                        {selectedPeriodLabel} · {formatTimeFromValue(form.timeSlot)} · {form.date}
                        <br />
                      </>
                    )}
                    Your reservation request has been received.<br />We will confirm within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="space-y-1 w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <InputField
                    label="Full Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Marco Aureli"
                    required
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder={PHONE_PLACEHOLDER}
                    required
                  />
                </div>
                <InputField
                  label="Reservation Date"
                  type="date"
                  value={form.date}
                  onChange={(v) => setForm({ ...form, date: v })}
                  min={todayISO()}
                  required
                />

                <SelectField
                  label="Select Service Period"
                  value={form.servicePeriod}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      servicePeriod: v as ServicePeriod | '',
                      timeSlot: '',
                    })
                  }
                  required
                  placeholder="Choose a service period"
                  options={SERVICE_PERIODS.map((p) => ({
                    value: p.value,
                    label: `${p.label} · ${formatMinutes12h(p.start)} — ${formatMinutes12h(p.end)}`,
                  }))}
                />

                {form.servicePeriod && (
                  <div className="bg-[#120A06] border border-[#2C1810] p-6">
                    <label className="block text-[9px] tracking-[0.5em] uppercase text-[#8C7B6B] mb-1">
                      Select Time Slot
                    </label>
                    <p className="text-[11px] text-[#4A3020] mb-4">
                      {selectedPeriodLabel} · 45-minute seating · {timeSlots.length} slots available
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                      {timeSlots.map((slot) => {
                        const selected = form.timeSlot === slot.value
                        return (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => setForm({ ...form, timeSlot: slot.value })}
                            className={`py-3 px-2 text-[12px] tracking-wide border transition-colors duration-200 ${
                              selected
                                ? 'border-[#B8922A] bg-[#B8922A]/15 text-[#D4AF6A]'
                                : 'border-[#2C1810] text-[#8C7B6B] hover:border-[#B8922A]/40 hover:text-[#EDE8DC]'
                            }`}
                          >
                            {slot.label}
                          </button>
                        )
                      })}
                    </div>
                    {!form.timeSlot && (
                      <p className="text-[10px] text-[#4A3020] mt-3 italic">Please select a time slot to continue.</p>
                    )}
                  </div>
                )}

                <InputField
                  label="Number of Guests"
                  type="number"
                  value={form.guests}
                  onChange={(v) => setForm({ ...form, guests: v })}
                  placeholder="2"
                  min={1}
                  max={20}
                  required
                />

                <SelectField
                  label="Occasion"
                  value={form.occasion}
                  onChange={(v) => setForm({ ...form, occasion: v })}
                  placeholder="Select an occasion"
                  options={[
                    { value: 'casual', label: 'Casual Visit' },
                    { value: 'business', label: 'Business Meeting' },
                    { value: 'anniversary', label: 'Anniversary' },
                    { value: 'birthday', label: 'Birthday Celebration' },
                    { value: 'other', label: 'Other' },
                  ]}
                />

                <div className="bg-[#120A06] border border-[#2C1810] focus-within:border-[#B8922A]/60 transition-colors">
                  <label className="block text-[9px] tracking-[0.5em] uppercase text-[#8C7B6B] pt-4 px-6 pb-1">
                    Special Requests
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full bg-transparent px-6 pb-4 text-[14px] text-[#EDE8DC] placeholder-[#3C2A1E] focus:outline-none resize-none"
                    placeholder="Dietary requirements, seating preference, occasion details..."
                  />
                </div>

                <div className="pt-1">
                  <motion.button
                    whileHover={form.servicePeriod && form.timeSlot ? { backgroundColor: '#D4AF6A' } : {}}
                    whileTap={form.servicePeriod && form.timeSlot ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={!form.servicePeriod || !form.timeSlot}
                    className="w-full bg-[#B8922A] text-[#1A0F0A] py-5 text-[11px] tracking-[0.5em] uppercase font-medium transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Request Reservation
                  </motion.button>
                </div>

                <p className="text-[10px] text-[#3C2A1E] text-center pt-2 tracking-wide">
                  Confirmation sent within 24 hours · Cancellations accepted up to 24 hrs prior
                </p>
              </motion.form>
            )}

            {/* Location map — directly below form */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="w-4 h-px bg-[#B8922A]" />
                <span className="text-[9px] tracking-[0.5em] uppercase text-[#B8922A]">Location</span>
              </div>

              <div className="relative border border-[#2C1810] overflow-hidden">
                <div className="relative aspect-[16/9] min-h-[220px] sm:min-h-[260px]">
              <iframe
                title="Aurum cafe location on map"
                src={MAP_EMBED_URL}
                className="absolute inset-0 w-full h-full border-0 grayscale-[40%] contrast-[1.05] brightness-[0.85]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#B8922A]/10" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#120A06] border-t border-[#2C1810] px-6 py-5">
              <div>
                <div className="text-[9px] tracking-[0.4em] uppercase text-[#4A3020] mb-1">{CAFE_LOCATION_LABEL}</div>
                <div className="text-[13px] text-[#EDE8DC]">{ADDRESS_FULL}</div>
              </div>
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-[#B8922A]/40 text-[#D4AF6A] px-6 py-3 text-[10px] tracking-[0.4em] uppercase hover:bg-[#B8922A]/10 transition-colors duration-300 flex-shrink-0"
              >
                Get Directions
              </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>


      </div>
    </section>
  )
}

function InputField({
  label, value, onChange, placeholder, type = 'text', required, min, max,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  min?: string | number
  max?: string | number
}) {
  return (
    <div className="bg-[#120A06] border border-[#2C1810] focus-within:border-[#B8922A]/60 transition-colors">
      <label className="block text-[9px] tracking-[0.5em] uppercase text-[#8C7B6B] pt-4 px-6 pb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="w-full bg-transparent px-6 pb-4 text-[14px] text-[#EDE8DC] placeholder-[#3C2A1E] focus:outline-none [color-scheme:dark]"
      />
    </div>
  )
}

function SelectField({
  label, value, onChange, options, placeholder, required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="bg-[#120A06] border border-[#2C1810] focus-within:border-[#B8922A]/60 transition-colors">
      <label className="block text-[9px] tracking-[0.5em] uppercase text-[#8C7B6B] pt-4 px-6 pb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent px-6 pb-4 text-[14px] text-[#EDE8DC] focus:outline-none appearance-none cursor-pointer"
        style={{ colorScheme: 'dark' }}
      >
        <option value="" style={{ background: '#120A06' }}>
          {placeholder ?? 'Select…'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#120A06' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
