import { useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BrandedQr } from './BrandedQr'
import { IconClose, IconQr } from './icons/Icons'
import { SITE_URL } from '../config'
import styles from './QrShare.module.css'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]
const EASE_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1]
const HOME_URL = SITE_URL.replace(/\/$/, '')

type QrShareButtonProps = {
  open: boolean
  reduce: boolean
  buttonRef: RefObject<HTMLButtonElement | null>
  onOpen: () => void
}

export function QrShareButton({
  open,
  reduce,
  buttonRef,
  onOpen,
}: QrShareButtonProps) {
  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={styles.fab}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-label="Compartir calendario tech"
      tabIndex={open ? -1 : 0}
      style={{ pointerEvents: open ? 'none' : 'auto' }}
      whileTap={open || reduce ? undefined : { scale: 0.97 }}
      onClick={onOpen}
    >
      <span className={styles.fabIcon}>
        <IconQr />
      </span>
    </motion.button>
  )
}

type QrShareDialogProps = {
  open: boolean
  reduce: boolean
  onClose: () => void
}

export function QrShareDialog({ open, reduce, onClose }: QrShareDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const duration = reduce ? 0 : 0.32

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.dataset.qrOpen = 'true'
    window.addEventListener('keydown', onKey)

    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
      delete html.dataset.qrOpen
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            key="qr-scrim"
            type="button"
            className={styles.scrim}
            aria-label="Cerrar código QR"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: open ? EASE : EASE_OUT }}
            onClick={onClose}
          />
          <motion.div
            key="qr-screen"
            className={styles.screen}
            role="dialog"
            aria-modal="true"
            aria-label="Código QR de calendario tech"
            initial={reduce ? false : { opacity: 0, transform: 'translateY(12px) scale(0.96)' }}
            animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
            exit={{ opacity: 0, transform: 'translateY(8px) scale(0.97)' }}
            transition={{ duration, ease: open ? EASE : EASE_OUT }}
            style={{ originX: 0.5, originY: 1 }}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              aria-label="Cerrar código QR"
              onClick={onClose}
            >
              <IconClose />
            </button>
            <div className={styles.stageWrap}>
              <div className={styles.qrStage}>
                <BrandedQr
                  value={HOME_URL}
                  label="Código QR hacia el inicio de calendario tech"
                />
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
