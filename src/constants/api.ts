const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

export const IMAGE_LINK = 'https://image.tmdb.org/t/p/w500'
export const IMAGE_UNAVAILABLE_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'

export const LATEST = (filter?: string, pageNumber = 1) =>
  `${API_URL}/movie/${filter}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`

export const SEARCH_MOVIES = (query = '', pageNumber = 1) =>
  `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`

export const TOP_RATED = (query = '', pageNumber = 1) =>
  `${API_URL}/movie/?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`

export const MOVIE_DETAILS = (id: string) => `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
