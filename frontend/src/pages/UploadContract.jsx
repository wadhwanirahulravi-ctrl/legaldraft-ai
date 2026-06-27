import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UploadContract() {
  const [file, setFile]   = useState(null)
  const [error, setError] = useState('')
  const navigate          = useNavigate()

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type !== 'application/pdf') {
      setError('Only PDF files are accepted.')
      setFile(null)
    } else {
      setError('')
      setFile(selected)
    }
  }

  const handleSubmit = () => {
    if (!file) {
      setError('Please select a PDF file first.')
      return
    }
    navigate('/analysing/test-id')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center
                    justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm border
                      border-gray-200 p-8 w-full max-w-lg">

        <h1 className="text-2xl font-semibold text-gray-800
                       mb-2">
          Upload Your Contract
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Upload any PDF contract for AI analysis.
        </p>

        <div className="border-2 border-dashed border-gray-300
                        rounded-lg p-8 text-center mb-4
                        hover:border-blue-400 transition-colors">
          <p className="text-gray-400 text-sm mb-3">
            Select a PDF file
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block mx-auto text-sm text-gray-500"
          />
        </div>

        {file && (
          <div className="bg-blue-50 border border-blue-200
                          rounded-lg p-3 mb-4 text-sm
                          text-blue-700">
            Selected: {file.name}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200
                          rounded-lg p-3 mb-4 text-sm
                          text-red-600">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3
                     rounded-lg font-medium hover:bg-blue-700
                     transition-colors"
        >
          Analyse Contract
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          For informational purposes only. Always consult a qualified legal professional.
        </p>
      </div>
    </div>
  )
}
export default UploadContract