import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import { NavbarPlugin } from 'bootstrap-vue'
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const gauthOption = {
  clientId: '578275232692-tcmpiilorr4q5ur1amvhpriqnghm897g.apps.googleusercontent.com'
}

Vue.use(GAuth, gauthOption)
Vue.use(GSignInButton)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)
Vue.use(NavbarPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
