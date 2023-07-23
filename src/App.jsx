import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Genres from "./pages/Genres";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail  />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
