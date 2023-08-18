import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";

const FilterButton = ({ onHandleClickFilter }) => {
  return (
    <div className='text-end mb-10'>
      <button
        className='button-primary py-3'
        onClick={onHandleClickFilter}
      >
        <span className='font-semibold'>Apply Filter</span>
        <FontAwesomeIcon icon={faFilter} className='text-sm ms-2' />
      </button>
    </div>
  );
}

FilterButton.propTypes = {
  onHandleClickFilter: PropTypes.func.isRequired,
}
 
export default FilterButton;