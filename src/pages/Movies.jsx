import React, { Suspense, useEffect, useState } from "react";
import { getMovieList, searchMovie, getDiscoverMovie, getGenreMovie } from "../utils/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faChevronLeft, faChevronRight, faEye, faFilter, faImage, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";
import Modal from "../components/Modal";
import Swal from "sweetalert2";

const MovieCard = React.lazy(() => import('../components/MovieCard'));

const Movies = () => {
  const [popularMovie, setPopularMovie] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [genreId, setGenreId] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSearch, setCurrentPageSearch] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isFilter, setIsFilter] = useState(false)

  
  useEffect(() => {
    document.title = 'MList | List of Movies'
    window.scrollTo(0, 0)

    const sessionSearch = sessionStorage.getItem('searchQuery')
    const sessionPage = sessionStorage.getItem('currentPagePopular')
    const sessionPageSearch = sessionStorage.getItem('pageSearch')
    const sessionGenreId = sessionStorage.getItem('genreId')
    const sessionSortBy = sessionStorage.getItem('sortBy')

    if (sessionSearch) {
      setIsSearch(true)
      setSearchQuery(sessionSearch)
      setCurrentPageSearch(sessionPageSearch ? parseInt(sessionPageSearch) : 1);
      searchMovie(sessionSearch, currentPageSearch).then((res) => {
        setPopularMovie(res.results)
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      })
      if (parseInt(sessionPageSearch) > 5) {
        setStartIndex(parseInt(sessionPageSearch) - 5);
        setEndIndex(parseInt(sessionPageSearch) + 5);
      }
    } else {
      setIsSearch(false)
      sessionStorage.removeItem('pageSearch')
      if (sessionGenreId && sessionSortBy) {
        setCurrentPage(sessionPage ? parseInt(sessionPage) : 1)
        setIsFilter(true)
        setGenreId(sessionGenreId)
        setSortBy(sessionSortBy)
        const parseGenreId = JSON.parse(sessionGenreId)
        getGenreMovie().then((res) => {
          setGenreMovie(res.filter((genre) => parseGenreId.includes(genre.id)))
        })
        getDiscoverMovie(parseInt(sessionPage), parseGenreId, sessionSortBy).then((res) => {
          setPopularMovie(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        if (parseInt(sessionPage) > 5) {
          setStartIndex(parseInt(sessionPage) - 5);
          setEndIndex(parseInt(sessionPage) + 5);
        }
      } else if (sessionGenreId) {
        setCurrentPage(sessionPage ? parseInt(sessionPage) : 1)
        setIsFilter(true)
        setGenreId(sessionGenreId)
        const parseGenreId = JSON.parse(sessionGenreId)
        getGenreMovie().then((res) => {
          setGenreMovie(res.filter((genre) => parseGenreId.includes(genre.id)))
        })
        getDiscoverMovie(parseInt(sessionPage), parseGenreId).then((res) => {
          setPopularMovie(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        if (parseInt(sessionPage) > 5) {
          setStartIndex(parseInt(sessionPage) - 5);
          setEndIndex(parseInt(sessionPage) + 5);
        }
      } else if (sessionSortBy) {
        setIsFilter(true)
        setSortBy(sessionSortBy)
        setCurrentPage(sessionPage ? parseInt(sessionPage) : 1)
        getDiscoverMovie(parseInt(sessionPage), '', sessionSortBy).then((res) => {
          setPopularMovie(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        if (parseInt(sessionPage) > 5) {
          setStartIndex(parseInt(sessionPage) - 5);
          setEndIndex(parseInt(sessionPage) + 5);
        }
      } else {
        setCurrentPage(sessionPage ? parseInt(sessionPage) : 1);
        getMovieList(parseInt(sessionPage), 'popular').then((res) => {
          setPopularMovie(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        if (parseInt(sessionPage) > 5) {
          setStartIndex(currentPage - 5);
          setEndIndex(currentPage + 5);
        }
      }
    }
  }, [currentPage, currentPageSearch, genreId])

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const search = async (q) => {
    if (q.trim()) {
      setIsSearch(true)
      setIsFilter(false)
      const sessionGenreId = sessionStorage.getItem('genreId')
      const sessionSortBy = sessionStorage.getItem('sortBy')
      if (sessionGenreId && sessionSortBy) {
        sessionStorage.removeItem('sortBy')
        setSortBy('')
        sessionStorage.removeItem('genreId')
        setGenreId([])
      } else if (sessionGenreId) {
        sessionStorage.removeItem('genreId')
        setGenreId([])
      } else if (sortBy) {
        sessionStorage.removeItem('sortBy')
        setSortBy('')
      }
      setSearchQuery(q)
      sessionStorage.setItem('searchQuery', q)
      const res = await searchMovie(q, 1)
      setPopularMovie(res.results)
      setCurrentPageSearch(1)
      sessionStorage.setItem('pageSearch', 1)
      setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
      setStartIndex(0);
      setEndIndex(10);
    } else {
      setIsSearch(false)
      sessionStorage.removeItem('searchQuery')
      sessionStorage.removeItem('pageSearch')
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
    } else {
      sessionStorage.setItem('currentPagePopular', pageNumber)
      const sessionGenreId = sessionStorage.getItem('genreId')
      setCurrentPage(pageNumber)
      if (sessionGenreId) {
        const parseGenreId = JSON.parse(sessionGenreId)
        getGenreMovie().then((res) => {
          setGenreMovie(res.filter((genre) => parseGenreId.includes(genre.id)))
        })
      }
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
    sessionStorage.removeItem('sortBy')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('currentPagePopular')
    setIsFilter(false)
    setCurrentPage(1)
    setSortBy('')
    setGenreId([])
    getMovieList(1, 'popular').then((res) => {
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

  const FilterModal = () => {
    const [genres, setGenres] = useState([])
    const [selectedSort, setSelectedSort] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([])

    useEffect(() => {
      getGenreMovie().then((res) => {
        setGenres(res)
      })
    }, [])

    const handleClickFilter = () => {
      if (selectedGenres.length < 1 && !selectedSort) {
        showNotification("warning", "Please choose an order or at least one genre!")
      } else {
        sessionStorage.removeItem('searchQuery')
        sessionStorage.removeItem('pageSearch')
        sessionStorage.setItem('sortBy', selectedSort)
        sessionStorage.setItem('genreId', JSON.stringify(selectedGenres))
        sessionStorage.setItem('currentPagePopular', 1)
        setIsFilter(true)
        setGenreId(selectedGenres)
        closeModal()
      }
    }

    const handleClickSort = (sort) => {
      if (selectedSort === sort) {
        setSelectedSort('')
      } else {
        setSelectedSort(sort)
      }
    }

    const handleClickGenre = (genreId) => {
      if (selectedGenres.includes(genreId)) {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId))
      } else {
        setSelectedGenres([...selectedGenres, genreId])
      }
    }

    const showNotification = (icon, title) => {
      let iconColor = "";
      if (icon === "success") {
        iconColor = "#06b6d4";
      } else if (icon === "warning") {
        iconColor = "#ffb700";
      } else if (icon === "error") {
        iconColor = "#ff0000";
      }

      Swal.fire({
        customClass: {
          title: "swal-title",
          icon: "swal-icon",
          popup: "swal-popup",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp animate__faster",
        },
        position: "top-end",
        width: "500px",
        icon: icon,
        title: title,
        background: "#0f172a",
        showConfirmButton: false,
        showCloseButton: true,
        iconColor: iconColor,
        toast: true,
        timer: 5000,
      });
    };
    
    return (
      <Modal isOpen={isOpenModal} onClose={closeModal} title="Filter List Movie">
        <div className='flex flex-col justify-center'>
          <p className='text-slate-200 mb-3'>Sort by:</p>
          <div className='flex flex-wrap text-sm gap-2 mb-6'>
            <button
              className={`px-4 py-2 rounded-lg ${selectedSort === 'popularity.desc' ? 'button-primary focus:border-0 focus:ring-2' : 'button bg-slate-700'}`}
              onClick={() => handleClickSort('popularity.desc')}
            >
              Popular
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${selectedSort === 'vote_average.desc' ? 'button-primary focus:border-0 focus:ring-2' : 'button bg-slate-700'}`}
              onClick={() => handleClickSort('vote_average.desc')}
            >
              Top Rated
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${selectedSort === 'primary_release_date.desc' ? 'button-primary focus:border-0 focus:ring-2' : 'button bg-slate-700'}`}
              onClick={() => handleClickSort('primary_release_date.desc')}
            >
              Latest
            </button>
          </div>
          <p className='text-slate-200 mb-3'>Filter by Genre:</p>
          <div className='flex flex-wrap gap-2 mb-10'>
            {genres.map((genre, index) => (
              <button
                key={index}
                id={`genre-${genre.id}`}
                className={`flex h-full text-sm justify-center items-center group ${selectedGenres.includes(genre.id) ? 'button-primary focus:border-0 focus:ring-2 text-slate-800 hover:text-slate-800' : 'button bg-slate-700'}`}
                onClick={() => handleClickGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
          <button
            className='button-primary text-sm py-3 ms-auto'
            onClick={handleClickFilter}
          >
            <span className='font-medium'>Apply Filter</span>
            <FontAwesomeIcon icon={faFilter} className='ms-2' />
          </button>
        </div>
      </Modal>
    )
  }

  const ShowCurrentFilter = () => {
    return isFilter ? (
      <div className='flex items-start mb-8 gap-3'>
       <Suspense fallback={<div className='bg-slate-500 w-full h-full xl:max-w-sm rounded-lg animate-pulse aspect-[16/8]'></div>}>
        <Link 
            to={`/movie/${popularMovie[0]?.id}`} 
            className='hidden relative bg-slate-500 w-full h-full xl:block xl:max-w-sm max-h-52 rounded-lg group overflow-hidden focus:ring-[3px] focus:ring-cyan-500 aspect-[16/8]'>
            {popularMovie[0]?.backdrop_path ? (
              <>
                <div className='bg-gradient-to-t from-slate-800 to-transparent w-full h-40 absolute bottom-0 
                  opacity-0 group-hover:opacity-100 transition-all ease-in-out'
                ></div>
                <FontAwesomeIcon icon={faEye} className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-500 text-[50px] opacity-0 group-hover:opacity-100 transition-all ease-in-out' />
                <img src={`${import.meta.env.VITE_IMG_URL}/w500/${popularMovie[0]?.backdrop_path}`} alt={popularMovie[0]?.title} className="object-cover w-full" />
              </>
              ) : 
              <div className=' w-full h-full flex justify-center items-center'>
                  <FontAwesomeIcon icon={faImage} className='text-slate-300 text-6xl' />
              </div>
            } 
        </Link>
       </Suspense>
        <div className='w-full xl:max-w-5xl xl:ps-3 ms-auto'>
          <div className='flex justify-between items-start'>
            <p className='text-slate-200 font-medium mt-2'>The filter that is being applied to the current data:</p>
            <button type='button' className='button ms-5'
              onClick={() => handleRemoveFilter()}
            >
              <FontAwesomeIcon icon={faTimes} className="md:me-2" />
              <span className='hidden md:inline'>Clear Filter</span>
            </button>
          </div>
          {sortBy ? (
            <p className='text-slate-200 mt-2'>Sort by: <span className='text-cyan-500'>{sortBy === 'popularity.desc' ? 'Popular' : sortBy === 'vote_average.desc' ? 'Top Rated' : sortBy === 'primary_release_date.desc' ? 'Latest' : 'Popular'}</span></p>
          ) : (<></>)}
          {genreId === '[]' || genreId.length < 1 ? (
            <></>
          ) : (
            <>
              <p className='text-slate-200 mt-2'>Filter by Genre:</p>
              <div className='flex flex-wrap gap-2 mt-2'>
                {genreMovie.map((genre, index) => (
                  <span key={index} className='bg-slate-800 text-cyan-500 px-3 py-2 rounded-lg outline-none'>{genre.name}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div> 
    ) : (<></>)
  }

  const Pagination = () => {
    return popularMovie.length < 1 ? (
      <></>
    ) : (
      <>
        <div className={`${isSearch ? 'hidden' : 'flex'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
          <button type='button' name='prev' className={`${currentPage === 1 ? 'hidden' : 'inline-block'} button`}
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} className='me-2' />
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
                currentPage === page ? "bg-cyan-500 text-white outline-none" : "bg-slate-800 text-slate-200 hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
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
            <FontAwesomeIcon icon={faChevronRight} className='ms-2' />
          </button>
        </div>
        <div className={`${isSearch ? 'flex' : 'hidden'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
          <button type='button' name='prev' className={`${currentPageSearch === 1 ? 'hidden' : 'inline-block'} button`}
            onClick={() => handleChangePage(currentPageSearch - 1)}
            disabled={currentPageSearch === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} className='me-2' />
            <span>Prev</span>
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
                currentPageSearch === page ? "bg-cyan-500 text-white outline-none" : "bg-slate-800 text-slate-200 hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
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
            <span>Next</span>
            <FontAwesomeIcon icon={faChevronRight} className='ms-2' />
          </button>
        </div>
      </>
    )
  }
   
  return (
    <div className='container mx-auto p-5 lg:p-10' style={{ minHeight: 'calc(100vh - 128px)' }}>
      <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6'>List of Movies</h3>
      <p className='text-slate-200 mb-6 max-w-3xl text-center mx-auto'>Come on, explore the complete list of film and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
      <div className='flex mb-3 w-full sm:w-fit mx-auto space-x-3'>
        <div className='relative flex w-full sm:w-fit' id='search-container'>
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
        <button className='button ms-auto' onClick={openModal}>
          <FontAwesomeIcon icon={faSliders} className='md:me-2' />
          <span className='hidden md:inline-block'>Filter</span>
        </button>
      </div>
      <p className='text-slate-300 text-center mb-6 sm:mb-10 '><span className='font-medium'>Note:</span> Filter feature cannot be combined with searching</p>
      
      <FilterModal />

      <ShowCurrentFilter />

      <PopularMovieList />
      
      <Pagination />
    </div>
  );
}

export default Movies;