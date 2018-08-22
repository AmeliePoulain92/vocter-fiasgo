var SpritesmithPlugin = require('webpack-spritesmith')
var path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Fiasgo - Simplified Shopping',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content:'#ffffff'},
      { property: 'og:type', content: 'website'},
      { property: 'og:url', content: 'https://www.fiasgo.com'},
      { property: 'og:title', content: 'Fiasgo - Simplified Shopping'},
      { property: 'og:image', content: 'https://static.fiasgo.com/img/logo.svg'},
      { property: 'og:site_name', content: 'Fiasgo'},
      { property: 'og:description', content: 'We mastered technology so you dont have to'},
      { property: 'twitter:card', content: 'summary'},
      { property: 'twitter:site', content: '@fiasgocom'},
      { property: 'twitter:url', content: 'https://www.fiasgo.com'},
      { property: 'twitter:title', content: 'Fiasgo'},
      { property: 'twitter:description', content: '"We mastered technology so you dont have to'},
      { property: 'twitter:description', content: 'https://static.fiasgo.com/img/logo.svg'}
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    '~/plugins/i18n.js', { src: '~/plugins/ga.js', ssr: false },
    { src: '~/plugins/vue-select', ssr: false },{ src: '~plugins/vue-currency-filter', ssr:false}
  ],
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.scss', lang: 'scss' } ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-i18n', 'vue-select', 'vue-currency-filter' ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, 'assets/icons'),
            glob: '*.png'
        },
        target: {
            image: path.resolve(__dirname, 'assets/img/sprite.png'),
            css: path.resolve(__dirname, 'assets/css/nuclides/_sprite.scss')
        },
        apiOptions: {
            cssImageRef: "../img/sprite.png"
        }
      })
    ]
  }
}
