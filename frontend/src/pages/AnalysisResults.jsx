import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale, AlertTriangle, ShieldCheck, FileText, Moon } from 'lucide-react'
import StepBar from '../components/StepBar'
import API from '../api'

function AnalysisResults() {
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
        <StepBar current={2} />

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <Link key={tab.path} to={tab.path} className={`px-5 py-2 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${isActive ? 'border-blue-700 dark:border-blue-500 text-blue-700 dark:text-blue-500' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                <Icon size={16} /> {tab.label}
              </Link>
            )
          })}
        </div>

        <div className="mb-6 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Executive Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{analysis.summary || 'No summary available.'}</p>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Extracted Clauses</h3>
        <div className="space-y-4">
          {analysis.clauses?.map((clause, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{clause.clauseName}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${
                  clause.riskLevel === 'High' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50' :
                  clause.riskLevel === 'Medium' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50' :
                  'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50'
                }`}>
                  {clause.riskLevel} Risk
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3"><strong>Original:</strong> {clause.originalText}</p>
              <p className="text-blue-800 dark:text-blue-300 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-100 dark:border-blue-800/50"><strong>Simple Explanation:</strong> {clause.explanation}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => navigate(`/redflags/${id}`)} className="bg-blue-700 dark:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
            Review Red Flags
          </button>
        </div>
      </main>
    </motion.div>
  )
}
export default AnalysisResults