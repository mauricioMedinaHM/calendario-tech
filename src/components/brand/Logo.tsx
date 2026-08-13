import { motion } from 'motion/react'
import styles from './Logo.module.css'

type LogoProps = {
  className?: string
  size?: 'nav' | 'hero' | 'footer' | 'splash'
  shared?: boolean
  decorative?: boolean
}

const layoutTransition = {
  type: 'spring' as const,
  stiffness: 160,
  damping: 22,
  mass: 1.05,
}

export function Logo({
  className = '',
  size = 'nav',
  shared = false,
  decorative = false,
}: LogoProps) {
  const classNames = `${styles.logo} ${styles[size]} ${className}`.trim()
  const alt = decorative ? '' : 'calendario tech'

  if (shared) {
    return (
      <motion.img
        layoutId="brand-logo"
        src="/logo-calendario-tech.png"
        alt={alt}
        className={classNames}
        width={1038}
        height={623}
        decoding="async"
        draggable={false}
        transition={{
          layout: layoutTransition,
          opacity: { duration: 0.2 },
        }}
        style={{ borderRadius: 0 }}
      />
    )
  }

  return (
    <img
      src="/logo-calendario-tech.png"
      alt={alt}
      className={classNames}
      width={1038}
      height={623}
      decoding="async"
      draggable={false}
    />
  )
}
