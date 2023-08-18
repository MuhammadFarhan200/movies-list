import { useEffect} from "react";
import NowPlayingMovieList from "../components/Home/NowPlayingMovieList";
import PopularMovieList from "../components/Home/PopularMovieList";
import TopRatedMovieList from "../components/Home/TopRatedMovieList";
import UpcomingMovieList from "../components/Home/UpcomingMovieList";
import ExploreMore from "../components/Home/ExploreMore";

const Home = () => {
  useEffect(() => {
    document.title = 'MList | Find Your Favorite Movie'
    window.scrollTo(0, 0)
  }, [])  

  return (
    <>
      <NowPlayingMovieList />
      <PopularMovieList />
      <TopRatedMovieList />
      <UpcomingMovieList />
      <ExploreMore />
    </>
  )
}

export default Home
