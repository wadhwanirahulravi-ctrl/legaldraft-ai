import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import API from '../api'

function RedFlags() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    API.get('/api/analysis/' + id)
      .then(res => setAnalysis(res.data))
  }, [id])

  if (!analysis) return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-red-700 mb-6">⚠️ Red Flags</h1>
      {analysis.redFlags?.length === 0 && (
        <div className="bg-green-50 border border-green-200 w-full rounded-lg p-4 text-green-700 text-sm">
          No major red flags found in this contract.
        </div>
      )}
      {analysis.redFlags?.map((flag, i) => (
        <div key={i} className="border-l-4 border-red-500 bg-red-50 w-full rounded-r-xl p-4 mb-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          <p className="font-medium text-red-800 mb-1">{flag.severity === 'critical' ? '🚨 Critical' : '⚠️ Warning'}</p>
          <p className="text-sm text-gray-600 italic mb-2">"{flag.clauseText}"</p>
          <p className="text-sm text-red-700">{flag.reason}</p>
        </div>
      ))}
      <button onClick={() => navigate('/counter/' + id)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        View Counter Draft →
      </button>
      <p className="text-xs text-gray-400 mt-6">Always consult a qualified legal professional.</p>
    </motion.div>
  )
}
export default RedFlags