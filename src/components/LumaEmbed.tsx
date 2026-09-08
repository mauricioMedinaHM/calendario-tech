import { motion, useReducedMotion } from 'motion/react'
import { LUMA_CALENDAR_URL, LUMA_EMBED_URL } from '../config'
import { IconExternal } from './icons/Icons'
import styles from './LumaEmbed.module.css'

function withLightTheme(url: string) {
  try {
    const next = new URL(url)
    next.searchParams.set('lt', 'light')
    return next.toString()
  } catch {
    return url.includes('?') ? `${url}&lt=light` : `${url}?lt=light`
  }
}

export function LumaEmbed() {
  const reduce = useReducedMotion()
  const src = withLightTheme(LUMA_EMBED_URL)

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
          <h2 id="eventos-title" className={`section__title ${styles.title}`}>
            <a
              className={styles.titleLink}
              href={LUMA_CALENDAR_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.titleText}>Próximos eventos</span>
              <IconExternal />
            </a>
          </h2>
          <p className={`section__lead ${styles.lead}`}>
            Todo centralizado en Luma: descubrí, seguí el calendario y
            confirmá tu asistencia sin salir de acá.
          </p>

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
        </motion.div>
      </div>
    </section>
  )
}
