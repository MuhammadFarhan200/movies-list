import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    const navMenuList = document.querySelectorAll('.nav-link')
    navMenuList.forEach((nav) => {
      nav.addEventListener('click', () => {
        const hamburger = document.getElementById('hamburger')
        const navMenu = document.getElementById('nav-menu')
        hamburger.classList.remove('hamburger-active')
        navMenu.classList.add('hidden')
      })
    })
  }, [])

  const handleClickHamburger = () => {
    const hamburger = document.getElementById('hamburger')
    const navMenu = document.getElementById('nav-menu')
    hamburger.classList.toggle('hamburger-active')
    navMenu.classList.toggle('hidden')
  }

  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger')
    const navMenu = document.getElementById('nav-menu')
    const isClickInside = hamburger.contains(e.target)
    const isClickInsideNav = navMenu.contains(e.target)

    if (!isClickInside && !isClickInsideNav) {
      hamburger.classList.remove('hamburger-active')
      navMenu.classList.add('hidden')
    }  
  })

  const handleClickNav = () => {
    sessionStorage.removeItem('currentPage')
  }

  return (
    <header className='bg-slate-800 py-4 sticky top-0 z-10 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center px-5 sm:px-10'>
        <Link to='/' onClick={handleClickNav} 
          className='text-2xl font-semibold bg-gradient-to-tr from-sky-300 to-sky-500 bg-clip-text text-transparent px-1 outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md'
        >MList
        </Link>
        <button type='button' id='hamburger' name='hamburger' className='block right-4 outline-none lg:hidden'
          onClick={handleClickHamburger}
        >
          <span className='hamburger-line origin-top-left'></span>
          <span className='hamburger-line'></span>
          <span className='hamburger-line origin-bottom-left'></span>
        </button>
        <nav id='nav-menu' className='hidden absolute bg-slate-800 lg:bg-transparent rounded-lg lg:static lg:block w-[250px] lg:w-fit top-[5rem] right-4 overflow-hidden transition-all ease-in-out'>
          <ul className='block lg:flex'>
            <li className='group w-full h-full'>
              <Link to='/' className={`nav-link ${path === '/' ? 'active' : ''}`} onClick={handleClickNav}>Home</Link>
            </li>
            <li className='group w-full h-full'>
              <Link to='/genres' className={`nav-link ${path === '/genres' ? 'active' : ''}`}>Genres</Link>
            </li>
            <li className='group w-full h-full'>
              <Link to='/movies' className={`nav-link ${path == '/movies' || path.startsWith('/movie') ? 'active' : ''}`} onClick={handleClickNav}>Movies</Link>
            </li>
            <li className='group w-full h-full'>
              <Link to='/about' className={`nav-link ${path === '/about' ? 'active' : ''}`}>About Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar