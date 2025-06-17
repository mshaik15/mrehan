import WorkSection from "../components/Work"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function Work() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <WorkSection />
      </div>
    </div>
  )
}