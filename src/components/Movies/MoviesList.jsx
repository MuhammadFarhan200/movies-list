import React, { Suspense } from "react"
import Loader from "../../utils/Loader"
import { PropTypes } from "prop-types";

const MovieCard = React.lazy(() => import('../MovieCard'));

const MoviesList = ({ movies }) => {
  return movies.length > 0 ? (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-10 sm:mb-12'>
      {movies.map((movie, index) => (
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

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
}

export default MoviesList