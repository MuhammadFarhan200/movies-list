import { useEffect, useState } from "react";
import { getGenreMovie } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Genres = () => {
  const [genres, setGenres] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    document.title = 'MList | Movie Genres'
    window.scrollTo(0, 0)
    getGenreMovie().then((res) => {
      setGenres(res)
    })
  }, [])

  return(
    <>
      <Navbar />  

      <div className='container mx-auto p-5 sm:p-10' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h1 className='text-sky-500 text-2xl md:text-4xl text-center font-semibold my-8'>List of Movie Genres</h1>
        <p className='text-slate-200 text-lg text-center mb-10'>You can search for movies that match what you like based on genre</p>
        <div className='grid grid-cols-2 row-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10 sm:mb-12'>
          {genres.map((genre, index) => (
            <div key={index}>
              <button 
                className='flex w-full h-full justify-center items-center button group p-4'
                onClick={() => {
                  navigate('/movies')
                  sessionStorage.setItem('currentPagePopular', 1)
                  sessionStorage.setItem('genreId', genre.id)
                }}
              >
                <h3 className='text-slate-200 group-hover:text-sky-500 font-medium'>{genre.name}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Genres;