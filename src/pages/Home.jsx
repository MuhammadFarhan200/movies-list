import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMovieList, searchMovie } from "../utils/Api";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import Footer from "../components/Footer";
import Loader from "../utils/Loader";

const Card = React.lazy(() => import('../components/Card'))

const Home = () => {
  const [topRatedMovie, setTopRatedMovie] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSearch, setCurrentPageSearch] = useState(1)
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [isSearch, setIsSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    document.title = 'MList | Find Your Favorite Movie'
    // window.scrollTo(0, 0)
    const sessionSearch = sessionStorage.getItem('searchQuery')
    const sessionPage = sessionStorage.getItem('currentPage')
    const sessionPageSearch = sessionStorage.getItem('pageSearch')

    if (sessionSearch) {
      setIsSearch(true)
      setSearchQuery(sessionSearch)
      sessionPageSearch ? setCurrentPageSearch(parseInt(sessionPageSearch)) : setCurrentPageSearch(1)
      searchMovie(sessionSearch, currentPageSearch).then((res) => {
        setTopRatedMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
    } else {
      setIsSearch(false)
      sessionPage ? setCurrentPage(parseInt(sessionPage)) : setCurrentPage(1)
      getMovieList(currentPage).then((res) => {
        setTopRatedMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
      if (currentPage > 5) {
        setStartIndex(currentPage - 5);
        setEndIndex(currentPage + 5);
      }
    }
    // console.log(currentPage);
  }, [currentPage, currentPageSearch])

  const handleChangePage = (pageNumber) => {
    // window.scrollTo(0, 0)
    if (isSearch) {
      setCurrentPageSearch(pageNumber)
      sessionStorage.setItem('pageSearch', pageNumber)
      searchMovie(searchQuery, pageNumber).then((res) => {
        setTopRatedMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
    } else {
      setCurrentPage(pageNumber)
      sessionStorage.setItem('currentPage', pageNumber)
      getMovieList(pageNumber).then((res) => {
        setTopRatedMovie(res.results)
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

  const TopRatedMovieList = () => {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10 sm:mb-12'>
        {topRatedMovie.map((movie, index) => (
          <Suspense key={index} fallback={<Loader />}>
            <Card movie={movie} />
          </Suspense>
        ))}
      </div>
    )
  }

  const search = async (q) => {
    if (q.trim()) {
      setIsSearch(true)
      setSearchQuery(q)
      sessionStorage.setItem('searchQuery', q)
      const res = await searchMovie(q, 1)
      setTopRatedMovie(res.results)
      setCurrentPageSearch(1)
      sessionStorage.setItem('pageSearch', 1)
      setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      setStartIndex(0);
    } else {
      setIsSearch(false)
      sessionStorage.removeItem('searchQuery')
      setCurrentPage(1)
      getMovieList(currentPage).then((res) => {
        setTopRatedMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
    }
  } 

  return (
    <>
      <Navbar />

      <div className='container mx-auto p-5 lg:p-10' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold my-8'>Top Rated Movies</h3>
        <p className='text-slate-200 mb-6 max-w-3xl text-center mx-auto'>Come on, explore the complete list of films, read interesting reviews, and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
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
          <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300' id='search-icon' />
        </div>
        <TopRatedMovieList />
        <div className={`${isSearch ? 'hidden' : 'flex'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
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
      </div>
      
      <Footer />
    </>
  )
}

export default Home
