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
import axios from "axios"

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
    axios({
      method: 'get',
      url: 'https://hacktivoverflow-server.prograami.com/users/',
      headers: {
        Authorization: `token ` + localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        console.log(data);
        store.commit('SET_USER_ID', data.userID)
        store.commit('SET_NAME', data.name)
        store.commit('SET_EMAIL', data.email)
      })
      .catch(error => {
        console.log(error)
      })
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
