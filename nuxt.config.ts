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
        content:
          'Interaction designer and front-end developer. Dreams in HTML, CSS and Javascript, lives in Ghent, Belgium. Helps other people build digital products.'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: 'Simon Wuyts - Interaction Designer & Front-end Developer'
      },
      {
        property: 'og:image',
        content: 'https://www.simonwuyts.com/images/social.png'
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image',
        content: 'https://www.simonwuyts.com/images/social.png'
      },
      {
        property: 'twitter:title',
        content: 'Simon Wuyts - Interaction Designer & Front-end Developer'
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
  css: ['@/assets/scss/main.scss'],
  plugins: ['@/plugins/composition-api'],
  modules: ['nuxt-svg-loader', '@nuxtjs/sitemap'],
  buildModules: ['@nuxt/typescript-build'],

  build: {
    extractCSS: true,
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
  },

  sitemap: {
    hostname: 'https://www.simonwuyts.com'
  }
}
