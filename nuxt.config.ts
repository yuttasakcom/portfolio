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
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },

  loading: { color: '#fff' },
  css: [],
  plugins: ['@/plugins/composition-api'],
  modules: ['nuxt-payload-extractor'],
  buildModules: ['@nuxt/typescript-build']
}
