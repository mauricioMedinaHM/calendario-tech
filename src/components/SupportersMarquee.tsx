import { Marquee } from './ui/Marquee'
import styles from './SupportersMarquee.module.css'

export const SUPPORT_BRANDS = [
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

export function SupportersMarquee() {
  return (
    <section
      className={styles.section}
      aria-labelledby="bancan-title"
    >
      <div className={`container ${styles.head}`}>
        <h2 id="bancan-title" className={styles.title}>
          Impulsados por
        </h2>
      </div>

      <div className={styles.tracks}>
        <Marquee pauseOnHover repeat={3} durationSec={42}>
          {SUPPORT_BRANDS.map((brand) => (
            <BrandSlot
              key={brand.id}
              id={brand.id}
              name={brand.name}
              src={brand.src}
              href={brand.href}
            />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
