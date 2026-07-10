import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  const navigate = useNavigate()

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">The page you are looking for does not exist or has been moved.</p>
        <button onClick={() => navigate('/')} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          Back to Home
        </button>
      </div>
    </motion.div>
  )
}
export default NotFound