import { useEffect, useState } from "react"
import { getMovieCredits } from "../../utils/Api"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropTypes } from "prop-types"
import { faUser, faUsersSlash } from "@fortawesome/free-solid-svg-icons"

const MovieCast = ({ movieId }) => {
  const [movieCredits, setMovieCredits] = useState([])
  
  useEffect(() => {
    getMovieCredits(movieId).then((res) => {
      setMovieCredits(res)
    })
  }, [movieId])

  return (
    <div className='container mx-auto'>
      <h1 className='text-sky-500 text-xl font-semibold ms-5 sm:ms-10 mb-6'>Cast & Actors</h1>
      {movieCredits.cast?.length > 0 ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={15}
          slidesPerView={2}
          grabCursor={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 7,
            },
          }}
          className='pb-10 px-5 sm:px-10 rounded-lg'
        >
          {movieCredits.cast?.map((cast) => (
            <SwiperSlide key={cast.cast_id}>
              <div className='bg-slate-500 rounded-lg text-slate-200 shadow-xl aspect-[4/6]'>
                {cast.profile_path ? (
                  <img src={`${import.meta.env.VITE_IMG_URL}/w500/${cast.profile_path}`} alt={cast.name} className='rounded-lg text-slate-200 shadow-xl' />
                ) : (
                  <div className='w-full h-full flex justify-center items-center'>
                    <FontAwesomeIcon icon={faUser} className='text-8xl' />
                  </div>
                )}
              </div>
              <h6 className='text-sky-500 font-medium mt-3'>{cast.name}</h6>
              <p className='text-slate-200 text-sm font-medium mt-1'>{cast.character}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='w-full h-full flex justify-center items-center mt-3'>
          <FontAwesomeIcon icon={faUsersSlash} className='text-slate-400 text-4xl' />
          <p className='text-slate-400 text-xl font-medium ms-5'>No Cast Found</p>
        </div>
      )}
    </div>
  )
}

MovieCast.propTypes = {
  movieId: PropTypes.string,
}

export default MovieCast