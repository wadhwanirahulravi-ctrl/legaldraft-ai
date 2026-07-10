import { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ShieldCheck, FileText, Scale, Download, Moon, CheckCircle2, Copy, Check } from 'lucide-react'
import API from '../api'

function CounterDraft() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  useEffect(() => {
    API.get('/api/analysis/' + id)
      .then(res => setAnalysis(res.data))
  }, [id])

  const handleDownload = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleCopy = () => {
    if (analysis?.counterDraft) {
      navigator.clipboard.writeText(analysis.counterDraft)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const tabs = [
    { path: `/results/${id}`, label: 'All Clauses', icon: FileText, color: 'text-slate-500 dark:text-slate-400' },
    { path: `/redflags/${id}`, label: 'Red Flags', icon: AlertTriangle, color: 'text-slate-500 dark:text-slate-400' },
    { path: `/counter/${id}`, label: 'Counter Draft', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400' }
  ]

  if (!analysis) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col relative overflow-hidden">
      <nav className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/40 px-8 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="text-indigo-600 dark:text-indigo-400" size={24} />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">LegalDraft AI</h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200">
          <Moon size={20} />
        </button>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10">
        <div className="flex gap-2 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <Link key={tab.path} to={tab.path} className={`relative px-6 py-3 rounded-t-xl font-bold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset ${isActive ? tab.color : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <Icon size={18} /> {tab.label}
                {isActive && (
                  <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 dark:bg-emerald-400 rounded-t-full" />
                )}
              </Link>
            )
          })}
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3">
              <ShieldCheck className="text-emerald-500 dark:text-emerald-400" size={32} /> Safer Alternatives
            </h2>
            <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 dark:hover:bg-emerald-600 flex items-center gap-2 shadow-lg shadow-emerald-200 dark:shadow-none transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
              <Download size={20}/> Download PDF
            </motion.button>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/60 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl shadow-slate-200/30 dark:shadow-none relative group">
            <div className="text-slate-800 dark:text-slate-200 font-semibold text-lg leading-relaxed whitespace-pre-wrap">
              {analysis.counterDraft || "No counter draft available for this contract."}
            </div>
            <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-md text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {copied ? <Check size={18} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={18} />}
            </button>
          </motion.div>
          
          <div className="mt-8 flex gap-3">
            <button onClick={() => navigate(`/results/${id}`)} className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Back to Results
            </button>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 right-6 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50">
            <CheckCircle2 size={24} className="text-emerald-400 dark:text-emerald-500" />
            <span className="font-bold text-sm">Counter-draft PDF Downloaded</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default CounterDraft