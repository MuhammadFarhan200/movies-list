import { useEffect, useState } from "react";
import { getMovieDetail } from "../utils/Api";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCalendarAlt, faStar, faUsers, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MovieDetail = () => {
  const [movie, setMovie] = useState([])
  const { movieId } = useParams()
  const genreMovie = movie.genres
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const productionCompany = movie.production_companies
  const productionCountry = movie.production_countries

  useEffect(() => {
    document.title = 'MList | ' + movie.title ?? '-'
    window.scrollTo(0, 0)
  }, [movie])

  useEffect(() => {
    getMovieDetail(movieId).then((res) => {
      setMovie(res)
    })
  }, [movieId])

  return (
    <>
      <Navbar />
      
      <div className={`relative w-full h-[350px] lg:h-[400px]`} style={{ backgroundImage: `url(${import.meta.env.VITE_IMG_URL}/original/${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
        <div className='absolute bg-black opacity-70 w-full h-full'></div>
        <div className='flex justify-center items-center gap-10 w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <img src={`${import.meta.env.VITE_IMG_URL}/w500/${movie.poster_path}`} alt={movie.title}  
            className='rounded-lg w-48 mt-3 lg:my-3 text-slate-200 shadow-xl'
          />
          <div className='hidden lg:block'>
            <h1 className='text-sky-500 text-4xl font-semibold text-center'>{movie.title}</h1>
            <div className='container mt-10'>
              <table className='table-auto text-slate-200 text-xl whitespace-nowrap mx-auto'>
                <tbody>
                  <tr>
                    <td className='py-1 pe-12'>
                      <FontAwesomeIcon icon={faFilm} className='me-2' />
                      {movie.status}
                    </td>
                    <td className='py-1 ps-12'>
                      <FontAwesomeIcon icon={faUsers} className='me-2' />
                      {movie.popularity} Popularity
                    </td>
                  </tr>
                  <tr>
                    <td className='py-1 pe-12'>
                      <FontAwesomeIcon icon={faCalendarAlt} className='me-2' />
                      {releaseDate}
                    </td>
                    <td className='py-1 ps-12'>
                      <FontAwesomeIcon icon={faStar} className='me-2' /> 
                      {movie.vote_average} ({movie.vote_count} Votes)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto p-5 sm:p-10'>
        <div className='lg:hidden'>
          <h1 className='text-sky-500 text-2xl md:text-3xl font-semibold mb-5'>{movie.title}</h1>
            <p className='text-slate-200 lg:text-lg mb-2'>
              <FontAwesomeIcon icon={faFilm} className='me-2' />
              {movie.status}
            </p>
            <p className='text-slate-200 lg:text-lg'>
              <FontAwesomeIcon icon={faCalendarAlt} className='me-2' />
              {releaseDate}
            </p>
        </div>
        <p className='text-slate-200 lg:text-lg my-3'>{movie.overview}</p>
        <div className='bg-slate-800 rounded-xl p-4 mt-7 mb-10'>
          <div className='flex flex-wrap my-3 text-slate-200 lg:text-lg'>Genre:&nbsp;
            {genreMovie?.length > 0 ? genreMovie?.map((genre, index) => {
              return (
                <span key={genre.id}>
                  {genre.name}{index !== genreMovie.length - 1 ? ',\u00A0' : ''}
                </span>
              );
            }) : '-'}
          </div>
          <p className='text-slate-200 lg:text-lg my-3 overflow-hidden whitespace-nowrap text-ellipsis'>Official Site:&nbsp; 
            {movie.homepage == "" ? '-' : <Link to={movie.homepage} className='text-sky-500 hover:underline' target='_blank'>{movie.homepage}</Link>}
          </p>
          <p className='text-slate-200 lg:text-lg my-3'>Original Languange: <span className='uppercase'>{movie.original_language}</span></p>
          <p className='text-slate-200 lg:text-lg my-3'>Duration: {movie.runtime} minutes</p>
          <div className='flex flex-wrap my-3 text-slate-200 lg:text-lg'>Production Companies:&nbsp;
            {productionCompany?.length > 0 ? productionCompany?.map((company, index) => {
              return (
                <span key={company.id}>
                  {company.name}{index !== productionCompany.length - 1 ? ',\u00A0' : ''}
                </span>
              )
            }) : '-'}
          </div>
          <div className='flex flex-wrap my-3 text-slate-200 lg:text-lg'>Production Countries:&nbsp;
            {productionCountry?.length > 0 ? productionCountry?.map((country, index) => {
              return (
                <span key={country.iso_3166_1}>
                  {country.name}{index !== productionCountry?.length - 1 ? ',\u00A0' : ''}
                </span>
              )
            }) : '-'}
          </div>
          <p className='lg:hidden text-slate-200 lg:text-lg my-3'>Popularity: {movie.popularity}</p>
          <p className='lg:hidden text-slate-200 lg:text-lg my-3'>Rating: {movie.vote_average} ({movie.vote_count} Votes)</p>
        </div>

        <button onClick={() => history.back()} className='block w-fit button py-3 my-5 ms-auto'>
          <FontAwesomeIcon icon={faArrowLeft} className='me-1' /> Back to Before
        </button>
      </div>

      <Footer />
    </>
  )
}

export default MovieDetail