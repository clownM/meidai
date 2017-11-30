<template>
    <div id="fsw_table">
        <div class="fsw_td">
            <div class="fsw_center">
                <div id="tittle">
                    <img src="../../images/logo/logo.png">
                    <p>美你所美 戴你所想</p>
                </div>
                <ul id="selector">
                    <li id="login" class='select_active' @click='toLoginForm'><p v-bind:class='{active:loginForm}'>登陆</p></li>
                    <li id="registration" @click='toRegisterForm'><p v-bind:class='{active:registerForm}'>注册</p> </li>
                    <div class="clear"></div>
                </ul>
                <div id="content">
                    <form id='login_form' class='active_selected' v-if='loginForm'>
                        <div class="fsw_maxbox">
                            <div class='selected'>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="text" :placeholder="phonePlaceholder" class='email_or_phone panduan  form-control' v-model='phone' @click="inputPhone"/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class='phone_error'>{{ phone_error }}</span>
                                </div>
                                <label class="login_form_userName" v-show="loginUsername">
                                    <input type="text" value='' placeholder="用户名" class="form-control" v-model='username'>
                                </label>
                                <div class="fsw_juerr">
                                    <span class='login_form_userName_error'>{{ username_error }}</span>
                                </div>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="password" :placeholder="passwordPlaceholder" class='login_password form-control' min="8" v-model="password" @click="inputPassword"/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class="login_password_error">{{ password_error }}</span>
                                </div>
                                <div class='do_login' @click='login'>登录</div>
                                <div class='remember'>
                                    <input type="checkbox" name="" id="rememberMe">
                                    <label for="rememberMe">记住我</label>
                                    <span>无法登陆？</span>
                                </div>
                                <div class='shejiao' style="text-align:left;">
                                    <a href="#">社交账户登陆</a>
                                </div>
                                <div class="fsw_querr">
                                    <span class="glyphicon glyphicon-remove"></span>
                                    <div class="fsw_querr_infor"></div>
                                </div>
                                <div class="fsw_success login_success">
                                    <span class="glyphicon glyphicon-ok"></span>
                                    <div class="fsw_success_infor login_success_infor"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form id='registration_form' v-if='registerForm'>
                        <div class="fsw_maxbox">
                            <div class='selected'>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="text" placeholder="请输入手机号" class='email_by_phone panduan form-control'/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class='registration_error'></span>
                                </div>
                                <label style='display: none;' class="input_username ">
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="text" placeholder="用户名" class="registration_input_username form-control" />
                                    </div>
                                </label>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="password" class='password registration_password  form-control' placeholder="请输入密码" />
                                    </div>
                                </label>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="password" class='password registration_confirm_password  form-control' placeholder="请确认密码" />
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class="registration_password_error"></span>
                                </div>
                                <input class='do_registration' type="submit" name="确定">
                                <div class='remember'>
                                    <!-- <input type="checkbox" name="">-->
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class='shejiao'>
                                    <a style="display:none">社交账户登陆</a>
                                </div>
                                <div class="fsw_querr">
                                    <span class="glyphicon glyphicon-remove"></span>
                                    <div class="fsw_querr_infor"></div>
                                </div>
                                <div class="fsw_success registration_success">
                                    <span class="glyphicon glyphicon-ok"></span>
                                    <div class="fsw_success_infor registration_success_infor"></div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div id="user_login" v-show='showUserLogin'>
                        <div class="login_box1">
                            <div class="user_qiehua" @click="toPrev">
                                <i class="user_qiehua-left">
                                    <img src="../../images/icons/prev.png" />
                                </i>
                            </div>
                            <div class="login_userlist">
                                <p class="select_user">请选择一个用户</p>
                                <div class="fsw_box1">
                                    <div class="login_userlist_info" v-for='(pages,index) in usernameList' v-show='showPage == index'>
                                        <div class="login_danuser_td" v-for='(user,index2) in pages'>
                                            <div class="login_danuser_info" @click="multiUserLogin(user)">
                                                <div class="login_danuser_info_img">
                                                    <img src="../../images/6.jpg" />
                                                </div>
                                                <div class="login_danuser_info_name">
                                                    <p> {{user}} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="user_qiehua" @click="toNext">
                                <i class="user_qiehua_right">
                                    <img src="../../images/icons/next.png" />
                                </i>
                            </div>
                        </div>
                    </div>
                    <div id="user_registration">
                        <div class="registration_box1">
                            <div class="registration_qiehua">
                                <i class="registration_qiehua-left">
                                    <img src="images/icons/prev.png" />
                                </i>
                            </div>
                            <div class="registration_userlist">
                                <div class="fsw_registration_box1"></div>
                                <p class="registration_user">请确认你的用户名是否存在</p>
                                <input type="button" value="继续注册" class="registration_btn" />
                            </div>
                            <div class="registration_qiehua" @click="toNext">
                                <i class="registration_qiehua_right ">
                                    <img src="images/icons/next.png" />
                                </i>
                            </div>
                        </div>
                    </div>
                    <div id="fsw_bj"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {passwordLogin,multiUserLogin} from '../../config/getData' 
    import ajax from '../../config/ajax'
    export default{
        data(){
            return {
                loginForm: true, //登录or注册 默认登录
                registerForm: false,
                loginInfo: null,
                phone: null, //电话号码
                password: null, //密码
                loginUsername:false, //username input
                showUserLogin:false, //多用户登录弹出层
                username: null, //username
                usernameList: [],//用户名列表
                showPage: 0,
                phone_error:null,   //手机号错误信息
                password_error:null,    //密码错误信息
                username_error:null, //用户名错误信息
                phonePlaceholder:'请输入手机号',
                passwordPlaceholder:'请输入密码',
                usernamePlaceholder:'请输入用户名',
            }
        },
        created(){
            
        },
        components:{

        },
        computed:{
            rightPhone:function () {
                return /1[34578]\d{9}$/.test(this.phone);
            },
            getUsernameList:function(){
                let usernameList = [];
                usernameList = this.loginInfo.reasons.match( /\[[\s\w]+\]/g );
                for(let i=0;i<usernameList.length;i++){
                    usernameList[i] = usernameList[i].replace(/[\[\]]/g, "").trim();
                }
                return usernameList;
            }
        },
        methods:{
            ...mapMutations([
                'RECORD_USERINFO',
                'RECORD_LOGININFO'
            ]),
            toLoginForm(){
                this.loginForm = true;
                this.registerForm = false;
            },
            toRegisterForm(){
                this.loginForm = false;
                this.registerForm = true;
                console.log('register')
            },
            inputPhone(){
                this.phone_error = null;
            },
            inputPassword(){
                this.password_error = null;
            },
            blurPhone(){

            },
            blurPassword(){

            },
            toPrev(){
                if(this.showPage > 0){
                    this.showPage -=1;
                }else{
                    this.showPage = this.usernameList.length-1
                }
                console.log(this.showPage);
            },
            toNext(){
                if(this.showPage < this.usernameList.length-1){
                    this.showPage +=1;
                }else{
                    this.showPage = 0;
                }
                console.log(this.page);
            },
            async login(){
                if(this.loginForm){
                    if(!this.phone){
                        this.phone_error = '手机号不能为空';
                    }else if(!this.rightPhone){
                        this.phone_error = '请输入正确的手机号';
                    }else if(!this.password){
                        this.password_error = '密码不能为空';
                    }else if(this.password.length < 8){
                        this.password_error = '密码必须大于等于八位字符';
                    }
                }
                this.loginInfo = await passwordLogin(this.phone, this.password);
                if(this.loginInfo.result == 'false'){
                    let errorno = this.loginInfo.errorno;
                     switch (errorno) {
                        case "E01000":
                            this.phone_error = "至少有一个参数丢失";
                            break;
                        case "E01070":
                            this.phone_error = "手机没有找到";
                            break;
                        case "E01072":
                            this.username_error = "用户名没有找到";
                            break;
                        case "E01080":
                            this.password_error = "密码错误";
                            break;
                    }
                    if(errorno == 'E01071'){
                        //多用户
                        this.loginUsername = true;
                        this.showUserLogin = true;
                        let usernameList = this.getUsernameList;
                        for(let i = 0;i < usernameList.length/3;i++){
                            let pages = [];
                            for(let j = 0;j < 3;j++){
                                if(!(typeof(usernameList[i*3+j]) =='undefined')){
                                    pages.push(usernameList[i*3+j]);
                                }
                            }
                            this.usernameList.push(pages);
                        }
                        console.log(this.usernameList);
                    }
                }else{
                    //单用户登录成功
                    let UserUUID = this.loginInfo.uuid;
                    console.log("单用户登录成功");
                }
            },
            multiUserLogin : async function (username) {
                this.username = username;
                console.log(this.username);
                this.showUserLogin = false;
                this.loginInfo = await multiUserLogin(this.phone,this.username,this.password);
                if(this.loginInfo.result == 'false'){
                    let errorno = this.loginInfo.errorno;
                     switch (errorno) {
                        case "E01070":
                            this.username_error = "用户名不存在";
                            break;
                        case "E01080":
                            this.password_error = "密码错误";
                            break;
                    }
                }else{
                    //多用户登录成功
                    let UserUUID = this.loginInfo.uuid;
                    console.log("多用户登录成功");
                }
            }
        }
    }
</script>

<style lang="scss">
@import '../../style/common';
/*IE input X 去掉文本框的叉叉和密码输入框的眼睛图标*/
::-ms-clear,
::-ms-reveal {
    display: none;
}
input.form-control{
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
}
.form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #999;
}
.form-control::-webkit-input-placeholder {
  color: #999;
}
@media (min-width:992px) {
    /*#tittle{
			margin: 160px auto 0px;
		}*/
    #selector {
        margin-top: 154px;
    }
    #user_login .login_box1,
    #user_registration .registration_box1 {
        width: 850px;
        height: 500px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 425px);
        top: calc(50% - 150px);
        border-radius: 10px;
    }
    #user_login .login_box1 .user_qiehua,
    #user_registration .registration_box1 .registration_qiehua {
        width: 50px;
        height: 500px;
        float: left;
        position: relative;
    }
    #user_login .login_box1 .user_qiehua i {
        display: inline-block;
        text-align: center;
        width: 50px;
        height: 30px;
        font-family: arial;
        font-size: 30px;
        line-height: 30px;
        position: absolute;
        top: calc(50% - 65px);
        cursor: pointer;
    }
    #user_registration .registration_box1 .registration_qiehua i {
        display: inline-block;
        text-align: center;
        width: 50px;
        height: 30px;
        font-family: arial;
        font-size: 30px;
        line-height: 30px;
        position: absolute;
        top: calc(50% - 120px);
        cursor: pointer;
    }
    #user_login .login_box1 .login_userlist,
    #user_registration .registration_box1 .registration_userlist {
        width: 750px;
        height: 500px;
        float: left;
        overflow: hidden;
        position: relative;
    }
    #user_login .login_box1 .login_userlist .select_user {
        font-family: "微软雅黑";
        font-size: 18px;
        padding-left: 30px;
        margin-top: 35px;
    }
    #user_login .login_box1 .login_userlist .fsw_box1 {
        width: 100%;
        height: 300px;
        margin-top: 35px;
        position: relative;
    }
    #user_registration .registration_box1 .registration_userlist .fsw_registration_box1 {
        width: 100%;
        height: 300px;
        margin-top: 40px;
        position: relative;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info {
        width: 100%;
        height: 300px;
        display: table;
        overflow: hidden;
        position: absolute;
        top: 0px;
        left: 0px;
        background: #fff;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_td,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_td {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info {
        width: 240px;
        height: 300px;
        display: inline-block;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img {
        width: 240px;
        height: 240px;
        border: 5px solid rgb(2, 207, 225);
        border-radius: 5px;
        overflow: hidden;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img:hover,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img:hover {
        border-color: red;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img img,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img img {
        width: 240px;
        height: 240px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_name,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_name {
        width: 240px;
        height: 20px;
        margin-top: 10px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_name p,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_name p {
        width: 240px;
        font-family: "微软雅黑";
        font-size: 18px;
        text-align: center;
        line-height: 20px;
    }
    #user_registration .registration_box1 .registration_userlist .registration_user {
        font-family: "微软雅黑";
        font-size: 18px;
        text-align: center;
        margin-top: 10px;
    }
    #user_registration .registration_box1 .registration_userlist .registration_btn {
        width: 150px;
        height: 30px;
        border: transparent;
        background: orange;
        margin: 0 auto;
        margin-top: 50px;
        border-radius: 5px;
        font-family: "微软雅黑";
        color: #fff;
        font-size: 18px;
        line-height: 30px;
        display: block;
    }
    #content .fsw_maxbox {
        max-width: 400px;
        margin: 0px auto;
    }
}

@media (min-width: 768px) and (max-width:991px) {
    #selector {
        margin-top: 100px;
    }
    #user_login .login_box1,
    #user_registration .registration_box1 {
        width: 600px;
        height: 400px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 300px);
        top: calc(50% - 85px);
        border-radius: 10px;
    }
    #user_login .login_box1 .user_qiehua,
    #user_registration .registration_box1 .registration_qiehua {
        width: 50px;
        height: 400px;
        float: left;
        position: relative;
    }
    #user_login .login_box1 .user_qiehua i {
        display: inline-block;
        text-align: center;
        width: 50px;
        height: 30px;
        font-family: arial;
        font-size: 30px;
        line-height: 30px;
        position: absolute;
        top: calc(50% - 45px);
        cursor: pointer;
    }
    #user_registration .registration_box1 .registration_qiehua i {
        display: inline-block;
        text-align: center;
        width: 50px;
        height: 30px;
        font-family: arial;
        font-size: 30px;
        line-height: 30px;
        position: absolute;
        top: calc(50% - 102px);
        cursor: pointer;
    }
    #user_login .login_box1 .login_userlist,
    #user_registration .registration_box1 .registration_userlist {
        width: 500px;
        height: 400px;
        float: left;
        overflow: hidden;
        position: relative;
    }
    #user_login .login_box1 .login_userlist .select_user {
        font-family: "微软雅黑";
        font-size: 18px;
        padding-left: 30px;
        margin-top: 35px;
    }
    #user_login .login_box1 .login_userlist .fsw_box1,
    #user_registration .registration_box1 .registration_userlist .fsw_registration_box1 {
        width: 100%;
        height: 230px;
        margin-top: 20px;
        position: relative;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info {
        width: 100%;
        height: 230px;
        overflow: hidden;
        position: absolute;
        display: table;
        top: 0px;
        left: 0px;
        background: #fff;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_td,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_td {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info {
        width: 160px;
        height: 230px;
        display: inline-block;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img {
        width: 160px;
        height: 160px;
        border: 5px solid rgb(2, 207, 225);
        border-radius: 5px;
        overflow: hidden;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img:hover,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img:hover {
        border-color: red;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img img,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img img {
        width: 160px;
        height: 160px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_name,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_name {
        width: 160px;
        height: 30px;
        margin-top: 10px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_name p,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_name p {
        width: 160px;
        height: 30px;
        font-family: "微软雅黑";
        font-size: 18px;
        text-align: center;
        line-height: 30px;
    }
    #user_registration .registration_box1 .registration_userlist .registration_user {
        font-family: "微软雅黑";
        font-size: 18px;
        text-align: center;
    }
    #user_registration .registration_box1 .registration_userlist .registration_btn {
        width: 150px;
        height: 30px;
        border: transparent;
        background: orange;
        display: block;
        margin: 0 auto;
        margin-top: 50px;
        border-radius: 5px;
        font-family: "微软雅黑";
        color: #fff;
        font-size: 18px;
        line-height: 30px;
    }
    #content .fsw_maxbox {
        max-width: 400px;
        margin: 0px auto;
    }
}

@media (max-width:767px) {
    #tittle p {
        margin-left: -15px;
        margin-right: -15px;
    }
    #selector {
        margin-top: 15px;
    }
    #user_login .login_box1,
    #user_registration .registration_box1 {
        width: 350px;
        height: 250px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 175px);
        top: calc(50% - 85px);
        border-radius: 10px;
    }
    #user_login .login_box1 .user_qiehua,
    #user_registration .registration_box1 .registration_qiehua {
        width: 25px;
        height: 250px;
        float: left;
        position: relative;
    }
    #user_login .login_box1 .user_qiehua i {
        display: inline-block;
        text-align: center;
        width: 25px;
        height: 30px;
        font-family: arial;
        font-size: 30px;
        line-height: 30px;
        position: absolute;
        top: calc(50% - 25px);
        cursor: pointer;
    }
    #user_registration .registration_box1 .registration_qiehua i {
        display: inline-block;
        text-align: center;
        width: 25px;
        height: 30px;
        font-family: arial;
        font-size: 30px;
        line-height: 30px;
        position: absolute;
        top: calc(50% - 70px);
        cursor: pointer;
    }
    #user_login .login_box1 .login_userlist,
    #user_registration .registration_box1 .registration_userlist {
        width: 300px;
        height: 250px;
        float: left;
        overflow: hidden;
        position: relative;
    }
    #user_login .login_box1 .login_userlist .select_user {
        font-family: "微软雅黑";
        font-size: 16px;
        padding-left: 20px;
        margin-top: 20px;
    }
    #user_login .login_box1 .login_userlist .fsw_box1,
    #user_registration .registration_box1 .registration_userlist .fsw_registration_box1 {
        width: 100%;
        height: 140px;
        margin-top: 20px;
        position: relative;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info {
        width: 100%;
        height: 140px;
        overflow: hidden;
        position: absolute;
        display: table;
        background: #FFF;
        top: 0px;
        left: 0px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_td,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_td {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info {
        width: 90px;
        height: 140px;
        display: inline-block;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img {
        width: 90px;
        height: 90px;
        border: 5px solid rgb(2, 207, 225);
        border-radius: 5px;
        overflow: hidden;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img:hover,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img:hover {
        border-color: red;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_img img,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_img img {
        width: 90px;
        height: 90px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_name,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_name {
        width: 90px;
        height: 30px;
        margin-top: 10px;
    }
    #user_login .login_box1 .login_userlist .login_userlist_info .login_danuser_info .login_danuser_info_name p,
    #user_registration .registration_box1 .registration_userlist .registration_userlist_info .registration_danuser_info .registration_danuser_info_name p {
        width: 90px;
        height: 30px;
        font-family: "微软雅黑";
        font-size: 18px;
        text-align: center;
        line-height: 30px;
    }
    #user_registration .registration_box1 .registration_userlist .registration_user {
        font-family: "微软雅黑";
        line-height: 18px;
        font-size: 18px;
        text-align: center;
        margin-bottom: 10px;
    }
    #user_registration .registration_box1 .registration_userlist .registration_btn {
        width: 150px;
        height: 30px;
        border: transparent;
        background: orange;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 5px;
        font-family: "微软雅黑";
        color: #fff;
        font-size: 18px;
        line-height: 30px;
    }
    #content .fsw_maxbox {
        max-width: 400px;
        margin: 0px auto;
    }
    #fsw_table .fsw_td .fsw_center {
        padding-left: 15px;
        padding-right: 15px;
    }
}

input[type="submit"] {
    height: 50px;
    background: #00d2ff;
    outline: none;
}

input[type='checkbox'] {
    margin-right: 5px;
    border: 0px;
}

button,
input,
select,
textarea,
h1,
h2,
h3,
h4,
h5,
h6,
p {
    font-family: '宋体', Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;
}

#fsw_table {
    width: 100%;
    height: 100%;
    display: table;
}

#fsw_table .fsw_td {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}

#fsw_table .fsw_td .fsw_center {
    width: 100%;
    max-width: 400px;
    display: inline-block;
    text-align: left;
}

#tittle {
    text-align: center;
}

#tittle>img {
    width: 130px;
}

#tittle p {
    font-family: "微软雅黑";
    font-size: 36px;
    margin-top: 10px;
}

#selector {
    width: 185px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    position: relative;
    li{
        width: 50px;
        height: 24px;
        font-size: 24px;
        font-family: "微软雅黑";
        line-height: 24px;
        text-align: center;
        cursor: pointer;
        float: left;
        color: rgb(163, 166, 167);
        p{
            padding-bottom: 3px;
            border-bottom: 2px solid rgba(0,0,0,0);
            color:rgb(163, 166, 167);
            font-weight: 800;
        }
        p.active{
            color: #76daf6;
            border-bottom: 2px solid #76daf6
        }
    }
    li:nth-child(2) {
        float: right;
    }
}


/********************/

#login_form .selected>label {
    display: block;
    margin-bottom: 10px;
}

#registration_form .selected>label {
    display: block;
    margin-bottom: 10px;
}

#content .fsw_juerr {
    margin-bottom: 10px;
    position: relative;
    padding: 0px 12px;
    color: red;
    span{
        color:red;
        font-size:14px;
    }
}

#content .fws_input_danger {
    border-color: red;
}

#content .fsw_querr {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: rgb(255, 184, 184);
    padding-right: 12px;
    overflow: hidden;
    display: none;
}

#content .fsw_querr span {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    margin-top: 5px;
    border-right: 1px solid rgb(252, 74, 74);
    float: left;
    color: rgb(252, 74, 74);
}

#content .fsw_querr .fsw_querr_infor {
    height: 40px;
    margin-top: 5px;
    margin-left: 5px;
    float: left;
    line-height: 40px;
    font-size: 18px;
    color: rgb(255, 0, 0);
}

#content .fsw_success {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: rgb(196, 226, 170);
    padding-right: 12px;
    display: none;
    overflow: hidden;
}

#content .fsw_success span {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    margin-top: 5px;
    border-right: 1px solid rgb(50, 108, 0);
    float: left;
    color: rgb(50, 108, 0);
}

#content .fsw_success .fsw_success_infor {
    height: 40px;
    margin-top: 5px;
    margin-left: 5px;
    float: left;
    line-height: 40px;
    font-size: 18px;
    color: rgb(50, 108, 0);
}




#user_login {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 11;
}


#user_registration {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    z-index: 11;
}

#user_registration p {
    font-size: 18px;
    font-family: NotoSansHans Light;
    color: #7d7c7d;
    text-indent: 10px;
    margin-bottom: 10px !important;
}

.select_user {
    visibility: visible;
    height: auto;
}

.com_registration {
    height: 30px;
    background: yellow;
    width: 100px;
    background: #ffc845;
    -webkit-border-radius: 5px !important;
    -moz-border-radius: 5px !important;
    -o-border-radius: 5px !important;
    border-radius: 5px !important;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    font-family: NotoSansHans Light;
    color: #fff;
    margin-top: 5rem;
}

div.do_login,
.do_registration {
    display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
    width: 100%;
    height: 50px;
    background-color: rgb(0, 210, 255);
    border: none;
    color: #fff;
    font-family: NotoSansHans Light;
    font-size: 24px;
}

.remember,
.shejiao {
    height: 30px;
    color: #9b9d9f;
    font-size: 18px;
    margin-top: 10px;
    position: relative;
}

.shejiao a {
    color: #9b9d9f;
}

.remember input {
    width: 18px;
    height: 18px;
    vertical-align: middle;
}

.remember label {
    position: absolute;
    left: 25px;
    top: 3px;
}

.remember span {
    position: absolute;
    right: 0px;
    top: 3px;
    cursor: pointer;
}

#login_form input[type='text'],
#login_form input[type='password'],
#registration_form input[type='text'],
#registration_form input[type='password'] {
    -webkit-border-radius: 5px !important;
    -moz-border-radius: 5px !important;
    -o-border-radius: 5px !important;
    border-radius: 5px !important;
    height: 50px;
    font-size: 24px;
    font-weight: 100;
}

.shejiao {
    margin-top: 30px;
}

.user {
    width: 100%;
    height: auto;
    margin: 0 auto !important;
}


#fsw_bj {
    width: 100%;
    height: 100%;
    background: rgba(127, 127, 127, .4);
    position: fixed;
    display: none;
    left: 0px;
    top: 0px;
}
</style>

