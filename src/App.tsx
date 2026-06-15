import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import { RepererIndex, RepererHandicaps, RepererChiffres, CadreLegal } from './pages/Reperer'
import { PreparerIndex, PreparerDebuter, PreparerZones, PreparerCasConcrets, PreparerDiagnostic } from './pages/Preparer'
import { OutilsIndex, OutilsSignaletiques, OutilsChecklist } from './pages/Outils'
import { FMMIndex, FMMapropos, FMMobjectif } from './pages/FMM'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/reperer" element={<RepererIndex />} />
          <Route path="/reperer/handicaps" element={<RepererHandicaps />} />
          <Route path="/reperer/chiffres" element={<RepererChiffres />} />
          <Route path="/reperer/cadre-legal" element={<CadreLegal />} />

          <Route path="/preparer" element={<PreparerIndex />} />
          <Route path="/preparer/diagnostic" element={<PreparerDiagnostic />} />
          <Route path="/preparer/debuter" element={<PreparerDebuter />} />
          <Route path="/preparer/zones" element={<PreparerZones />} />
          <Route path="/preparer/cas-concrets" element={<PreparerCasConcrets />} />

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
