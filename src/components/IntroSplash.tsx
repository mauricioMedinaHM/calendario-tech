import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useBrandChrome } from '../hooks/brandChrome'
import styles from './IntroSplash.module.css'

const HOLD_MS = 520
const ASPECT = 623 / 1038
const FLY = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
}

type Pose = { x: number; y: number; width: number; height: number }

function splashPose(): Pose {
  const rem = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize || '16',
  )
  const width = Math.min(window.innerWidth * 0.86, 30 * rem)
  const height = width * ASPECT
  return {
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2,
    width,
    height,
  }
}

function readSlot(slot: HTMLDivElement | null): Pose | null {
  if (!slot) return null
  const rect = slot.getBoundingClientRect()
  if (rect.width < 8 || rect.height < 8) return null
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

export function IntroSplash() {
  const reduce = useReducedMotion()
  const {
    intro,
    logoLanded,
    logoSlotRef,
    dismissIntro,
    markLogoLanded,
  } = useBrandChrome()

  const [origin] = useState<Pose | null>(() =>
    typeof window === 'undefined' ? null : splashPose(),
  )
  const [dest, setDest] = useState<Pose | null>(null)
  const flying = Boolean(origin && !reduce && !logoLanded)

  useEffect(() => {
    if (reduce) {
      if (intro) dismissIntro()
      if (!logoLanded) markLogoLanded()
      return
    }
    if (!intro) return

    let cancelled = false
    const img = new Image()
    img.src = '/logo-calendario-tech.png'

    const loaded = new Promise<void>((resolve) => {
      if (img.complete) {
        resolve()
        return
      }
      img.onload = () => resolve()
      img.onerror = () => resolve()
    })

    const hold = new Promise<void>((resolve) => {
      window.setTimeout(resolve, HOLD_MS)
    })

    Promise.all([loaded, hold]).then(() => {
      if (cancelled) return
      const next = readSlot(logoSlotRef.current)
      if (next) setDest(next)
      dismissIntro()
    })

    return () => {
      cancelled = true
    }
  }, [dismissIntro, intro, logoLanded, logoSlotRef, markLogoLanded, reduce])

  useEffect(() => {
    if (!dest || reduce || logoLanded) return
    const id = window.setTimeout(markLogoLanded, FLY.duration * 1000 + 20)
    return () => window.clearTimeout(id)
  }, [dest, logoLanded, markLogoLanded, reduce])

  if (!origin) return null

  const toHero = dest !== null
  const x = toHero ? dest.x : origin.x
  const y = toHero ? dest.y : origin.y
  const scale = toHero ? dest.width / origin.width : 1

  return (
    <>
      <AnimatePresence>
        {intro ? (
          <motion.div
            key="intro-veil"
            className={styles.veil}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      {flying ? (
        <motion.img
          className={styles.flyer}
          src="/logo-calendario-tech.png"
          alt=""
          width={1038}
          height={623}
          decoding="sync"
          draggable={false}
          aria-hidden="true"
          initial={{ opacity: 1, x: origin.x, y: origin.y, scale: 1 }}
          animate={{ opacity: 1, x, y, scale }}
          transition={toHero ? { x: FLY, y: FLY, scale: FLY } : { duration: 0 }}
          style={{ width: origin.width, height: origin.height }}
        />
      ) : null}
    </>
  )
}
