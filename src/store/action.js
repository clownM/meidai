import {
	queryUser, queryOrder,queryDeal
} from '../config/getData'
import {
	GET_USERINFO,GET_ORDEROBJ,GET_DEALOBJ
} from './mutations.js'

import {getSessionStore} from '../config/utils'

export default {
	async getUserInfo({
		commit,
		state
	}) {
		let res = await queryUser();
		commit(GET_USERINFO, res)
	},
	async getOrderObj({
		commit,
		state
	}) {
		let orderuuid = getSessionStore('orderuuid');
		let res = await queryOrder(orderuuid);
		commit(GET_ORDEROBJ,res)
	},
	async getDealObj({
		commit,
		state
	}) {
		let dealuuid = getSessionStore('dealuuid');
		let res = await queryDeal(dealuuid);
		commit(GET_DEALOBJ,res)
	}
}