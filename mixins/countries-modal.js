export default {
  data () {
    return {
      isCountriesModalShow: false
    }
  },
  methods: {
    countriesModalShow () {
      this.isCountriesModalShow = true
    },
    countriesModalClose () {
      this.isCountriesModalShow = false
    }
  }
}
