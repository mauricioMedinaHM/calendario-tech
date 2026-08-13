import { motion, useReducedMotion } from 'motion/react'
import {
  IconCalendar,
  IconCommunity,
  IconFilter,
} from './icons/Icons'
import styles from './Community.module.css'

const pillars = [
  { icon: IconCalendar, label: 'Todos los eventos' },
  { icon: IconFilter, label: 'Curaduría de calidad' },
  { icon: IconCommunity, label: 'Comunidad conectada' },
]

export function Community() {
  const reduce = useReducedMotion()

  return (
    <section id="comunidad" className={`section ${styles.section}`} aria-labelledby="comunidad-title">
      <div className="container">
        <motion.div
          className={styles.copy}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="comunidad-title" className="section__title">
            Un punto de encuentro para el ecosistema
          </h2>
          <p className={styles.body}>
            El objetivo de este calendario es centralizar la actividad
            tecnológica de Mendoza para facilitar la difusión y la
            organización. Tech, emprendimiento y comunidad, en un solo lugar.
          </p>
        </motion.div>

        <ul className={styles.pillars}>
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.li
                key={pillar.label}
                className={styles.pillar}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon />
                </span>
                <span className={styles.label}>{pillar.label}</span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
