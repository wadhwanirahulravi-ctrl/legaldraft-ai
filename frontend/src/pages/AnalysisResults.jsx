function AnalysisResults() {
  const fakeClauses = [
    {
      text: "The landlord may terminate with 7 days notice.",
      category: "Termination",
      riskLevel: "high",
      explanation: "You can be asked to leave with only 7 days warning. That is very short notice."
    },
    {
      text: "Rent shall be paid on the 1st of each month.",
      category: "Payment",
      riskLevel: "low",
      explanation: "Standard payment term. Nothing unusual."
    },
  ]

  const riskColour = {
    low:    "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high:   "bg-red-100 text-red-800"
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Contract Analysis
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Showing placeholder data — real data connects in Week 3.
      </p>

      {fakeClauses.map((clause, i) => (
        <div key={i}
          className="border border-gray-200 rounded-xl
                     p-4 mb-3 bg-white">
          <div className="flex justify-between items-center
                          mb-2">
            <span className="text-xs text-gray-400 uppercase
                             tracking-wide">
              {clause.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full
                              font-medium
                              ${riskColour[clause.riskLevel]}`}>
              {clause.riskLevel} risk
            </span>
          </div>
          <p className="text-sm text-gray-600 italic mb-2">
            "{clause.text}"
          </p>
          <p className="text-sm text-gray-500">
            {clause.explanation}
          </p>
        </div>
      ))}

      <p className="text-xs text-gray-400 mt-4">
        For informational purposes only.
        Always consult a qualified legal professional.
      </p>
    </div>
  )
}
export default AnalysisResults