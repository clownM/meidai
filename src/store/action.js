import {
	queryUser,
} from '../config/getData'
import {
	GET_USERINFO,
} from './mutations.js'

export default {
	async getUserInfo({
		commit,
		state
	}) {
		let res = await queryUser();
		commit(GET_USERINFO, res)
	},
	// async saveAddress({
	// 	commit,
	// 	state
	// }) {

	// 	if(state.removeAddress.length > 0) return;

	// 	let addres = await getAddressList(state.userInfo.user_id);
	// 	commit(SAVE_ADDRESS, addres);	
	// },
}