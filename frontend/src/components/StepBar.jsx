const steps = ['Upload', 'Analysing', 'Results', 'Red Flags', 'Counter Draft']

function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 px-4 w-full overflow-x-auto py-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 shrink-0 ${
            i < current
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : i === current
              ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:bg-blue-500 dark:ring-blue-900/50'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
          }`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`hidden sm:block ml-2 mr-3 text-xs font-semibold uppercase tracking-wider ${
            i <= current ? 'text-blue-700 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'
          }`}>
            {step}
          </span>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-4 sm:w-8 mr-3 transition-all duration-300 ${
              i < current ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-800'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  )
}
export default StepBar