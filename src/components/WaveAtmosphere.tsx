type WaveAtmosphereProps = {
  variant?: 'hero' | 'footer'
}

function buildBars(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.85)
    const mountains =
      0.55 * Math.exp(-Math.pow((t - 0.32) / 0.12, 2)) +
      0.9 * Math.exp(-Math.pow((t - 0.52) / 0.1, 2)) +
      0.7 * Math.exp(-Math.pow((t - 0.7) / 0.11, 2))
    const wobble = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.85))
    return Math.max(12, Math.round((0.35 * envelope + mountains) * wobble * 100))
  })
}

export function WaveAtmosphere({ variant = 'hero' }: WaveAtmosphereProps) {
  const bars = buildBars(variant === 'footer' ? 56 : 48)

  return (
    <div
      className={`wave-atmosphere wave-atmosphere--${variant}`}
      aria-hidden="true"
    >
      <div className="wave-atmosphere__glow" />
      <div className="wave-atmosphere__layer wave-atmosphere__layer--deep">
        {bars.map((h, i) => (
          <span key={`d-${i}`} style={{ height: `${h * 1.4}%` }} />
        ))}
      </div>
      <div className="wave-atmosphere__layer wave-atmosphere__layer--front">
        {bars.map((h, i) => (
          <span key={`f-${i}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}
