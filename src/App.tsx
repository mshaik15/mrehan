import { Github, Linkedin, Mail } from 'lucide-react'

export function App() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-gray-900 text-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-100 tracking-tight">
          Mohammed Rehan
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-gray-400 mt-2">
          Mechatronics @ the University of Waterloo
        </h2>
        <p className="text-gray-300 mt-4 sm:mt-6 font-light text-base sm:text-lg max-w-2xl mx-auto">
          Prev. Growth Eng @{' '}
          <span className="font-medium">Ramp</span>. Building AI for engineers.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center border-t border-gray-800 pt-6 space-y-6 sm:space-y-0">
          <nav className="flex space-x-6 sm:space-x-8">
            <a
              href="#work"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              work
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              projects
            </a>
            <a
              href="#resume"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              resume
            </a>
          </nav>
          <div className="flex space-x-5 sm:ml-16">
            <a
              href="#github"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="#linkedin"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#email"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
