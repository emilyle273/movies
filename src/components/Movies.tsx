import { useContext } from 'react'

import MovieCard from '@components/MovieCard'
import GridPlaceholder from '@components/GridPlaceholder'

import { MovieContext } from '@context/Movie'
import { VIEW_MODE } from '@constants/tabs'

const Movies = () => {
  const { state } = useContext(MovieContext)

  if (state.loading) {
    return <GridPlaceholder />
  }

  return (
    <div className={`movies${state.viewMode === VIEW_MODE.list ? ' movies--list' : ''}`}>
      {state.movies.map((item) => {
        return (
          <div className='movies__item' key={item.id}>
            <MovieCard movie={item} />
          </div>
        )
      })}
    </div>
  )
}

export default Movies
