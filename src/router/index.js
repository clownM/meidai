import App from '../App'

const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const mall = r => require.ensure([], () => r(require('@/pages/mall/mall')), 'mall')
const shoppingCart = r => require.ensure([], () => r(require('@/pages/shoppingCart/shoppingCart')), 'shoppingCart')
const orderlist = r => require.ensure([], () => r(require('@/pages/orderlist/orderlist')), 'orderlist')
const mymeidai = r => require.ensure([], () => r(require('@/pages/mymeidai/mymeidai')), 'mymeidai       ')
const userInfo = r => require.ensure([], () => r(require('@/pages/userInfo/userInfo')), 'userInfo')
const newPwd = r => require.ensure([], () => r(require('@/pages/newPwd/newPwd')), 'newPwd')
const switchUser = r => require.ensure([], () => r(require('@/pages/switchUser/switchUser')), 'switchUser')

export default [{
    path:'/',
    component:App, //顶层路由，对应index.html
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
        },
        {
            // 用户信息
            path:'/userInfo',
            name:'userInfo',
            component:userInfo
        },
        {    
            // 修改密码
            path:'/newPwd',
            name:'newPwd',
            component:newPwd
        },
        {
          // 切换关联用户
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
