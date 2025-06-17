import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownCardProps {
  title: string
  subtitle: string
  year: string
  icon: string
  children?: React.ReactNode
}

export default function DropdownCard({ title, subtitle, year, icon, children }: DropdownCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 rounded-lg border border-gray-700/50 bg-gray-900/50 hover:border-gray-600/50 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <img src={icon} alt="" className="w-10 h-10 rounded-lg" />
          <div className="text-left">
            <h3 className="text-base font-medium text-gray-100">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{year}</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Slide transition */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 border-t border-gray-700/50">
          {children}
        </div>
      </div>
    </div>
  )
}
