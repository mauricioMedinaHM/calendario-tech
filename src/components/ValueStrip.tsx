import { motion, useReducedMotion } from 'motion/react'
import {
  IconBell,
  IconCalendar,
  IconCommunity,
  IconShare,
} from './icons/Icons'
import styles from './ValueStrip.module.css'

const items = [
  {
    icon: IconCalendar,
    label: 'Todos los eventos tech de Mendoza',
  },
  {
    icon: IconCommunity,
    label: 'Conectá con la comunidad tech',
  },
  {
    icon: IconBell,
    label: 'No te pierdas ningún evento',
  },
  {
    icon: IconShare,
    label: 'Difundí, organizá y sumá tu evento',
  },
]

export function ValueStrip() {
  const reduce = useReducedMotion()

  return (
    <section className={styles.section} aria-label="Propuesta de valor">
      <div className="container">
        <ul className={styles.list}>
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.li
                key={item.label}
                className={styles.item}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Icon />
                </span>
                <p>{item.label}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
