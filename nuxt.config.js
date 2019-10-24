import pkg from './package'

export default {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },
  css: [],
  plugins: [],
  modules: [],
  buildModules: ['@nuxt/typescript-build'],
  build: {
    extend(config, ctx) {}
  }
}
