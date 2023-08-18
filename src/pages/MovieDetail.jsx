import { useEffect, useState } from "react";
import { getMovieDetail } from "../utils/Api";
import { useParams } from "react-router-dom";
import MovieCast from "../components/MovieDetail/MovieCast";
import TopSectionMovieDetail from "../components/MovieDetail/TopSectionMovieDetail";
import OverviewSection from "../components/MovieDetail/OverviewSection";
import MoreInfoMovie from "../components/MovieDetail/MoreInfoMovie";
import BackButton from "../components/MovieDetail/BackButton";

const MovieDetail = () => {
  const [movie, setMovie] = useState({})
  const { movieId } = useParams()
  
  useEffect(() => {
    document.title = 'MList | ' + movie.title ?? '-'
    window.scrollTo(0, 0)
  }, [movie])
  
  useEffect(() => {
    getMovieDetail(movieId).then((res) => {
      setMovie(res)
    })
  }, [movieId])

  return (
    <>
      <TopSectionMovieDetail movie={movie} />
      <div className='container mx-auto p-5 sm:p-10'>
        <OverviewSection movie={movie} />
        <MoreInfoMovie movie={movie} />
      </div>
      <MovieCast movieId={movieId} />
      <BackButton />
    </>
  )
}

export default MovieDetail