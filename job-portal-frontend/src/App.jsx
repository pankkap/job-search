import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import AllJobs from "./pages/AllJobs"
import FavoriteJobs from "./pages/FavoriteJobs"
import Navbar from "./pages/Navbar"
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob"

function App() {
  return (
    <BrowserRouter>
      
      {/* <h2>Job Portal Working</h2>
      <nav>
        <Link to="/">All Jobs</Link> | 
        <Link to="/favorites">Favorites</Link>
      </nav> */}

      <Navbar />

      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="/favorites" element={<FavoriteJobs />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App