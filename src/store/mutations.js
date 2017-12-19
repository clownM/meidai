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
	}
}