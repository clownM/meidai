import Vue from 'vue'
import Router from 'vue-router'
import app from '@/pages/mall/mall'
import mymeidai from '@/pages/mymeidai/mymeidai'
import orderlist from '@/pages/orderlist/orderlist'
import login from '@/pages/login/login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: app
    },
    {
      path: '/mymeidai',
      component: mymeidai
    },
    {
      path: '/orderlist',
      component: orderlist
    },
    {
      path: '/login',
      component: login
    }
  ],
});
