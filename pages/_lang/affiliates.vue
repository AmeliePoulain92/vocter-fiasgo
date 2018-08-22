<template>
  <div>
      <h1 class="page__header">{{ $t('article.affiliates.h1') }}</h1>
      <p>{{ $t('article.affiliates.p1') }}</p>
      <p>{{ $t('article.affiliates.p2') }}</p>
      <p>{{ $t('article.affiliates.p3') }}</p>
      <p>{{ $t('article.affiliates.p4') }}</p>
      <h2 class="page__subheader">{{ $t('article.affiliates.h2') }}</h2>
      <p>{{ $t('article.affiliates.p5') }}</p>
      <i18n path="article.affiliates.p6" tag="p" for="actions.contactus">
        <nuxt-link :to="path('/contact')">
          {{ $t('actions.contactus') }}
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
      title: 'Fiasgo | ' + this.$t('article.affiliates.h1'),
      meta: [
        {hid: 'ogtitle', name: 'og:title', content: 'Fiasgo | ' + this.$t('article.affiliates.h1')},
        {hid: 'ogimg', name: 'og:image', content: 'https://www.fiasgo.com/social/fb.jpg'},
        {hid: 'ogdesc', name: 'og:description', content: this.$t('article.affiliates.p1')},
        {hid: 'description', name: 'description', content: this.$t('article.affiliates.p1')}
      ]
    }
  }
}
</script>
