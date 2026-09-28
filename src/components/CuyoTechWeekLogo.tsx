import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './CuyoTechWeekBanner.module.css'

const FRAME_COUNT = 45
const FPS = 15
const frames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/brand/cuyo-tech-week/logo-vivo/${String(i).padStart(3, '0')}.png`,
)
const lastFrame = frames[FRAME_COUNT - 1]

type CuyoTechWeekLogoProps = {
  play: boolean
}

export function CuyoTechWeekLogo({ play }: CuyoTechWeekLogoProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const readyRef = useRef<Promise<void> | null>(null)
  const runningRef = useRef(false)
  const rafRef = useRef(0)
  const [reduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const preload = useCallback(() => {
    if (!readyRef.current) {
      readyRef.current = Promise.all(
        frames.map((src) => {
          const image = new Image()
          image.src = src
          return image.decode().catch(() => undefined)
        }),
      ).then(() => undefined)
    }
    return readyRef.current
  }, [])

  const write = useCallback(() => {
    const img = imgRef.current
    if (!img || reduce || runningRef.current) return
    runningRef.current = true
    void preload().then(() => {
      const start = performance.now()
      const step = (now: number) => {
        const n = Math.min(FRAME_COUNT - 1, Math.floor((now - start) / (1000 / FPS)))
        img.src = frames[n]
        if (n < FRAME_COUNT - 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          runningRef.current = false
        }
      }
      rafRef.current = requestAnimationFrame(step)
    })
  }, [preload, reduce])

  useEffect(() => {
    if (play) write()
  }, [play, write])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <button
      type="button"
      className={styles.logoButton}
      onClick={write}
      aria-label="Cuyo Tech Week, volver a escribir el logo"
    >
      <img
        ref={imgRef}
        className={styles.logo}
        src={reduce ? lastFrame : frames[0]}
        alt=""
        width={640}
        height={640}
        decoding="async"
      />
    </button>
  )
}
