import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './config/config.axios'
import '@/assets/css/tailwind.css'
import GSignInButton from 'vue-google-signin-button'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.snow.css";

Vue.use(VueSweetalert2);
Vue.use(GSignInButton)
Vue.use(VueQuillEditor);
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
