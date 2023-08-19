import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const MoreInfoMovie = ({ movie }) => {
  const genreMovie = movie.genres
  const productionCompany = movie.production_companies
  const productionCountry = movie.production_countries

  return (
    <div className='bg-slate-800 rounded-xl p-4 mt-7'>
      <p className='text-slate-200 lg:text-lg my-3'><span className='font-medium'>Original Title: </span> {movie.original_title}</p>
      <div className='flex flex-wrap mt-3 text-slate-200 lg:text-lg'>
        <span className='font-medium'>Genre:</span>&nbsp;
        {genreMovie?.length > 0 ? genreMovie?.map((genre, index) => {
          return (
            <span key={genre.id}>
              {genre.name}{index !== genreMovie.length - 1 ? ',\u00A0' : ''}
            </span>
          );
        }) : '-'}
      </div>
      <p className='text-slate-200 lg:text-lg py-3 overflow-x-hidden whitespace-nowrap text-ellipsis'>
        <span className='font-medium'>Official Site:</span>&nbsp;
        {movie.homepage == "" ? '-' : <Link to={movie.homepage} className='text-sky-500 hover:underline focus:ring-2 focus:ring-cyan-500 rounded-md outline-none' target='_blank'>{movie.homepage}</Link>}
      </p>
      <p className='text-slate-200 lg:text-lg mb-3'><span className='font-medium'>Original Languange:</span> <span className='uppercase'>{movie.original_language}</span></p>
      <p className='text-slate-200 lg:text-lg my-3'><span className='font-medium'>Duration:</span> {movie.runtime} minutes</p>
      <div className='flex flex-wrap my-3 text-slate-200 lg:text-lg'>
        <span className='font-medium'>Production Companies:</span>&nbsp;
        {productionCompany?.length > 0 ? productionCompany?.map((company, index) => {
          return (
            <span key={company.id}>
              {company.name}{index !== productionCompany.length - 1 ? ',\u00A0' : ''}
            </span>
          )
        }) : '-'}
      </div>
      <div className='flex flex-wrap my-3 text-slate-200 lg:text-lg'>
        <span className='font-medium'>Production Countries:</span>&nbsp;
        {productionCountry?.length > 0 ? productionCountry?.map((country, index) => {
          return (
            <span key={country.iso_3166_1}>
              {country.name}{index !== productionCountry?.length - 1 ? ',\u00A0' : ''}
            </span>
          )
        }) : '-'}
      </div>
      <p className='lg:hidden text-slate-200 lg:text-lg my-3'><span className='font-medium'>Popularity:</span> {movie.popularity}</p>
    </div>
  );
}

MoreInfoMovie.propTypes = {
  movie: PropTypes.object.isRequired,
}
 
export default MoreInfoMovie;