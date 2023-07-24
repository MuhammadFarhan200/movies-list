import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGenreMovie } from "../utils/Api";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const SliderCard = ({ movie, className }) => {
  const [genreMovie, setGenreMovie] = useState([])
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })

  useEffect(() => {
    getGenreMovie().then((res) => {
      setGenreMovie(res)
    })
  }, [])

  return (
    <div className='overflow-hidden rounded-lg'>
      <Link to={`/movie/${movie.id}`} className={`group relative rounded-lg outline-none cursor-pointer ${className}`}>
        <div className='absolute w-full h-full bg-black opacity-70 transition-all duration-300 ease-in-out translate-y-1/2 group-hover:translate-y-0'></div>
        <div className='absolute bottom-0 z-10 h-10 w-full group-hover:opacity-0 transition-all duration-300 ease-in-out' style={{ boxShadow: '0px -30px 10px rgba(0, 0, 0, 0.8) inset' }}></div>
        <div className='absolute top-[28%] transform translate-y-1/3 left-3 right-3 text-center transition-all duration-300 ease-in-out group-hover:top-1/2 group-hover:-translate-y-1/2'>
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
          <p className='text-white text-sm mt-3 hidden lg:block'>{`${movie.overview.substring(0, 100)}...`}</p>
        </div>
        <img src={`${import.meta.env.VITE_IMG_URL}/w500${movie.poster_path}`} alt={movie.title}
          className='rounded-lg w-full h-full text-slate-200' />
      </Link>
    </div>
  )
}

SliderCard.propTypes = {
  movie: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default SliderCard