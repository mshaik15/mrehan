import Header from '../components/Header'
import BreakdownRenderer from '../components/BreakdownRenderer'

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-theme-bg-primary text-theme-text-primary">
      <Header />
      <BreakdownRenderer />
    </div>
  )
}