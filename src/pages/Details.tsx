import { useContext, useCallback, useEffect } from 'react'
import { useParams } from 'react-router'

import DetailsPlaceholder from '@components/DetailsPlaceholder'
import LazyImage from '@components/LazyImage'

import { MovieContext } from '@context/Movie'

import NoImage from '@assets/images/no-image.jpeg'

import { fetchData } from '@helpers/request'
import { formatDate } from '@helpers/date'

import { MOVIE_DETAILS, IMAGE_LINK } from '../constants/api'
import ACTIONS from '../constants/actions'

const Details = () => {
  const { dispatch, state } = useContext(MovieContext)
  const { id } = useParams()

  const fetchMovieDetails = useCallback(async () => {
    try {
      dispatch({
        type: ACTIONS.GET_MOVIE_DETAILS_REQUEST
      })

      if (id) {
        const response = await fetchData(MOVIE_DETAILS(id))

        if (response.data) {
          dispatch({
            payload: response.data,
            type: ACTIONS.GET_MOVIE_DETAILS_SUCCESS
          })
        }
      }
    } catch (error: any) {
      dispatch({
        payload: error.response.data.status_message,
        type: ACTIONS.GET_MOVIE_DETAILS_FAIL
      })
    }
  }, [dispatch, id])

  useEffect(() => {
    fetchMovieDetails()
  }, [fetchMovieDetails])

  const { movieDetails } = state

  if (state.loading) {
    return (
      <section className='container main'>
        <DetailsPlaceholder />
      </section>
    )
  }

  if (!movieDetails) {
    return null
  }
  const { poster_path, title, overview, release_date } = movieDetails

  return (
    <section className='container main'>
      <div className='movie-details'>
        <div className='movie-details__image'>
          <LazyImage src={`${poster_path ? `${IMAGE_LINK}${poster_path}` : NoImage}`} alt={title} />
        </div>
        <div className='movie-details__info'>
          <h3 className='title'>{title}</h3>
          <p className='description'>{overview}</p>
          <p className='release-date'>Release date: {formatDate(release_date)}</p>
        </div>
      </div>
    </section>
  )
}

export default Details
