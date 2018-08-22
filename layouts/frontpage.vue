<template>
  <div id="app" :class="['lang-' + locale, {'rtl': isRtl}]" @click="registerClick">
    <div class="hero">
      <image-fader></image-fader>
      <img class="hero__logo" src="https://static.fiasgo.com/img/logo.svg" title="Fiasgo" alt="Fiasgo" />
    <nuxt />
    </div>
    <div class="hero__headline">
      <h1>
        {{ $t('home.title') }}
        <span>
          {{ $t('home.subtitle') }}<br />
          {{ $t('home.subtitle2') }}
        </span>
      </h1>
      <email-subscription @onEmailModalShow="show('isEmailModalShow')" @closeModal="close('isEmailModalShow')" @login="contextModalEmail"></email-subscription>
      <span class="currency-filter">{{ this.numb | currency(this.currency) }}</span>
    </div>
    <top-menu class="top-menu--hero" @onCountriesModalShow="show('isCountriesModalShow')"></top-menu>
    <modal @close="close('isCountriesModalShow')" :show="isCountriesModalShow">
      <template slot="body">
        <countries-select />
      </template>
    </modal>
    <modal @close="close('isEmailModalShow')" :show="isEmailModalShow">
      <template slot="body">
        <img class="img-email-modal" :src="this.imageModal" :alt="this.responseText"/>
        <p class="text-email-modal">{{this.responseText}}</p>
      </template>
    </modal>
    <footer>
       <no-ssr>
         <cookie-law theme="dark-lime"></cookie-law>
       </no-ssr>
    </footer>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import topMenu from '~/components/topMenu'
import countriesSelect from '~/components/countriesSelect'
import modal from '~/components/modal'
import modalShow from '~/mixins/modal-show'
import imageFader from '~/components/imageFader'
import emailSubscription from './../components/emailSubscription'
import {mapGetters, mapActions} from 'vuex'
import CookieLaw from 'vue-cookie-law'

export default {
  mixins: [modalShow],
  components: {
    NoSSR,
    topMenu,
    modal,
    countriesSelect,
    imageFader,
    emailSubscription,
    CookieLaw
  },
  data () {
    return {
      imageModal: null,
      responseText: null,
      currency: '$',
      numb: 523.45
    }
  },
  computed: {
    ...mapGetters([
      'getlocale',
      'getImgStateEmail',
      'gettextStateEmail'
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
    },
    contextModalEmail (data) {
      this.imageModal = data.imageModal
      this.responseText = data.responseText
    }
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.locale,
        script: [
          { innerHTML: '{"@context":"http://schema.org","@type":"WebSite","name":"Fiasgo","legalName":"Fiasgo","url":"https://www.fiasgo.com","logo":"https://static.fiasgo.com/img/logo.svg","isAccessibleForFree":"true","address":{"@type":"PostalAddress","addressCountry":"Denmark"},"sameAs":["https://www.facebook.com/fiasgocom/","https://linkedin.com/company/fiasgo","https://twitter.com/fiasgocom"]}' }
        ],
        __dangerouslyDisableSanitizers: ['script']
      }
    }
  }
}
</script>
<style type="text/css" scoped>
  .currency-filter{
    display: none;
  }
</style>
