import { useCallback, useContext, useEffect, memo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import Movies from '@components/Movies'

import { MovieContext } from '@context/Movie'
import { fetchData } from '@helpers/request'

import { API_ENPOINTS } from '@constants/api'
import ACTIONS from '@constants/actions'
import Header from '@components/Header'

const Home = () => {
  const { dispatch } = useContext(MovieContext)
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()

  const fetchMovies = useCallback(async () => {
    try {
      const query = searchParams.get('query')
      const filter = pathname.split('/')[1]

      const endPoint = query ? API_ENPOINTS[filter](query) : API_ENPOINTS[filter]()

      dispatch({
        type: ACTIONS.GET_MOVIES_REQUEST
      })

      const response = await fetchData(endPoint)

      if (response.data.results) {
        dispatch({
          payload: response.data.results,
          type: ACTIONS.GET_MOVIES_SUCCESS
        })
      }
    } catch (error: any) {
      dispatch({
        payload: error.response.data.status_message,
        type: ACTIONS.GET_MOVIES_FAIL
      })
    }
  }, [dispatch, pathname, searchParams])

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

export default memo(Home)
