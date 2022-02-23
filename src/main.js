import Vue from 'vue'
import axios from 'axios'

import './assets/scss/app.scss'
import "vue-toastification/dist/index.css";
import './assets/toast.css';
import { addInterceptorsTo } from './plugins/http-interceptors';

import App from './App'
import router from './router'
import store from './store'
import './plugins/globalErrorHandler'

// import custom packages
import panZoom from 'vue-panzoom'
import VShowSlide from 'v-show-slide'
import VModal from 'vue-js-modal'
import VueLazyload from 'vue-lazyload'
import Toast from "vue-toastification"
import AudioManager from './plugins/audioManager';
import TimeStamper from './plugins/timeStamper';

// use packages
Vue.use(panZoom, { componentName: 'world' });
Vue.use(VShowSlide)
Vue.use(VModal, { componentName: 'window' })
Vue.use(Toast, { timeout: 3000 });
Vue.use(AudioManager);
Vue.use(TimeStamper);

Vue.http = Vue.prototype.$http = addInterceptorsTo(axios)
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
            inner: 'Xangaea'
        }
    },
    render: h => h(App),
    store,
    router,
    el: '#app',
    components: { App },
    template: '<App/>'
})