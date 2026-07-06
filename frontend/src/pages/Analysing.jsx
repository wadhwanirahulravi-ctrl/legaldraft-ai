import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Shield, Search, FileText } from 'lucide-react'

function Analysing() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { icon: FileText, text: "Extracting document text..." },
    { icon: Search, text: "Identifying key clauses..." },
    { icon: Shield, text: "Evaluating risk vectors..." }
  ]

  useEffect(() => {
    const duration = 10000
    const intervalTime = 100
    const totalTicks = duration / intervalTime

    let currentTick = 0
    const timer = setInterval(() => {
      currentTick++
      const currentProgress = (currentTick / totalTicks) * 100
      setProgress(Math.min(currentProgress, 100))

      if (currentProgress > 33 && currentProgress < 66) setStep(1)
      else if (currentProgress >= 66 && currentProgress < 100) setStep(2)

      if (currentTick >= totalTicks) {
        clearInterval(timer)
        setIsComplete(true)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  const CurrentIcon = steps[step].icon

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-3xl shadow-2xl p-10 w-full max-w-md text-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative z-10">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="45" fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div key={step} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-indigo-600 dark:text-indigo-400">
                    <CurrentIcon size={28} />
                  </motion.div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Analysing Document</h2>
              <motion.p key={`text-${step}`} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-slate-500 dark:text-slate-400 font-medium h-6">
                {steps[step].text}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 pt-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", damping: 15 }} className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400" size={40} />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Analysis Complete</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Risks identified and alternatives generated.</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/results/${id}`)}
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                View Full Report
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
export default Analysing