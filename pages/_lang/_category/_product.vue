<template>
  <div class="product">
    <div class="product-heading text-center">
      <h1 class="page__header">{{title}}</h1>
      <img v-if="image" :src="image" :alt="title" class="product-thumbnail" />
    </div>

    <div v-if="sellerRelations.length" class="product-sellers">
      <div class="product-sellers-heading">
        <div class="product-sellers-row">
          <div class="product-sellers-cell">{{$t('productpage.sellers')}}</div>
          <div class="product-sellers-cell hidden-sm">{{$t('productpage.instock')}}</div>
          <div class="product-sellers-cell">{{$t('productpage.price')}}</div>
          <div class="product-sellers-cell">{{$t('productpage.buy')}}</div>
        </div>
      </div>
      <div class="product-sellers-list">
        <div v-for="sellerRelation in sellerRelations" class="product-sellers__item product-sellers-row">
          <div class="product-sellers-cell">
            <!-- <img :src="sellerRelation.seller.logo" :alt="sellerRelation.seller.name" /> -->
            <h4 class="product-sellers__title">{{sellerRelation.seller.name}}</h4>
            <img src="https://trello-attachments.s3.amazonaws.com/592684bd4b4fcec6f5ec10fc/5a5b8af414bab10e6d5ee9f7/b6a627797d712a51054c31107ee5c039/image.png" :alt="sellerRelation.seller.name" class="product-sellers__logo" />
            <div class="product-sellers__trust-score">{{sellerRelation.seller.trustPilotScore}}</div>
          </div>
          <span class="product-sellers__in-stock product-sellers-cell">{{sellerRelation.relation.inStock}}</span>
          <span class="product-sellers__price product-sellers-cell">{{sellerRelation.relation.price}}</span>
          <div class="product-sellers-cell">
            <a :href="sellerRelation.relation.url" class="product-sellers__link" target="_blank">Go to seller</a>
          </div>
        </div>
      </div>
    </div>

    <ul v-if="specifics.length" class="product-specifics list-group list-group--stripped">
      <li v-if="specific.value" v-for="specific in specifics" class="product-specifics__item list-group-item list-group-item--space-between">
        <strong>{{specific.name}}: </strong>
        <span class="badge">{{specific.value}}</span>
      </li>
    </ul>
    <nps-reviews :productIdentifier="productIdentifier" />
  </div>
</template>

<script>
import axios from 'axios'
import translate from '~/mixins/translate.js'
import npsReviews from '~/components/npsReviews.vue'

export default {
  mixins: [translate],
  asyncData ({ params }) {
    return axios.get(`https://api.fiasgo.com/api/products/dk/television/${params.product}`)
      .then((res) => {
        console.log('res', res)
        let productData = res.data.product
        return {
          title: productData.model,
          productIdentifier: params.product,
          image: productData.image,
          productTypeName: productData.productTypeName,
          sellerRelations: res.data.sellerRelations,
          specifics: [
            {name: 'TV Sizes', value: productData.screenSizeInches},
            {name: 'Screen Type', value: productData.screenType},
            {name: 'Resolution', value: productData.screenPixelHeight + ' x ' + productData.screenPixelWidth},
            {name: 'HDMI ports', value: productData.hdmiPorts},
            {name: 'USB ports', value: productData.usbPorts},
            {name: 'AudioPower(Watt)', value: productData.audioPowerWatt},
            {name: 'SmartTV', value: productData.isSmartTv},
            {name: 'Energy Class', value: productData.energyClass}
          ]
        }
      })
  },
  head () {
    return {
      title: 'Fiasgo | ' + this.$t('article.affiliates.h1'),
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
      questionsApiUrl: `https://api.fiasgo.com/api/products/dk/television/${this.id}`,
      title: null,
      image: null,
      productTypeName: null,
      specifics: [],
      sellerRelations: []
    }
  },
  components: {
    npsReviews
  },
  methods: {
    checkProductTypeName (data, productTypeName) {
      let productData = data.product
      switch (productTypeName) {
        case 'television':
          this.specifics = [
            {name: 'TV Sizes', value: productData.screenSizeInches},
            {name: 'Screen Type', value: productData.screenType},
            {name: 'Resolution', value: productData.screenPixelHeight + ' x ' + productData.screenPixelWidth},
            {name: 'HDMI ports', value: productData.hdmiPorts},
            {name: 'USB ports', value: productData.usbPorts},
            {name: 'AudioPower(Watt)', value: productData.audioPowerWatt},
            {name: 'SmartTV', value: productData.isSmartTv},
            {name: 'Energy Class', value: productData.energyClass}
          ]
          break
      }
    },
    setProductOptions (data) {
      this.title = data.product.model
      this.image = data.product.image
      this.productTypeName = data.product.productTypeName
      this.sellerRelations = data.sellerRelations
      this.checkProductTypeName(data, this.productTypeName)
    }
  }
}
</script>

<style lang="scss">
  .product {
    &-heading {
      margin-bottom: 45px;
    }
    &-thumbnail {
      vertical-align: middle;
    }
    &-sellers {
      display: table;
      width: 100%;
      margin-bottom: 35px;
       border-collapse: collapse;
      &-row {
        display: table-row;
      }
      &-cell {
        display: table-cell;
        vertical-align: middle;
         background-color: #fff;
        padding: 20px;
        &:last-child{
          text-align: center;
        }
      }
      &__logo {
        display: block;
        object-fit: contain;
        width: 100px;
        height: 50px;
        margin-bottom: 15px;
      }
      &-heading {
        display: table-header-group;
            border-bottom: 1px solid #999;
        .product{
          &-sellers {
            &-cell {
              font-weight: bold;
              color: #435258;
            }
            &__link {
              background-color: #F8B92C;
            }
          }
        }
      }
      &__title {
        margin-bottom: 15px;
        font-weight: bold;
        color: #40B2D5;
      }
      &__link {
        display: inline-block;
        padding: 10px 12px;
        font-size: 18px;
        font-weight: bold;
        background-color: orange;
        border-radius: 15px / 18px;
        border: 2px solid orange;
        transition: all 0.15s ease-in;
        &:hover {
          background-color: #fff;
        }
      }
      .product-sellers__link {
        color: #fff;
        &:hover {
          color: orange;
        }
      }
      &-list {
        display: table-header-group;
        list-style: none;
        margin-bottom: 0
      }
    }
  }

 @media (max-width: 414px){
.product-sellers__in-stock{
  display: none;
 }
 .hidden-sm{
  display: none;
 }
 .product-sellers__link{
  font-size: 13px;
 }
 .page__header{
font-size: 30px;
 }
}
</style>
