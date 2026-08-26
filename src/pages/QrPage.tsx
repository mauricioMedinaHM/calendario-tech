import { useEffect } from 'react'
import { Logo } from '../components/brand/Logo'
import { BrandedQr } from '../components/BrandedQr'
import { Spotlight } from '../components/ui/Spotlight'
import { LUMA_CALENDAR_URL, QR_PAGE_URL } from '../config'
import styles from './QrPage.module.css'

export function QrPage() {
  useEffect(() => {
    document.documentElement.dataset.page = 'qr'
    document.title = 'calendario tech — QR'
    return () => {
      delete document.documentElement.dataset.page
    }
  }, [])

  const displayUrl = QR_PAGE_URL.replace(/^https:\/\//, '')

  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <Spotlight fill="#ff002a" />

      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.brand} aria-label="calendario tech — inicio">
          <Logo size="hero" />
        </a>

        <h1 id="qr-heading" className={styles.headline}>
          Todos los eventos tech de Mendoza,{' '}
          <span className="accent">en un solo calendario.</span>
        </h1>

        <p className={styles.lead}>
          Desde Tech Yourself, escaneá el código y entrá al calendario.
          Fechas, lugares y cómo sumar tu evento.
        </p>

        <div className={styles.qrStage}>
          <BrandedQr
            value={QR_PAGE_URL}
            label="Código QR hacia la página del calendario tech"
          />
        </div>

        <p className={styles.url}>{displayUrl}</p>

        <div className={`btn-row ${styles.actions}`}>
          <a
            className="btn btn--primary"
            href={LUMA_CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
          >
            Ver eventos
          </a>
          <a className="btn btn--ghost" href="/">
            Ir al inicio
          </a>
        </div>
      </div>
    </main>
  )
}
