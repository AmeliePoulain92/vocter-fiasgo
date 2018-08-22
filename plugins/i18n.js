import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store, route }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: route.params.lang || 'en',
    messages: {
      'en': require('~/locales/en.json'),
      'da': require('~/locales/da.json'),
      'sv': require('~/locales/sv.json'),
      'no': require('~/locales/no.json'),
      'ar': require('~/locales/ar.json'),
      'pt': require('~/locales/pt.json'),
      'fr': require('~/locales/fr.json'),
      'ru': require('~/locales/ru.json'),
      'es': require('~/locales/es.json'),
      'de': require('~/locales/de.json'),
      'uk': require('~/locales/uk.json'),
      'pl': require('~/locales/pl.json'),
      'nl': require('~/locales/nl.json'),
      'sr': require('~/locales/sr.json')
    }
  })
}
