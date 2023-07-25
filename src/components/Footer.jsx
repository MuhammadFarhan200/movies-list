import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-slate-800 p-5">
      <div className='container text-slate-200 text-center mx-auto'>
        <p>&copy; {new Date().getFullYear()} MList. All rights reserved. Created by 
          <Link to='https://www.hanzzt.me' target='_blank' className='font-medium text-sky-500 hover:underline outline-none'> Farhan Nasrulloh </Link>
          using <Link to='https://www.themoviedb.org/' target='_blank' className='font-medium text-sky-500 hover:underline outline-none'> TMDB</Link> API.
        </p>
      </div>
    </footer>
  )
}

export default Footer