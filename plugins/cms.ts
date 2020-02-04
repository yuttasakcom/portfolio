import axios from 'axios'

// Create API instance
const api = axios.create({
  baseURL: 'https://portfolio.simonwuyts.eu/portfolio/items'
})
api.interceptors.request.use(config => {
  config.url = config.url + '?fields=*.*'
  return config
})

const getLocal = async url => {
  const result = await axios.get(url)
  return result.data
}

export { api, getLocal }
