import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/';
import store from './store/';
import FastClick from 'fastclick'
import {routerMode} from './config/env'
import {getCookie} from './config/utils'
import VueAMap from 'vue-amap'
// import {DatePicker,Dialog,Form,Button,Radio,Icon} from 'element-ui'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }

Vue.use(VueRouter);
Vue.use(VueAMap);
//element
// Vue.use(DatePicker);
// Vue.use(Dialog);
// Vue.use(Form);
// Vue.use(Button);
// Vue.use(Radio);
// Vue.use(Icon);
Vue.use(Element, { size: 'small' });
Vue.use(Vant);

const router = new VueRouter({
  routes,
  mode:routerMode
});

//初始化vue-amap
VueAMap.initAMapApiLoader({  
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

window.document.addEventListener('message', function (e) {
    //JSON字符串转为对象
    const message = JSON.parse(e.data);
    //op=0表示从试戴界面接收到的消息
    let alias = message.glassName;
    this.$router.push({
        path:'/glassDetails',
        query:{
            alias:alias
        }
    })
})
