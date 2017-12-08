import { resolve } from "url";

// import {
// 	baseUrl
// } from './env'
function getData(data){
	var arr = [];
	if(data == null){
		return data;
	}
	for (const i in data) {
		if (data.hasOwnProperty(i)) {
			const str = i+'='+data[i];
			arr.push(str);
		}
	}
	return arr.join('&');
}
export default async function ajax(obj){
	obj = obj || {};
	obj.type = (obj.type || 'POST').toUpperCase();
	obj.async = obj.async || true;
	obj.dataType = obj.dataType || 'json';
	obj.data = obj.data || null;
	var xhr;
	if(window.XMLHttpRequest){
		// 非IE
		xhr = new XMLHttpRequest()
	}else{
		// IE
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}

	if(obj.type == 'POST'){
		xhr.open(obj.type,obj.url,obj.async);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var data = getData(obj.data);
		xhr.send(data);
	}else{
		var url = obj.url+"?"+getData(obj.data);
		ajax.open(obj.type,url,obj.async);
		ajax.send();
	}
	return new Promise((resolve,reject) => {
		xhr.onreadystatechange = function (){
			if (xhr.readyState == 4){
				if (xhr.status == 200){
					// if (obj.success){
				    //     obj.success(xhr.responseText);
				    // }
					let result = xhr.response;
					if(obj.dataType == 'text'){
						result = xhr.responseText;
					}else{
						if(typeof result !== 'object'){
							result = JSON.parse(result);
						}
					}
					resolve(result);
				}else{
					reject(xhr);
				}
			}
		}
	})
	
}
