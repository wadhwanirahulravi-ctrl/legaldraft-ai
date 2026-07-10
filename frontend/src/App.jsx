import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import UploadContract from './pages/UploadContract'
import Analysing from './pages/Analysing'
import AnalysisResults from './pages/AnalysisResults'
import RedFlags from './pages/RedFlags'
import CounterDraft from './pages/CounterDraft'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadContract />} />
        <Route path="/analysing/:id" element={<Analysing />} />
        <Route path="/results/:id" element={<AnalysisResults />} />
        <Route path="/redflags/:id" element={<RedFlags />} />
        <Route path="/counter/:id" element={<CounterDraft />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
export default App