import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import styles from './Marquee.module.css'

type MarqueeProps = {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
  durationSec?: number
}

export function Marquee({
  children,
  className = '',
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  durationSec = 32,
}: MarqueeProps) {
  const shiftRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const startX = useRef(0)
  const startY = useRef(0)
  const startOffset = useRef(0)
  const tracking = useRef(false)
  const captured = useRef(false)
  const didDrag = useRef(false)

  const cycleWidth = () => {
    const track = trackRef.current
    const shift = shiftRef.current
    if (!track || !shift) return 0
    const gap = parseFloat(getComputedStyle(shift).gap)
    return track.offsetWidth + (Number.isFinite(gap) ? gap : 0)
  }

  const apply = (x: number) => {
    const width = cycleWidth()
    if (width > 0) {
      x = ((x % width) + width) % width
      if (x > 0) x -= width
    }
    offset.current = x
    if (shiftRef.current) {
      shiftRef.current.style.transform = `translate3d(${x}px, 0, 0)`
    }
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    tracking.current = true
    captured.current = false
    didDrag.current = false
    startX.current = event.clientX
    startY.current = event.clientY
    startOffset.current = offset.current
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tracking.current) return
    const dx = event.clientX - startX.current
    const dy = event.clientY - startY.current

    if (!captured.current) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
      if (Math.abs(dy) > Math.abs(dx)) {
        tracking.current = false
        return
      }
      captured.current = true
      didDrag.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    event.preventDefault()
    apply(startOffset.current + dx)
  }

  const endGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (!tracking.current && !captured.current) return
    tracking.current = false
    captured.current = false
    apply(offset.current)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const vars = {
    '--marquee-duration': `${durationSec}s`,
  } as CSSProperties

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-pause-hover={pauseOnHover || undefined}
      style={vars}
      aria-label="Deslizá para ver las marcas"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (!didDrag.current) return
        event.preventDefault()
        event.stopPropagation()
        didDrag.current = false
      }}
    >
      <div ref={shiftRef} className={styles.shift}>
        {Array.from({ length: repeat }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? trackRef : undefined}
            className={[styles.track, reverse ? styles.reverse : ''].join(' ')}
            aria-hidden={i > 0}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
