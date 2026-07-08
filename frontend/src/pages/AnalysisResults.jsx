import { Link, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ShieldCheck, FileText, Scale, Moon } from 'lucide-react'

function AnalysisResults() {
  const { id } = useParams()
  const location = useLocation()

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  const tabs = [
    { path: `/results/${id}`, label: 'All Clauses', icon: FileText, color: 'text-indigo-600 dark:text-indigo-400' },
    { path: `/redflags/${id}`, label: 'Red Flags', icon: AlertTriangle, color: 'text-slate-500 dark:text-slate-400' },
    { path: `/counter/${id}`, label: 'Counter Draft', icon: ShieldCheck, color: 'text-slate-500 dark:text-slate-400' }
  ]

  const clauses = [
    { 
      text: <>The landlord may <span className="relative group underline decoration-dotted cursor-help decoration-slate-400 dark:decoration-slate-500">terminate<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-800 dark:bg-white dark:text-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl font-medium leading-relaxed">Bring the contract to an end or cancel the agreement.</div></span> with 7 days notice.</>, 
      category: "Termination", 
      riskLevel: "high", 
      explanation: "You can be asked to leave with only 7 days warning. That is very short notice." 
    },
    { 
      text: <>Rent shall be paid on the 1st of each month.</>, 
      category: "Payment", 
      riskLevel: "low", 
      explanation: "Standard payment term. Nothing unusual." 
    },
  ]

  const riskStyles = {
    low: "bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
    medium: "bg-amber-100/80 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
    high: "bg-red-100/80 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50"
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col">
      <nav className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/40 px-8 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="text-indigo-600 dark:text-indigo-400" size={24} />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">LegalDraft AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-full border border-white dark:border-slate-700">
            Doc ID: {id}
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200">
            <Moon size={20} />
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10">
        <div className="flex gap-2 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 pb-1">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <Link key={tab.path} to={tab.path} className={`relative px-6 py-3 rounded-t-xl font-bold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset ${isActive ? tab.color : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <Icon size={18} /> {tab.label}
                {isActive && (
                  <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
                )}
              </Link>
            )
          })}
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6">Complete Analysis</h2>
          
          <div className="space-y-4">
            {clauses.map((clause, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.1) }} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/60 dark:border-slate-700/60 rounded-2xl p-6 shadow-xl shadow-slate-200/30 dark:shadow-none hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{clause.category}</span>
                  <span className={`text-xs px-4 py-1.5 rounded-full font-bold border ${riskStyles[clause.riskLevel]}`}>
                    {clause.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 font-semibold text-lg leading-relaxed mb-3">"{clause.text}"</p>
                <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{clause.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}
export default AnalysisResults