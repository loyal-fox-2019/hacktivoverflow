import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'

Vue.config.productionTip = false

import VueSweetalert2 from 'vue-sweetalert2';
 
 
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
