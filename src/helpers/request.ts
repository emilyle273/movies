import axios from 'axios'

const fetchData = (url: string) => axios.get(url)

export { fetchData }
