import { useContext, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import ErrorToast from '@components/ErrorToast'
import Search from '@components/Search'

import { MovieContext } from '@context/Movie'

import TABS from '@constants/tabs'

const Header = () => {
  const { state } = useContext(MovieContext)
  const [searchParams] = useSearchParams()
  const filter = useMemo(() => searchParams.get('filter'), [searchParams])
  const [openedMenu, setOpenedMenu] = useState(false)

  return (
    <>
      <header className='header'>
        <nav className='navbar container'>
          <div className='navbar__left'>
            <Link to='/' className='logo'>
              <h1>Movie</h1>
            </Link>
            <Search />
          </div>
          <input type='checkbox' checked={openedMenu} name='' id='' onClick={() => setOpenedMenu(!openedMenu)} />
          <div className='hamburger'>
            <span className='hamburger__line hamburger__line--1'></span>
            <span className='hamburger__line hamburger__line--2'></span>
            <span className='hamburger__line hamburger__line--3'></span>
          </div>
          <ul className='menu'>
            {TABS.map((item) => (
              <li className={`menu__item${filter === item.id ? ' menu__item--active' : ''}`} key={item.name}>
                <Link to={item.link} onClick={() => setOpenedMenu(false)}>
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
