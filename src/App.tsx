/* Direction contract — calendario tech landing
THESIS: One black/red Mendoza tech calendar hub — brand first, then Luma events, then submit form; refuses generic SaaS card dashboards.
OWN-WORLD: Pure black ground, signal red accent, white type, Satoshi bold lowercase brand, transparent logo PNG as sole mark, linear red icons, hairline dividers.
STORY: Visitor understands calendario tech centralizes Mendoza tech events on Luma, can browse events and submit theirs.
FIRST VIEWPORT: Sticky nav with logo; hero logo at brand scale; headline with red emphasis; one lead; two CTAs; wave atmosphere on the right — no cards/stats.
FORM: Persuade landing from brand assets + Luma/Form embeds; seed plan-landing-calendario-tech.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/
import { LayoutGroup } from 'motion/react'
import { BrandChromeProvider } from './hooks/brandChrome'
import { IntroSplash } from './components/IntroSplash'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { SupportersMarquee } from './components/SupportersMarquee'
import { ValueStrip } from './components/ValueStrip'
import { LumaEmbed } from './components/LumaEmbed'
import { Community } from './components/Community'
import { GoogleFormEmbed } from './components/GoogleFormEmbed'
import { Footer } from './components/Footer'

function App() {
  return (
    <BrandChromeProvider>
      <LayoutGroup id="brand">
        <IntroSplash />
        <Nav />
        <main>
          <Hero />
          <SupportersMarquee />
          <ValueStrip />
          <LumaEmbed />
          <Community />
          <GoogleFormEmbed />
        </main>
        <Footer />
      </LayoutGroup>
    </BrandChromeProvider>
  )
}

export default App
