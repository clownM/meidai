// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import vueRooter from 'vue-router';
import routes from './router';
import store from './store/';
import {routerMode} from './config/env'


Vue.config.productionTip = false;
const router = new vueRooter({
  routes,
  mode:routerMode,
  strict: process.env.NODE_ENV !== 'production',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
