const xml = require('xml');

const locales = ['ar', 'da', 'de', 'en', 'es', 'fr', 'nl', 'pl', 'pt', 'ru', 'sr', 'sv', 'uk']

const pages = [
  '',
  '/affiliates',
  '/buyers',
  '/contact',
  '/networks'
]

const sitemap =
  {
    urlset: [
      { _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xmlns:xhtml': 'http://www.w3.org/1999/xhtml'} }
    ]
  }

//retrive pages from database or some other internal system
const retrivePages = () => {
  return pages
}

const generate = () => {
  const s = Object.assign({}, sitemap)
  retrivePages().forEach((p, idx) => {
    for (let i in locales) {
      var url = [
        {loc: 'https://www.fiasgo.com/' + locales[i] + p},
        {changefreq: 'weekly'}
      ]

      for (let j in locales) {
        let locale = locales[j]
        url.push({'xhtml:link': [
          {_attr: {rel: 'alternate', hreflang: locale, href: 'https://www.fiasgo.com/' + locale + p}}
        ]})
      }
      s.urlset.push({url: url})
    }
  })

  return s
}

module.exports = function (req, res, next) {
  res.set('Content-Type', 'text/xml');
  res.send(xml(generate(), { declaration: true }));
}
