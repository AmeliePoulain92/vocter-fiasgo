/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
String.prototype.ucfirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
String.prototype.lcfirst = function () {
  return this.charAt(0).toLowerCase() + this.slice(1)
}

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const locale = params.lang || 'en'
  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('setLocale', locale)
  app.i18n.locale = locale
  if (route.fullPath === '/') {
    if (store.state.browserLang && store.state.locales.indexOf(store.state.browserLang) !== -1) {
      store.commit('setLocale', store.state.browserLang)
      app.i18n.locale = store.state.browserLang
      return redirect('/' + store.state.browserLang)
    }
    return redirect('/en')
  }
}
