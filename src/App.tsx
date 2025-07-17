import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectPage from './pages/ProjectPage'
import VideoPage from './pages/VideoPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/video" element={<VideoPage/>} />
      </Routes>
    </Router>
  )
}

export default App