import { Dispatch, createContext, useReducer } from 'react'
import ACTIONS from '@constants/actions'
import movieReducer from '@reducers/movieReducer'

import { Movie } from '../types'

export interface MovieState {
  loading: boolean
  error: string | null
  movieDetails: Movie | null
  movies: Movie[]
}

export const initialState = {
  loading: false,
  error: null,
  movieDetails: null,
  movies: []
} as MovieState

export type Action = {
  payload?: { [key: string]: any } | string
  type: (typeof ACTIONS)[keyof typeof ACTIONS]
}

const MovieContext = createContext<{
  state: MovieState
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => {} })

const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState)

  return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>
}

export { MovieContext, MovieProvider }
