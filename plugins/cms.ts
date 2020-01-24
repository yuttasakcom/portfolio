import axios from 'axios'

let baseURL = 'https://portfolio.simonwuyts.eu/portfolio/items'

if (process.browser && process.static) {
  baseURL = '/data/portfolio/items'
}

const api = axios.create({ baseURL })

if (process.browser && process.static) {
  api.interceptors.request.use(config => {
    config.url = config.url + '.json'
    return config
  })
} else {
  api.interceptors.request.use(config => {
    config.url = config.url + '?fields=*.*'
    return config
  })
}

if (process.server && process.static) {
  const mkdirp = require('mkdirp-promise')
  const { join, dirname } = require('path')
  const { writeFileSync } = require('fs')

  api.interceptors.response.use(
    async function(response) {
      // Do something with response data
      const path = join(
        process.env.dataDir,
        response.request.path + '.json'
      ).replace(/\?fields=\*\.\*/, '')
      console.log('Save', path)
      await mkdirp(dirname(path))
      writeFileSync(path, JSON.stringify(response.data))
      return response
    },
    function(error) {
      // Do something with response error
      return Promise.reject(error)
    }
  )
}

export { api }
