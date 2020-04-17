import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import router from "./router";
import App from './App.vue';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;
Vue.use(vueDebounce);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
