function CounterDraft() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Counter Draft
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        AI-suggested safer versions of risky clauses.
        For reference only.
      </p>
      <div className="bg-gray-50 border border-gray-200
                      rounded-xl p-4 mb-4 text-sm text-gray-700
                      whitespace-pre-wrap">
ORIGINAL: The landlord may terminate with 7 days notice.
SAFER: Either party may terminate this agreement with a
minimum of 30 days written notice.
      </div>
      <button className="bg-blue-600 text-white px-4 py-2
                         rounded-lg text-sm hover:bg-blue-700">
        Download as PDF
      </button>
      <p className="text-xs text-gray-400 mt-4">
        Always consult a qualified legal professional.
      </p>
    </div>
  )
}
export default CounterDraft