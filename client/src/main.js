import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(wysiwyg, { hideModules: {
  'image': true
  // 'bold': true,
  // 'italic': true,
  // 'underline': true,
  // 'justifyLeft': true,
  // 'justifyCenter': true,
  // 'justifyRight': true,
  // 'headings': true,
  // 'link': true,
  // 'code': true,
  // 'orderedList': true,
  // 'unorderedList': true,
  // 'table': true,
  // 'removeFormat': true,
  // 'separator': true
} })
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
