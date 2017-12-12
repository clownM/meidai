
import ajax from './ajax';
import {getCookie} from './utils';

/**
 * 密码登录
 */
export const passwordLogin =(phone,username,password) => ajax({
	url:'/user',
	data:{
		action:'login',
		phone:phone,
		username:username,
		password:password
	},
	dataType:'JSON',
})

/**
 * 注册用户
 */
export const createUser =(phone,username,password) => ajax({
	url:'/user',
	data:{
		action:'create',
		phone:phone,
		username:username,
		password:password
	},
	dataType:'JSON',
})

/**
 * 获取用户信息
 */
export const queryUser =() => ajax({
	url:'/user',
	data:{
		action:'query',
		uuid:getCookie('UserUUID'),
		phone:'',
		username:'',
		gender:'',
		birthday:'',
		address:'',
		orders:''
	},
	dataType:'JSON',
})

/**
 * 修改密码
 */
export const changePassword = (uuid, oldpwd, newpwd) => ajax({
	url:'/user',
	data:{
		action: 'update',
		uuid: uuid,
		oldpassword: oldpwd,
		password:newpwd
	},
	dataType:'JSON'
})

//修改用户名
export const newUsername = (uuid,username) => ajax({
	url:'/user',
	data:{
		action: 'update',
		uuid:uuid,
		username:username
	}
})

// 查询order
export const queryOrder = (orderuuid) => ajax({
	url:'/order',
	data:{
		action: 'query',
		uuid: orderuuid,
		createdate:'',
		head:'',
		config:'',
		genobj:'',
		deals:'',
		station:'',
		appointmentdate:'',
		scandate:'',
		pinfo:'',
		status:'',
		preconfig:'',
		collecteddata:''
	}
})
// 取消order预约
export const cancelOrder = (orderuuid) => ajax({
	url:'/order',
	data:{
		action:'cancel',
		uuid:orderuuid
	}
})
//查询deal
export const queryDeal = (dealuuid) => ajax({
	url:'/deal',
	data:{
		action:'query',
		uuid:dealuuid,
		createdate:'',
		config:'',
		genprint:'',
		owneruuid:'',
		price: "",
		status: "",
		owneruuid: "",
		config_literal: "",
		printdate: "",
		delivery: "",
		deliverydate: "",
		acceptdate: "",
		params: '',
		paymentstatus: '',
		discount: ''
	}
})
//快递查询
export const queryDelivery = (company,postid) => ajax({
	url:'/express',
	data:{
		action:'query',
		company:company,
		postid:postid
	}
})
//configData
export const loadConfigData = (uuid) => ajax({
	url:'/data',
	data:{
		action:'download',
		type: 'config',
		Chunk: '0',
		uuid:uuid
	},
	dataType:'text'
})
//paramsData
export const loadParamsData = (uuid) => ajax({
	url:'/data',
	data:{
		action: 'download',
		type: 'params',
		uuid:uuid
	}
})

//frame_profiles
export const listFrameProfiles = () => ajax({
	url:'/common',
	data:{
		action:'list',
		type:'frame_profiles',
	}
})
export const queryFrameProfiles = (uuid) => ajax({
	url:'/common',
	data:{
		action:'query',
		type:'frame_profiles',
		uuid:uuid,
		content:'',
		description:'',
		dataform:'',
		count:'',
		createdate:''
	}
})