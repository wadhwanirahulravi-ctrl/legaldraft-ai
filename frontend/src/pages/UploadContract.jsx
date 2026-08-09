import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Scale, AlertCircle, Moon } from 'lucide-react'
import StepBar from '../components/StepBar'
import API from '../api'

function UploadContract() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toggleTheme = () => document.documentElement.classList.toggle('dark')

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0]
    if (selected && selected.type === 'application/pdf') {
      setFile(selected)
      setError('')
    } else {
      setError('Only PDF files are accepted.')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    maxFiles: 1
  })

  const handleSubmit = async () => {
    if (!file) return setError('Please select a PDF.')
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('contract', file)
    try {
      const res = await API.post('/api/upload', formData)
      navigate('/analysing/' + res.data.contractId)
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.')
      setLoading(false)
    }
  }

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
        <StepBar current={0} />
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-8 w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 border-b border-gray-100 dark:border-gray-800 pb-4">Document Upload</h2>
          
          <div {...getRootProps()} className={`mt-6 border-2 border-dashed rounded-md p-10 text-center cursor-pointer transition-all duration-200 ${
            isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}>
            <input {...getInputProps()} />
            <div className="text-4xl mb-3">📄</div>
            <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
              {isDragActive ? 'Drop your PDF here' : 'Drag and drop a PDF contract'}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">or click to browse files</p>
          </div>

          {file && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm font-bold px-2">✕</button>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-md flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={!file || loading} className={`mt-6 w-full py-3 rounded-md font-semibold transition-colors ${
            file && !loading ? 'bg-blue-700 dark:bg-blue-600 text-white hover:bg-blue-800 dark:hover:bg-blue-700' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}>
            {loading ? 'Processing...' : 'Upload & Analyze'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
export default UploadContract