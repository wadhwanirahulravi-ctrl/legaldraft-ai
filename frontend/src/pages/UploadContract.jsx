import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, File, AlertCircle, ArrowRight, Scale, X, Moon } from 'lucide-react'

function UploadContract() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const navigate = useNavigate()

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    validateAndSetFile(selected)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const selected = e.dataTransfer.files[0]
    validateAndSetFile(selected)
  }

  const validateAndSetFile = (selected) => {
    if (selected && selected.type !== 'application/pdf') {
      setError('Only PDF documents are supported at this time.')
      setFile(null)
    } else if (selected) {
      setError('')
      setFile(selected)
    }
  }

  const handleSubmit = () => {
    if (!file) {
      setError('Please select a PDF document to proceed.')
      return
    }
    navigate('/analysing/doc-123')
  }

  const removeFile = (e) => {
    e.preventDefault()
    setFile(null)
    setError('')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col">
      <nav className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/40 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="text-indigo-600 dark:text-indigo-400" size={24} />
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">LegalDraft AI</h1>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-slate-800 dark:text-slate-200">
          <Moon size={20} />
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-3xl shadow-2xl p-10 w-full max-w-xl">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-3">Upload Contract</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Secure, private, and encrypted analysis.</p>

          <label
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            tabIndex={0}
            className={`cursor-pointer block border-3 border-dashed rounded-2xl p-12 text-center mb-6 transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
              isDragging ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 scale-[1.02]' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <motion.div animate={{ y: isDragging ? -10 : 0 }}>
              <UploadCloud className={`mx-auto mb-4 transition-colors ${isDragging ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} size={48} />
              <p className="text-slate-700 dark:text-slate-200 font-bold text-lg mb-1">
                {isDragging ? 'Drop document here' : 'Click or drag document here'}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Maximum file size: 10MB (PDF)</p>
            </motion.div>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          </label>

          <AnimatePresence mode="wait">
            {file && (
              <motion.div initial={{ opacity: 0, height: 0, marginBottom: 0 }} animate={{ opacity: 1, height: 'auto', marginBottom: 24 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-4 flex items-center justify-between overflow-hidden">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-lg shrink-0"><File className="text-white" size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100 truncate max-w-[200px] sm:max-w-[250px]">{file.name}</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button onClick={removeFile} className="p-2 text-indigo-400 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-100 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-lg transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <X size={20} />
                </button>
              </motion.div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0, height: 0, marginBottom: 0 }} animate={{ opacity: 1, height: 'auto', marginBottom: 24 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} className="bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 rounded-xl p-4 flex items-center gap-3 overflow-hidden text-red-700 dark:text-red-300 font-medium">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!file}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
              file 
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-600 cursor-pointer' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            Begin Analysis <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default UploadContract