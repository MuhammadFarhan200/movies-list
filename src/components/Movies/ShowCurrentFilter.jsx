import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { faEye, faImage, faTimes } from "@fortawesome/free-solid-svg-icons"
import { PropTypes } from "prop-types";

const ShowCurrentFilter = ({ firstMovie, genreMovie, genreId, sortBy, onHandleRemoveFilter }) => {
  return (
    <div className='flex items-start mb-8 gap-3'>
     <Suspense fallback={<div className='bg-slate-500 w-full h-full xl:max-w-sm rounded-lg animate-pulse aspect-[16/8]'></div>}>
      <Link 
        to={`/movie/${firstMovie?.id}`} 
        className='hidden relative bg-slate-500 w-full h-full xl:block xl:max-w-sm max-h-52 rounded-lg group overflow-hidden focus:ring-[3px] focus:ring-cyan-500 aspect-[16/8]'>
        {firstMovie?.backdrop_path ? (
          <>
            <div className='bg-gradient-to-t from-slate-800 to-transparent w-full h-40 absolute bottom-0 
              opacity-0 group-hover:opacity-100 transition-all ease-in-out'
            ></div>
            <FontAwesomeIcon icon={faEye} className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-500 text-[50px] opacity-0 group-hover:opacity-100 transition-all ease-in-out' />
            <img src={`${import.meta.env.VITE_IMG_URL}/w500/${firstMovie?.backdrop_path}`} alt={firstMovie?.title} className="object-cover w-full" />
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
            onClick={() => onHandleRemoveFilter()}
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
  )
}

ShowCurrentFilter.propTypes = {
  firstMovie: PropTypes.object,
  genreMovie: PropTypes.array.isRequired,
  genreId: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  onHandleRemoveFilter: PropTypes.func.isRequired,
}

export default ShowCurrentFilter