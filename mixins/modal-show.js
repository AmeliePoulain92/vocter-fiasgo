export default {
  data () {
    return {
      isCountriesModalShow: false,
      isEmailModalShow: false
    }
  },
  methods: {
    show (modal) {
      this[modal] = true
    },
    close (modal) {
      this[modal] = false
    }
  }
}
