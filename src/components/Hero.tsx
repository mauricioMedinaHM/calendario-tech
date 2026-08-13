import { motion, useReducedMotion } from 'motion/react'
import { Logo } from './brand/Logo'
import { Spotlight } from './ui/Spotlight'
import { BlurText } from './ui/BlurText'
import { useBrandChrome } from '../hooks/brandChrome'
import styles from './Hero.module.css'

export function Hero() {
  const reduce = useReducedMotion()
  const { compact, intro, logoLanded, logoSlotRef } = useBrandChrome()
  const showLogo = !compact && logoLanded
  const showCopy = !intro

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.grid} aria-hidden="true" />
      <Spotlight fill="#ff002a" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.logoWrap} ref={logoSlotRef}>
          {showLogo ? (
            <div className={styles.logoMotion}>
              <Logo size="hero" shared={!reduce} />
            </div>
          ) : (
            <div className={styles.logoSpacer} aria-hidden="true" />
          )}
        </div>

        <BlurText
          id="hero-heading"
          className={styles.headline}
          delay={0.04}
          play={showCopy}
          segments={[
            { text: 'Todos los eventos tech de Mendoza,' },
            { text: 'en un solo calendario.', accent: true },
          ]}
        />

        <motion.p
          className={styles.lead}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={
            showCopy ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          El punto de encuentro para conectar, compartir y potenciar el
          ecosistema tecnológico de nuestra región.
        </motion.p>

        <motion.div
          className={`btn-row ${styles.actions}`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={
            showCopy ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="btn btn--primary" href="#eventos">
            Ver eventos
          </a>
          <a className="btn btn--ghost" href="#sumar">
            Sumá tu evento
          </a>
        </motion.div>
      </div>
    </section>
  )
}
