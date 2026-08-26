import { useMemo } from 'react'
import QRCode from 'qrcode'
import styles from './BrandedQr.module.css'

const ACCENT = '#e60000'
const MODULE = '#ffffff'
const LOGO_RATIO = 1038 / 623

type BrandedQrProps = {
  value: string
  label?: string
}

function isFinder(row: number, col: number, size: number) {
  return (
    (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7)
  )
}

export function BrandedQr({
  value,
  label = 'Código QR de calendario tech',
}: BrandedQrProps) {
  const model = useMemo(
    () => QRCode.create(value, { errorCorrectionLevel: 'H' }),
    [value],
  )

  const size = model.modules.size
  const quiet = 3
  const view = size + quiet * 2
  const holeW = size * 0.28
  const holeH = holeW / LOGO_RATIO
  const holeX0 = (size - holeW) / 2
  const holeY0 = (size - holeH) / 2
  const holeX1 = holeX0 + holeW
  const holeY1 = holeY0 + holeH

  const modules: Array<{ x: number; y: number }> = []
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (isFinder(row, col, size)) continue
      if (col >= holeX0 && col < holeX1 && row >= holeY0 && row < holeY1) {
        continue
      }
      if (model.modules.get(row, col)) {
        modules.push({ x: col + quiet, y: row + quiet })
      }
    }
  }

  const finders = [
    [quiet, quiet],
    [quiet, size - 7 + quiet],
    [size - 7 + quiet, quiet],
  ] as const

  return (
    <svg
      className={styles.qr}
      viewBox={`0 0 ${view} ${view}`}
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {modules.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width={1.02}
          height={1.02}
          fill={MODULE}
        />
      ))}

      {finders.map(([x, y]) => (
        <g key={`f-${x}-${y}`}>
          <path
            fill={MODULE}
            fillRule="evenodd"
            d={`M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}h5v5h-5z`}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} fill={ACCENT} />
        </g>
      ))}

      <rect
        x={quiet + holeX0 - 0.35}
        y={quiet + holeY0 - 0.35}
        width={holeW + 0.7}
        height={holeH + 0.7}
        fill="#000"
      />

      <image
        href="/logo-calendario-tech.png"
        x={quiet + holeX0}
        y={quiet + holeY0}
        width={holeW}
        height={holeH}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  )
}
