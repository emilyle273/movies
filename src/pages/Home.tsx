import { useCallback, useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Movies from '@components/Movies'

import { MovieContext } from '@context/Movie'
import { fetchData } from '@helpers/request'

import { LATEST, SEARCH_MOVIES } from '@constants/api'
import ACTIONS from '@constants/actions'
import Header from '@components/Header'

const Home = () => {
  const { dispatch } = useContext(MovieContext)
  const [searchParams] = useSearchParams()

  const fetchMovies = useCallback(async () => {
    try {
      const query = searchParams.get('query')
      const filter = searchParams.get('filter') || ''
      // const currentPage = pathname.split('/')[1]

      dispatch({
        type: ACTIONS.GET_MOVIES_REQUEST
      })

      const endPoint = query ? SEARCH_MOVIES(query) : LATEST(filter)

      if (endPoint) {
        const response = await fetchData(endPoint)

        if (response.data.results) {
          dispatch({
            payload: response.data.results,
            type: ACTIONS.GET_MOVIES_SUCCESS
          })
        }
      }
    } catch (error: any) {
      dispatch({
        payload: error.response.data.status_message,
        type: ACTIONS.GET_MOVIES_FAIL
      })
    }
  }, [dispatch, searchParams])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <>
      <Header />
      <section className='container main'>
        <Movies />
      </section>
    </>
  )
}

export default Home
