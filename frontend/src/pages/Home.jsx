import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Search, ShieldCheck, Scale, ChevronRight, Moon } from 'lucide-react'

function Home() {
  const navigate = useNavigate()
  
  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center transition-colors">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 w-full px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <Scale className="text-blue-700 dark:text-blue-500 mr-2" size={24} />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">LegalDraft</h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
          <Moon size={20} />
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Automated Contract Analysis
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
          A research-driven tool for extracting risks, simplifying clauses, and drafting safer legal alternatives using large language models.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm text-left">
            <FileText className="text-blue-600 dark:text-blue-500 mb-3" size={24} />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">1. Upload</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Upload standard PDF agreements for isolated textual analysis.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm text-left">
            <Search className="text-blue-600 dark:text-blue-500 mb-3" size={24} />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">2. Analyse</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">System scores risks and translates complex terminology.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm text-left">
            <ShieldCheck className="text-blue-600 dark:text-blue-500 mb-3" size={24} />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">3. Review</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Export identified liabilities and balanced counter-drafts.</p>
          </div>
        </div>

        <button onClick={() => navigate('/upload')} className="flex items-center gap-2 bg-blue-700 dark:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-sm">
          Start Analysis <ChevronRight size={20} />
        </button>
      </main>
    </motion.div>
  )
}
export default Home