import React, { Suspense, useEffect, useState } from "react";
import { getMovieList } from "../utils/Api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "../utils/Loader";
import "swiper/css";
import "swiper/css/pagination"

const MovieCard = React.lazy(() => import('../components/MovieCard'))

const Home = () => {
  const [topRatedMovie, setTopRatedMovie] = useState([])
  const [nowPlayingMovie, setNowPlayingMovie] = useState([])
  const [popularMovie, setPopularMovie] = useState([])
  const [upcomingMovie, setUpcomingMovie] = useState([])

  useEffect(() => {
    document.title = 'MList | Find Your Favorite Movie'
    window.scrollTo(0, 0)
    getMovieList(1, 'now_playing').then((res) => {
      setNowPlayingMovie(res.results)
    })
    getMovieList(1, 'popular').then((res) => {
      setPopularMovie(res.results)
    })
    getMovieList(1, 'top_rated').then((res) => {
      setTopRatedMovie(res.results)
    })
    getMovieList(1, 'upcoming').then((res) => {
      setUpcomingMovie(res.results)
    })
  }, [])

  const NowPlayingMovieList = () => {
    return nowPlayingMovie.length > 0 ? (
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
        }}
        className='pb-10 sm:pb-12 px-5 sm:px-10'
      >
        {nowPlayingMovie.map((movie, index) => (
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
    )
  }

  const PopularMovieList = () => {
    return popularMovie.length > 0 ? (
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
        }}
        className='pb-10 sm:pb-12 px-5 sm:px-10'
      >
        {popularMovie.map((movie, index) => (
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
    )
  }

  const TopRatedMovieList = () => {
    return topRatedMovie.length > 0 ? (
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
    )
  }

  const UpcomingMovieList = () => {
    return upcomingMovie.length > 0 ? (
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
        }}
        className='pb-10 sm:pb-12 px-5 sm:px-10'
      >
        {upcomingMovie.map((movie, index) => (
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
    )
  }

  return (
    <>
      <div className='container mx-auto p-5 lg:p-10'>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6'>Now Playing Movies</h3>
        <p className='text-slate-200 mb-3 max-w-3xl text-center mx-auto'>Get ready for an exciting movie experience! Delve into our captivating selection of now playing films and discover a world of cinematic wonders.</p>
      </div>
      <NowPlayingMovieList />

      <div className='container mx-auto p-5 lg:p-10'>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6'>Popular Movies</h3>
        <p className='text-slate-200 mb-3 max-w-3xl text-center mx-auto'>Experience the magic of cinema with our popular movie collection! Immerse yourself in a diverse range of blockbuster hits and timeless classics that have captured the hearts of audiences worldwide.</p>
      </div>
      <PopularMovieList />

      <div className='container mx-auto p-5 lg:p-10'>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6'>Top Rated Movies</h3>
        <p className='text-slate-200 mb-3 max-w-3xl text-center mx-auto'>Step into the world of critically acclaimed masterpieces with our top-rated movie collection! Explore a curated selection of films that have earned high praise from audiences and critics alike.</p>
      </div>
      <TopRatedMovieList />

      <div className='container mx-auto p-5 lg:p-10'>
        <h3 className='text-sky-500 text-2xl sm:text-3xl md:text-4xl text-center font-semibold my-6'>Upcoming Movies</h3>
        <p className='text-slate-200 mb-3 max-w-3xl text-center mx-auto'>Get ready for a cinematic adventure like no other with our exciting lineup of upcoming films! Experience the thrill of anticipation as you explore the list of soon-to-be-released movies that are set to dazzle audiences worldwide.</p>
      </div>
      <UpcomingMovieList />

      <div className='container mx-auto p-5 lg:p-10 text-center mt-5 mb-10'>
        <p className='text-slate-200 max-w-3xl text-center mx-auto mb-7'>Come on, explore the complete list of films and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
        <Link to='/movies' className='bg-cyan-500 text-slate-800 font-semibold px-4 py-3 rounded-lg outline-none hover:bg-cyan-400 focus:ring-[3px] focus:ring-cyan-300 focus:border-[1.4px] focus:border-slate-800 mx-auto'>
          <span>Explore More</span>
          <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
        </Link>
      </div>
    </>
  )
}

export default Home
