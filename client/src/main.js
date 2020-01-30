import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from 'vue-wysiwyg'
import axios from 'axios'
import vueMoment from "vue-moment"

Vue.config.productionTip = false

Vue.use(vueMoment)
Vue.use(axios)
Vue.use(wysiwyg, {
  maxHeight: "130px",
  forcePlainTextOnPaste: true,
  image: {
    uploadURL: "http://localhost:3000/articles/image"
  }
});
import "vue-wysiwyg/dist/vueWysiwyg.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
