import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale, AlertTriangle, ShieldCheck, FileText, Copy, Check, Download, Home, Moon } from 'lucide-react'
import StepBar from '../components/StepBar'
import API from '../api'

function CounterDraft() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [copied, setCopied] = useState(false)

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  useEffect(() => {
    API.get('/api/analysis/' + id).then(res => setAnalysis(res.data))
  }, [id])

  const handleCopy = () => {
    if (analysis?.counterDraft) {
      navigator.clipboard.writeText(analysis.counterDraft)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (!analysis?.counterDraft) return
    const element = document.createElement("a")
    const file = new Blob([analysis.counterDraft], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = "LegalDraft-Counter-Draft.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const tabs = [
    { path: `/results/${id}`, label: 'All Clauses', icon: FileText },
    { path: `/redflags/${id}`, label: 'Red Flags', icon: AlertTriangle },
    { path: `/counter/${id}`, label: 'Counter Draft', icon: ShieldCheck }
  ]

  if (!analysis) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-800 border-t-blue-700 dark:border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <Scale className="text-blue-700 dark:text-blue-500 mr-2" size={24} />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">LegalDraft</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Home size={14} /> Back to Home
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
            <Moon size={20} />
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10">
        <StepBar current={4} />

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <Link key={tab.path} to={tab.path} className={`px-5 py-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${isActive ? 'border-green-700 dark:border-green-500 text-green-700 dark:text-green-500' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                <Icon size={16} /> {tab.label}
              </Link>
            )
          })}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-500 flex items-center gap-2">
            <ShieldCheck size={24} /> Recommended Counter Draft
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">AI-suggested safer versions of risky clauses. For academic reference only.</p>

        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-6 shadow-sm w-full">
          <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {analysis.counterDraft || "No counter draft available for this contract."}
          </div>
          <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors shadow-sm">
            {copied ? <Check size={16} className="text-green-600 dark:text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-3">
            <button onClick={() => navigate(`/results/${id}`)} className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
              Back to Results
            </button>
            <button onClick={handleDownload} className="bg-green-700 dark:bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download size={18} /> Download Draft
            </button>
          </div>
          <button onClick={() => navigate('/')} className="bg-blue-700 dark:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Home size={18} /> Back to Home
          </button>
        </div>
      </main>
    </motion.div>
  )
}
export default CounterDraft