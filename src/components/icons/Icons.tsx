type IconProps = {
  className?: string
  title?: string
}

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

export function IconCalendar({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 9.5h18" />
      <path d="M8 3v4M16 3v4" />
      <path d="M8 13h3M13 13h3M8 17h3" />
    </svg>
  )
}

export function IconCommunity({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <circle cx="9" cy="8" r="2.4" />
      <circle cx="15.5" cy="8.5" r="2" />
      <path d="M4.5 18c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4" />
      <path d="M13 18c.4-1.8 1.5-2.8 3-2.8 1.4 0 2.4.8 2.9 2.3" />
    </svg>
  )
}

export function IconBell({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M6.5 16.5h11" />
      <path d="M7.2 16.5V11a4.8 4.8 0 0 1 9.6 0v5.5" />
      <path d="M10.2 16.5a1.8 1.8 0 0 0 3.6 0" />
      <path d="M12 4.2v1.4" />
    </svg>
  )
}

export function IconShare({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

export function IconQr({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}

export function IconClose({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function IconFilter({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  )
}

export function IconExternal({ className, title }: IconProps) {
  return (
    <svg {...base} className={className} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}
