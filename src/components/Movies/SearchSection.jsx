import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { PropTypes } from "prop-types";

const SearchSection = ({ isSearch, searchQuery, openModal, onSearch }) => {
  return (
    <>
      <div className='flex mb-3 w-full sm:w-fit mx-auto space-x-3'>
        <div className='relative flex w-full sm:w-fit' id='search-container'>
          <input
            className='bg-slate-800 text-slate-200 w-full sm:w-[30rem] h-12 ps-11 pe-5 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500'
            type='search'
            name='search'
            placeholder='Type movie title here...'
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
            value={isSearch ? searchQuery : ''}
          />
          <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300' id='search-icon' />
        </div>
        <button className='button ms-auto' onClick={openModal}>
          <FontAwesomeIcon icon={faSliders} className='md:me-2' />
          <span className='hidden md:inline-block'>Filter</span>
        </button>
      </div>
      <p className='text-slate-300 text-center mb-6 sm:mb-10 '><span className='font-medium'>Note:</span> Filter feature cannot be combined with searching</p>
    </>
  );  
}

SearchSection.propTypes = {
  isSearch: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}
 
export default SearchSection;