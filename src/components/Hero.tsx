import { motion, useReducedMotion } from 'motion/react'
import { BlurText } from './ui/BlurText'
import { SupportersMarquee } from './SupportersMarquee'
import { GradientWaves } from './ui/GradientWaves'
import styles from './Hero.module.css'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.waves}>
        <GradientWaves
          horizonColor="#f7f7f5"
          waveColor="#ffc6c2"
          crestColor="#f0a8a4"
          opacity={1}
          brightness={1.04}
          fogDepth={38}
          amplitude={2.4}
          waveScale={0.78}
          swell={24}
          grain={false}
          mouseInteraction={false}
          detail="low"
          speed={0.16}
        />
      </div>
      <div className={styles.inner}>
        <BlurText
          id="hero-heading"
          className={styles.headline}
          delay={0.04}
          segments={[
            { text: 'Todos los eventos tech', breakAfter: true },
            { text: 'de Mendoza,', breakAfter: true },
            { text: 'en un solo calendario.', accent: true },
          ]}
        />

        <motion.p
          className={styles.lead}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          El punto de encuentro para conectar, compartir y potenciar el
          ecosistema tecnológico de nuestra región.
        </motion.p>

        <motion.div
          className={`btn-row ${styles.actions}`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="btn btn--primary btn--lg" href="#sumar">
            Sumá tu evento
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.supporters}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <SupportersMarquee />
      </motion.div>
    </section>
  )
}
