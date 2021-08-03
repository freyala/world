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

// use packages
Vue.use(panZoom, {componentName: 'world'});
Vue.use(VShowSlide)
Vue.use(VModal, { componentName: 'window' })

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

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