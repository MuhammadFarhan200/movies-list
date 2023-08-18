import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ExploreMore = () => {
  return (
    <div className='container mx-auto p-5 lg:p-10 text-center mt-5 mb-10'>
      <p className='text-slate-200 max-w-3xl text-center mx-auto mb-7'>Come on, explore the complete list of films and find recommendations for your favorite films. Make your free time more enjoyable with us!</p>
      <Link to='/movies' className='bg-cyan-500 text-slate-800 font-semibold px-4 py-3 rounded-lg outline-none hover:bg-cyan-400 focus:ring-[3px] focus:ring-cyan-300 focus:border-[1.4px] focus:border-slate-800 mx-auto'>
        <span>Explore More</span>
        <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
      </Link>
    </div>
  );
}
 
export default ExploreMore;