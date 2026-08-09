import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale, Moon } from 'lucide-react'
import StepBar from '../components/StepBar'
import API from '../api'

function Analysing() {
  const { id } = useParams()
  const navigate = useNavigate()

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  useEffect(() => {
    API.post('/api/analyse/' + id)
      .then(() => navigate('/results/' + id))
      .catch(() => navigate('/upload'))
  }, [id, navigate])

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
      
      <div className="flex-1 flex flex-col items-center pt-10 p-6">
        <StepBar current={1} />
        <div className="mt-20 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-blue-700 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analysing Document...</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Processing natural language and extracting legal risks.</p>
        </div>
      </div>
    </motion.div>
  )
}
export default Analysing