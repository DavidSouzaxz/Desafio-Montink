import './css/VariantSelector.css'

export default function VariantSelector({ label, options, selected, onSelect }) {
  return (
    <div className="mt-4">
      <span className="block font-semibold mb-1">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => onSelect(opt)}
            className={`px-4 py-2 border rounded ${
              selected === opt ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}