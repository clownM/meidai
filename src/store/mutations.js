
export const RECORD_USERINFO = 'RECORD_USERINFO'
export const GET_USERINFO = 'GET_USERINFO'
export const RECORD_LOGININFO = 'RECORD_LOGININFO'
import {setStore,getStore,setCookie,getCookie} from './config/utils.js'

export default{
    // 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('UserUUID', info.uuid);
    },
    //获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
}