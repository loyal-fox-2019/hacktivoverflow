import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Bootstrap from 'bootstrap'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
// Vue.use(Bootstrap)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
