import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import { SinformerIndex, SinformerHandicaps, SinformerEngager, SinformerConformite } from './pages/Reperer'
import { AccessibleIndex, AccessibleDiagnostic, AccessibleMiseEnPlace, AccessibleCasConcrets } from './pages/Preparer'
import { RessourcesIndex, RessourcesSignaletiques, RessourcesChecklist } from './pages/Outils'
import { FederationIndex, FederationApropos, FederationObjectif } from './pages/FMM'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sinformer" element={<SinformerIndex />} />
          <Route path="/sinformer/handicaps" element={<SinformerHandicaps />} />
          <Route path="/sinformer/engager" element={<SinformerEngager />} />
          <Route path="/sinformer/conformite" element={<SinformerConformite />} />

          <Route path="/accessible" element={<AccessibleIndex />} />
          <Route path="/accessible/diagnostic" element={<AccessibleDiagnostic />} />
          <Route path="/accessible/mise-en-place" element={<AccessibleMiseEnPlace />} />
          <Route path="/accessible/cas-concrets" element={<AccessibleCasConcrets />} />

          <Route path="/ressources" element={<RessourcesIndex />} />
          <Route path="/ressources/signaletiques" element={<RessourcesSignaletiques />} />
          <Route path="/ressources/checklist" element={<RessourcesChecklist />} />

          <Route path="/federation" element={<FederationIndex />} />
          <Route path="/federation/apropos" element={<FederationApropos />} />
          <Route path="/federation/objectif" element={<FederationObjectif />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
