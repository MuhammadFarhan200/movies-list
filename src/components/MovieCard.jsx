import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenreMovie } from "../utils/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

const MovieCard = ({ movie, className }) => {
  const [genreMovie, setGenreMovie] = useState([])

  useEffect(() => { 
    getGenreMovie().then((res) => {
      setGenreMovie(res)
    })
  }, [])

  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })
  
  return (
    <Link to={`/movie/${movie.id}`}
      className={`group relative rounded-lg outline-none focus:ring-[3px] focus:ring-cyan-500 cursor-pointer overflow-hidden ${className}`}
    >
      <div className='absolute w-full h-full bg-black opacity-0 group-hover:opacity-70 rounded-lg transition ease-in-out'></div>
      <div className='opacity-0 absolute top-1/2 transform -translate-y-1/2 left-3 right-3 group-hover:opacity-100 text-center transition ease-in-out'>
        <h3 className='text-white line-clamp-2 lg:line-clamp-1 text-md font-semibold'>{movie.title}</h3>
        <div className='flex justify-between mt-3 px-3'>
          <p className='text-white text-sm font-semibold'>
            <FontAwesomeIcon icon={['fas', 'calendar-alt']} className='me-1' />
            {releaseDate}
            </p>
          <p className='text-white text-sm font-semibold'>
            <FontAwesomeIcon icon={['fas', 'star']} className='me-1' />
            {movie.vote_average}
            </p>
        </div>
        <div className='flex flex-wrap justify-center mt-3'>
          {movie.genre_ids.map((genreId, index) => {
            const genre = genreMovie.find(item => item.id === genreId);

            if (genre) {
              return (
                <span key={genre.id} className='text-white text-sm font-medium'>
                  {genre.name}{index !== movie.genre_ids.length - 1 ? ',\u00A0' : ''}
                </span>
              );
            }
            return null;
          })}
        </div>
        {/* <p className='text-white text-sm mt-3 block sm:hidden'>{movie.status}</p> */}
        <p className='text-white text-sm mt-3 hidden lg:block'>{`${movie.overview.substring(0, 100)}...`}</p>
      </div>
      <img src={`${import.meta.env.VITE_IMG_URL}/w500${movie.poster_path}`} alt={movie.title}
        className='rounded-lg w-full h-full text-slate-200' />
    </Link>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default MovieCard