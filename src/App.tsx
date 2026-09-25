/* Direction contract — calendario tech landing
THESIS: One black/red Mendoza tech calendar hub — brand first, then Luma events, then submit form; refuses generic SaaS card dashboards.
OWN-WORLD: Warm paper ground, signal red accent, ink type, Satoshi bold lowercase brand, light-safe logo with black mountain and white wordmark, linear red icons, hairline dividers.
STORY: Visitor understands calendario tech centralizes Mendoza tech events on Luma, can browse events and submit theirs.
FIRST VIEWPORT: Sticky nav with logo; headline with red emphasis; one lead; one CTA — no cards/stats.
FORM: Persuade landing from brand assets + Luma/Form embeds; seed plan-landing-calendario-tech.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/
import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { LumaEmbed } from './components/LumaEmbed'
import { Community } from './components/Community'
import { Footer } from './components/Footer'
import { QrShareDialog } from './components/QrShare'

function App() {
  const reduce = useReducedMotion()
  const [qrOpen, setQrOpen] = useState(false)
  const openQr = useCallback(() => setQrOpen(true), [])
  const closeQr = useCallback(() => setQrOpen(false), [])

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/'
    if (path !== '/qr') return
    setQrOpen(true)
    window.history.replaceState({}, '', '/')
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LumaEmbed />
        <Community />
      </main>
      <Footer onOpenQr={openQr} />
      <QrShareDialog open={qrOpen} reduce={Boolean(reduce)} onClose={closeQr} />
    </>
  )
}

export default App
