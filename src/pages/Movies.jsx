import React, { Suspense, useEffect, useState } from "react";
import { getMovieList, searchMovie, getDiscoverMovie, getGenreMovie } from "../utils/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../utils/Loader";

const MovieCard = React.lazy(() => import('../components/MovieCard'));

const Movies = () => {
  const [popularMovie, setPopularMovie] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [genreId, setGenreId] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSearch, setCurrentPageSearch] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)

  useEffect(() => {
    document.title = 'MList | List of Movies'
    window.scrollTo(0, 0)

    const sessionSearch = sessionStorage.getItem('searchQuery')
    const sessionPage = sessionStorage.getItem('currentPagePopular')
    const sessionPageSearch = sessionStorage.getItem('pageSearch')
    const sessionGenreId = sessionStorage.getItem('genreId')

    if (sessionSearch) {
      setIsSearch(true)
      setSearchQuery(sessionSearch)
      sessionPageSearch ? setCurrentPageSearch(parseInt(sessionPageSearch)) : setCurrentPageSearch(1)
      searchMovie(sessionSearch, currentPageSearch).then((res) => {
        setPopularMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
    } else {
      setIsSearch(false)
      sessionPage ? setCurrentPage(parseInt(sessionPage)) : setCurrentPage(1)
      if (sessionGenreId) {
        setGenreId(sessionGenreId)
        const parseGenreId = JSON.parse(sessionGenreId)
        getDiscoverMovie(currentPage, parseGenreId).then((res) => {
          setPopularMovie(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        getGenreMovie().then((res) => {
          setGenreMovie(res.filter((genre) => genreId.includes(genre.id)))
        })
      } else {
        getMovieList(currentPage, 'popular').then((res) => {
          setPopularMovie(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        if (currentPage > 5) {
          setStartIndex(currentPage - 5);
          setEndIndex(currentPage + 5);
        }
      }
    }

  }, [currentPage, currentPageSearch, genreId])

  const search = async (q) => {
    if (q.trim()) {
      setIsSearch(true)
      const sessionGenreId = sessionStorage.getItem('genreId')
      if (sessionGenreId) {
        sessionStorage.removeItem('genreId')
        setGenreId([])
      }
      setSearchQuery(q)
      sessionStorage.setItem('searchQuery', q)
      const res = await searchMovie(q, 1)
      setPopularMovie(res.results)
      setCurrentPageSearch(1)
      sessionStorage.setItem('pageSearch', 1)
      setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      setStartIndex(0);
    } else {
      setIsSearch(false)
      sessionStorage.removeItem('searchQuery')
      setCurrentPage(1)
      getMovieList(currentPage, 'popular').then((res) => {
        setPopularMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
    }
  } 

  const handleChangePage = (pageNumber) => {
    if (isSearch) {
      setCurrentPageSearch(pageNumber)
      sessionStorage.setItem('pageSearch', pageNumber)
      searchMovie(searchQuery, pageNumber).then((res) => {
        setPopularMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
    } else if (genreId !== null) {
      setCurrentPage(pageNumber)
      sessionStorage.setItem('currentPagePopular', pageNumber)
      getDiscoverMovie(pageNumber, genreId).then((res) => {
        setPopularMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
      getGenreMovie().then((res) => {
        setGenreMovie(res.filter((genre) => genre.id === parseInt(genreId)))
      }) 
      if (pageNumber > 5) {
        setStartIndex(pageNumber - 5);
        setEndIndex(pageNumber + 5);
      } else {
        setStartIndex(0);
        setEndIndex(10);
      }
    } else {
      setCurrentPage(pageNumber)
      sessionStorage.setItem('currentPagePopular', pageNumber)
      getMovieList(pageNumber, 'popular').then((res) => {
        setPopularMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
      if (pageNumber > 5) {
        setStartIndex(pageNumber - 5);
        setEndIndex(pageNumber + 5);
      } else {
        setStartIndex(0);
        setEndIndex(10);
      }
    }
  }

  const handleLoadMorePage = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + 10);
    setEndIndex((prevEndIndex) => prevEndIndex + 10);
  }

  const handleRemoveFilter = () => {
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('currentPagePopular')
    setCurrentPage(1)
    setGenreId([])
    getMovieList(currentPage, 'popular').then((res) => {
      setPopularMovie(res.results)
      setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
    })
    setStartIndex(0);
    setEndIndex(10);
  }

  const PopularMovieList = () => {
    return popularMovie.length > 0 ? (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10 sm:mb-12'>
        {popularMovie.map((movie, index) => (
          <Suspense key={index} fallback={<Loader />}>
            <MovieCard movie={movie} />
          </Suspense>
        ))}
      </div>
    ) : (
      <div className='flex justify-center items-center'>
        <h4 className='text-slate-200'>No Matching Results Found :(</h4>
      </div>
    )
  }
  
  return (
    <>
      <Navbar />

      <div className='container mx-auto p-5 lg:p-10' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-8'>List of Movies</h3>
        <p className='text-slate-200 mb-6 max-w-3xl text-center mx-auto'>Come on, explore the complete list of film and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
        <div className='relative flex mb-6 sm:mb-12 w-[100%] sm:w-fit mx-auto' id='search-container'>
          <input
            className='bg-slate-800 text-slate-200 w-full sm:w-[30rem] h-12 ps-11 pe-5 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500'
            type='search'
            name='search'
            placeholder='Type movie title here...'
            onChange={(e) => search(e.target.value)}
            autoComplete="off"
            value={isSearch ? searchQuery : ''}
          />
          <FontAwesomeIcon icon={['fas', 'search']} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300' id='search-icon' />
        </div>
        {genreId.length > 0 ? (
          <>
            <div className='flex justify-between items-center mb-3'>
              <p className='text-slate-200 text-lg'>Filter by Genre: </p>
              <button type='button' className='button'
                onClick={() => handleRemoveFilter()}
              >
                <FontAwesomeIcon icon={['fas', 'times']} className='me-2' />
                <span className='whitespace-nowrap'>Clear Filter</span>
              </button>
            </div>
            <div className='flex flex-wrap gap-2 mb-7'>
              {genreMovie.map((genre, index) => (
                <span key={index} className='bg-slate-800 text-cyan-500 px-4 py-2 rounded-lg outline-none'>{genre.name}</span>
              ))}
            </div>
          </>
          
        ) : (<></>)}
        <PopularMovieList />
        {popularMovie.length < 1 ? (
          <></>
        ) : (
          <>
            <div className={`${isSearch ? 'hidden' : 'flex'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
              <button type='button' name='prev' className={`${currentPage === 1 ? 'hidden' : 'inline-block'} button`}
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={['fas', 'chevron-left']} className='me-2' />
                <span>Prev</span>
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
                <span>Next</span>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} className='ms-2' />
              </button>
            </div>
            <div className={`${isSearch ? 'flex' : 'hidden'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
              <button type='button' name='prev' className={`${currentPageSearch === 1 ? 'hidden' : 'inline-block'} button`}
                onClick={() => handleChangePage(currentPageSearch - 1)}
                disabled={currentPageSearch === 1}
              >
                Prev
              </button>
              <button type='button' name='first' className={`${currentPageSearch > 10 ? 'inline-block' : 'hidden'} button`}
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
                    currentPageSearch === page ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-200 hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  }`}
                  onClick={() => handleChangePage(page)}
                >
                  {page}
                </button>
              ))}
              <button type='button' name='next' className={`${(currentPageSearch || startIndex) < totalPages - 10 && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
                onClick={handleLoadMorePage}
                disabled={currentPageSearch === totalPages}
              >
                ...
              </button>
              <button type='button' name='last' className={`${(currentPageSearch || startIndex) < totalPages && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
                onClick={() => handleChangePage(totalPages)}
              >
                {totalPages}
              </button>
              <button type='button' name='next' className={`${currentPageSearch == totalPages ? 'hidden' : 'inline-block'} button`}
                onClick={() => handleChangePage(currentPageSearch + 1)}
                disabled={currentPageSearch === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Movies;