import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg";
import VueSweetalert2 from 'vue-sweetalert2';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-wysiwyg/dist/vueWysiwyg.css"
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(wysiwyg, {})
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
