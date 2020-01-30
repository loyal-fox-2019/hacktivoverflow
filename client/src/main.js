import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VAnimateCss from 'v-animate-css';
import wysiwyg from "vue-wysiwyg";
import fontAwsome from './assets/css/all.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VAnimateCss)
Vue.use(wysiwyg, {}); 
Vue.use(fontAwsome);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
