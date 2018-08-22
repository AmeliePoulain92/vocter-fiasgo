import {Nuxt, Builder} from 'nuxt'
import express from 'express'

import api from './api'

const app = express()
const port = process.env.NODE_ENV === 'production' ? 80 : 3000

app.set('port', port)
app.get('/sitemap.xml', require('./../xml/sitemap.js'))

app.use(express.static('public'))

app.use(express.static('static', {
  maxAge: 86400000 * 7
}))

app.use(function (req, res, next) {
  var acceptLang = req.headers["accept-language"]
  req.acceptLang = acceptLang
  next()
})

// Import API Routes
app.use('/api', api)

// Start nuxt.js
async function start() {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instanciate nuxt.js
  const nuxt = new Nuxt(config)
  // Build in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
  }
  // Add nuxt.js middleware
  app.use(nuxt.render)
  // Listen the server
  app.listen(port)
}

start()
