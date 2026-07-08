import { Link, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ShieldCheck, FileText, Scale, Moon } from 'lucide-react'

function RedFlags() {
  const { id } = useParams()
  const location = useLocation()

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  const tabs = [
    { path: `/results/${id}`, label: 'All Clauses', icon: FileText, color: 'text-slate-500 dark:text-slate-400' },
    { path: `/redflags/${id}`, label: 'Red Flags', icon: AlertTriangle, color: 'text-red-600 dark:text-red-400' },
    { path: `/counter/${id}`, label: 'Counter Draft', icon: ShieldCheck, color: 'text-slate-500 dark:text-slate-400' }
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col">
      <nav className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/40 px-8 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="text-indigo-600 dark:text-indigo-400" size={24} />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">LegalDraft AI</h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200">
          <Moon size={20} />
        </button>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10">
        <div className="flex gap-2 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <Link key={tab.path} to={tab.path} className={`relative px-6 py-3 rounded-t-xl font-bold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset ${isActive ? tab.color : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <Icon size={18} /> {tab.label}
                {isActive && (
                  <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 dark:bg-red-400 rounded-t-full" />
                )}
              </Link>
            )
          })}
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <AlertTriangle className="text-red-500 dark:text-red-400" size={32} /> Critical Issues
          </h2>

          <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-lg border border-red-200 dark:border-red-800/50 rounded-2xl p-6 shadow-xl shadow-red-100/50 dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500 dark:bg-red-500" />
            <p className="font-black text-red-800 dark:text-red-400 mb-3 text-sm tracking-widest uppercase">High Risk Termination</p>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-xl leading-relaxed mb-4">
              "Landlord may <span className="relative group underline decoration-dotted cursor-help decoration-red-400 dark:decoration-red-500">terminate<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-800 dark:bg-white dark:text-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl font-medium leading-relaxed">Bring the contract to an end or cancel the agreement.</div></span> with 7 days notice."
            </p>
            <div className="bg-white/60 dark:bg-slate-900/50 rounded-xl p-4 border border-red-100 dark:border-red-800/50">
              <p className="text-sm font-bold text-red-700 dark:text-red-300">7 days is insufficient notice. The standard legal minimum is 30 days to ensure tenant security.</p>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  )
}
export default RedFlags