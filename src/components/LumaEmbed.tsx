import { motion, useReducedMotion } from 'motion/react'
import { LUMA_CALENDAR_URL, LUMA_EMBED_URL } from '../config'
import { useBrandChrome } from '../hooks/brandChrome'
import { IconExternal } from './icons/Icons'
import styles from './LumaEmbed.module.css'

function withDarkTheme(url: string) {
  try {
    const next = new URL(url)
    if (!next.searchParams.has('lt')) next.searchParams.set('lt', 'dark')
    return next.toString()
  } catch {
    return url.includes('?') ? `${url}&lt=dark` : `${url}?lt=dark`
  }
}

export function LumaEmbed() {
  const reduce = useReducedMotion()
  const { narrow } = useBrandChrome()
  const src = withDarkTheme(LUMA_EMBED_URL)

  return (
    <section
      id="eventos"
      className={`section ${styles.section}`}
      aria-labelledby="eventos-title"
    >
      <div className="container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.heading}>
            <h2 id="eventos-title" className={`section__title ${styles.title}`}>
              Próximos eventos
            </h2>
            <a
              className={styles.lumaLink}
              href={LUMA_CALENDAR_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir calendario en Luma"
            >
              <IconExternal />
            </a>
          </div>
          <p className={`section__lead ${styles.lead}`}>
            {narrow
              ? 'Todo vive en Luma. Abrí el calendario para ver fechas, lugares y confirmar tu asistencia.'
              : 'Todo centralizado en Luma: descubrí, seguí el calendario y confirmá tu asistencia sin salir de acá.'}
          </p>

          {narrow ? (
            <div className={styles.mobilePanel}>
              <a
                className={`btn btn--primary ${styles.mobileCta}`}
                href={LUMA_CALENDAR_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Ver eventos en Luma (se abre en una pestaña nueva)"
              >
                Ver eventos en Luma
              </a>
            </div>
          ) : (
            <>
              <motion.div
                className={styles.stage}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.veil} aria-hidden="true" />
                <iframe
                  className={styles.frame}
                  src={src}
                  title="Calendario Mendoza Tech en Luma"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="fullscreen"
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
