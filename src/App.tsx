import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import RainOverlay from '@/components/RainOverlay'
import Home from '@/pages/Home'
import Archive from '@/pages/Archive'
import EntryPage from '@/pages/EntryPage'
import About from '@/pages/About'
import Guide from '@/pages/Guide'
import GuideEntryPage from '@/pages/GuideEntryPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <RainOverlay />
      <Nav />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/entry/:id" element={<EntryPage />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/:id" element={<GuideEntryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
