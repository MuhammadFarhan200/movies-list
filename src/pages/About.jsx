import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  useEffect(() => {
    document.title = 'MList | About Us'
    window.scrollTo(0, 0)
  }, [])
  
  return ( 
    <>
      <div className='container mx-auto p-5 sm:p-10 max-w-5xl' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h1 className='text-sky-500 text-2xl md:text-4xl text-center font-semibold my-6'>About Us</h1>
        <p className='indent-8 text-slate-200 mb-3 md:mb-5'>
          Welcome to the &quot;About&quot; page of our <span className='font-medium'>Film Information System</span>! 
          We are a website that provides up-to-date information about various films from around the world. 
          The film data that we display comes from <Link to='https://www.themoviedb.org/' target="_blank" className='font-medium text-sky-500 hover:underline focus:ring-2 focus:ring-cyan-500 rounded-md outline-none'>The Movie Database (TMDb)</Link>, a trusted source for information on the latest, popular films and much more.
        </p>
        <p className='indent-8 text-slate-200 mb-3 md:mb-5'>
          Do you like thrilling action movies, thrilling adventure movies or deep drama movies? Or maybe you prefer entertaining animated films, thrilling comedies or thrilling horror films? No problem, we have a wide selection of movies for all tastes.
        </p>
        <p className='indent-8 text-slate-200 mb-3 md:mb-5'>
          Apart from that, you can also use our filter feature to find movies based on the genre you choose. With this feature, you can easily find your favorite films without having to search manually.
        </p>
        <p className='indent-8 text-slate-200 mb-3 md:mb-5'>
         Thank you for visiting our &quot;About&quot; page. We hope you will find it enjoyable and useful in searching for information about your favorite films on our website. 
         If you have any questions or feedback, don&apos;t hesitate to contact us.
        </p>
        <p className='text-slate-200'>
          <Link to='mailto:farhannsrllh177@gmail.com' className='hover:text-sky-500 hover:underline focus:text-sky-500 focus:ring-2 focus:ring-cyan-500 rounded-md outline-none'>
            <FontAwesomeIcon icon={faEnvelope} className='text-xl mr-2' />
            farhannsrllh177@gmail.com
          </Link>
        </p>
        <p className='text-slate-200 mb-3 md:mb-5'>
          <Link to='https://github.com/MuhammadFarhan200' target="_blank" className='hover:text-sky-500 hover:underline focus:text-sky-500 focus:ring-2 focus:ring-cyan-500 rounded-md outline-none'>
          <FontAwesomeIcon icon={faGithub} className='text-xl mr-2' />
            MuhammadFarhan200
          </Link>
        </p>
        <p className='text-slate-200 mb-8'>
          Enjoy your time on our website!✨🎉
        </p>
      </div>
    </>
   );
}
 
export default About;