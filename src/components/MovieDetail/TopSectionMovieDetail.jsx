import { faImage, faFilm, faCalendarAlt, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import { PropTypes } from "prop-types";

const TopSectionMovieDetail = ({ movie }) => {
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const movieBackdrop = movie.backdrop_path ? movie.backdrop_path : null
  const backgroundImageUrl = movieBackdrop !== null ? `${import.meta.env.VITE_IMG_URL}/original/${movieBackdrop}` : null

  return (
    <div className={`relative w-full h-[350px] lg:h-[400px]`} style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
      <div className={`absolute ${movieBackdrop !== null ? 'bg-black' : 'bg-slate-700'} opacity-70 w-full h-full`}></div>
      <div className='flex justify-center items-center gap-10 w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Suspense fallback={<div className='w-full h-full bg-slate-400 animate-pulse aspect-[4/6]'></div>}>
          {movie.poster_path ? (
            <img src={`${import.meta.env.VITE_IMG_URL}/w500/${movie.poster_path}`} alt={movie.title} className='w-48 rounded-lg shadow-xl object-cover mt-3 lg:mt-0' />
          ) : (
            <div className='w-[11.5rem] h-64 sm:w-48 sm:h-[17rem] rounded-lg shadow-xl bg-slate-500'>
              <div className='w-full h-full flex justify-center items-center'>
                <FontAwesomeIcon icon={faImage} className='text-6xl text-slate-300' />
              </div>
            </div>
          )}
        </Suspense>
        <div className='hidden lg:block'>
          <h1 className='text-sky-500 text-4xl font-semibold text-center'>{movie.title}</h1>
          <div className='container mt-10'>
            <table className='table-auto text-slate-200 text-xl font-medium whitespace-nowrap mx-auto'>
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
  );
}

TopSectionMovieDetail.propTypes = {
  movie: PropTypes.object.isRequired,
}
 
export default TopSectionMovieDetail;