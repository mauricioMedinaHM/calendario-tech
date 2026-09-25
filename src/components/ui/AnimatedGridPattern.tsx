import { useEffect, useId, useRef, useState } from 'react'
import styles from './AnimatedGridPattern.module.css'

const CELL = 52

type Square = { id: number; x: number; y: number; delay: number }

export function AnimatedGridPattern({
  numSquares = 22,
  maxOpacity = 0.18,
}: {
  numSquares?: number
  maxOpacity?: number
}) {
  const patternId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState({ cols: 16, rows: 10 })
  const [squares, setSquares] = useState<Square[]>([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const measure = () => {
      const cols = Math.max(8, Math.ceil(root.clientWidth / CELL) + 1)
      const rows = Math.max(6, Math.ceil(root.clientHeight / CELL) + 1)
      setGrid({ cols, rows })
      setSquares(
        Array.from({ length: numSquares }, (_, id) => ({
          id,
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
          delay: Math.random() * 3.6,
        })),
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [numSquares])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setSquares((current) =>
        current.map((square, index) =>
          index % 5 === Math.floor(Date.now() / 2800) % 5
            ? {
                ...square,
                x: Math.floor(Math.random() * grid.cols),
                y: Math.floor(Math.random() * grid.rows),
              }
            : square,
        ),
      )
    }, 2800)

    return () => window.clearInterval(id)
  }, [grid.cols, grid.rows])

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <svg className={styles.svg} style={{ ['--cell-max-opacity' as string]: maxOpacity }}>
        <defs>
          <pattern
            id={`${patternId}-grid`}
            width={CELL}
            height={CELL}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId}-grid)`} />
        {squares.map((square) => (
          <rect
            key={square.id}
            className={styles.cell}
            x={square.x * CELL + 1}
            y={square.y * CELL + 1}
            width={CELL - 2}
            height={CELL - 2}
            style={{ animationDelay: `${square.delay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
