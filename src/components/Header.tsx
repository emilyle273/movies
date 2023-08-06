import { useContext } from 'react'
import { Link } from 'react-router-dom'

import ErrorToast from '@components/ErrorToast'
import Search from '@components/Search'

import { MovieContext } from '@context/Movie'

import TABS from '@constants/tabs'

const Header = () => {
  const { state } = useContext(MovieContext)

  return (
    <>
      <header className='header'>
        <nav className='navbar container'>
          <div className='navbar__left'>
            <h1 className='logo'>Movie</h1>
            <Search />
          </div>
          <input type='checkbox' name='' id='' />
          <div className='hamburger'>
            <span className='hamburger__line hamburger__line--1'></span>
            <span className='hamburger__line hamburger__line--2'></span>
            <span className='hamburger__line hamburger__line--3'></span>
          </div>
          <ul className='menu'>
            {TABS.map((item) => (
              <li className='menu__item' key={item.name}>
                <Link to={item.link}>
                  {/* <img src={PlayingIcon} alt='playing' /> */}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {state.error && <ErrorToast message={state.error} />}
    </>
  )
}

export default Header
