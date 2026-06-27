import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UploadContract from './pages/UploadContract'
import Analysing from './pages/Analysing'
import AnalysisResults from './pages/AnalysisResults'
import RedFlags from './pages/RedFlags'
import CounterDraft from './pages/CounterDraft'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadContract />} />
      <Route path="/analysing/:id" element={<Analysing />} />
      <Route path="/results/:id" element={<AnalysisResults />} />
      <Route path="/redflags/:id" element={<RedFlags />} />
      <Route path="/counter/:id" element={<CounterDraft />} />
    </Routes>
  )
}
export default App