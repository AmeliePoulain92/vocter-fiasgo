<template>

</template>

<script>
import emailSubscription from '~/components/emailSubscription'

export default {
  components: {
    emailSubscription
  },
  layout: 'frontpage',
  head () {
    return {
      title: 'Fiasgo | ' + this.$t('home.title'),
      meta: [
        {hid: 'ogtitle', name: 'og:title', content: 'Fiasgo | ' + this.$t('home.title')},
        {hid: 'ogimg', name: 'og:image', content: 'https://www.fiasgo.com/social/fb.jpg'},
        {hid: 'ogdesc', name: 'og:description', content: this.$t('home.subtitle') + ' ' + this.$t('home.subtitle2')},
        {hid: 'description', name: 'description', content: this.$t('home.subtitle') + ' ' + this.$t('home.subtitle2')},
        {hid: 'application-name', name: 'application-name', content: 'Fiasgo'},
        {hid: 'author', name: 'author', content: 'Fiasgo.com'},
        {hid: 'copyright', name: 'copyright', content: 'Fiasgo'}
      ]
    }
  }
}
</script>
