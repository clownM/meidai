import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/';
import store from './store/';
import FastClick from 'fastclick'
import {routerMode} from './config/env'
import {getCookie} from './config/utils'
import AMap from 'vue-amap'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.use(VueRouter);
Vue.use(AMap);

const router = new VueRouter({
  routes,
  mode:routerMode
});

//初始化vue-amap
AMap.initAMapApiLoader({  
  // 申请的高德key  
  key: '6282c8655ddc6d8cf5eeb8b43e1fc347',  
  // 插件集合  
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation','AMap.OverView','AMap.Scale','AMap.ToorBar','AMap.MapType']  
});  

// 导航守卫
// router.beforeEach((to,from,next) => {
//   const nextRoute = ['/userInfo','/newPwd','/switchUser','/orderlist'];
//   let UserUUID = getCookie('UserUUID');
//   if(nextRoute.indexOf(to.path) >= 0){
//     if(!UserUUID){
//       router.push({path:'/login'});
//     }
//   }
//   if(to.name === 'login'){
//     if(UserUUID){
//       router.push({path:'/mymeidai'});
//     }
//   }
//   next();
// });


new Vue({
  router,
  store,
}).$mount('#app');
