import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Search, ShieldCheck, Scale, ChevronRight, Moon } from 'lucide-react'

function Home() {
  const navigate = useNavigate()

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <nav className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/40 sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Scale className="text-indigo-600 dark:text-indigo-400" size={28} />
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300 tracking-tight">
            LegalDraft AI
          </h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-slate-800 dark:text-slate-200">
          <Moon size={20} />
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.h2 variants={item} className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            Understand any contract <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-400 dark:from-indigo-400 dark:to-blue-300">
              in plain English.
            </span>
          </motion.h2>

          <motion.p variants={item} className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Upload your legal documents. Our AI extracts risks, explains clauses simply, and drafts safer alternatives in seconds.
          </motion.p>

          <motion.div variants={item} className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-left">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FileText className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">1. Upload</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Securely upload any PDF contract, from leases to employment offers.</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-blue-100/50 dark:shadow-none hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-left">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Search className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">2. Analyse</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Our AI scans line-by-line, scoring risks and translating legalese.</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-emerald-100/50 dark:shadow-none hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-left">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">3. Protect</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Download an AI-generated counter-draft with balanced, safer terms.</p>
            </div>
          </motion.div>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/upload')}
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all overflow-hidden shadow-[0_20px_25px_-5px_rgba(79,70,229,0.4)] dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Analysis <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </motion.button>
        </motion.div>
      </main>
    </motion.div>
  )
}
export default Home