import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import router from "./router";
import store from "./store";
import App from './App.vue';

import ApiService from "./common/api.service";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/style.css";

Vue.config.productionTip = false;
Vue.use(vueDebounce);

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
