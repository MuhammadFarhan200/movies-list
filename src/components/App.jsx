import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Genres from "../pages/Genres";
import Movies from "../pages/Movies";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Navbar from "./Navbar";
import Footer from "./Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId/:movieSlug" element={<MovieDetail  />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
