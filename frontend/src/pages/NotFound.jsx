import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, Home } from 'lucide-react'

function NotFound() {
  const navigate = useNavigate()

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center transition-colors">
      <div className="text-center p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm max-w-md w-full mx-4">
        <AlertTriangle className="text-red-600 dark:text-red-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">404: Route Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The system could not locate the requested document or analysis endpoint.</p>
        <button onClick={() => navigate('/')} className="w-full flex justify-center items-center gap-2 bg-blue-700 dark:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
          <Home size={18} /> Return to Dashboard
        </button>
      </div>
    </motion.div>
  )
}
export default NotFound