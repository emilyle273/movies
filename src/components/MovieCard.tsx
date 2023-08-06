import { FC } from 'react'
import { Link } from 'react-router-dom'

import LazyImage from '@components/LazyImage'

import NoImage from '@assets/images/no-image.jpeg'
import { IMAGE_LINK } from '@constants/api'

import { Movie } from '../types'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { title, poster_path, id } = movie

  return (
    <div className='card'>
      <div className='card__image'>
        <LazyImage src={poster_path ? `${IMAGE_LINK}${poster_path}` : NoImage} alt={title} />
      </div>
      <p className='card__title'>{title}</p>
      <Link to={`/movie/${id}`} />
    </div>
  )
}

export default MovieCard
