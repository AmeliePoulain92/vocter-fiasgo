<template>
  <div id="app" :class="['lang-' + locale, {'rtl': isRtl}]" @click="registerClick">
  <div class="page">
      <div class="page__article">
        <top-menu class="top-menu--page" @onCountriesModalShow="show('isCountriesModalShow')"></top-menu>
        <nuxt-link :to="path('/')"><img class="page__logo" src="https://static.fiasgo.com/img/logo.svg" title="Fiasgo" alt="Fiasgo" /></nuxt-link>
        <nuxt />
      </div>
    </div>
    <modal @close="close('isCountriesModalShow')" :show="isCountriesModalShow">
      <template slot="body">
        <countries-select />
      </template>
    </modal>
  </div>
</template>

<script>
import countriesSelect from '~/components/countriesSelect'
import topMenu from './../components/topMenu'
import modal from '~/components/modal'
import translate from './../mixins/translate.js'
import modalShow from '~/mixins/modal-show'
import {mapGetters, mapActions} from 'vuex'

export default {
  mixins: [translate, modalShow],
  components: {
    topMenu,
    countriesSelect,
    modal
  },
  computed: {
    ...mapGetters([
      'getlocale'
    ]),
    locale () {
      return this.getlocale
    },
    isRtl () {
      return this.getlocale === 'ar'
    }
  },
  methods: {
    ...mapActions([
      'initRegisterClick'
    ]),
    registerClick (e) {
      this.initRegisterClick()
    }
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.locale
      }
    }
  }
}
</script>
<style lang="scss">
  .selected-tag{
    color: #000;
  }
</style>
