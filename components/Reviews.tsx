'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'

const reviews = [
  {
    name: 'Élise Moreau',
    role: 'Paris · Regular guest',
    highlight: 'Pour-over ritual',
    text: 'The pour-over ritual here feels like theatre. Quiet, warm, and impossibly refined — my Sunday anchor.',
    rating: 5,
  },
  {
    name: 'James Whitfield',
    role: 'London · Food writer',
    highlight: 'Late-night dining',
    text: 'Aurum balances luxury and comfort without trying too hard. The late-night dinner service is a hidden gem.',
    rating: 5,
  },
  {
    name: 'Sofia Nakamura',
    role: 'Tokyo · Architect',
    highlight: 'Cortado perfection',
    text: 'Every detail — from the ceramic cups to the playlist — is considered. I have never tasted a cortado this perfect.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Singapore · Entrepreneur',
    highlight: 'Anniversary brunch',
    text: 'Reserved brunch for our anniversary. The team remembered our preferences. That level of care is rare.',
    rating: 5,
  },
  {
    name: 'Amélie Dubois',
    role: 'Lyon · Sommelier',
    highlight: 'Single-origin',
    text: 'Their single-origin selection rivals dedicated roasteries. The snacks menu pairs beautifully with natural wine.',
    rating: 5,
  },
  {
    name: 'Oliver Hart',
    role: 'New York · Photographer',
    highlight: 'Golden hour',
    text: 'The light in this space at golden hour is magical. And the flat white? Worth the flight alone.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Mumbai · Designer',
    highlight: 'Smart casual',
    text: 'Smart casual done right. Feels exclusive yet welcoming — exactly what a modern café should be.',
    rating: 5,
  },
  {
    name: 'Henrik Larsson',
    role: 'Stockholm · Chef',
    highlight: 'Pastries',
    text: 'Pastries are delicate without being fussy. The pistachio croissant might be the best in the Marais.',
    rating: 5,
  },
]

const featuredReviews = reviews.slice(0, 4)

const stats = [
  { value: '4.9', label: 'Average rating', suffix: '/5' },
  { value: '2,400', label: 'Guests last season', suffix: '+' },
  { value: '98', label: 'Would return', suffix: '%' },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

function StarRow({ count, size = 'sm' }: { count: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'text-lg gap-1.5' : 'text-sm gap-0.5'
  return (
    <div className={`flex ${sizeClass}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? 'text-[#D4AF6A]' : 'text-[#2C1810]'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({
  review,
  variant = 'marquee',
}: {
  review: (typeof reviews)[0]
  variant?: 'marquee' | 'compact'
}) {
  const isCompact = variant === 'compact'

  return (
    <article
      className={`review-card group flex-shrink-0 flex flex-col ${
        isCompact
          ? 'w-[300px] sm:w-[320px] mx-2 p-6 gap-4'
          : 'w-[340px] sm:w-[400px] mx-3 p-8 sm:p-9 gap-5'
      }`}
    >
      <span
        className="review-card-quote display pointer-events-none select-none"
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="relative z-[1] flex items-start justify-between gap-4">
        <StarRow count={review.rating} />
        <span className="review-card-tag">{review.highlight}</span>
      </div>

      <p
        className={`relative z-[1] display font-light italic text-[#EDE8DC] leading-relaxed ${
          isCompact ? 'text-lg' : 'text-xl sm:text-[1.35rem]'
        }`}
      >
        {review.text}
      </p>

      <div className="relative z-[1] flex items-center gap-4 pt-4 mt-auto border-t border-[#B8922A]/15">
        <div className="review-avatar" aria-hidden>
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <div className="text-[13px] text-[#F5F0E8] tracking-wide truncate">{review.name}</div>
          <div className="text-[10px] tracking-[0.28em] uppercase text-[#8C7B6B] mt-0.5 truncate">
            {review.role}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const rowOne = [...reviews, ...reviews]
  const rowTwo = [...reviews.slice(4), ...reviews.slice(0, 4), ...reviews.slice(4), ...reviews.slice(0, 4)]

  const advanceFeatured = useCallback(() => {
    setFeaturedIndex((i) => (i + 1) % featuredReviews.length)
  }, [])

  useEffect(() => {
    if (isPaused || !isInView) return
    const id = setInterval(advanceFeatured, 6000)
    return () => clearInterval(id)
  }, [isPaused, isInView, advanceFeatured])

  const featured = featuredReviews[featuredIndex]

  return (
    <section
      id="reviews"
      ref={ref}
      className="py-32 sm:py-40 bg-[#0D0704] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="display absolute -right-[5%] top-[8%] text-[28vw] font-light text-[#1A0F0A] leading-none tracking-tight">
          VOICES
        </span>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-[420px] bg-[#B8922A]/[0.07] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8922A]/25 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="text-[10px] tracking-[0.5em] text-[#B8922A] uppercase">Guest Voices</span>
            <div className="gold-line" />
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(38px,5.5vw,72px)] font-light text-[#F5F0E8]"
            >
              What Our Guests Say
            </motion.h2>
          </div>
          <p className="mt-5 text-[12px] tracking-[0.22em] text-[#8C7B6B] uppercase max-w-lg mx-auto leading-relaxed">
            Stories from those who make Aurum their ritual
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-3 gap-px max-w-3xl mx-auto mb-16 sm:mb-20 bg-[#B8922A]/10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0D0704] px-4 py-6 sm:py-8 text-center"
            >
              <div className="display text-[clamp(28px,4vw,44px)] font-light text-[#F5F0E8] leading-none">
                {stat.value}
                <span className="text-[#B8922A] text-[0.55em] align-top ml-0.5">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#8C7B6B]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="featured-review relative max-w-4xl mx-auto mb-20 sm:mb-24 px-6 sm:px-12 py-10 sm:py-14"
        >
          <span className="featured-review-glyph display" aria-hidden>
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={featured.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-[1] text-center"
            >
              <StarRow count={featured.rating} size="lg" />
              <blockquote className="mt-8 display text-[clamp(22px,3.2vw,36px)] font-light italic text-[#EDE8DC] leading-[1.45] max-w-3xl mx-auto">
                {featured.text}
              </blockquote>
              <footer className="mt-10 flex flex-col items-center gap-3">
                <div className="review-avatar review-avatar--lg">{initials(featured.name)}</div>
                <div>
                  <cite className="not-italic text-[14px] text-[#F5F0E8] tracking-wide">
                    {featured.name}
                  </cite>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#8C7B6B] mt-1">
                    {featured.role}
                  </div>
                </div>
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#B8922A]/80 mt-1">
                  {featured.highlight}
                </span>
              </footer>
            </motion.div>
          </AnimatePresence>

          <div className="relative z-[1] flex justify-center gap-2.5 mt-10">
            {featuredReviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setFeaturedIndex(i)}
                className={`review-dot ${i === featuredIndex ? 'review-dot--active' : ''}`}
                aria-label={`Show review from ${r.name}`}
                aria-current={i === featuredIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dual marquee */}
      <div className="space-y-5 sm:space-y-6">
        <MarqueeRow items={rowOne} direction="forward" />
        <MarqueeRow items={rowTwo} direction="reverse" variant="compact" />
      </div>

      <p className="relative z-[1] text-center mt-12 text-[9px] tracking-[0.35em] uppercase text-[#4A3020] px-6">
        Hover to pause · Curated from guest journals &amp; reservations
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[1] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-14 px-6"
      >
        <Link
          href="/menu"
          className="text-[11px] tracking-[0.4em] uppercase bg-[#B8922A] text-[#1A0F0A] px-10 py-4 hover:bg-[#D4AF6A] transition-colors duration-400 font-medium"
        >
          Explore the Menu
        </Link>
        <Link
          href="/reservations"
          className="text-[11px] tracking-[0.4em] uppercase border border-[#B8922A] text-[#D4AF6A] px-10 py-4 hover:bg-[#B8922A] hover:text-[#1A0F0A] transition-all duration-400"
        >
          Reserve
        </Link>
      </motion.div>
    </section>
  )
}

function MarqueeRow({
  items,
  direction,
  variant = 'marquee',
}: {
  items: (typeof reviews)[0][]
  direction: 'forward' | 'reverse'
  variant?: 'marquee' | 'compact'
}) {
  const trackClass =
    direction === 'forward' ? 'marquee-track' : 'marquee-track marquee-track--reverse'

  return (
    <div className="marquee-wrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#0D0704] via-[#0D0704]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#0D0704] via-[#0D0704]/90 to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden">
        <div className={`${trackClass} flex w-max py-1`}>
          {items.map((review, i) => (
            <ReviewCard key={`${review.name}-${direction}-${i}`} review={review} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  )
}
