import { useEffect, useState } from "react";
import { getGenreMovie } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "animate.css"

const Genres = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    document.title = 'MList | List of Movie Genres'
    getGenreMovie().then((res) => {
      setGenres(res)
    })
  }, [selectedGenres])

  const handleClickGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId))
    } else {
      setSelectedGenres([...selectedGenres, genreId])
    }
  }

  const handleClickFilter = (e) => {
    e.preventDefault()
    if (selectedGenres.length < 1) {
      showNotification("warning", "Please select at least one genre!")
    } else {
      navigate('/movies')
      sessionStorage.setItem('currentPagePopular', 1)
      sessionStorage.setItem('genreId', JSON.stringify(selectedGenres))
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
      width: "400px",
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

  return(
    <>
      <Navbar />  

      <div className='container mx-auto p-5 sm:p-10' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h1 className='text-sky-500 text-2xl md:text-4xl text-center font-semibold my-6'>List of Movie Genres</h1>
        <p className='text-slate-200 text-lg text-center mb-3'>You can search for films that suit your preferences based on the genre you choose.</p>
        <p className='text-slate-200 text-lg text-center mb-10'>Click on the genre you want to see!</p>
        <div className='grid grid-cols-2 row-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-10'>
          {genres.map((genre, index) => (
            <button
              key={index}
              id={`genre-${genre.id}`}
              className={`flex w-full h-full justify-center items-center group py-4 px-4 ${selectedGenres.includes(genre.id) ? 'button-primary focus:border-0 focus:ring-2 text-slate-800 hover:text-slate-800' : 'button'}`}
              onClick={() => handleClickGenre(genre.id)}
            >
              <p className={`font-medium ${selectedGenres.includes(genre.id) ? 'text-slate-800' : 'text-slate-200 group-hover:text-sky-500'}`}>
                {genre.name}
              </p>
            </button>
          ))}
        </div>
        <div className='text-end mb-10'>
          <Link
            role="button"
            to='#'
            className='button-primary py-3'
            onClick={handleClickFilter}
          >
            <span className='font-semibold'>Apply Filter</span>
            <FontAwesomeIcon icon={['fas', 'filter']} className='text-sm ms-2' />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Genres;