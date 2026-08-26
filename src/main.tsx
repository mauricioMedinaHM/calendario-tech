import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/wave.css'
import App from './App.tsx'
import { QrPage } from './pages/QrPage.tsx'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const isQr = path === '/qr'
if (isQr) document.documentElement.dataset.page = 'qr'
const Page = isQr ? QrPage : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
