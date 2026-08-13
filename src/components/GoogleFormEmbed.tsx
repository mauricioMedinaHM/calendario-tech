import { motion, useReducedMotion } from 'motion/react'
import { GOOGLE_FORM_OPEN_URL } from '../config'
import styles from './GoogleFormEmbed.module.css'

export function GoogleFormEmbed() {
  const reduce = useReducedMotion()

  return (
    <section
      id="sumar"
      className={`section ${styles.section}`}
      aria-labelledby="sumar-title"
    >
      <div className="container">
        <motion.div
          className={styles.panel}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="sumar-title" className="section__title">
            Sumá tu evento
          </h2>
          <p className={styles.lead}>
            ¿Organizás algo para la comunidad? Completá el formulario de Google
            Forms y lo revisamos para sumarlo al calendario de Mendoza Tech.
          </p>
          <a
            className={`btn btn--primary ${styles.cta}`}
            href={GOOGLE_FORM_OPEN_URL}
            target="_blank"
            rel="noreferrer"
          >
            Sumá tu evento
          </a>
        </motion.div>
      </div>
    </section>
  )
}
