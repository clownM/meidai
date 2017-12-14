
import {loadConfigData,loadParamsData} from './getData'
import $ from 'jquery'
import ajax from './ajax';

//RFC2822格式 日期格式化
export const joinzero = (num) => {
    if(num < 10){
        return "0"+num;
    }else{
        return ""+num;
    }
}
export const formatDate = (date,format) => {
    if(!(date == "")){
        let _ordertime = date.replace(/-\w*/g, '');
        let _date = new Date(_ordertime);
        let _year = joinzero(_date.getFullYear()) ;
        let _month =joinzero( _date.getMonth() + 1);
        let _day = joinzero(_date.getDate());
        let _hour =joinzero( _date.getHours() + 8);
        let _minute =joinzero(_date.getMinutes());
        let _second = joinzero(_date.getSeconds());
        let date_res;
        switch(format){
            case 'long_':
                date_res = _year + "-" + _month + "-" + _day + " " + _hour + ":" + _minute + ":" + _second;
                break;
            case 'long':
                date_res = _year + "年" + _month + "月" + _day + " " + _hour + ":" + _minute + ":" + _second;
                break;
        }
        return date_res;
    }else{
        return "暂无信息";
    }
}

// 获取订单状态
export const getStatus = (parm) => {
    let _status;
    switch (parm) {
        case "toconfirm":
            _status = "扫描未检查";
            break;
        case "toscan":
            _status = "等待扫描";
            break;
        case "cancelled":
            _status = "已取消";
            break;
        case "topay":
            _status = "待支付";
            break;
        case "printing":
            _status = "生产中";
            break;
        case "delivering":
            _status = "已发货";
            break;  
        case "done":
            _status = "交易完成";
            break;  
        default:
            _status = "未知";
    }
    return _status;
}

// 获取快递状态
export const get_delivery_status = status => {
    let _status;
    switch(status){
        case '0':
            _status = '运输中';
            break;
        case '1':
            _status = '揽件中';
            break;
        case '2':
            _status = '疑难';
            break;
        case '3':
            _status = '已签收';
            break;
        case '4':
            _status = '退签';
            break;
        case '5':
            _status = '派件中';
            break;
        default:
            _status = '没有快递信息';
    }
    return _status;
}

export const get_glass_data = async orderobj => {
    /**
    *检测对象是否是空对象(不包含任何可读属性)。
    *方法只既检测对象本身的属性，不检测从原型继承的属性。
    */
    let isOwnEmpty = (obj,key) => {
        let tmp_key = obj.hasOwnProperty(key) ? obj[key] : '';
        return tmp_key;
    }

    /* config 的文本转换成JSON格式 */
    let configToJson = config => {
        if (!(typeof config === "string")) {
            console.log("Config2Json needs input in string type.");
            return;
        }
        config = config.split(/\r?\n/);
        let key;
        let value;
        let config_json = {};
        for (let pair in config) {
            pair = config[pair].trim();
            if ("" == pair)
                continue;
            let pair_ = pair.split(" ");
            key = pair_[0].trim();
            if (pair_.length > 1)
                value = pair_[1].trim();
            else
                value = "";
            if ("" == key)
                continue;
            config_json[key] = value;
        }
        return config_json;
    }

    let glass_collecteddata_data = {};
    let glass_params_data = {};
    let tmp_collecteddata = orderobj.collecteddata;
    if(tmp_collecteddata != ''){
        for(let i in tmp_collecteddata){
            glass_collecteddata_data[i] = tmp_collecteddata[i];
        }
    }
    let glass_config_data = {};
    if(!glass_config_data.pupilDistance){
        
    }else{
        glass_config_data.pupilDistance = glass_collecteddata_data.pupilDistance;
    }

    /****** 把config 按照config_literal -> config -> preconfig 整合成一个新的config******/
    let tmp_preconfig_data = orderobj.preconfig;
    if(tmp_preconfig_data != ''){
        for(let i in tmp_preconfig_data){
            glass_config_data[i] = tmp_preconfig_data[i];
        }
    }
    let configuuid = orderobj.config[0];
    if(typeof configuuid != 'undefined'){
        let res = await loadConfigData(configuuid);
        if(res && res.result != 'false'){
            let config_json = configToJson(res);
            for(let i in config_json){
                glass_config_data[i] = config_json[i];
            }
        }
    }
    
    let paramsuuid = orderobj.params;
    if(typeof paramsuuid != 'undefined'){
        let res2 = await loadParamsData(paramsuuid);
        if (JSON.parse(res2) && JSON.parse(res2).result != 'false' && res2 != '') {
            let tmp_params = JSON.parse(res2);
            for (let i in tmp_params) {
                glass_params_data[i] = tmp_params[i];
            }
        }
    }
    // let tmp_collecteddata = isOwnEmpty(glass_collecteddata_data,'sdf');
    let resobj = {};
    /**
     * 验光参数 
     **/
    resobj.left_degrees = isOwnEmpty(glass_collecteddata_data, 'left_degrees');
    resobj.left_cyl = isOwnEmpty(glass_collecteddata_data, 'left_cyl');
    resobj.left_axis = isOwnEmpty(glass_collecteddata_data, 'left_axis');

    resobj.right_degrees = isOwnEmpty(glass_collecteddata_data, 'right_degrees');
    resobj.right_cyl = isOwnEmpty(glass_collecteddata_data, 'right_cyl');
    resobj.right_axis = isOwnEmpty(glass_collecteddata_data, 'right_axis');
    resobj.pupilDistance = isOwnEmpty(glass_config_data, 'PupilDistance');

    /**
     * 镜框参数
     **/
    resobj.widthScale = isOwnEmpty(glass_config_data, 'WidthScale');
    resobj.heightScale = isOwnEmpty(glass_config_data, 'HeightScale');
    resobj.bridgeSpanRatio = isOwnEmpty(glass_config_data, 'BridgeSpanRatio');

    /**
     * 眼镜的框镜型
     **/
    if (!glass_config_data.LensProfileFile) {
        let tmp_lensprofilefile_img = '{"top":"100","left":"100"}';
        resobj.lensprofilefile = '';
        resobj.lensprofilefile_img = JSON.parse('{"top":"100","left":"100"}');
    } else {
        let tmp_lensprofilefile = glass_config_data.LensProfileFile.slice(15, -8);
        // resobj.lensprofilefile = setframe(tmp_lensprofilefile)
        // resobj.lensprofilefile_img = setframeimg(tmp_lensprofilefile);
    }

    /**
     *眼镜镜框颜色
     **/
    if (!glass_config_data.FrameColor) {
        resobj.frameColor = '#282828';
    } else {
        // resobj.frameColor = glass_color(isOwnEmpty(glass_config_data.FrameColor));
    }

    /**
     *眼镜镜腿镜型
     **/
    if (typeof (glass_config_data.LegProfile) == "undefined") {
        resobj.legProfile = 'c3';
    } else {
        resobj.legProfile = glass_config_data.LegProfile;
    }

    /**
     *眼镜镜腿颜色
     **/
    if (!glass_config_data.LegColor) {
        resobj.legColor = '#282828';
    } else {
        // resobj.legColor = glass_color(glass_config_data.LegColor);
    }

    /**
     *刻字
     **/
    /****** 镜框 ******/
    resobj.slotMessage = isOwnEmpty(glass_config_data, 'SlotMessage');
    /****** 镜腿 ******/
    resobj.legMessage = isOwnEmpty(glass_config_data, 'LegMessage');

    return resobj;
}



