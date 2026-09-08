import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Logo } from './brand/Logo'
import { QrShareButton, QrShareDialog } from './QrShare'
import { useBrandChrome } from '../hooks/brandChrome'
import { IconCalendar, IconCommunity, IconShare } from './icons/Icons'
import styles from './Nav.module.css'

const links = [
  { href: '#eventos', label: 'Eventos' },
  { href: '#comunidad', label: 'Comunidad' },
  { href: '#sumar', label: 'Sumá tu evento' },
]

const dockLinks = [
  { href: '#eventos', label: 'Eventos', Icon: IconCalendar },
  { href: '#comunidad', label: 'Comunidad', Icon: IconCommunity },
  { href: '#sumar', label: 'Sumá', Icon: IconShare },
]

export function Nav() {
  const reduce = useReducedMotion() ?? false
  const { compact, narrow } = useBrandChrome()
  const [qrOpen, setQrOpen] = useState(false)
  const fabRef = useRef<HTMLButtonElement>(null)
  const wasQrOpen = useRef(false)

  const openQr = useCallback(() => setQrOpen(true), [])
  const closeQr = useCallback(() => setQrOpen(false), [])

  useEffect(() => {
    if (!narrow) setQrOpen(false)
  }, [narrow])

  useEffect(() => {
    if (qrOpen) {
      wasQrOpen.current = true
      return
    }
    if (wasQrOpen.current) fabRef.current?.focus()
  }, [qrOpen])

  return (
    <>
      <AnimatePresence>
        {compact ? (
          <motion.header
            key="nav-chrome"
            className={styles.header}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <div className={styles.shell}>
              <motion.div
                className={styles.chrome}
                aria-hidden="true"
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className={styles.inner}>
                <a
                  href="#top"
                  className={styles.brand}
                  aria-label="calendario tech — inicio"
                >
                  <Logo size="nav" shared={!reduce} />
                </a>
                <motion.nav
                  className={styles.nav}
                  aria-label="Principal"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {links.map((link) => (
                    <a key={link.href} href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  ))}
                </motion.nav>
              </div>
            </div>
          </motion.header>
        ) : null}
      </AnimatePresence>

      {narrow ? (
        <>
          <nav
            className={`${styles.dock}${qrOpen ? ` ${styles.dockQrOpen}` : ''}`}
            aria-label="Principal"
            aria-hidden={qrOpen || undefined}
          >
            <div className={styles.dockBar}>
              <div className={styles.dockItems}>
                {dockLinks.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    className={styles.dockLink}
                    tabIndex={qrOpen ? -1 : undefined}
                  >
                    <span className={styles.dockIcon}>
                      <Icon />
                    </span>
                    <span className={styles.dockLabel}>{label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className={styles.dockBump} aria-hidden="true" />
            <QrShareButton
              open={qrOpen}
              reduce={reduce}
              buttonRef={fabRef}
              onOpen={openQr}
            />
          </nav>
          <QrShareDialog open={qrOpen} reduce={reduce} onClose={closeQr} />
        </>
      ) : null}
    </>
  )
}
