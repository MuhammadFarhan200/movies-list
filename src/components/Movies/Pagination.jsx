import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { PropTypes } from "prop-types";

const Pagination = ({ moviesLength, isSearch, currentPage, currentPageSearch, totalPages, onHandleChangePage, startIndex, endIndex, onHandleLoadMorePage }) => {
  return moviesLength < 1 ? (
    <></>
  ) : (
    <>
      <div className={`${isSearch ? 'hidden' : 'flex'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
        <button type='button' name='prev' className={`${currentPage === 1 ? 'hidden' : 'inline-block'} button`}
          onClick={() => onHandleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} className='me-2' />
          <span>Prev</span>
        </button>
        <button type='button' name='first' className={`${currentPage > 10 ? 'inline-block' : 'hidden'} button`}
          onClick={() => onHandleChangePage(1)}
        >
          1
        </button>
        {
          Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(startIndex, endIndex)
          .map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page ? "bg-cyan-500 text-white outline-none" : "bg-slate-800 text-slate-200 hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
            }`}
            onClick={() => onHandleChangePage(page)}
          >
            {page}
          </button>
        ))}
        <button type='button' name='next' className={`${(currentPage || startIndex) < totalPages - 10 && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
          onClick={onHandleLoadMorePage}
          disabled={currentPage === totalPages}
        >
          ...
        </button>
        <button type='button' name='last' className={`${(currentPage || startIndex) < totalPages && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
          onClick={() => onHandleChangePage(totalPages)}
        >
          {totalPages}
        </button>
        <button type='button' name='next' className={`${currentPage == totalPages ? 'hidden' : 'inline-block'} button`}
          onClick={() => onHandleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} className='ms-2' />
        </button>
      </div>
      <div className={`${isSearch ? 'flex' : 'hidden'} flex-wrap justify-center items-center gap-2 mb-5 sm:mb-3`}>
        <button type='button' name='prev' className={`${currentPageSearch === 1 ? 'hidden' : 'inline-block'} button`}
          onClick={() => onHandleChangePage(currentPageSearch - 1)}
          disabled={currentPageSearch === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} className='me-2' />
          <span>Prev</span>
        </button>
        <button type='button' name='first' className={`${currentPageSearch > 10 ? 'inline-block' : 'hidden'} button`}
          onClick={() => onHandleChangePage(1)}
        >
          1
        </button>
        {
          Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(startIndex, endIndex)
          .map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg ${
              currentPageSearch === page ? "bg-cyan-500 text-white outline-none" : "bg-slate-800 text-slate-200 hover:text-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
            }`}
            onClick={() => onHandleChangePage(page)}
          >
            {page}
          </button>
        ))}
        <button type='button' name='next' className={`${(currentPageSearch || startIndex) < totalPages - 10 && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
          onClick={onHandleLoadMorePage}
          disabled={currentPageSearch === totalPages}
        >
          ...
        </button>
        <button type='button' name='last' className={`${(currentPageSearch || startIndex) < totalPages && endIndex < totalPages? 'inline-block' : 'hidden'} button`}
          onClick={() => onHandleChangePage(totalPages)}
        >
          {totalPages}
        </button>
        <button type='button' name='next' className={`${currentPageSearch == totalPages ? 'hidden' : 'inline-block'} button`}
          onClick={() => onHandleChangePage(currentPageSearch + 1)}
          disabled={currentPageSearch === totalPages}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} className='ms-2' />
        </button>
      </div>
    </>
  )
}

Pagination.propTypes = {
  moviesLength: PropTypes.number.isRequired,
  isSearch: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  currentPageSearch: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onHandleChangePage: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  onHandleLoadMorePage: PropTypes.func.isRequired,
}

export default Pagination