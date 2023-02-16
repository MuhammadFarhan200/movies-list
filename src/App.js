import './App.css';
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from 'react';

const App = () => {
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovie(result);
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <img className="Movie-image" src={`${process.env.REACT_APP_IMGURL}/${movie.poster_path}`} alt={movie.title} />
          <div className="Movie-title">{movie.title}</div>
          <div className='Row'>
            <div className="Wrap-1">
              <div className="Movie-date">{movie.release_date}</div>
              <div className="Movie-language">{movie.original_language}</div>
            </div>
            <div className="Wrap-2">
              <div className="Movie-rate">{movie.vote_average}</div>
              <div className="Movie-count">({movie.vote_count})</div>
            </div>
          </div>
        </div>
      );
    });
  }

  const search = async (q) => {
    const query = await searchMovie(q)
    console.log({query: query});
    setPopularMovie(query.results)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Movie List
        </h1>
        <input
          className="Movie-search"
          placeholder="Ketikan sesuatu disini..."
          onChange={({target}) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
