import app from '../App'

import mall from '@/pages/mall/mall'
import mymeidai from '@/pages/mymeidai/mymeidai'
import orderlist from '@/pages/orderlist/orderlist'
import login from '@/pages/login/login'
import shoppingCart from '@/pages/shoppingCart/shoppingCart'
import userInfo from '@/pages/mymeidai/children/userInfo'
import newPwd from '@/pages/mymeidai/children/newPwd'
import switchUser from '@/pages/mymeidai/children/switchUser'

export default [{
  path:'/',
  component:app, //顶层路由，对应index.html
  children:[    //二级路由，对应App.vue
    //地址为空时跳转到商城页
    {
      path: '',
      redirect: '/mall'
    },
    //商城页
    {
      path: '/mall',
      name:'mall',
      component: mall
    },
    //购物车
    {
      path: '/shoppingCart',
      name:'shoppingCart',
      component:shoppingCart
    },
    //我的美戴
    {
      path: '/mymeidai',
      name:'mymeidai',
      component: mymeidai,
      // children:[{
      //   // 用户信息
      //   path:'userInfo',
      //   name:'userInfo',
      //   component:userInfo
      // }]
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component:userInfo
    },
    // 修改密码
    {
      path:'/newPwd',
      name:'newPwd',
      component:newPwd
    },
    // 切换关联用户
    {
      path:'/switchUser',
      name:'switchUser',
      component:switchUser
    },
    //订单列表
    {
      path: '/orderlist',
      name:'orderlist',
      component: orderlist
    },
    //登录注册
    {
      path: '/login',
      name:'login',
      component: login
    }
  ]
}];
