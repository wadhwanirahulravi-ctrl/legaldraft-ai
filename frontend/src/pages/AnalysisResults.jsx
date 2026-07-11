import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import API from '../api'

function AnalysisResults() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.get('/api/analysis/' + id)
      .then(res => {
        setAnalysis(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load analysis. Please try again.')
        setLoading(false)
      })
  }, [id])

  const riskColour = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800 animate-pulse'
  }

  if (loading) return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </motion.div>
  )

  if (error) return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 w-full">{error}</div>
    </motion.div>
  )

  if (!analysis) return null

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Contract Analysis</h1>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{analysis.summary}</p>
      <div className="flex gap-3 mb-8 w-full flex-wrap">
        <button onClick={() => navigate('/redflags/' + id)} className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          ⚠️ Red Flags ({analysis.redFlags?.length || 0})
        </button>
        <button onClick={() => navigate('/counter/' + id)} className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          View Counter Draft
        </button>
      </div>
      <h2 className="text-lg font-medium text-gray-700 mb-3">All Clauses</h2>
      {analysis.clauses?.map((clause, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 mb-3 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide">{clause.category}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${riskColour[clause.riskLevel] || 'bg-gray-100 text-gray-700'}`}>
              {clause.riskLevel} risk
            </span>
          </div>
          <p className="text-sm text-gray-600 italic mb-2">"{clause.text}"</p>
          <p className="text-sm text-gray-500">{clause.explanation}</p>
        </div>
      ))}
      <p className="text-xs text-gray-400 mt-6">For informational purposes only. Always consult a qualified legal professional.</p>
    </motion.div>
  )
}
export default AnalysisResults