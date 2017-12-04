
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
export const changepassword = (uuid, oldpwd, newpwd) => ajax({
	url:'/user',
	data:{
		action: 'update',
		uuid: uuid,
		oldpassword: oldpwd,
		password:newpwd
	},
	dataType:'JSON'
})