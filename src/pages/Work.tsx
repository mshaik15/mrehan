import Header from "../components/Header"
import WorkSection from "../components/Work"

export default function Work() {
  return (
    <div className="min-h-screen bg-theme-bg-primary text-theme-text-primary">
      <Header />
      <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
            Work Experience
          </h1>
        </div>

        <WorkSection />
      </div>
    </div>
  )
}