import axios from 'axios'

// Set base URL based on environment
let baseURL = 'https://portfolio.simonwuyts.eu/portfolio/items'
if (process.browser && process.static) {
  baseURL = '/data/portfolio/items'
}

// Create API instance
const api = axios.create({ baseURL })

if (process.browser && process.static) {
  // Get JSON file if local
  api.interceptors.request.use(config => {
    config.url = config.url + '.json'
    return config
  })
} else {
  // Get all fields when remote
  api.interceptors.request.use(config => {
    config.url = config.url + '?fields=*.*'
    return config
  })
}

// Fetch data if server-side
if (process.server && process.static) {
  const mkdirp = require('mkdirp-promise')
  const { join, dirname } = require('path')
  const { writeFileSync } = require('fs')

  api.interceptors.response.use(
    async response => {
      // Generate local file path
      let path = join(process.env.dataDir, response.request.path + '.json')
      path = path.replace(/\?fields=\*\.\*/, '')

      // Make directory and write result
      await mkdirp(dirname(path))
      writeFileSync(path, JSON.stringify(response.data))

      // Return result
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )
}

export { api }
