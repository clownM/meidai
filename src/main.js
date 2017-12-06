import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/';
import store from './store/';
import FastClick from 'fastclick'
import {routerMode} from './config/env'
import {getCookie} from './config/utils'

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

// 导航守卫
router.beforeEach((to,from,next) => {
  const nextRoute = ['/mymeidai/userInfo','/newPwd','/switchUser','/orderlist'];
  let UserUUID = getCookie('UserUUID');
  if(nextRoute.indexOf(to.path) >= 0){
    if(!UserUUID){
      router.push({path:'/login'});
    }
  }
  if(to.name === 'login'){
    if(UserUUID){
      router.push({path:'/mymeidai'});
    }
  }
  next();
});


new Vue({
  router,
  store,
}).$mount('#app');
