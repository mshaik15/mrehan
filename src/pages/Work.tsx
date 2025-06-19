import Header from "../components/Header"
import WorkSection from "../components/Work"

export default function Work() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            Work Experience
          </h1>
        </div>

        <WorkSection />
      </div>
    </div>
  )
}