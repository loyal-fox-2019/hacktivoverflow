import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import GSignInButton from 'vue-google-signin-button'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(GSignInButton)

Vue.use(VueCookies)
Vue.$cookies.config('7d')

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, {
    theme: 'snow'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
