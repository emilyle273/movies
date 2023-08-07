import { ApiEndpoints } from '../types'

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

export const IMAGE_LINK = 'https://image.tmdb.org/t/p/w500'
export const IMAGE_UNAVAILABLE_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'

export const LATEST = `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`

export const SEARCH_MOVIES = (query = '') =>
  `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`

export const TOP_RATED = `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`

export const MOVIE_DETAILS = (id: string) => `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`

export const API_ENPOINTS: ApiEndpoints = {
  now_playing: () => LATEST,
  '': () => LATEST,
  top_rated: () => TOP_RATED,
  search: (query?: string) => SEARCH_MOVIES(query)
}
