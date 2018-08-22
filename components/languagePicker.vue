<template>
  <div class="language-picker" aria-labelledby="language-picker-label">
    <img src="~/assets/img/lang.svg" class="language-picker__selection" alt="" />
    <no-ssr>
      <v-select
        @input="selectLocale"
        :options="localeObjects"
        :value="currentLocale"
        label="countryName">
        <span slot="no-options" class="no-options">
          {{ $t('settings.matching') }}
        </span>
      </v-select>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    NoSSR
  },
  computed: {
    ...mapGetters([
      'getlangPickerOpen',
      'getlocaleNames',
      'getlocales',
      'getlocale'
    ]),
    showList () {
      return this.getlangPickerOpen
    },
    localeNames () {
      return this.getlocaleNames
    },
    locales () {
      return this.getlocales
    },
    localeObjects () {
      return this.getlocales.map(locale => {
        return {
          languageCode: locale,
          countryName: this.localeNames[locale]
        }
      })
    },
    currentLocale () {
      return this.localeObjects.find(locale => locale.languageCode === this.getlocale)
    }
  },
  methods: {
    ...mapActions([
      'initToggleList'
    ]),
    selectLocale (locale) {
      if (locale) {
        let route = this.$route
        let params = route.params
        params.lang = locale.languageCode
        this.$router.push({name: route.name, params: params})
      }
    },
    toggleList () {
      this.initToggleList()
    }
  }
}
</script>

<style lang="scss">
.v-select .dropdown-toggle .clear { display: none; }

.language-picker {
  position: relative;
  float: right;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  .rtl & {
    float: left;
    border-left: 0;
    padding-left: 0;
    margin-left: 0;
    margin-right: 20px;
    .dropdown-menu{
      float: left;
      left: 0;
    }
  }
  .selected-tag{
    position: absolute;
    font-size: 15px;
  }
  .searchable{
    width: 110px;
  }
  .dropdown-menu {
        position: absolute;
        left: -51px;
        padding: 0;
    li{
    border-top: 1px solid #f2f2f2;
    }
  }
  .v-select .dropdown-toggle{
    border: none;
  }
  .open-indicator{
    opacity: 0;
  }
}

.language-picker__selection {
    position: relative;
    top: 2px;

 .top-menu--hero & {
   text-shadow: 1px 1px 0px rgba(0,0,0,1);
 }
}

.language-picker__list {
  border-top: 1px solid #f2f2f2;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.20);
  position: absolute;
  right: 0;
  top: 35px;
  background: #fff;
  z-index: 6;
  max-height: 400px;
  overflow-y: auto;

  .rtl & {
    left: 0;
    right: auto;
  }

  .language-picker:hover & {
    display: block;
  }
}

.language-picker__item {
  line-height: 40px;
  color: #333;
  white-space: nowrap;
  padding: 1px 50px 0 15px;
  cursor: default;
  position: relative;
  z-index: 6;
  text-align: left;

  & + .language-picker__item {
    border-top: 1px solid #f2f2f2;
  }

  &:hover {
    background: #f2f2f2;
  }
}

.language-picker__item--active {
  font-weight: bold;
}

.language-picker__flag {
  margin-right: 10px;
}

@media (max-width: 700px) {
  .language-picker {
    border: 0;
    padding: 0;
    width: auto;
    margin-left: 12px;

    .rtl & {
      padding: 0;
      border: 0;
    }
  }
  .language-picker__selection {
    width: 0;
    height: 20px;
    display: block;
    float: right;
    font-size: 0;
  }
}
</style>
