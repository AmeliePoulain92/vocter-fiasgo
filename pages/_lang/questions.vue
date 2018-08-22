<template>
  <div class="questions">
    <div class="question">
      <div class="question-heading">
        <h1 class="page__header">{{title}}</h1>
        <h2>{{description}}</h2>
      </div>
    </div>

    <div v-if="loadingResult" class="question-loader text-center">
      <img src="~assets/img/loading.svg" alt="loader" class="question-loader__img" />
    </div>

    <!-- condition logic -->
    <template v-if="questionType === 1">
      <ul class="checkbox-list">
        <li class="checkbox-list__item" v-for="(option, index) in options">
          <input
            type="radio"
            :name="tempIncludedTypeName"
            :id="option"
            :checked="index === 0"
            :value="index"
            v-model="value"
            class="default-radio" />
          <label class="default-label" :for="option">{{option}}</label>
        </li>
      </ul>
    </template>

    <template v-if="questionType === 2">
      <vue-range-slider
        :default-value="valueScaleDoubleDefault"
        :options="options"
        @rangeSliderValue="getSliderRangeValue($event)" />
    </template>

    <template v-if="questionType === 3">
      <vue-range-slider
        :default-value="valueScaleSingleDefault"
        :options="options"
        :showOption="false"
        :interval="0.1"
        :tooltip="'always'"
        @rangeSliderValue="getSliderRangeValue($event)" />
    </template>

    <template v-if="questionType === 4">
      <draggable
        v-model="options"
        class="draggable list-group"
        @end="updateSortableOptions(options)"
        :animation="150"
        :preventOnFilter="false"
        :fallbackOnBody="true"
        :fallbackTolerance="1"
        :forceFallback="true">
        <div class="draggable-item draggable-item--numbered" v-for="option in options" :key="option.index">
            <div class="list-group-item">{{option.text}}</div>
        </div>
      </draggable>
    </template>
    <!-- END:condition logic -->

    <div v-if="!noMoreQuestions" class="action-btn-wrapper">
      <button type="button" class="action-btn action-btn--lg" @click="nextStep">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import translate from '~/mixins/translate.js'
import VueRangeSlider from './../../components/VueRangeSlider'
import draggable from 'vuedraggable'

export default {
  mixins: [translate],
  head () {
    return {
      title: 'Fiasgo | ' + this.$t(this.title),
      bodyAttrs: {
        class: 'background'
      },
      meta: [
        {hid: 'ogtitle', name: 'og:title', content: 'Fiasgo | ' + this.$t('article.affiliates.h1')},
        {hid: 'ogimg', name: 'og:image', content: 'https://www.fiasgo.com/social/fb.jpg'},
        {hid: 'ogdesc', name: 'og:description', content: this.$t('article.affiliates.p1')},
        {hid: 'description', name: 'description', content: this.$t('article.affiliates.p1')},
        {hid: 'ROBOTS', name: 'ROBOTS', content: 'NOINDEX, NOFOLLOW'}
      ]
    }
  },
  data () {
    return {
      questionsApiUrls: {
        origin: 'https://api.fiasgo.com/api/questions/television/dk',
        result: '/result'
      },
      loadingResult: false,
      noMoreQuestions: null,
      answers: [],
      options: [],
      title: null,
      description: null,
      questionId: null,
      questionType: null,
      tempIncludedTypeName: null,
      value: null,
      valueScaleDoubleDefault: 0.5,
      valueScaleSingleDefault: 0
    }
  },
  computed: {
    currentLocale () {
      return this.$store.state.locale
    }
  },
  methods: {
    getSliderRangeValue ($event) {
      this.value = $event
    },
    updateSortableOptions (options) {
      this.value = options.map(option => option.index)
    },
    fillOptions (questionType, options) {
      this.options = []
      switch (questionType) {
        case 4:
          for (let option in options) {
            this.options.push({
              index: parseInt(option),
              text: this.$t(options[option].answerTextlocalizationKey)
            })
          }
          break
        default:
          for (let option in options) {
            this.options.push(this.$t(options[option].answerTextlocalizationKey))
          }
          break
      }
    },
    setInitialParams (questionType, options) {
      this.fillOptions(questionType, options)

      switch (questionType) {
        case 1:
          this.value = 0
          break
        case 2:
          this.value = this.valueScaleDoubleDefault
          break
        case 3:
          this.value = this.valueScaleSingleDefault
          break
        case 4:
          this.value = Object.keys(options).map(option => parseInt(option))
          break
        default:
          this.value = 0
          break
      }
    },
    fetchQuestionsResult () {
      axios.post(`${this.questionsApiUrls.origin}${this.questionsApiUrls.result}`, {
        answers: this.answers
      })
      .then((res) => {
        this.loadingResult = false
        this.$router.push(`/${this.currentLocale}/${res.data.productType}/${res.data.universalIdentifier}`)
        console.log('res', res)
      }).catch((err) => {
        console.log('err', err)
      })
    },
    setNoMoreQuestionsProp (data) {
      if ('noMoreQuestions' in data) {
        this.noMoreQuestions = data.noMoreQuestions

        if (this.noMoreQuestions) {
          this.loadingResult = true
          this.fetchQuestionsResult()
        }
      }
    },
    setQuestionOptions (res) {
      let data = res.data
      this.title = this.$t(data.titleLocalizationKey)
      this.description = this.$t(data.textLocalizationKey)
      this.tempIncludedTypeName = this.$t(data.tempIncludedTypeName)
      this.questionType = parseInt(data.questionType)
      this.questionId = parseInt(data.questionId)
      this.setNoMoreQuestionsProp(data)
      this.setInitialParams(this.questionType, data.options)

      console.log('res', res)
    },
    nextStep () {
      this.answers.push({
        'id': this.questionId,
        'type': this.questionType,
        'value': this.value
      })
      this.fetchQuestion()
    },
    fetchQuestion () {
      axios.post(`${this.questionsApiUrls.origin}`, {
        answers: this.answers
      })
      .then((res) => {
        this.setQuestionOptions(res)
      }).catch((err) => {
        console.log('err', err)
      })
    }
  },
  components: {
    VueRangeSlider,
    draggable
  },
  mounted () {
    console.clear()
    this.fetchQuestion()
  }
}
</script>

<style lang="scss" scoped>

  .questions {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 40px;
    border-radius: 4px;
    margin-top: 100px;

    .checkbox {
      &-list {
        margin-bottom: 50px;
      }
    }
    .page__header {
      margin-top: 0;
    }
  }
  .question-heading {
    text-align: center;
    margin-bottom: 30px;
  }

</style>
