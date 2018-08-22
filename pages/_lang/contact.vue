<template>
  <div>
      <h1 class="page__header">{{ $t('article.contact.h1') }}</h1>
      <p>{{ $t('article.contact.p1') }}</p>
      <p v-html="$t('article.contact.p2', {mail: '<a href=\'mailto:info@fiasgo.com\'>info@fiasgo.com</a>' })"></p>
      <p v-html="$t('article.contact.p3', {mail: '<a href=\'mailto:affiliate@fiasgo.com\'>affiliate@fiasgo.com</a>' })"></p>
  </div>
</template>

<script>
import translate from './../../mixins/translate.js'

export default {
  mixins: [translate],
  head () {
    return {
      title: 'Fiasgo | ' + this.$t('article.contact.h1'),
      meta: [
        {hid: 'ogtitle', name: 'og:title', content: 'Fiasgo | ' + this.$t('article.contact.h1')},
        {hid: 'ogimg', name: 'og:image', content: 'https://www.fiasgo.com/social/fb.jpg'},
        {hid: 'ogdesc', name: 'og:description', content: this.$t('article.contact.p1')},
        {hid: 'description', name: 'description', content: this.$t('article.contact.p1')}
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
