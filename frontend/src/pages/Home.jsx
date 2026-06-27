import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200
                         px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          LegalDraft AI
        </h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20
                       text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Understand any contract
          <span className="text-blue-600">
            {' '}in plain English
          </span>
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Upload any legal contract. Our AI explains every
          clause, flags risky terms, and suggests safer
          alternatives.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10 text-left">
          <div className="bg-white rounded-lg p-4 border
                          border-gray-200">
            <div className="text-2xl mb-2">📄</div>
            <h3 className="font-medium text-gray-800 text-sm">
              Upload your contract
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              PDF — rent, employment, vendor
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border
                          border-gray-200">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-medium text-gray-800 text-sm">
              AI analyses every clause
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              Risk-scored, explained simply
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border
                          border-gray-200">
            <div className="text-2xl mb-2">✍️</div>
            <h3 className="font-medium text-gray-800 text-sm">
              Download safer version
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              Counter-draft with safer clauses
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/upload')}
          className="bg-blue-600 text-white px-8 py-4
                     rounded-lg text-lg font-medium
                     hover:bg-blue-700 transition-colors"
        >
          Get Started →
        </button>

        <p className="text-xs text-gray-400 mt-8">
          For informational purposes only. Always consult a qualified legal professional.
        </p>
      </main>
    </div>
  )
}
export default Home