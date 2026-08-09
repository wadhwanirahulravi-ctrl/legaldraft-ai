import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale, AlertTriangle, ShieldCheck, FileText, Moon } from 'lucide-react'
import StepBar from '../components/StepBar'
import API from '../api'

function RedFlags() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  useEffect(() => {
    API.get('/api/analysis/' + id).then(res => setAnalysis(res.data))
  }, [id])

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
        <div className="flex items-center">
          <Scale className="text-blue-700 dark:text-blue-500 mr-2" size={24} />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">LegalDraft</h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
          <Moon size={20} />
        </button>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10">
        <StepBar current={3} />

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <Link key={tab.path} to={tab.path} className={`px-5 py-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${isActive ? 'border-red-700 dark:border-red-500 text-red-700 dark:text-red-500' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                <Icon size={16} /> {tab.label}
              </Link>
            )
          })}
        </div>

        <h2 className="text-2xl font-bold text-red-700 dark:text-red-500 mb-6 flex items-center gap-2">
          <AlertTriangle size={24} /> Critical Red Flags
        </h2>

        {analysis.redFlags?.length === 0 ? (
          <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-gray-600 dark:text-gray-400">No critical red flags detected.</div>
        ) : (
          <div className="space-y-4">
            {analysis.redFlags?.map((flag, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 border-l-4 border-l-red-600 dark:border-l-red-500 border border-y-gray-200 dark:border-y-gray-800 border-r-gray-200 dark:border-r-gray-800 rounded-r-md p-5 shadow-sm w-full">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Clause: {flag.clauseName}</h4>
                <p className="text-red-700 dark:text-red-400 text-sm font-medium mb-1"><strong>Risk:</strong> {flag.reasoning}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm"><strong>Original:</strong> {flag.originalText}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => navigate(`/counter/${id}`)} className="bg-blue-700 dark:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
            View Counter Draft
          </button>
        </div>
      </main>
    </motion.div>
  )
}
export default RedFlags