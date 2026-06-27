function RedFlags() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-red-700 mb-6">
        ⚠️ Red Flags
      </h1>
      <div className="border-l-4 border-red-500 bg-red-50
                      rounded-r-xl p-4 mb-4">
        <p className="font-medium text-red-800 mb-1">
          🚨 Critical
        </p>
        <p className="text-sm text-gray-600 italic mb-2">
          "Landlord may terminate with 7 days notice."
        </p>
        <p className="text-sm text-red-700">
          7 days is insufficient notice.
          Standard minimum is 30 days.
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Always consult a qualified legal professional.
      </p>
    </div>
  )
}
export default RedFlags