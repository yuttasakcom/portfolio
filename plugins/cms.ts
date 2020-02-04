import axios from 'axios'

// Set base URL based on environment
let baseURL = 'https://portfolio.simonwuyts.eu/portfolio/items'

// Create API instance
const api = axios.create({ baseURL })
api.interceptors.request.use(config => {
  config.url = config.url + '?fields=*.*'
  return config
})

const getLocal = async url => {
  const result = await axios.get(url)
  return result.data
}

export { api, getLocal }
