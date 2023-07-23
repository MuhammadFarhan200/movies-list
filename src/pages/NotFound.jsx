import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className='container flex flex-col justify-center mx-auto p-5 lg:p-10' style={{ minHeight: 'calc(100vh - 136px)' }}>
        <h1 className='text-5xl lg:text-8xl text-sky-500 font-bold text-center'>404</h1>
        <h2 className='text-xl lg:text-3xl text-slate-200 font-semibold text-center my-3'>Page Not Found</h2>
        <p className='text-lg text-slate-200 font-medium text-center'>
          Oh no! The page you were looking for cloud not found. <br />
          Maybe you can try something else?
        </p>
        <Link to='/' className='inline-block button font-medium mx-auto my-5'>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} className='mr-2' />
          <span className='text-lg'>Go Home</span>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;