import { PropTypes } from "prop-types";

const GenreList = ({ genres, onHandleClickGenre, selectedGenres }) => {
  return (
    <div className='grid grid-cols-2 row-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:flex xl:flex-wrap gap-4 xl:gap-3 mb-10'>
      {genres.map((genre, index) => (
        <button
          key={index}
          id={`genre-${genre.id}`}
          className={`flex w-full xl:w-auto h-full justify-center items-center group py-4 px-4 xl:px-8 ${selectedGenres.includes(genre.id) ? 'button-primary focus:border-0 focus:ring-2 text-slate-800 hover:text-slate-800' : 'button'}`}
          onClick={() => onHandleClickGenre(genre.id)}
        >
          <p className={`font-medium ${selectedGenres.includes(genre.id) ? 'text-slate-800' : 'text-slate-200 group-hover:text-sky-500'}`}>
            {genre.name}
          </p>
        </button>
      ))}
    </div>
  );
}

GenreList.propTypes = {
  genres: PropTypes.array.isRequired,
  onHandleClickGenre: PropTypes.func.isRequired,
  selectedGenres: PropTypes.array.isRequired,
}
 
export default GenreList;