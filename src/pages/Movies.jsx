import { useEffect, useState } from "react";
import { getMovieList, searchMovie, getDiscoverMovie, getGenreMovie } from "../utils/Api";
import Pagination from "../components/Movies/Pagination";
import MoviesList from "../components/Movies/MoviesList";
import ShowCurrentFilter from "../components/Movies/ShowCurrentFilter";
import FilterModal from "../components/Movies/FilterModal";
import SearchSection from "../components/Movies/SearchSection";
import TopSectionMovieList from "../components/Movies/TopSectionMovieList";

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [genreId, setGenreId] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSearch, setCurrentPageSearch] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
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
        setMovies(res.results)
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
          setMovies(res.results)
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
          setMovies(res.results)
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
          setMovies(res.results)
          setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
        })
        if (parseInt(sessionPage) > 5) {
          setStartIndex(parseInt(sessionPage) - 5);
          setEndIndex(parseInt(sessionPage) + 5);
        }
      } else {
        setCurrentPage(sessionPage ? parseInt(sessionPage) : 1);
        getMovieList(parseInt(sessionPage), 'popular').then((res) => {
          setMovies(res.results)
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
      setMovies(res.results)
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
        setMovies(res.results)
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
      setMovies(res.results)
      setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
    })
    setStartIndex(0);
    setEndIndex(10);
  }

  return (
    <div className='container mx-auto p-5 lg:p-10' style={{ minHeight: 'calc(100vh - 128px)' }}>
      <TopSectionMovieList />
      
      <SearchSection 
        isSearch={isSearch}
        searchQuery={searchQuery}
        openModal={openModal}
        onSearch={search}
      />
      
      <FilterModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        setIsFilter={setIsFilter}
        setGenreId={setGenreId}
      />

      {isFilter ? (<ShowCurrentFilter
        firstMovie={movies[0]}
        genreMovie={genreMovie}
        genreId={String(genreId)}
        sortBy={sortBy}
        onHandleRemoveFilter={handleRemoveFilter}
      />) : (<></>)}

      <MoviesList movies={movies} />
      
      <Pagination
        moviesLength={movies.length}
        isSearch={isSearch}
        currentPage={currentPage}
        currentPageSearch={currentPageSearch}
        totalPages={totalPages}
        onHandleChangePage={handleChangePage}
        startIndex={startIndex}
        endIndex={endIndex}
        onHandleLoadMorePage={handleLoadMorePage}
      />
    </div>
  );
}

export default Movies;