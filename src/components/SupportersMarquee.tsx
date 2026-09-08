import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useBrandChrome } from '../hooks/brandChrome'
import styles from './SupportersMarquee.module.css'

const SUPPORT_BRANDS = [
  {
    id: 'endeavor-cuyo',
    name: 'Endeavor Cuyo',
    src: '/brands/endeavor-cuyo.png',
    href: 'https://www.endeavor.org.ar/',
    width: 241,
    height: 241,
  },
  {
    id: 'cuyoconnect',
    name: 'CuyoConnect',
    src: '/brands/cuyoconnect.png',
    href: 'https://cuyoconnect.com/',
    width: 636,
    height: 716,
  },
  {
    id: 'embarca',
    name: 'embarca',
    src: '/brands/embarca.png',
    href: 'https://www.embarca.tech/',
    width: 916,
    height: 242,
  },
  {
    id: 'quienvino',
    name: 'QuienVino',
    src: '/brands/quienvino.png',
    href: 'https://www.quienvino.com/',
    width: 152,
    height: 161,
  },
  {
    id: 'lodo',
    name: 'LODO',
    src: '/brands/lodo.png',
    href: 'https://espaciolodo.com/',
    width: 529,
    height: 196,
  },
  {
    id: 'polotic',
    name: 'Polo TIC Mendoza',
    src: '/brands/polotic.png',
    href: 'https://poloticmendoza.org/',
    width: 736,
    height: 715,
  },
  {
    id: 'agencia-mendoza',
    name: 'Agencia de Innovación y Gobierno de Mendoza',
    src: '/brands/agencia-mendoza.png',
    href: 'https://competitividadmendoza.com.ar/agencia-innovacion/',
    width: 1315,
    height: 305,
  },
  {
    id: 'mendoza-ciudad',
    name: 'Mendoza Ciudad',
    src: '/brands/mendoza-ciudad.png',
    href: 'https://ciudaddemendoza.gob.ar/',
    width: 816,
    height: 279,
  },
] as const

type Brand = (typeof SUPPORT_BRANDS)[number]

/* Phones only fit two marks at a legible size, so they rotate through
   four pairs instead of two rows of four. */
function toSets(perView: number): Brand[][] {
  const sets: Brand[][] = []
  for (let i = 0; i < SUPPORT_BRANDS.length; i += perView) {
    sets.push(SUPPORT_BRANDS.slice(i, i + perView))
  }
  return sets
}

const ROTATE_MS = 3800
const EASE_OUT = [0.22, 1, 0.36, 1] as const
const EASE_IN = [0.4, 0, 1, 1] as const

function BrandSlot({
  brand,
  index,
  animate,
}: {
  brand: Brand
  index: number
  animate: boolean
}) {
  return (
    <motion.a
      className={styles.slot}
      data-brand={brand.id}
      href={brand.href}
      target="_blank"
      rel="noreferrer"
      initial={animate ? { y: '70%', opacity: 0, filter: 'blur(8px)' } : false}
      animate={{
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.7,
          delay: animate ? 0.08 * index : 0,
          ease: EASE_OUT,
        },
      }}
      exit={
        animate
          ? {
              y: '-70%',
              opacity: 0,
              filter: 'blur(8px)',
              transition: { duration: 0.35, ease: EASE_IN },
            }
          : undefined
      }
    >
      <img
        className={styles.logo}
        src={brand.src}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        decoding="async"
        draggable={false}
      />
    </motion.a>
  )
}

export function SupportersMarquee({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion()
  const { narrow } = useBrandChrome()
  const bandRef = useRef<HTMLDivElement>(null)
  const inView = useInView(bandRef, { amount: 0.01 })
  const [setIndex, setSetIndex] = useState(0)
  const [hidden, setHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  )
  const sets = useMemo(() => toSets(narrow ? 2 : 4), [narrow])
  const currentSet = sets[setIndex % sets.length]
  const live = active && !reduce && inView && !hidden

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!live) return

    const id = window.setInterval(() => {
      setSetIndex((index) => (index + 1) % sets.length)
    }, ROTATE_MS)

    return () => window.clearInterval(id)
  }, [live, sets.length])

  return (
    <div className={styles.band} ref={bandRef}>
      <div className="container">
        <h2 className={styles.title}>Impulsados por</h2>

        {reduce ? (
          <div className={styles.staticGrid}>
            {SUPPORT_BRANDS.map((brand, index) => (
              <BrandSlot
                key={brand.id}
                brand={brand}
                index={index}
                animate={false}
              />
            ))}
          </div>
        ) : (
          <>
            <div className={styles.cloud}>
              {currentSet.map((brand, index) => (
                <div key={`cell-${index}`} className={styles.cell}>
                  <AnimatePresence>
                    <BrandSlot
                      key={brand.id}
                      brand={brand}
                      index={index}
                      animate={active}
                    />
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* The visible row only shows one set at a time, so name them all here. */}
            <p className="sr-only">
              {SUPPORT_BRANDS.map((brand) => brand.name).join(', ')}.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
