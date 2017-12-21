export const SAVE_GEOHASH = 'SAVE_GEOHASH'
export const RECORD_USERINFO = 'RECORD_USERINFO'
export const GET_USERINFO = 'GET_USERINFO'
export const RECORD_LOGININFO = 'RECORD_LOGININFO'
export const LOGOUT = 'LOGOUT'
export const ORDEROBJ = 'ORDEROBJ'
export const DEALOBJ = 'DEALOBJ'
export const GET_ORDEROBJ = 'GET_ORDEROBJ'
export const GET_DEALOBJ = 'GET_DEALOBJ'
export const SAVE_DELIVERY = 'SAVE_DELIVERY'
export const RESET_USERNAME = 'RESET_USERNAME'
export const RESET_BIRTHDAY = 'RESET_BIRTHDAY'
export const RESET_GENDER = 'RESET_GENDER'
export const AUTO_LOGIN = 'AUTO_LOGIN'
export const ADD_CART = 'ADD_CART'
export const REMOVE_CART = 'REMOVE_CART'
export const INIT_CART = 'INIT_CART'

import {setStore,getStore,setCookie,getCookie,delCookie} from '../config/utils.js'

export default{

	//自动登录
	[AUTO_LOGIN](state,info){
		state.autoLogin = info;
	},

    // 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		if(state.autoLogin){
			setCookie('UserUUID', info.uuid ,7)
		}else{
			setCookie('UserUUID',info.uuid)
		}
    },
    //获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.uuid !== getCookie('UserUUID'))) {
			return;
		};
		if (info.result == 'true') {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	// 退出登录
	[LOGOUT](state){
		state.userInfo = null,
		state.login = false;
	},

	//order
	[ORDEROBJ](state,orderobj){
		state.orderObj = {...orderobj}; 
	},
	//deal
	[DEALOBJ](state,dealobj){
		state.dealObj = {...dealobj};
	},
	//获取存入vuex
	[GET_ORDEROBJ](state,info){
		state.orderObj = {...info};
		// if(info.result == 'true') {
		// 	state.orderObj = {...info}
		// }else{
		// 	state.orderObj = null
		// }
	},
	[GET_DEALOBJ](state,info){
		if(state.dealObj){
			return
		}
		if(info.result) {
			state.dealObj = {...info}
		}else{
			state.dealObj = null
		}
	},

	// 物流详情
	[SAVE_DELIVERY](state, {
		company,
		postid
	}){
		state.delivery_company = company;
		state.delivery_postid = postid
	},

	//修改用户名
	[RESET_USERNAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
	//修改生日
	[RESET_BIRTHDAY](state,birthday){
		state.userInfo = Object.assign({}, state.userInfo,{birthday})
	},
	//修改性别
	[RESET_GENDER](state,gender){
		state.userInfo = Object.assign({}, state.userInfo,{gender})
	},
	// 加入购物车
	[ADD_CART](state, {
		index,
		alias,
		data,
		material
	}) {
		let useruuid = getCookie('UserUUID') || 'noLogin';

		let cart = state.cartList;
		let user = cart[useruuid] = (cart[useruuid] || {});
		user[index] = {
			'index':index,
			'alias':alias,
			'data':data,
			'material':material
		}
		state.cartList = cart;
		//存入localStorage
		setStore('shoppingCart', state.cartList);
	},
	// 移出购物车
	[REMOVE_CART](state, {
		itemIndex
	}) {
		let useruuid = getCookie('UserUUID') || 'noLogin';
		let cart = state.cartList;
		let user = (cart[useruuid] || {});
		delete user[itemIndex];
		state.cartList = cart;
		setStore('shoppingCart', state.cartList);
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_CART](state) {
		console.log('init_cart');
		let initCart = getStore('shoppingCart');
		console.log(initCart)
		let useruuid = getCookie('UserUUID');
		let _useruuid = Object.keys(JSON.parse(initCart))[0];
		if(useruuid){
			if(_useruuid == useruuid){
				console.log('登录且已有缓存数据')
				state.cartList = JSON.parse(initCart);
			}else if(_useruuid == 'noLogin'){
				console.log('登录但无缓存数据，从nologin获取');
				let cart = JSON.parse(initCart);
				let _cart = {};
				_cart[useruuid] = {...cart['noLogin']};
				setStore('shoppingCart',_cart);
				state.cartList = _cart; 
			}else{
				let cart = JSON.parse(initCart);
				let _cart = {};
				_cart[useruuid] = null;
				setStore('shoppingCart',_cart);
				state.cartList = _cart; 
			}
		}else{
			if(_useruuid == 'noLogin'){
				console.log('未登录')
				state.cartList = JSON.parse(initCart);
			}else{
				let cart = JSON.parse(initCart);
				let _cart = {};
				_cart['noLogin'] = null;
				setStore('shoppingCart',_cart);
				state.cartList = _cart; 
			}
		}
	},
}