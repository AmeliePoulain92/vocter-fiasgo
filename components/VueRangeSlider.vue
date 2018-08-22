<template>
  <div class="vue-slider-wrapper">
    <div class="vue-slider-heading" :class="{'vue-slider-heading--multiple': options.length > 1}">
      <template v-for="option in options" v-if="showOption">
        <span class="vue-slider-option">{{option}}</span>
      </template>
    </div>
    <no-ssr>
      <vue-slider
        ref="slider"
        :max="max"
        :lazy="lazy"
        :height="height"
        :tooltip="tooltip"
        :interval="interval"
        :dot-size="dotSize"
        @callback="getValue()"
        v-model="value">
      </vue-slider>
     </no-ssr>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component/src/vue2-slider.vue'
import NoSSR from 'vue-no-ssr'
let components = { 'no-ssr': NoSSR }
if (process.browser) {
  let VueSlider = require('vue-slider-component')
  components['vue-slider'] = VueSlider
}

export default {
  name: 'vue-range-slider',
  props: {
    options: {
      type: Array,
      reguired: true
    },
    showOption: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 0.001
    },
    height: {
      type: Number,
      default: 26
    },
    max: {
      type: Number,
      default: 1
    },
    tooltip: {
      default: true
    },
    lazy: {
      type: Boolean,
      default: true
    },
    dotSize: {
      type: Number,
      default: 42
    }
  },
  data () {
    return {
      value: this.defaultValue
    }
  },
  methods: {
    getValue () {
      let slider = this.$refs['slider']
      this.$emit('rangeSliderValue', slider.getValue())
    }
  },
  components: {
    NoSSR,
    vueSlider
  }
}
</script>

<style lang="scss">
.vue {
  &-slider {
    &-component {
        margin-bottom: 50px;
    }
    &-heading {
      display: flex;
      justify-content: center;
      &--multiple {
        justify-content: space-between;
      }
    }
    &-title {
      font-size: 16px;
    }
  }
}
</style>
