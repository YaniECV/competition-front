import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ComprendreIndex, ComprendreHandicaps, ComprendreChiffres, ComprendreNormes } from './pages/Comprendre'
import { AgirIndex, AgirDebuter, AgirZones, AgirExemples, AgirDiagnostic } from './pages/Agir'
import { OutilsIndex, OutilsSignaletiques, OutilsChecklist } from './pages/Outils'
import { FMMIndex, FMMapropos, FMMobjectif } from './pages/FMM'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comprendre" element={<ComprendreIndex />} />
          <Route path="/comprendre/handicaps" element={<ComprendreHandicaps />} />
          <Route path="/comprendre/chiffres" element={<ComprendreChiffres />} />
          <Route path="/comprendre/normes" element={<ComprendreNormes />} />
          <Route path="/agir" element={<AgirIndex />} />
          <Route path="/agir/debuter" element={<AgirDebuter />} />
          <Route path="/agir/zones" element={<AgirZones />} />
          <Route path="/agir/exemples" element={<AgirExemples />} />
          <Route path="/agir/diagnostic" element={<AgirDiagnostic />} />
          <Route path="/outils" element={<OutilsIndex />} />
          <Route path="/outils/signaletiques" element={<OutilsSignaletiques />} />
          <Route path="/outils/checklist" element={<OutilsChecklist />} />
          <Route path="/fmm" element={<FMMIndex />} />
          <Route path="/fmm/apropos" element={<FMMapropos />} />
          <Route path="/fmm/objectif" element={<FMMobjectif />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
