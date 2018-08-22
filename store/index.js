export const state = () => ({
  apiUrls: {
    root: 'https://api.fiasgo.com/api/',
    configuration: 'configuration'
  },
  locales: ['ar', 'da', 'de', 'en', 'es', 'fr', 'nl', 'pl', 'pt', 'ru', 'sr', 'sv', 'uk'],
  localeNames: {
    'en': 'English',
    'da': 'Dansk',
    'de': 'Deutsch',
    'uk': '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430',
    'ru': 'русский',
    'sv': 'Svenska',
    'pl': 'Polski',
    'nl': 'Nederlands',
    'pt': 'Português',
    'no': 'Norsk',
    'es': 'Español',
    'fr': 'Français',
    'ar': 'العربية',
    'sr': '\u0421\u0440\u043f\u0441\u043a\u0438'
  },
  locale: 'en',
  browserLang: '',
  menuOpen: false,
  langPickerOpen: false,
  country: 'dk',
  currency: 'DKK'
})

export const getters = {
  getRootApiUrl: state => state.apiUrls.root,
  getCountry: state => state.country,
  getCurrency: state => state.currency,
  getlangPickerOpen: state => state.langPickerOpen,
  getlocaleNames: state => state.localeNames,
  getlocales: state => state.locales,
  getlocale: state => state.locale
}

export const mutations = {
  setBrowserLang (state, locale) {
    state.browserLang = locale.split(',')[0].split('-')[0]
  },
  setLocale (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  setCurrency (state, currency) {
    state.currency = currency
    localStorage.setItem('currency', currency)
  },
  setCountry (state, country) {
    state.country = country
    localStorage.setItem('country', country)
  },
  toggleMenu (state) {
    state.menuOpen = !state.menuOpen
    state.langPickerOpen = false
  },
  toggleLangPicker (state) {
    state.langPickerOpen = !state.langPickerOpen
    state.menuOpen = false
  },
  closeAll (state) {
    state.menuOpen = false
    state.langPickerOpen = false
  }
}

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.acceptLang) {
      commit('setBrowserLang', req.acceptLang)
    }
  },
  addSetCurrency ({commit}, val) {
    commit('setCurrency', val)
  },
  addSetCountry ({commit}, val) {
    commit('setCountry', val)
  },
  initToggleList ({commit}) {
    commit('toggleLangPicker')
  },
  initToggleMenu ({commit}) {
    commit('toggleMenu')
  },
  initRegisterClick ({commit}) {
    commit('closeAll')
  }
}
