import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";

const OverviewSection = ({ movie }) => {
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const movieRating = movie.vote_average?.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 })
  
  return (
    <>
      <div className='lg:hidden mb-3'>
        <h1 className='text-sky-500 text-2xl md:text-3xl font-semibold mb-5'>{movie.title}</h1>
        <div className='flex justify-between items-center'>
          <div className='text-slate-200 lg:text-lg'>
            <p className='mb-2 font-medium'>
              <FontAwesomeIcon icon={faFilm} className='me-2' />
              {movie.status}
            </p>
            <p className='font-medium'>
              <FontAwesomeIcon icon={faCalendarAlt} className='me-2' />
              {releaseDate}
            </p>
          </div>
          <div className='flex flex-col justify-center bg-slate-800 text-slate-200 rounded-xl py-3 px-4'>
            <p className='mx-auto text-[22px] font-semibold'>
              <FontAwesomeIcon icon={faStar} className='me-2' />
              <span className='text-[22px]'>{movieRating}</span>
            </p>
            <p className='mx-auto text-sm mt-1'>({movie.vote_count} Votes)</p>
          </div>
        </div>
      </div>
      <h4 className='text-sky-500 text-xl font-semibold mb-3'>Overview</h4>
      <p className='text-slate-200 lg:text-lg my-3'>{movie.overview == "" ? '-' : movie.overview}</p>
    </>
  );
}

OverviewSection.propTypes = {
  movie: PropTypes.object.isRequired,
}
 
export default OverviewSection;