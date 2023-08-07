import { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ErrorToast from '@components/ErrorToast'
import Search from '@components/Search'

import { MovieContext } from '@context/Movie'

import GridIcon from '@assets/icons/grid.svg'
import ListIcon from '@assets/icons/list.svg'

import TABS, { VIEW_MODE } from '@constants/tabs'
import ACTIONS from '@constants/actions'

const Header = () => {
  const { state, dispatch } = useContext(MovieContext)
  const { pathname } = useLocation()
  const [openedMenu, setOpenedMenu] = useState(false)

  const switchViewMode = () => {
    dispatch({
      type: ACTIONS.SWITCH_VIEW_MODE
    })
  }

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
          <input type='checkbox' checked={openedMenu} name='' id='' onChange={() => setOpenedMenu(!openedMenu)} />
          <div className='hamburger'>
            <span className='hamburger__line hamburger__line--1'></span>
            <span className='hamburger__line hamburger__line--2'></span>
            <span className='hamburger__line hamburger__line--3'></span>
          </div>
          <ul className='menu'>
            {TABS.map((item) => (
              <li className={`menu__item${pathname === item.link ? ' menu__item--active' : ''}`} key={item.name}>
                <Link to={item.link} onClick={() => setOpenedMenu(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className='view-mode' onClick={switchViewMode}>
            <img src={state.viewMode === VIEW_MODE.grid ? ListIcon : GridIcon} alt='view-mode' />
          </button>
        </nav>
      </header>
      {state.error && <ErrorToast message={state.error} />}
    </>
  )
}

export default Header
