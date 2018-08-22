<template>
  <div>
    <h1 class="page__header">{{ $t('article.buyers.h1') }}</h1>
    <i18n path="article.buyers.p1" tag="p" for="article.buyers.p1link1">
      <a href="https://en.wikipedia.org/wiki/Outliers_(book)" target="_blank">{{ $t('article.buyers.p1link1') }}</a>
    </i18n>
    <p>{{ $t('article.buyers.p2') }}</p>
    <p>{{ $t('article.buyers.p3') }}</p>
    <p>{{ $t('article.buyers.p4') }}</p>
    <h2 class="page__subheader">{{ $t('article.buyers.h2') }}</h2>
    <p>{{ $t('article.buyers.p5') }}</p>
    <p>{{ $t('article.buyers.p6') }}</p>
    <h2 class="page__subheader">{{ $t('article.buyers.h3') }}</h2>
    <p>{{ $t('article.buyers.p7') }}</p>
    <p>{{ $t('article.buyers.p8') }}</p>
    <p>{{ $t('article.buyers.p9') }}</p>
    <i18n path="article.buyers.p10" tag="p" for="actions.contactus">
      <nuxt-link :to="path('/contact')">
        {{ $t('actions.contactus').lcfirst() }}
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
      title: 'Fiasgo | ' + this.$t('article.buyers.h1'),
      meta: [
        {hid: 'ogtitle', name: 'og:title', content: 'Fiasgo | ' + this.$t('article.buyers.h1')},
        {hid: 'ogimg', name: 'og:image', content: 'https://www.fiasgo.com/social/fb.jpg'},
        {hid: 'ogdesc', name: 'og:description', content: this.$t('article.buyers.p1')},
        {hid: 'description', name: 'description', content: this.$t('article.buyers.p1')}
      ]
    }
  }
}
</script>
