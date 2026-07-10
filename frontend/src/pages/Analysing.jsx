import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import API from '../api'

function Analysing() {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        await API.post('/api/analyse/' + id)
        navigate('/results/' + id)
      } catch (err) {
        navigate('/upload')
      }
    }
    runAnalysis()
  }, [id, navigate])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center w-full">
        <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Analysing your contract...</h1>
        <p className="text-gray-500 text-sm">This takes 10–20 seconds. Do not close this page.</p>
      </div>
    </motion.div>
  )
}
export default Analysing