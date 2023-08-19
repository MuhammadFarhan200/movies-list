import { useEffect, useState } from "react"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropTypes } from "prop-types"
import Swal from "sweetalert2"
import { getGenreMovie } from "../../utils/Api"
import Modal from "../Modal"

const FilterModal = ({ isOpenModal, closeModal, setIsFilter, setGenreId, setStartIndex }) => {
  const [genres, setGenres] = useState([])
  const [selectedSort, setSelectedSort] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  
  useEffect(() => {
    isOpenModal ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')

    getGenreMovie().then((res) => {
      setGenres(res)
    })
    
    const genreIdSession = sessionStorage.getItem('genreId')
    if (genreIdSession) {
      setSelectedGenres(JSON.parse(genreIdSession))
    } else {
      setSelectedGenres([])
    }

    const sortBySession = sessionStorage.getItem('sortBy')
    if (sortBySession) {
      setSelectedSort(sortBySession)
    } else {
      setSelectedSort('')
    }
  }, [isOpenModal, closeModal])

  const handleClickFilter = () => {
    if (selectedGenres.length < 1 && !selectedSort) {
      showNotification("warning", "Please choose an order or at least one genre!")
    } else {
      sessionStorage.removeItem('searchQuery')
      sessionStorage.removeItem('pageSearch')
      sessionStorage.setItem('sortBy', selectedSort)
      sessionStorage.setItem('genreId', JSON.stringify(selectedGenres))
      sessionStorage.setItem('currentPage', 1)
      setStartIndex(0)
      setIsFilter(true)
      setGenreId(selectedGenres)
      closeModal()
    }
  }

  const handleClickSort = (sort) => {
    if (selectedSort === sort) {
      setSelectedSort('')
    } else {
      setSelectedSort(sort)
    }
  }

  const handleClickGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId))
    } else {
      setSelectedGenres([...selectedGenres, genreId])
    }
  }

  const showNotification = (icon, title) => {
    let iconColor = "";
    if (icon === "success") {
      iconColor = "#06b6d4";
    } else if (icon === "warning") {
      iconColor = "#ffb700";
    } else if (icon === "error") {
      iconColor = "#ff0000";
    }

    Swal.fire({
      customClass: {
        title: "swal-title",
        icon: "swal-icon",
        popup: "swal-popup",
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp animate__faster",
      },
      position: "top-end",
      width: "500px",
      icon: icon,
      title: title,
      background: "#0f172a",
      showConfirmButton: false,
      showCloseButton: true,
      iconColor: iconColor,
      toast: true,
      timer: 5000,
    });
  };
  
  return (
    <Modal isOpen={isOpenModal} onClose={closeModal} title="Filter List Movie">
      <div className='flex flex-col justify-center'>
        <p className='text-slate-200 mb-3'>Sort by:</p>
        <div className='flex flex-wrap text-sm gap-2 mb-2'>
          <button
            className={`px-4 py-2 rounded-lg ${selectedSort === 'popularity.desc' ? 'button-primary focus:border-0 focus:ring-2' : 'button bg-slate-700'}`}
            onClick={() => handleClickSort('popularity.desc')}
          >
            Popular
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${selectedSort === 'vote_average.desc' ? 'button-primary focus:border-0 focus:ring-2' : 'button bg-slate-700'}`}
            onClick={() => handleClickSort('vote_average.desc')}
          >
            Top Rated
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${selectedSort === 'primary_release_date.desc' ? 'button-primary focus:border-0 focus:ring-2' : 'button bg-slate-700'}`}
            onClick={() => handleClickSort('primary_release_date.desc')}
          >
            Latest
          </button>
        </div>
        <small className="text-sm text-cyan-500 mb-6">* Popular is default</small>
        <p className='text-slate-200 mb-3'>Filter by Genre:</p>
        <div className='flex flex-wrap gap-2 mb-10'>
          {genres.map((genre, index) => (
            <button
              key={index}
              id={`genre-${genre.id}`}
              className={`flex h-full text-sm justify-center items-center group ${selectedGenres.includes(genre.id) ? 'button-primary focus:border-0 focus:ring-2 text-slate-800 hover:text-slate-800' : 'button bg-slate-700'}`}
              onClick={() => handleClickGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <button
          className='button-primary text-sm py-3 ms-auto'
          onClick={handleClickFilter}
        >
          <span className='font-medium'>Apply Filter</span>
          <FontAwesomeIcon icon={faFilter} className='ms-2' />
        </button>
      </div>
    </Modal>
  )
}

FilterModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  setIsFilter: PropTypes.func.isRequired,
  setGenreId: PropTypes.func.isRequired,
  setStartIndex: PropTypes.func.isRequired,
}

export default FilterModal