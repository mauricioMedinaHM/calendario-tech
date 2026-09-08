import { motion, useReducedMotion } from 'motion/react'
import { GOOGLE_FORM_OPEN_URL } from '../config'
import styles from './Community.module.css'

export function Community() {
  const reduce = useReducedMotion()

  return (
    <section
      id="comunidad"
      className={`section ${styles.section}`}
      aria-labelledby="sumar-title"
    >
      <div id="sumar" className={`container ${styles.inner}`}>
        <motion.div
          className={styles.copy}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="sumar-title" className="section__title">
            Organizá un evento
          </h2>
          <p className="section__lead">
            Si armás un meetup, una charla o un encuentro para el ecosistema,
            lo revisamos y lo sumamos al calendario.
          </p>
          <a
            className="btn btn--primary"
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
