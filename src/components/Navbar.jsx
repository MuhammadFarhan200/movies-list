import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
    <header className='bg-slate-800 py-4 sticky top-0 z-10'>
      <div className='container mx-auto flex justify-between items-center px-5 sm:px-10'>
        <NavLink to='/' onClick={handleClickNav} 
          className='text-2xl font-semibold bg-gradient-to-tr from-sky-300 to-sky-500 bg-clip-text text-transparent py-1 px-2 outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md'
        >MList
        </NavLink>
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
              <NavLink to='/' exact activeClassName='active' className='nav-link' onClick={handleClickNav}>Home</NavLink>
            </li>
            <li className='group w-full h-full'>
              <NavLink to='/genres' activeClassName='active' className='nav-link'>Genres</NavLink>
            </li>
            <li className='group w-full h-full'>
              <NavLink to='/movies' activeClassName='active' className='nav-link' onClick={handleClickNav}>Movies</NavLink>
            </li>
            <li className='group w-full h-full'>
              <NavLink to='#' activeClassName='active' className='nav-link non-active'>Companies</NavLink>
            </li>
            <li className='group w-full h-full'>
              <NavLink to='#' activeClassName='active' className='nav-link non-active'>About Us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar