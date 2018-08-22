<template>
  <div>
      <h1 class="page__header">{{ $t('article.networks.h1') }}</h1>
      <p>{{ $t('article.networks.p1') }}</p>
      <p>{{ $t('article.networks.p2') }}</p>
      <p>{{ $t('article.networks.p3') }}</p>
      <i18n path="article.networks.p4" tag="p" for="actions.seemoredetails">
        <nuxt-link :to="path('/contact')">
          {{ $t('actions.seemoredetails') }}
        </nuxt-link>
      </i18n>
  </div>
</template>

<script>
import translate from './../../mixins/translate.js'

export default {
  mixins: [translate],
  head () {
    return {
      title: 'Fiasgo | ' + this.$t('article.networks.h1'),
      meta: [
        {hid: 'ogtitle', name: 'og:title', content: 'Fiasgo | ' + this.$t('article.networks.h1')},
        {hid: 'ogimg', name: 'og:image', content: 'https://www.fiasgo.com/social/fb.jpg'},
        {hid: 'ogdesc', name: 'og:description', content: this.$t('article.networks.p1')},
        {hid: 'description', name: 'description', content: this.$t('article.networks.p1')}
      ]
    }
  }
}
</script>
