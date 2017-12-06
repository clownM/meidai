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



export const getStatus = (parm) => {
    var _status;
    switch (parm1) {
        case "toconfirm":
            _status = "扫描未检查";
            break;
        case "toscan":
            _status = "等待扫描";
            break;
        // case "todeal":
        //     _status = "确认";
        //     break;
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