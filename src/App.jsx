import { getGenreMovie, getMovieList, searchMovie } from "./utils/Api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovie, setPopularMovie] = useState([])
  const [genreMovie, setGenreMovie] = useState([])

  useEffect(() => {
    getMovieList().then((res) => {
      setPopularMovie(res)
    })
  }, [])

  useEffect(() => {
    getGenreMovie().then((res) => {
      setGenreMovie(res)
    })
  }, [])

  // console.log(popularMovie);

  const PopularMovieList = () => {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {popularMovie.map((movie, index) => {
          return (
            <button type="button" key={index} onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}
              className='group relative rounded-lg outline-none focus:ring-[3px] focus:ring-cyan-400 cursor-pointer transition ease-in-out overflow-hidden'
            >
              <div className='absolute w-full h-full bg-black opacity-0 group-hover:opacity-70 rounded-lg transition ease-in-out'>
              </div>
              <div className='opacity-0 absolute top-1/2 -translate-y-1/2 sm:translate-y-0 sm:top-6 left-3 right-3 group-hover:opacity-100 transform text-center transition ease-in-out'>
                <h3 className='text-white text-md whitespace-nowrap font-semibold'>{movie.title.substring(0, 15)}{movie.title.length > 15 ? '...' : ''}</h3>
                <div className='flex justify-between mt-3 px-3'>
                  <p className='text-white text-sm font-semibold'>{movie.release_date}</p>
                  <p className='text-white text-sm font-semibold'>{movie.vote_average}</p>
                </div>
                <div className='flex flex-wrap justify-center mt-3'>
                  {movie.genre_ids.map((genreId, index) => {
                    const genre = genreMovie.find(item => item.id === genreId);

                    if (genre) {
                      return (
                        <span key={genre.id} className='text-white text-sm font-semibold'>
                          {genre.name}{index !== movie.genre_ids.length - 1 ? ',\u00A0' : ''}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
                <p className='text-white text-sm mt-3 hidden sm:block'>{`${movie.overview.substring(0, 100)}...`}</p>
              </div>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
                className='rounded-lg w-full h-full '
              />
            </button>
          )
        })}
      </div>
    )
  }

  const search = async (q) => {
    if (q.length === 0 || q === '') {
      getMovieList().then((res) => {
        setPopularMovie(res)
      })
      return
    }

    const query = await searchMovie(q.toLowerCase().trim())
    setPopularMovie(query.results)
  }

  return (
    <div className='container mx-auto p-5 lg:p-10'>
      <h3 className='text-2xl text-center text-slate-200 font-semibold mt-10 mb-3'>Popular Movies List</h3>
      <p className='text-slate-200 mb-6 max-w-3xl text-center mx-auto'>Come on, explore the complete list of films, read interesting reviews, and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
      <div className='flex justify-center mb-10'>
        <input
          className='bg-slate-800 text-slate-200 w-96 h-10 px-5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-400 transition ease-in-out'
          type='search'
          name='search'
          placeholder='Type movie title here...'
          onChange={(e) => search(e.target.value)}
        />
      </div>
      <PopularMovieList />
    </div>
  )
}

export default App
