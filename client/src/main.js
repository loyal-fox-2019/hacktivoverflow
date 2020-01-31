import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles.css'
import Toasted from 'vue-toasted';
import wysiwyg from "vue-wysiwyg"
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleUp, faAngleDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(wysiwyg, {})
Vue.use(Toasted)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
