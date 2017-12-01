
import ajax from './ajax';



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
export const queryUser =(uuid) => ajax({
	url:'/user',
	data:{
		action:'query',
		uuid:uuid,
		phone:'',
		username:'',
		gender:'',
		birthday:'',
		address:'',
		orders:''
	},
	dataType:'JSON',
})



// /**
//  * 检测帐号是否存在
//  */
// export const checkExsis = (checkNumber, type) => fetch('/user', {
// 	action: 'login',
// 	type
// });