import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import wysiwyg from 'vue-wysiwyg'
import VueSweetalert2 from 'vue-sweetalert2'
import GAuth from 'vue-google-oauth2'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const gauthOption = {
  clientId: '135275767764-8v6d03qgam3pg4j77msdftti1nk0nd9l.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(VueSweetalert2)
Vue.use(wysiwyg, { hideModules: { 'image': true } })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
