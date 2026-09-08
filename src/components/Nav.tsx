import { Logo } from './brand/Logo'
import styles from './Nav.module.css'

export function Nav() {
  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <div className={styles.chrome} aria-hidden="true" />
        <div className={styles.inner}>
          <a
            href="#top"
            className={styles.brand}
            aria-label="calendario tech — inicio"
          >
            <Logo size="nav" />
          </a>
          <nav className={styles.nav} aria-label="Principal">
            <a className={`btn btn--primary ${styles.cta}`} href="#sumar">
              Sumá tu evento
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
