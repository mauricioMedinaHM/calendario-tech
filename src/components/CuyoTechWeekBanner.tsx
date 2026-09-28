import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { CUYO_TECH_WEEK_URL } from '../config'
import { CuyoTechWeekLogo } from './CuyoTechWeekLogo'
import styles from './CuyoTechWeekBanner.module.css'

const lines = [
  { text: 'Una región. Dos semanas.', tone: 'green' },
  { text: 'Todo el ecosistema', tone: 'green' },
  { text: 'conectado.', tone: 'white' },
] as const

export function CuyoTechWeekBanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const reduce = useReducedMotion()
  const show = reduce || inView

  return (
    <section ref={ref} className={styles.banner} aria-label="Cuyo Tech Week 2026">
      <div className={styles.frame}>
        <CuyoTechWeekLogo play={show} />
        <div className={styles.copy}>
          <p className={styles.kicker}>Del 05 al 16 de octubre · Mendoza</p>
          <p className={styles.slogan}>
            {lines.map((line, index) => (
              <motion.span
                key={line.text}
                className={line.tone === 'green' ? styles.green : styles.white}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : 0.08 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </p>
          <svg
            className={styles.wave}
            viewBox="0 0 520 18"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2 10 C 28 4, 46 16, 74 9 S 130 2, 168 10 S 230 17, 276 9 S 340 2, 390 10 S 450 16, 518 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <a
            className={styles.cta}
            href={CUYO_TECH_WEEK_URL}
            target="_blank"
            rel="noreferrer"
          >
            Ir al sitio oficial
          </a>
        </div>
      </div>
    </section>
  )
}
