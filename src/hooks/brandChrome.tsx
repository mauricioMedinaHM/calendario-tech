import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'

type BrandChromeValue = {
  compact: boolean
  narrow: boolean
  intro: boolean
  logoLanded: boolean
  logoSlotRef: RefObject<HTMLDivElement | null>
  dismissIntro: () => void
  markLogoLanded: () => void
}

const BrandChromeContext = createContext<BrandChromeValue>({
  compact: false,
  narrow: false,
  intro: true,
  logoLanded: false,
  logoSlotRef: { current: null },
  dismissIntro: () => {},
  markLogoLanded: () => {},
})

const SHOW_AFTER_PX = 88
const NARROW_QUERY = '(max-width: 768px)'

function readNarrow() {
  return window.matchMedia(NARROW_QUERY).matches
}

export function BrandChromeProvider({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false)
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? readNarrow() : false,
  )

  const logoSlotRef = useRef<HTMLDivElement | null>(null)
  const [intro, setIntro] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [logoLanded, setLogoLanded] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const dismissIntro = useCallback(() => setIntro(false), [])
  const markLogoLanded = useCallback(() => setLogoLanded(true), [])

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY)

    const update = () => {
      const isNarrow = mq.matches
      setNarrow(isNarrow)
      setCompact(!isNarrow && logoLanded && window.scrollY > SHOW_AFTER_PX)
    }

    update()
    mq.addEventListener('change', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      mq.removeEventListener('change', update)
      window.removeEventListener('scroll', update)
    }
  }, [logoLanded])

  useEffect(() => {
    if (logoLanded) return
    const html = document.documentElement
    const prevHtml = html.style.overflow
    const prevBody = document.body.style.overflow
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [logoLanded])

  const value = useMemo(
    () => ({
      compact,
      narrow,
      intro,
      logoLanded,
      logoSlotRef,
      dismissIntro,
      markLogoLanded,
    }),
    [compact, narrow, intro, logoLanded, dismissIntro, markLogoLanded],
  )

  return (
    <BrandChromeContext.Provider value={value}>
      {children}
    </BrandChromeContext.Provider>
  )
}

export function useBrandChrome() {
  return useContext(BrandChromeContext)
}
