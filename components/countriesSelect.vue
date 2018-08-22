<template>
	<div class="countries-select">
      <div class="select-elem">
        <h2>{{ $t('settings.country') }}</h2>
        <v-select :options="countries" label="country" @input="setCountry" :value="currentCountry" >
          <template class="option" slot="option" slot-scope="option" >
            <img class="v-select flag" :src="option.flag" :alt="option.country"/>
            <span >{{ option.country }}</span>
          </template>
          <span slot="no-options" class="no-options">
            {{ $t('error.nomatch') }}
          </span>
        </v-select>
      </div>
      <div class="select-elem">
        <h2>{{ $t('settings.currency') }}</h2>
        <v-select :options="currencies" label="currency" @input="setCurrency" :value="currentCurrency">
          <span slot="no-options" class="no-options">
            {{ $t('error.nomatch') }}
          </span>
        </v-select>
      </div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import NoSSR from 'vue-no-ssr'
import axios from 'axios'

export default {
  name: 'countries-select',
  components: {
    NoSSR
  },
  data () {
    return {
      countries: [],
      currencies: [],
      linkImg: 'https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/'
    }
  },
  computed: {
    ...mapGetters([
      'getRootApiUrl',
      'getCountry',
      'getCurrency'
    ]),
    currentCountry () {
      let countryFromLocalStorage = localStorage.getItem('country')
      let result = countryFromLocalStorage || this.getCountry

      return this.getCountryByLocaleName(result)
    },
    currentCurrency () {
      let currencyFromLocalStorage = localStorage.getItem('currency')
      let result = currencyFromLocalStorage || this.getCurrency

      return this.getCurrencyByLocaleName(result)
    }
  },
  methods: {
    ...mapActions([
      'addSetCurrency',
      'addSetCountry'
    ]),
    fetchCountries () {
      axios.get(`${this.getRootApiUrl}configuration`)
      .then(res => {
        this.countries = res.data.countries.map(item => {
          return {
            country: this.$t('country.' + item),
            countryCode: item,
            flag: this.linkImg + item + '.svg'
          }
        })

        this.currencies = res.data.currencies.map(item => {
          return {
            currency: item
          }
        })
      })
    },
    getCountryByLocaleName (name) {
      return this.countries.find(locale => locale.countryCode === name)
    },
    getCurrencyByLocaleName (name) {
      return this.currencies.find(locale => locale.currency === name)
    },
    setCountry (val) {
      if (val) {
        this.addSetCountry(val.countryCode)
      }
    },
    setCurrency (val) {
      if (val) {
        this.addSetCurrency(val.currency)
      }
    }
  },
  mounted () {
    this.fetchCountries()
  }
}
</script>
<style>
  .v-select .flag {
    width: 30px;
    height: 20px;
    position: relative;
    top:5px;
    margin-right: 10px;
  }

  .countries-select .select-elem .selected-tag {
    position: absolute;
  }
</style>
