import { useEffect, useState } from "react";
import { getGenreMovie } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css"
import TopSection from "../components/Genres/TopSectionGenres";
import GenreList from "../components/Genres/GenreList";
import FilterButton from "../components/Genres/FilterButton";

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

  const handleClickFilter = () => {
    if (selectedGenres.length < 1) {
      showNotification("warning", "Please select at least one genre!")
    } else {
      navigate('/movies')
      sessionStorage.setItem('currentPage', 1)
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
      <div className='container mx-auto p-5 sm:p-10' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <TopSection />
        <GenreList genres={genres} onHandleClickGenre={handleClickGenre} selectedGenres={selectedGenres} />
        <FilterButton onHandleClickFilter={handleClickFilter} />
      </div>
    </>
  )
}

export default Genres;