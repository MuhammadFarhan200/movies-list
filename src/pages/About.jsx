import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return ( 
    <>
      <Navbar />

      <div className='container mx-auto p-5 sm:p-10 max-w-5xl' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h1 className='text-sky-500 text-2xl md:text-4xl text-center font-semibold my-6'>About Us</h1>
        <p className='indent-8 text-slate-200 mb-3 md:mb-5'>
          Welcome to the &quot;About&quot; page of our <span className='font-medium'>Film Information System</span>! 
          We are a website that provides up-to-date information about various films from around the world. 
          The film data that we display comes from <Link to='https://www.themoviedb.org/' target="_blank" className='font-medium text-sky-500 hover:underline outline-none'>The Movie Database (TMDb)</Link>, a trusted source for information on the latest, popular films and much more.
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
          Email: <span className='text-sky-500'>
            <Link to='mailto:farhannsrllh177@gmail.com' className='font-medium text-sky-500 hover:underline outline-none'>farhannsrllh177@gmail.com</Link>
          </span>
        </p>
        <p className='text-slate-200 mb-3 md:mb-5'>
          Phone: <span className='font-medium text-sky-500'>+62 812-3456-7890</span>
        </p>
        <p className='text-slate-200 mb-5'>
          Enjoy your time on our website!✨🎉
        </p>
      </div>

      <Footer />
    </>
   );
}
 
export default About;