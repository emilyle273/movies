import ACTIONS from '@constants/actions'
import { Action, MovieState } from '@context/Movie'

import { Movie } from '../types'
import { VIEW_MODE } from '@constants/tabs'

const movieReducer = (state: MovieState, action: Action): MovieState => {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.GET_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ACTIONS.GET_MOVIES_SUCCESS:
      return {
        ...state,
        ...(payload && {
          movies: payload as Movie[]
        }),
        loading: false
      }

    case ACTIONS.GET_MOVIES_FAIL:
      return {
        ...state,
        error: payload as string,
        loading: false
      }

    case ACTIONS.GET_MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ACTIONS.GET_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        ...(payload && {
          movieDetails: payload as Movie
        }),
        loading: false
      }

    case ACTIONS.GET_MOVIE_DETAILS_FAIL:
      return {
        ...state,
        error: payload as string,
        loading: false
      }

    case ACTIONS.SWITCH_VIEW_MODE:
      return {
        ...state,
        viewMode: state.viewMode === VIEW_MODE.grid ? VIEW_MODE.list : VIEW_MODE.grid
      }

    default:
      return state
  }
}

export default movieReducer
