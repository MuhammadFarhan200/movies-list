import React, { Suspense, useState, useEffect } from "react"
import { getMovieList } from "../../utils/Api"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../utils/Loader"
import "swiper/css";
import "swiper/css/pagination"

const MovieCard = React.lazy(() => import("../MovieCard"))

const TopRatedMovieList = () => {
  const [topRatedMovie, setTopRatedMovie] = useState([])

  useEffect(() => {
    getMovieList(1, 'top_rated').then((res) => {
      setTopRatedMovie(res.results)
    })
  }, [])

  return (
    <>
      <div className='container mx-auto p-5 lg:p-10'>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6'>Top Rated Movies</h3>
        <p className='text-slate-200 mb-3 max-w-3xl text-center mx-auto'>Step into the world of critically acclaimed masterpieces with our top-rated movie collection! Explore a curated selection of films that have earned high praise from audiences and critics alike.</p>
      </div>
      
      {topRatedMovie.length > 0 ? (
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
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
            1536: {
              slidesPerView: 7,
            },
          }}
          className='pb-10 sm:pb-12 px-5 sm:px-10'
        >
          {topRatedMovie.map((movie, index) => (
            <SwiperSlide key={index}>
              <Suspense fallback={<Loader />}>
                <MovieCard movie={movie} className='focus:ring-0' />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='flex justify-center items-center'>
          <h4 className='text-slate-200'>No Matching Results Found :(</h4>
        </div>
      )}
    </>
  )
}

export default TopRatedMovieList