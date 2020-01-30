import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  BootstrapVue,
  IconsPlugin,
  BootstrapVueIcons,
  BIcon,
  BIconArrowUp,
  BIconArrowDown
} from 'bootstrap-vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'

Vue.component('menu-icon', MenuIcon)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.component('BIcon', BIcon)
Vue.component('BIconArrowUp', BIconArrowUp)
Vue.component('BIconArrowDown', BIconArrowDown)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material-design-icons/styles.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
