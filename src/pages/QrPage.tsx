import { useEffect } from 'react'
import { Logo } from '../components/brand/Logo'
import { BrandedQr } from '../components/BrandedQr'
import { Spotlight } from '../components/ui/Spotlight'
import { SITE_URL } from '../config'
import styles from './QrPage.module.css'

export function QrPage() {
  useEffect(() => {
    document.documentElement.dataset.page = 'qr'
    document.title = 'calendario tech — QR'
    return () => {
      delete document.documentElement.dataset.page
    }
  }, [])

  const homeUrl = SITE_URL.replace(/\/$/, '')

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

        <div className={styles.qrStage}>
          <BrandedQr
            value={homeUrl}
            label="Código QR hacia el inicio de calendario tech"
          />
        </div>
      </div>
    </main>
  )
}
