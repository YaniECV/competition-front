import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Festival from './pages/Festival'
import BonnesPratiques from './pages/BonnesPratiques'
import { HandicapsIndex, HandicapDetail } from './pages/Handicaps'
import Ressources from './pages/Ressources'
import Fede from './pages/Fede'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/pratiques" element={<BonnesPratiques />} />
          <Route path="/handicaps" element={<HandicapsIndex />} />
          <Route path="/handicaps/:slug" element={<HandicapDetail />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/fede" element={<Fede />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
