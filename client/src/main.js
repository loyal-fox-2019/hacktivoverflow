import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import VueCookies from 'vue-cookies'
import axios from 'axios';
import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

const server = 'http://35.226.139.9';
// const server = 'http://localhost:3000';

const base = axios.create({
    baseURL: server
});

Vue.prototype.$axios = base;
Vue.use(VueCookies);
Vue.use(SuiVue);
Vue.config.productionTip = false;

// 7 day after, cookies expire time
Vue.$cookies.config('7d');

const toastrConfigs = {
    position: 'top right',
    showDuration: 1
};
Vue.use(CxltToastr, toastrConfigs);

Vue.use(VuejsDialog, {
    animation: 'fade',
    okText: 'OK',
    cancelText: 'Cancel',
    loader: true,
    html: true
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
