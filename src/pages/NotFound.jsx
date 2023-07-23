import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const title = 'MList | 404 - Page Not Found';
  
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Navbar />

      <div className='container flex flex-col justify-center mx-auto p-5 lg:p-10 min-h-[78.6vh]'>
        <h1 className='text-7xl lg:text-8xl text-sky-500 font-bold text-center'>404</h1>
        <h2 className='text-2xl lg:text-3xl text-slate-200 font-semibold text-center my-4'>Page Not Found!</h2>
        <p className='text-lg text-slate-200 font-medium text-center'>
          Oh no! The page you were looking for cloud not found. <br />
          Maybe you can try something else?
        </p>
        <Link to='/' className='inline-block button font-medium mx-auto mt-6'>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} className='mr-2' />
          <span className='text-lg'>Go to Home</span>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;