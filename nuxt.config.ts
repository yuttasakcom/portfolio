import { join } from 'path'
import { api } from './plugins/cms'

export default {
  mode: 'universal',

  head: {
    titleTemplate: '%s - Simon Wuyts',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Simon Wuyts Portfolio'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://rsms.me/inter/inter.css'
      }
    ]
  },

  env: {
    dataDir: join(__dirname, 'dist/data')
  },

  loading: { color: '#fff' },
  css: [],
  plugins: ['@/plugins/composition-api'],
  modules: ['nuxt-svg-loader'],
  buildModules: ['@nuxt/typescript-build'],

  build: {
    babel: {
      plugins: [
        [
          'prismjs',
          {
            languages: ['javascript', 'css', 'markup', 'swift'],
            css: false
          }
        ]
      ]
    }
  },

  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false } // Disables prefixing for SVG IDs
      ]
    }
  },

  generate: {
    async routes() {
      const {
        data: { data: articles }
      } = await api.get('articles')
      const {
        data: { data: cases }
      } = await api.get('cases')
      const articleRoutes = articles
        .filter(article => article.status === 'published')
        .map(article => `/articles/${article.slug}`)
      const caseRoutes = cases
        .filter(item => item.status === 'published')
        .map(item => `/work/${item.slug}`)
      return [...articleRoutes, ...caseRoutes]
    }
  }
}
