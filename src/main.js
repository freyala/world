import Vue from 'vue'
import axios from 'axios'

import './assets/scss/app.scss'

import App from './App'
import router from './router'
import store from './store'

// import custom packages
import panZoom from 'vue-panzoom'
import VShowSlide from 'v-show-slide'
import VModal from 'vue-js-modal'
import VueLazyload from 'vue-lazyload'

// use packages
Vue.use(panZoom, {componentName: 'world'});
Vue.use(VShowSlide)
Vue.use(VModal, { componentName: 'window' })

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const loadImage = require('../public/images/LOADING.png')
const errorImage = require('../public/images/LOADING.png')

Vue.use(VueLazyload, {
  preLoad: 1,
  error: errorImage,
  loading: loadImage,
  attempt: 3
})

new Vue({
  head: {
    title: {
      inner: 'Freyala'
    }
  },
  render: h => h(App),
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})