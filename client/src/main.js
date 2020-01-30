import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import wysiwyg from "vue-wysiwyg"

Vue.use(wysiwyg, { hideModules: { "image": true } }) // config is optional. more below

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access_token')) {
    store.commit('SET_LOGIN_FALSE')
  }
  else {
    store.commit('SET_LOGIN_TRUE')
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
