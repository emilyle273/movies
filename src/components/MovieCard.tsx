import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'

import LazyImage from '@components/LazyImage'

import NoImage from '@assets/images/no-image.jpeg'
import { IMAGE_LINK } from '@constants/api'

import { Movie } from '../types'
import { VIEW_MODE } from '@constants/tabs'
import { MovieContext } from '@context/Movie'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { state } = useContext(MovieContext)
  const { title, poster_path, id, overview } = movie

  return (
    <div className={`card ${state.viewMode === VIEW_MODE.list ? ' card--list' : ''}`}>
      <div className='card__image'>
        <LazyImage src={poster_path ? `${IMAGE_LINK}${poster_path}` : NoImage} alt={title} />
      </div>
      <div className='card__info'>
        <p className='title'>{title}</p>
        <p className='overview'>{overview}</p>
      </div>
      <Link to={`/movie/${id}`} />
    </div>
  )
}

export default MovieCard
