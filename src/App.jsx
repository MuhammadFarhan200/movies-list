import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import {  } from "module";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail  />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
