<template>
	<div class="signup">
    <form action="#" @submit.prevent class="mc-embed-signup-scroll">
        <input type="email" class="email" v-model="email" :placeholder="$t('subscription.input')" >
        <button @click="showEmailModal" name="subscribe" v-on:click="postMail" class="button-subscribe">{{ $t('subscription.submit')}}</button>
    </form>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import axios from 'axios'
import modal from '~/components/modal'
import modalShow from '~/mixins/modal-show'
import {mapGetters} from 'vuex'

export default {
  mixins: [modalShow],
  components: {
    NoSSR,
    modal
  },
  data () {
    return {
      email: null,
      emailStatusRequest: [],
      imageModal: null,
      closeEmailModalTimer: 5000,
      responseText: null
    }
  },
  computed: {
    ...mapGetters([
      'getRootApiUrl'
    ])
  },
  methods: {
    contextModalEmail () {
      this.$emit('login', {
        imageModal: this.imageModal,
        responseText: this.responseText
      })
    },
    showEmailModal () {
      this.$emit('onEmailModalShow')
    },
    postMail () {
      axios.get(`${this.getRootApiUrl}newsletter/signup?email=` + this.email, {
      })
      .then((rest) => {
        this.emailStatusRequest = rest.request.status
        this.imageModal = 'https://static.fiasgo.com/img/success.svg'
        this.responseText = this.$t('subscription.success')
        this.contextModalEmail()
        this.email = null
      })
      .catch(() => {
        this.imageModal = 'https://static.fiasgo.com/img/close-modal-email.svg'
        this.responseText = this.$t('subscription.close')
        this.contextModalEmail()
      })
      .finally(() => setTimeout(() => this.$emit('closeModal'), this.closeEmailModalTimer))
    }
  }
}

</script>

<style lang="scss">
.signup {
    .mc-embed-signup-scroll {
    	display: flex;
    	flex-wrap: nowrap;
      flex-wrap: wrap;
    	align-items: flex-end;
    	justify-content: center;
      margin-top: 50px;
    	div{
    		display: inline-block;
    		font-family: 'DubaiFont', sans-serif;
    	}
	    .email {
        width: 250px;
	    	height: 33px;
	    	font-size: 16px;
	    	border: 1px solid #b4b4b4;
	    	outline: none;
	    	border-radius: 3px;
	    	background-color: rgba(255, 255, 255, 0.3);
	    	color: #fff;
	    	text-shadow: 1px 1px 0px black;
	    	letter-spacing: 1px;
	    	margin: 0 10px;
	    	padding: 0 10px;
	    }
      .email{
        z-index: 300;
      }
	    input[type="email"]::-webkit-input-placeholder {
    		color: #e3e1e1;
    		text-shadow:none;
    		font-size: 1em;
    	} 
   		input[type="email"]::-moz-placeholder {
    		color: #e3e1e1;
    		text-shadow:none;
    		font-size: 1em;
   		}
	     .button-subscribe{
	     	padding:5px 10px;
	     	background: #d0011b;
	     	border: none;
	     	outline: none;
	     	border-radius: 4px;
	     	color: #fff;
	     	font-size: 20px;
	     	cursor: pointer;
    		transition: background-color 0.5s, color 1s;
    		letter-spacing: 2px;
    		height: 100%;
    		border: 1px  solid transparent;
	     }
	     .button-subscribe:hover{
			   background-color: #fff;
			   color:  #d0011b;
			   border: 1px  solid #d0011b;
	     }
	     .button-subscribe:active{
	     	text-shadow: 0 0 5px #d0011b;
	     	box-shadow: inset 0 0 7px #d0011b;
	     }
	}
}

@media screen and (max-width: 600px) {
  .signup .mc-embed-signup-scroll {
    display: block;
    .email {
      display: block;
      margin: 0 auto 12px;
    }
  }
}

@media screen and (max-width: 370px) {
    .button-subscribe{
        margin-top: 15px;
    }
}
</style>
