import { Logo } from './brand/Logo'
import { LUMA_CALENDAR_URL } from '../config'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <a
          href="#top"
          className={styles.brand}
          aria-label="calendario tech — inicio"
        >
          <Logo size="footer" />
        </a>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>Calendario Mendoza Tech</p>
        <a href={LUMA_CALENDAR_URL} target="_blank" rel="noreferrer">
          Ver calendario en Luma
        </a>
      </div>
    </footer>
  )
}
