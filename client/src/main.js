import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import wysiwyg from 'vue-wysiwyg';
import VueSweetalert2 from 'vue-sweetalert2';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(wysiwyg, {});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
