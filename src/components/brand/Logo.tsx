import styles from './Logo.module.css'

type LogoProps = {
  className?: string
  size?: 'nav' | 'hero' | 'footer'
  variant?: 'light' | 'original'
  decorative?: boolean
}

const sources = {
  light: '/brand/calendario-tech-logo.png',
  original: '/logo-calendario-tech-original.png',
} as const

export function Logo({
  className = '',
  size = 'nav',
  variant = 'light',
  decorative = false,
}: LogoProps) {
  const classNames = `${styles.logo} ${styles[size]} ${className}`.trim()
  const alt = decorative ? '' : 'calendario tech'

  return (
    <img
      src={sources[variant]}
      alt={alt}
      className={classNames}
      width={1200}
      height={697}
      decoding="async"
      draggable={false}
    />
  )
}
