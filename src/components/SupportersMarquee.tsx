import { useReducedMotion } from 'motion/react'
import { Marquee } from './ui/Marquee'
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

function BrandSlot({
  id,
  name,
  src,
  href,
}: {
  id: string
  name: string
  src: string
  href: string
}) {
  return (
    <a
      className={styles.slot}
      data-brand={id}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <img src={src} alt={name} className={styles.logo} />
    </a>
  )
}

function BrandRow() {
  return (
    <>
      {SUPPORT_BRANDS.map((brand) => (
        <BrandSlot
          key={brand.id}
          id={brand.id}
          name={brand.name}
          src={brand.src}
          href={brand.href}
        />
      ))}
    </>
  )
}

export function SupportersMarquee({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion()

  return (
    <aside className={styles.band} aria-labelledby="bancan-title">
      <div className={styles.head}>
        <h2 id="bancan-title" className="eyebrow">
          Impulsados por
        </h2>
      </div>

      {reduce || !active ? (
        <div className={styles.staticGrid}>
          <BrandRow />
        </div>
      ) : (
        <Marquee pauseOnHover repeat={3} durationSec={28} className={styles.loop}>
          <BrandRow />
        </Marquee>
      )}
    </aside>
  )
}
