export const SAVE_GEOHASH = 'SAVE_GEOHASH'
export const RECORD_USERINFO = 'RECORD_USERINFO'
export const GET_USERINFO = 'GET_USERINFO'
export const RECORD_LOGININFO = 'RECORD_LOGININFO'
export const LOGOUT = 'LOGOUT'
export const ORDER_DETAILS_UUID = 'ORDER_DETAILS_UUID'
export const SAVE_DELIVERY = 'SAVE_DELIVERY'

import {setStore,getStore,setCookie,getCookie,delCookie} from '../config/utils.js'

export default{

    // 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setCookie('UserUUID', info.uuid ,1);
    },
    //获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		// state.userInfo = {...info}
		if (state.userInfo && (state.userInfo.uuid !== getCookie('UserUUID'))) {
			return;
		};
		if (info.result) {
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
	// 订单详情页orderuuid,dealuuid
	[ORDER_DETAILS_UUID](state, {
		orderuuid,
		dealuuid
	}){
		state.orderuuid = orderuuid;
		state.dealuuid = dealuuid
	},
	// 物流详情
	[SAVE_DELIVERY](state, {
		company,
		postid
	}){
		state.delivery_company = company;
		state.delivery_postid = postid
	},
}