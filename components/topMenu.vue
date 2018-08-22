<template>
  <nav class="top-menu">
    <language-picker></language-picker>
    <a class="top-menu__toggle" @click.stop="toggleList"></a>
    <ul class="top-menu__list" :class="{'top-menu__list--open': showList}" aria-labelledby="top-menu-label">
      <li class="top-menu__item"><a href="#" @click="showCountriesModal">{{ $t('menu.settings')}}</a></li>
      <li class="top-menu__item"><nuxt-link :to="path('/buyers')">{{ $t('menu.buyers') }}</nuxt-link></li>
      <li class="top-menu__item"><nuxt-link :to="path('/affiliates')">{{ $t('menu.affiliates') }}</nuxt-link></li>
      <li class="top-menu__item"><nuxt-link :to="path('/networks')">{{ $t('menu.networks') }}</nuxt-link></li>
      <li class="top-menu__item"><nuxt-link :to="path('/contact')">{{ $t('menu.contact') }}</nuxt-link></li>
    </ul>
  </nav>
</template>

<script>
import languagePicker from './languagePicker'
import translate from './../mixins/translate.js'
import {mapActions} from 'vuex'

export default {
  mixins: [translate],
  components: {
    languagePicker
  },
  computed: {
    showList () {
      return this.$store.state.menuOpen
    }
  },
  methods: {
    ...mapActions([
      'initToggleMenu'
    ]),
    showCountriesModal () {
      this.$emit('onCountriesModalShow')
    },
    toggleList () {
      this.initToggleMenu()
    }
  }
}
</script>

<style lang="scss">
.top-menu {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;

  .rtl & {
    right: auto;
    left: 20px;
  }
}

.top-menu__list {
  float: left;
  padding-top: 10px;
}

.top-menu__item {
  float: left;
  margin-left: 20px;
  font-size: 18px;

  .nuxt-link-active {
    text-decoration: underline;
  }

  .rtl & {
    float: right;
    margin-right: 20px;
    margin-left: 0;
  }

  .top-menu--hero & {
    text-shadow: 1px 1px 0px rgba(0,0,0,1);
  }

}

.top-menu__item--divide {
  border-left: 1px solid #ddd;
  padding-left: 20px;

  .rtl & {
    border-left: 0;
    padding-left: 0;
    padding-right: 20px;
    border-right: 1px solid #ddd;
  }
}

.top-menu--hero {
  color: #fff;
  .selectes-tag {
    text-shadow: 1px 1px 0 #000;
  }
}

.top-menu--page {
  color: #000;
  top: 0;
}

@media (max-width: 700px) {
  .top-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__toggle {
      order: -1;
    }
  }

  .language-picker {
    margin-left: 12px;
  }

  .top-menu--page {
    right: 0px;

    .rtl & {
      right: auto;
      left: 0px;
    }
  }

  .top-menu__toggle {
    background: url('~assets/img/burger.svg') no-repeat center center;
    display: block;
    float: left;
    width: 26px;
    height: 20px;

    .top-menu--hero & {
      background-image: url('~assets/img/burger_white.svg');
    }

    .rtl & {
      float: right;
    }
  }
  .top-menu__item {
    float: none;
    margin: 0;
    line-height: 40px;
    padding: 1px 50px 0 15px;

    .top-menu--hero & {
      text-shadow: none;
    }

    & + .top-menu__item {
      border-top: 1px solid #f2f2f2;
    }
  }
  .top-menu__list {
    display: none;
    right: 40px;
    top: 35px;
    position: absolute;
    background: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.20);
    border-top: 1px solid #f2f2f2;

    .rtl & {
      right: auto;
      left: 40px;
    }
  }
  .top-menu__list--open {
    display: block;
  }
  .top-menu--hero {
    color: inherit;
  }
}
</style>
