<template>
  <form class="feedback-container" @submit.prevent="sendFeedback"  v-show="visible">
  <div class="feedback-step-1" v-if="step === 1">
    <div class="rate-container">
      <p>{{ $t('nps.question.little')}}</p>
      <ul>
        <li v-for="(n, index) in 11"><button @click.prevent="setRating(index)">{{index}}</button></li>
      </ul>
      <p>{{ $t('nps.question.alot')}}</p>
    </div>
    <div class="about-feedback-section">
      <p>{{ $t('nps.question.text')}}</p>
    </div>
    </div>
    <div class="feedback-step-2" v-if="step === 2">
      <textarea class="textarea" :class="{ active: isActive, 'text-danger': hasError }" name="feedbackMessage" v-model="feedbackMessage" :placeholder="placeholderForTextArea"></textarea>
      <button type="submit" class="send-btn">{{$t('nps.feedback.button')}}</button>
      <button type="button" class="send-btn" @click.prevent="postFeedbackResult">{{$t('nps.feedback.notext')}}</button>
    </div>
     <div class="feedback-step-3" v-if="step === 3">
        <h2>{{$t('nps.feedback.done')}}</h2>
     </div>
     <button class="feedback-close-btn" @click.prevent="toggleVisible"><img src="~/assets/img/close.svg"></button>
  </form>
</template>

<script>
import translate from '~/mixins/translate.js'
import axios from 'axios'

export default {
  name: 'nps-reviews',
  mixins: [translate],
  props: {
    productIdentifier: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      feedbackMessage: null,
      placeholderForTextArea: this.$t('nps.feedback.text'),
      step: 1,
      rating: null,
      hasError: false,
      isActive: true,
      visible: false
    }
  },
  methods: {
    sendFeedback () {
      if (!this.feedbackMessage) {
        this.placeholderForTextArea = 'Please enter feedback here'
        this.hasError = true
      } else {
        this.postFeedbackResult()
      }
    },
    postFeedbackResult () {
      axios.post(`https://api.fiasgo.com/api/nps/score`, {
        rating: this.rating,
        comment: this.feedbackMessage,
        productIdentifier: this.productIdentifier
      })
      .then((res) => {
        console.log('res', res)
        this.next()
      }).catch((err) => {
        console.log('err', err)
      })
    },
    setRating (value) {
      this.rating = value
      this.next()
    },
    prev () {
      this.step--
    },
    next () {
      this.step++
    },
    toggleVisible () {
      this.visible = !this.visible
    },
    bannerDelay () {
      setTimeout(() => {
        this.toggleVisible()
      }, 3000)
    }
  },
  mounted () {
    this.bannerDelay()
  }
}
</script>

<style lang="scss" scoped>

.feedback-container {
  position:fixed;
   left:0px;
   bottom:0px;
   width:100%;
   background:#eaeaea;
   padding: 20px;
   box-sizing: border-box;
   border-top: 1px solid #ccc;
    .feedback-step-1 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }
    ul{
      li{
      float: left;
      }
    }
    .textarea {
      width: 60%;
      height: 33px;
      padding: 20px;
      display: inline-block;
        vertical-align: middle;
        font-family: 'DubaiFont', sans-serif;
    }
    .active {
      &.text-danger{
        &::-webkit-input-placeholder{
          color:red;
        }
        &::-moz-placeholder { /* Firefox 19+ */
            color: red;
        }
        &:-ms-input-placeholder { /* IE 10+ */
            color: red;
        }
        &:-moz-placeholder { /* Firefox 18- */
            color: red;
        }

      }
      } 
    .send-btn{
      margin-left: 20px;
    }
    h2 {
      text-align: center;
      padding: 23px 0;
      margin: 0;
    }
    .feedback-close-btn {
        top: -25px;
        right: 10px;
        position: absolute;
        cursor: pointer;
        background-color: transparent;
        border: none;
        outline: none;
        width: 50px;
      height: 50px; 
    }
  }
  .rate-container {
    display: flex;
      p {
      line-height: 75px;  
      }
      button {
        background-color: #fff;
        box-shadow: none;
        outline: none;
        border: 2px solid #d1d1d1;
        font-size: 20px;
        color: #d1d1d1;
        width: 75px;
        height: 75px;
        border-radius: 6px;
        margin: 0 4px;
        cursor: pointer;
      }
  
  }
  .about-feedback-section {
    width: 20%;
    float: right;
  }



@media screen and (max-width: 1400px) { 
  .feedback-container{
    .rate-container{
      p{
        line-height: 60px;
      }
      button {
        width: 60px;
          height: 60px;
      }
    }
      p {
        
        
      }
    } 
}
  @media screen and (max-width: 1200px) {

  .feedback-container {
    bottom:40%;
    right: 0;
      left: 0;
      margin: auto;
      width: 90%;
      border: 1px solid #ccc;
      z-index: 10;
        .rate-container {
      display: flex;
      order: 2;
      flex-direction: column;
      flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      p {
        line-height: normal;
        &:first-child {
          order: 1;
        }
        &:last-child {
          order: 3;
        }
      }

      button {
        background-color: #fff;
        box-shadow: none;
        outline: none;
        border: 2px solid #d1d1d1;
        font-size: 20px;
        color: #d1d1d1;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        margin: 0 4px;
        cursor: pointer;
      }
    }

  .about-feedback-section {
    width: 100%;
    order: 1;
    p{
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
      ul{
        overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          li {
            margin-bottom: 10px;
          }
      }
    .feedback-close-btn {
      top: -19px;
        right: -16px;
    }
    .feedback-step-1{
      display: flex;
      flex-direction: column;
    }
    .feedback-step-2 {
      display: flex;
      justify-content: center;
      justify-content: center;
        flex-wrap: wrap;
        .send-btn {
          margin: 20px 0 0 0;
        &:last-child {
          color: #000;
          background-color: #eaeaea;
          border: none;

          } 
        }
    }
    .textarea {
      width: 100%;
      height: auto;
    }

  }


@media only screen and (max-width: 736px) and (orientation: landscape) {
    .feedback-container {
    bottom:25%;
  }
}

@media only screen and (max-width: 568px) and (orientation: landscape) {

    .feedback-container {
      .rate-container {
    button {
      font-size: 16px;
        width: 33px;
        height: 33px;
    }
  }
  }
}

@media screen and (max-width: 414px) {
  
}
@media screen and (max-width: 360px) {
    .feedback-container {
    .rate-container {
      button {
        font-size: 14px;
         width: 34px;
          height: 34px;
          border-radius: 57%;
          margin: 0px 3px;
      } 
    }
    }
  
}
</style>
