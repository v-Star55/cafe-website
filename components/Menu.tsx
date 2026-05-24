'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/** True on desktop with mouse; false on phones/tablets (touch). */
function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setPrefersHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return prefersHover
}

const categories = [
  'All',
  'Coffee',
  'Iced Coffee',
  'Tea',
  'Pasta',
  'Pizza',
  'Burgers',
  'Cocktails',
  'Pastries',
  'Breakfast',
]

type MenuItem = {
  name: string
  category: string
  description: string
  price: string
  image: string
  tag: string | null
  popular?: boolean
  chefSpecial?: boolean
}

const menuItems: MenuItem[] = [
  // Coffee
  {
    name: 'Single Origin Pour-Over',
    category: 'Coffee',
    description: 'Ethiopian Yirgacheffe, hand-poured through Hario V60, four-minute extraction',
    price: '18',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    tag: 'Signature',
    popular: true,
  },
  {
    name: 'Cortado Noir',
    category: 'Coffee',
    description: 'Double ristretto, steamed microfoam, demitasse — our most-ordered morning ritual',
    price: '9',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
    tag: 'Popular',
    popular: true,
  },
  {
    name: 'Oat Flat White',
    category: 'Coffee',
    description: 'House blend espresso, barista oat, silk microfoam, cocoa dust finish',
    price: '11',
    image: '/menu-oat-flat-white.jpg',
    tag: null,
    popular: true,
  },
  {
    name: 'Lavender Honey Latte',
    category: 'Coffee',
    description: 'Provence lavender syrup, wildflower honey, double shot, edible gold leaf',
    price: '15',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    tag: "Chef's Pick",
    chefSpecial: true,
  },
  // Iced Coffee
  {
    name: 'Cold Brew Reserve',
    category: 'Iced Coffee',
    description: 'Sumatra Mandheling, 24-hour cold steep, served over crystal-clear ice',
    price: '14',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80',
    tag: null,
    popular: true,
  },
  {
    name: 'Vietnamese Iced Coffee',
    category: 'Iced Coffee',
    description: 'Robusta espresso, sweetened condensed milk, shaken over ice',
    price: '12',
    image: '/menu-vietnamese-iced-coffee.jpg',
    tag: 'Bestseller',
    popular: true,
  },
  {
    name: 'Salted Caramel Iced Latte',
    category: 'Iced Coffee',
    description: 'Double espresso, house caramel, sea salt, oat milk, served over ice',
    price: '13',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    tag: 'Seasonal',
    popular: true,
  },
  {
    name: 'Espresso Tonic',
    category: 'Iced Coffee',
    description: 'Double shot over Fever-Tree tonic, orange peel, cracked ice',
    price: '11',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    tag: null,
  },
  // Tea
  {
    name: 'Ceremonial Matcha',
    category: 'Tea',
    description: 'Uji ceremonial grade, oat milk, light agave, cold stone blend',
    price: '16',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80',
    tag: 'Seasonal',
    popular: true,
  },
  {
    name: 'Jasmine Silver Needle',
    category: 'Tea',
    description: 'Fujian white tea, jasmine blossoms, served at 78°C in porcelain gaiwan',
    price: '13',
    image: '/menu-jasmine-tea.jpg',
    tag: null,
    popular: true,
  },
  // Pasta
  {
    name: 'Truffle Tagliatelle',
    category: 'Pasta',
    description: 'Fresh egg pasta, black truffle butter, Parmigiano, chive, cracked pepper',
    price: '26',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    tag: "Chef's Pick",
    chefSpecial: true,
    popular: true,
  },
  {
    name: 'Cacio e Pepe',
    category: 'Pasta',
    description: 'Tonnarelli, Pecorino Romano, Tellicherry pepper, pasta water emulsion',
    price: '22',
    image: '/menu-cacio-e-pepe.jpg',
    tag: 'Classic',
    popular: true,
  },
  {
    name: 'Pomodoro Basilico',
    category: 'Pasta',
    description: 'Rigatoni, San Marzano tomato, garlic confit, fresh basil, burrata',
    price: '20',
    image: '/menu-pomodoro-basilico.jpg',
    tag: null,
  },
  // Pizza
  {
    name: 'Margherita D.O.P.',
    category: 'Pizza',
    description: '00 flour dough, fior di latte, San Marzano, basil, EVOO',
    price: '19',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    tag: 'Signature',
    popular: true,
  },
  {
    name: 'Prosciutto & Rocket',
    category: 'Pizza',
    description: '24-hour dough, mozzarella, Parma ham, arugula, shaved Grana Padano',
    price: '24',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    tag: null,
    chefSpecial: true,
  },
  {
    name: 'Funghi & Taleggio',
    category: 'Pizza',
    description: 'Wild mushrooms, taleggio, thyme, truffle oil, white base',
    price: '23',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    tag: 'Seasonal',
  },
  // Burgers
  {
    name: 'Aurum Classic Burger',
    category: 'Burgers',
    description: 'Dry-aged beef patty, comté, caramelized onion, house sauce, brioche',
    price: '21',
    image: '/menu-aurum-classic-burger.jpg',
    tag: 'Bestseller',
    popular: true,
  },
  {
    name: 'Truffle Mushroom Burger',
    category: 'Burgers',
    description: 'Grilled portobello & beef blend, truffle aioli, Swiss, arugula, sesame bun',
    price: '23',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
    tag: "Chef's Pick",
    chefSpecial: true,
  },
  {
    name: 'Crispy Chicken Burger',
    category: 'Burgers',
    description: 'Buttermilk fried chicken, pickled slaw, chipotle mayo, potato bun',
    price: '19',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    tag: null,
    popular: true,
  },
  // Cocktails
  {
    name: 'Espresso Martini',
    category: 'Cocktails',
    description: 'Vodka, fresh espresso, coffee liqueur, vanilla, three-bean foam',
    price: '16',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
    tag: 'Signature',
    popular: true,
  },
  {
    name: 'Aperol Spritz',
    category: 'Cocktails',
    description: 'Aperol, Prosecco, soda, orange wheel — golden hour in a glass',
    price: '14',
    image: '/menu-aperol-spritz.jpg',
    tag: null,
    popular: true,
  },
  {
    name: 'Negroni Classico',
    category: 'Cocktails',
    description: 'Gin, Campari, sweet vermouth, orange peel, large rock',
    price: '15',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
    tag: 'Classic',
    chefSpecial: true,
  },
  {
    name: 'Lavender Gin Fizz',
    category: 'Cocktails',
    description: 'London dry gin, lavender syrup, lemon, egg white, soda top',
    price: '15',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80',
    tag: 'Seasonal',
  },
  // Pastries & Breakfast
  {
    name: 'Croissant au Beurre',
    category: 'Pastries',
    description: '72-hour laminated dough, Normandy AOP butter, sea salt fleur de sel',
    price: '12',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
    tag: null,
  },
  {
    name: 'Pistachio Croissant',
    category: 'Pastries',
    description: 'Laminated layers, Sicilian pistachio crème, crushed pistachio, orange zest',
    price: '14',
    image: '/menu-pistachio-croissant.jpg',
    tag: 'Seasonal',
    chefSpecial: true,
  },
  {
    name: 'Pain au Chocolat',
    category: 'Pastries',
    description: 'Valrhona 70% batons, butter laminate, dusted cocoa, same-day bake',
    price: '11',
    image: '/menu-pain-au-chocolat.jpg',
    tag: null,
  },
  {
    name: 'Avocado Toast Classique',
    category: 'Breakfast',
    description: 'Sourdough levain, Hass avocado, radish, microgreens, 62-degree egg',
    price: '22',
    image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?w=600&q=80',
    tag: 'Bestseller',
    chefSpecial: true,
  },
  {
    name: 'Truffle Eggs Benedict',
    category: 'Breakfast',
    description: 'Brioche muffin, black truffle hollandaise, Ibérico ham, chive oil',
    price: '28',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
    tag: "Chef's Pick",
    chefSpecial: true,
  },
  {
    name: 'Granola Parfait',
    category: 'Breakfast',
    description: 'House granola, Greek yogurt, seasonal compote, bee pollen, mint',
    price: '16',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    tag: null,
  },
]

const guestFavorites = menuItems
  .filter((item) => item.popular)
  .slice(0, 8)

const chefSpecials = menuItems.filter((item) => item.chefSpecial)

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const fullMenuRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const openFullMenu = useCallback((category: string) => {
    setActiveCategory(category)
    requestAnimationFrame(() => {
      fullMenuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const filtered =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" ref={ref} className="py-32 sm:py-40 px-6 bg-[#120A06] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[340px] sm:h-[420px] opacity-45">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
            alt=""
            fill
            priority
            className="object-cover object-top"
            style={{ filter: 'brightness(0.45) saturate(0.8)' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120A06]/30 via-[#120A06]/70 to-[#120A06]" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(90vw,640px)] h-[360px] bg-[#B8922A]/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="gold-line" />
            <span className="text-[10px] tracking-[0.5em] text-[#B8922A] uppercase">Our Offerings</span>
            <div className="gold-line" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(48px,8vw,96px)] font-light text-[#F5F0E8]"
            >
              The Menu
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 text-[12px] tracking-[0.22em] text-[#8C7B6B] uppercase max-w-md mx-auto leading-relaxed"
          >
            Coffee · Pasta · Pizza · Burgers · Cocktails
          </motion.p>
        </div>

        {/* Featured carousels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-16 sm:space-y-20 mb-20 sm:mb-28"
        >
          <MenuCarousel
            title="Guest Favorites"
            subtitle="From morning coffee to evening cocktails"
            items={guestFavorites}
            accent="guest"
            onViewInFullMenu={openFullMenu}
          />
          <MenuCarousel
            title="Chef's Special"
            subtitle="Limited creations from our kitchen"
            items={chefSpecials}
            accent="chef"
            onViewInFullMenu={openFullMenu}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.85, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.45 }}
          className="relative mb-16 sm:mb-20"
        >
          <div className="relative rounded-[2rem] overflow-hidden border border-[#B8922A]/20 h-[220px] sm:h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80"
              alt="Cocktails and small plates at Aurum"
              fill
              className="object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.9)' }}
              sizes="(max-width: 640px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#120A06]/80 via-[#120A06]/40 to-[#120A06]/75" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#B8922A] mb-4">All Day Aurum</p>
                <h3 className="display text-[clamp(28px,4.5vw,52px)] font-light text-[#F5F0E8] leading-tight">
                  Morning espresso, lunch at the table, cocktails at dusk
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full menu divider */}
        <motion.div
          ref={fullMenuRef}
          id="menu-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col items-center mb-14 sm:mb-16 scroll-mt-28"
        >
          <div className="flex items-center gap-6 w-full max-w-xl mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#B8922A]/40" />
            <span className="text-[10px] tracking-[0.45em] text-[#B8922A] uppercase whitespace-nowrap">
              Full Menu
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#B8922A]/40" />
          </div>
          <p className="text-[11px] tracking-[0.2em] text-[#8C7B6B] uppercase text-center">
            Browse every category
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-14 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[0.4em] uppercase px-6 py-2.5 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-[#B8922A] bg-[#B8922A] text-[#1A0F0A]'
                  : 'border-[#2C1810] text-[#8C7B6B] hover:border-[#B8922A] hover:text-[#D4AF6A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2C1810]">
          {filtered.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#8C7B6B] text-sm tracking-wide py-16">
            No items in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}

function MenuCarousel({
  title,
  subtitle,
  items,
  accent,
  onViewInFullMenu,
}: {
  title: string
  subtitle: string
  items: MenuItem[]
  accent: 'guest' | 'chef'
  onViewInFullMenu: (category: string) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8)

    const cards = el.querySelectorAll<HTMLElement>('[data-carousel-card]')
    if (!cards.length) return

    let closest = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - el.scrollLeft - 24)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    setActiveIndex(closest)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState, items.length])

  const scrollToIndex = (index: number) => {
    const el = trackRef.current
    const card = el?.querySelectorAll<HTMLElement>('[data-carousel-card]')[index]
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
  }

  const scrollByDirection = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(items.length - 1, activeIndex + dir))
    scrollToIndex(next)
  }

  const badgeLabel = accent === 'chef' ? "Chef's Table" : 'Guest Favorite'

  return (
    <div className="menu-carousel-section">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 px-0 sm:px-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`menu-carousel-badge ${
                accent === 'chef' ? 'menu-carousel-badge--chef' : ''
              }`}
            >
              {badgeLabel}
            </span>
          </div>
          <h3 className="display text-[clamp(28px,4vw,44px)] font-light text-[#F5F0E8]">{title}</h3>
          <p className="mt-1 text-[11px] tracking-[0.18em] text-[#8C7B6B] uppercase">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollByDirection(-1)}
            disabled={!canScrollLeft}
            className="menu-carousel-nav"
            aria-label={`Previous ${title} item`}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection(1)}
            disabled={!canScrollRight}
            className="menu-carousel-nav"
            aria-label={`Next ${title} item`}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div className="menu-carousel-wrap relative -mx-6 sm:mx-0">
        <div className="absolute left-0 top-0 bottom-4 w-12 sm:w-20 bg-gradient-to-r from-[#120A06] via-[#120A06]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-12 sm:w-20 bg-gradient-to-l from-[#120A06] via-[#120A06]/90 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="menu-carousel-track flex gap-4 sm:gap-5 overflow-x-auto px-6 sm:px-1 pb-2 scroll-smooth"
        >
          {items.map((item, i) => (
            <CarouselCard
              key={item.name}
              item={item}
              index={i}
              accent={accent}
              onViewInFullMenu={onViewInFullMenu}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => scrollToIndex(i)}
            className={`review-dot ${i === activeIndex ? 'review-dot--active' : ''}`}
            aria-label={`Go to ${item.name}`}
            aria-current={i === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function CarouselCard({
  item,
  index,
  accent,
  onViewInFullMenu,
}: {
  item: MenuItem
  index: number
  accent: 'guest' | 'chef'
  onViewInFullMenu: (category: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const prefersHover = usePrefersHover()
  const showCta = prefersHover !== true || hovered
  const active = showCta

  return (
    <motion.article
      data-carousel-card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`menu-carousel-card flex-shrink-0 w-[min(88vw,380px)] sm:w-[400px] flex flex-col sm:flex-row overflow-hidden group ${
        accent === 'chef' ? 'menu-carousel-card--chef' : ''
      }`}
    >
      <div className="relative h-48 sm:h-auto sm:w-[42%] sm:min-h-[220px] overflow-hidden">
        <motion.div
          animate={{ scale: active ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.72) saturate(0.85)' }}
            sizes="(max-width: 640px) 88vw, 400px"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#160E08] via-transparent to-transparent sm:from-[#160E08]/80" />
        {item.tag && (
          <div className="absolute top-3 left-3 text-[8px] tracking-[0.35em] uppercase bg-[#B8922A] text-[#1A0F0A] px-2.5 py-1">
            {item.tag}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-7 flex-1 min-w-0">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#B8922A]/70 mb-2">
          {item.category}
        </span>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="display text-xl font-light text-[#F5F0E8] leading-tight">{item.name}</h4>
          <span className="display text-[#D4AF6A] text-lg flex-shrink-0">${item.price}</span>
        </div>
        <p className="text-[11px] text-[#8C7B6B] leading-relaxed line-clamp-3">{item.description}</p>
        <motion.div
          animate={{ opacity: showCta ? 1 : 0, y: showCta ? 0 : 4 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => onViewInFullMenu(item.category)}
            className="mt-4 text-[9px] tracking-[0.35em] uppercase text-[#B8922A] hover:text-[#F5F0E8] transition-colors text-left"
          >
            View in full menu ↓
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[#B8922A] origin-left"
      />
    </motion.article>
  )
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const prefersHover = usePrefersHover()
  const showCta = prefersHover !== true || hovered
  const active = showCta

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-[#120A06] overflow-hidden group"
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div
          animate={{ scale: active ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.7) saturate(0.8)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120A06] via-transparent to-transparent" />

        {item.tag && (
          <div className="absolute top-4 right-4 text-[9px] tracking-[0.4em] uppercase bg-[#B8922A] text-[#1A0F0A] px-3 py-1">
            {item.tag}
          </div>
        )}
        {(item.popular || item.chefSpecial) && (
          <div className="absolute top-4 left-4 flex gap-1.5">
            {item.popular && (
              <span className="text-[8px] tracking-[0.25em] uppercase border border-[#D4AF6A]/40 text-[#D4AF6A] px-2 py-0.5 bg-[#120A06]/80">
                Popular
              </span>
            )}
            {item.chefSpecial && (
              <span className="text-[8px] tracking-[0.25em] uppercase border border-[#B8922A]/50 text-[#B8922A] px-2 py-0.5 bg-[#120A06]/80">
                Chef
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="display text-xl font-light text-[#F5F0E8] leading-tight">{item.name}</h3>
          <span className="display text-[#D4AF6A] text-lg ml-4 flex-shrink-0">${item.price}</span>
        </div>

        <p className="text-[12px] text-[#8C7B6B] leading-relaxed mb-4">{item.description}</p>

        <motion.div
          animate={{ opacity: showCta ? 1 : 0, y: showCta ? 0 : 6 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/reservations"
            className="inline-block text-[10px] tracking-[0.4em] uppercase text-[#B8922A] hover:text-[#F5F0E8] transition-colors py-1"
            onClick={(e) => e.stopPropagation()}
          >
            Add to order &rarr;
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[#B8922A] origin-left pointer-events-none"
      />
    </motion.div>
  )
}
