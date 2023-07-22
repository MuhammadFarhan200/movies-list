import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Genres from "./pages/Genres";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail  />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
