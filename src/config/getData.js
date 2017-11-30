
import ajax from './ajax';



/**
 * 密码登录
 */
export const passwordLogin =(phone,password) => ajax({
	url:'/user',
	data:{
		action:'login',
		phone:phone,
		password:password
	},
	dataType:'JSON',
})
/**
 * 多用户密码登录
 */
export const multiUserLogin =(phone,username,password) => ajax({
	url:'/user',
	data:{
		action:'login',
		phone:phone,
		username:username,
		password:password
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