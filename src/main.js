import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/';
import store from './store/';
import FastClick from 'fastclick'
import {routerMode} from './config/env'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.use(VueRouter);


const router = new VueRouter({
  routes,
  mode:routerMode
});

// 全局路由守卫
router.beforeEach((to,from,next) => {
  const nextRoute = ['userInfo','newPwd','switchUser','orederlist'];
  let isLogin = store.state.login;
  if(nextRoute.indexOf(to.name) >= 0){
    if(!isLogin){
      router.push({name:'login'});
    }
  }
  if(to.name === 'login'){
    if(isLogin){
      router.push({name:'mymeidai'});
    }
  }
  next();
});


new Vue({
  router,
  store,
}).$mount('#app');
