import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getGenreMovie, getMovieList, searchMovie } from "../utils/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import Footer from "../components/Footer";

const Home = () => {
  const [popularMovie, setPopularMovie] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [isSearch, setIsSearch] = useState(false)
  const totalPages = 500

  useEffect(() => {
    document.title = 'MList | Find Your Favorite Movie'
    // window.scrollTo(0, 0)

    const sessionPage = sessionStorage.getItem('currentPage')
    if (sessionPage) {
      setCurrentPage(parseInt(sessionPage))
      getMovieList(currentPage).then((res) => {
        setPopularMovie(res.results)
      })
    } 

    if (currentPage > 5) {
      setStartIndex(currentPage - 5);
      setEndIndex(currentPage + 5);
    }

    // console.log(currentPage);
  }, [currentPage])

  useEffect(() => {
    getMovieList().then((res) => {
      setPopularMovie(res.results)
    })
  }, [])

  useEffect(() => {
    getGenreMovie().then((res) => {
      setGenreMovie(res)
    })
  }, [])

  const handleChangePage = (pageNumber) => {
    // window.scrollTo(0, 0)
    setCurrentPage(pageNumber)
    sessionStorage.setItem('currentPage', pageNumber)
    getMovieList(pageNumber).then((res) => {
      setPopularMovie(res.results)
    })
    if (pageNumber > 5) {
      setStartIndex(pageNumber - 5);
      setEndIndex(pageNumber + 5);
    } else {
      setStartIndex(0);
      setEndIndex(10);
    }
  }

  const handleLoadMorePage = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + 10);
    setEndIndex((prevEndIndex) => prevEndIndex + 10);
  }

  const PopularMovieList = () => {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10'>
        {popularMovie.map((movie, index) => {
          return (
            <Link key={index} to={`/movie/${movie.id}`}
              className='group relative rounded-lg outline-none focus:ring-[3px] focus:ring-cyan-500 cursor-pointer transition ease-in-out overflow-hidden'
            >
              <div className='absolute w-full h-full bg-black opacity-0 group-hover:opacity-70 rounded-lg transition ease-in-out'></div>
              <div className='opacity-0 absolute top-1/2 transform -translate-y-1/2 left-3 right-3 group-hover:opacity-100 text-center transition ease-in-out'>
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
              <img src={`${import.meta.env.VITE_IMG_URL}/${movie.poster_path}`} alt={movie.title} 
                className='rounded-lg w-full h-full text-slate-200'
              />
            </Link>
          )
        })}
      </div>
    )
  }

  const search = async (q) => {
    if (q.trim()) {
      setIsSearch(true)
      const res = await searchMovie(q.toLowerCase().trim())
      setPopularMovie(res.results)
    } else {
      setIsSearch(false)
      getMovieList(currentPage).then((res) => {
        setPopularMovie(res.results)
      })
    }
  }

  return (
    <>
      <Navbar />

      <div className='container mx-auto p-5 lg:p-10'>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold my-8'>Top Rated Movies</h3>
        <p className='text-slate-200 mb-6 max-w-3xl text-center mx-auto'>Come on, explore the complete list of films, read interesting reviews, and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
        <div className='relative flex mb-12 w-[100%] sm:w-fit mx-auto'>
          <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-200' />
          <input
            className='bg-slate-800 text-slate-200 w-full sm:w-[30rem] h-12 ps-11 pe-5 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 transition ease-in-out'
            type='search'
            name='search'
            placeholder='Type movie title here...'
            onChange={(e) => search(e.target.value)}
            autoComplete="off"
          />
        </div>
        <PopularMovieList />
        <div className={`${isSearch ? 'hidden' : 'flex'} flex-wrap justify-center items-center gap-2`}>
          <button type='button' name='prev' className={`${currentPage === 1 ? 'hidden' : 'inline-block'} button`}
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button type='button' name='first' className={`${currentPage > 10 ? 'inline-block' : 'hidden'} button`}
            onClick={() => handleChangePage(1)}
          >
            1
          </button>
          {
            Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(startIndex, endIndex)
            .map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-200 hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500"
              }`}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </button>
          ))}
          <button type='button' name='next' className={`${(currentPage || startIndex) < totalPages - 10 && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
            onClick={handleLoadMorePage}
            disabled={currentPage === totalPages}
          >
            ...
          </button>
          <button type='button' name='last' className={`${(currentPage || startIndex) < totalPages && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
            onClick={() => handleChangePage(totalPages)}
          >
            {totalPages}
          </button>
          <button type='button' name='next' className={`${currentPage == totalPages ? 'hidden' : 'inline-block'} button`}
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Home
