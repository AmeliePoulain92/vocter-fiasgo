<template>
  <transition name="modal">
    <div class="modal" v-if="show">
      <div class="modal-wrapper" v-click-outside="close">
        <button type="button" @click="close" class="close-button"><img class="close" src="~/assets/img/close-modal.svg" alt="x"/></button>
        <div class="modal-header" v-if="title">
          <h3 class="modal-title">{{title}}</h3>
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'modal',
  directives: {
    ClickOutside
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    detectEscClick () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close()
        }
      })
    }
  },
  mounted () {
    this.detectEscClick()
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(#000, 0.6);
    transition: opacity .3s ease;
    &-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all .3s ease;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
    }
    &-enter {
      opacity: 0;
      .modal-wrapper {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
    &-leave {
      &-active {
        opacity: 0;
        .modal-wrapper {
          transform: translate(-50%, -50%) scale(1.1);
        }
      }
    }
  .close-button{
    outline: 0;
    border: none;
    background: none;
    float: right;
  }
    .close{
      width: 20px;
      height: 20px;
      transition: transform .3s ease;
      cursor: pointer;
      &:hover{
        transform: scale(1.2);
      }
      &:active{
        box-shadow: 0 0 10px red;
        border-radius: 50%;
      }
    }
  }
</style>
