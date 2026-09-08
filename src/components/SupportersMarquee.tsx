import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react'
import styles from './SupportersMarquee.module.css'

const SUPPORT_BRANDS = [
  {
    id: 'endeavor-cuyo',
    name: 'Endeavor Cuyo',
    src: '/brands/endeavor-cuyo.png',
    href: 'https://www.endeavor.org.ar/',
  },
  {
    id: 'cuyoconnect',
    name: 'CuyoConnect',
    src: '/brands/cuyoconnect.png',
    href: 'https://cuyoconnect.com/',
  },
  {
    id: 'embarca',
    name: 'embarca',
    src: '/brands/embarca.png',
    href: 'https://www.embarca.tech/',
  },
  {
    id: 'quienvino',
    name: 'QuienVino',
    src: '/brands/quienvino.png',
    href: 'https://www.quienvino.com/',
  },
  {
    id: 'lodo',
    name: 'LODO',
    src: '/brands/lodo.png',
    href: 'https://espaciolodo.com/',
  },
  {
    id: 'polotic',
    name: 'Polo TIC Mendoza',
    src: '/brands/polotic.png',
    href: 'https://poloticmendoza.org/',
  },
  {
    id: 'agencia-mendoza',
    name: 'Agencia de Innovación y Gobierno de Mendoza',
    src: '/brands/agencia-mendoza.png',
    href: 'https://competitividadmendoza.com.ar/agencia-innovacion/',
  },
  {
    id: 'mendoza-ciudad',
    name: 'Mendoza Ciudad',
    src: '/brands/mendoza-ciudad.png',
    href: 'https://ciudaddemendoza.gob.ar/',
  },
] as const

type Brand = (typeof SUPPORT_BRANDS)[number]

const LOGO_SETS: Brand[][] = [
  SUPPORT_BRANDS.slice(0, 4),
  SUPPORT_BRANDS.slice(4),
]

const FLIP = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
}

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
      initial={
        animate
          ? { y: 36, opacity: 0, filter: 'blur(12px)' }
          : false
      }
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      exit={
        animate
          ? { y: -36, opacity: 0, filter: 'blur(12px)' }
          : undefined
      }
      transition={{
        duration: FLIP.duration,
        delay: animate ? 0.1 * index : 0,
        ease: FLIP.ease,
      }}
    >
      <img src={brand.src} alt={brand.name} className={styles.logo} />
    </motion.a>
  )
}

export function SupportersMarquee({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion()
  const bandRef = useRef<HTMLElement>(null)
  const inView = useInView(bandRef, { amount: 0.35 })
  const [setIndex, setSetIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  )
  const currentSet = LOGO_SETS[setIndex]
  const live = active && !reduce && inView && !paused && !hidden

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!live) return

    const id = window.setInterval(() => {
      setSetIndex((index) => (index + 1) % LOGO_SETS.length)
    }, 3800)

    return () => window.clearInterval(id)
  }, [live])

  return (
    <aside
      ref={bandRef}
      className={styles.band}
      aria-labelledby="bancan-title"
    >
      <div className="container">
        <div className={styles.head}>
          <h2 id="bancan-title" className={styles.title}>
            Impulsados por
          </h2>
        </div>

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
          <div
            className={styles.cloud}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="popLayout">
              {currentSet.map((brand, index) => (
                <BrandSlot
                  key={brand.id}
                  brand={brand}
                  index={index}
                  animate={active}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </aside>
  )
}
