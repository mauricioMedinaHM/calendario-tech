import { Logo } from './brand/Logo'
import { GOOGLE_FORM_OPEN_URL, LUMA_CALENDAR_URL } from '../config'
import styles from './Footer.module.css'

type FooterProps = {
  onOpenQr: () => void
}

const explore = [
  { href: '#eventos', label: 'Eventos' },
  { href: LUMA_CALENDAR_URL, label: 'Calendario en Luma', external: true },
]

const organize = [
  { href: GOOGLE_FORM_OPEN_URL, label: 'Sumá tu evento', external: true },
]

export function Footer({ onOpenQr }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <a
            href="#top"
            className={styles.brand}
            aria-label="calendario tech — inicio"
          >
            <Logo size="footer" variant="original" />
          </a>
          <p className={styles.tagline}>
            El calendario de eventos tech de Mendoza. Un solo lugar para
            enterarte y para sumar lo que organices.
          </p>
        </div>

        <div className={styles.cols}>
          <nav className={styles.col} aria-label="Explorar">
            <p className={styles.colTitle}>Explorar</p>
            <ul className={styles.list}>
              {explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Organizar">
            <p className={styles.colTitle}>Organizar</p>
            <ul className={styles.list}>
              {organize.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={onOpenQr}>
                  QR para compartir
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© 2026 calendario tech</p>
        <p>Mendoza, Argentina</p>
      </div>
    </footer>
  )
}
