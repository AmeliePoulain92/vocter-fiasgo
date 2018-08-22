<template>
  <div class="image-fader">
    <div v-if="index1" class="image-fader__image"
      :class="{'image-fader__image--active': image1Active}"
      :style="{backgroundImage: image1, zIndex: image1Count}"></div>
    <div v-if="index2" class="image-fader__image"
      :class="{'image-fader__image--active': image2Active}"
      :style="{backgroundImage: image2, zIndex: image2Count}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      month: 0,
      order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      count: 0,
      index1: null,
      index2: null,
      initial: true,
      image1Count: 1,
      image2Count: 2,
      image1Active: false,
      image2Active: false,
      screenWidth: 0
    }
  },
  computed: {
    image1 () {
      return this.month && this.index1 ? 'url(https://static.fiasgo.com/' + this.folder + '/' + this.month + '/' + this.index1 + '.jpeg)' : ''
    },
    image2 () {
      return this.month && this.index2 ? 'url(https://static.fiasgo.com/' + this.folder + '/' + this.month + '/' + this.index2 + '.jpeg)' : ''
    },
    folder () {
      return this.screenWidth > 768 ? 'bg' : 'bg-mobile'
    }
  },
  mounted () {
    this.screenWidth = window.innerWidth
    this.order = this.shuffle(this.order)
    let d = new Date()
    this.month = d.getMonth() + 1
    setInterval(() => {
      this.fade()
    }, 10000)
    this.index1 = this.order[0]
    this.fade()
  },
  methods: {
    shuffle (array) {
      let counter = array.length
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter)
        // Decrease counter by 1
        counter--
        // And swap the last element with it
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
      }
      return array
    },
    fade () {
      let i = this.count % 2 === 0 ? 1 : 2
      this['image' + i + 'Count'] += 2
      this.count++
      setTimeout(() => {
        this['image' + i + 'Active'] = true
        this.initial = false
      }, 0)
      setTimeout(() => {
        let j = i === 1 ? 2 : 1
        this['image' + j + 'Active'] = false
        this['index' + j] = this.order[this.count % 15]
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.image-fader {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.image-fader__image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: opacity 2s ease-out;
  opacity: 0;
  transform: scale(1.2);
}

.image-fader__image--initial {
  opacity: 1;
}

.image-fader__image--active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 2s ease-out, transform 12s ease-out;
}

.image-fader__image--hidden {
  display: none;
}
</style>
