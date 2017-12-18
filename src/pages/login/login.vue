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
                                    <input type="text" value='' placeholder="用户名" class="form-control" v-model='username'@click='inputUsername'>
                                </label>
                                <div class="fsw_juerr">
                                    <span class='login_form_userName_error'>{{ username_error }}</span>
                                </div>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="password" :placeholder="passwordPlaceholder" class='login_password form-control' min="8" v-model="password" @click="inputPassword"
                                        @keyup.enter='login'/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class="login_password_error">{{ password_error }}</span>
                                </div>
                                <div class='do_login' @click='login'>登录</div>
                                <div class='remember'>
                                    <input type="checkbox" name="" id="rememberMe" v-model='autoLogin' @click="rememberMe">
                                    <label for="rememberMe">记住我</label>
                                    <span>无法登陆？</span>
                                </div>
                                <div class='shejiao' style="text-align:left;">
                                    <a href="#">社交账户登陆</a>
                                </div>
                                <div class="fsw_querr" v-if="regNeterr">
                                    <span class="glyphicon glyphicon-remove"></span>
                                    <div class="fsw_querr_infor">当前网络错误，请重新连接</div>
                                </div>
                                <div class="fsw_success login_success" v-if='loginSuccess'>
                                    <span class="glyphicon glyphicon-ok"></span>
                                    <div class="fsw_success_infor login_success_infor">登录成功</div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form id='registration_form' v-if='registerForm'>
                        <div class="fsw_maxbox">
                            <div class='selected'>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="text" placeholder="请输入手机号" class='email_by_phone panduan form-control' v-model='phone' @click="regInputPhone"/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class='registration_error'>{{ reg_phone_error }}</span>
                                </div>
                                <label class="input_username " v-show='regUsername'>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="text" placeholder="请输入用户名" class="registration_input_username form-control" v-model='username' @click="regInputUsername"/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class="registration_password_error">{{ reg_username_error }}</span>
                                </div>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="password" class='password registration_password  form-control' placeholder="请输入密码" v-model='regPassword' @click='regInputPassword'/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class="registration_password_error">{{ reg_password_error }}</span>
                                </div>
                                <label>
                                    <div style='position:relative;overflow: hidden;'>
                                        <input type="password" class='password registration_confirm_password  form-control' placeholder="请确认密码" v-model='confirmPassword' @click="regInputConfirmPassword" @keyup.enter="register"/>
                                    </div>
                                </label>
                                <div class="fsw_juerr">
                                    <span class="registration_password_error">{{ reg_confirm_password_error }}</span>
                                </div>
                                <div class='do_registration' @click='register'>注册</div>
                                <div class="fsw_querr" v-if="regNeterr">
                                    <span class="glyphicon glyphicon-remove"></span>
                                    <div class="fsw_querr_infor">当前网络错误，请重新连接</div>
                                </div>
                                <div class="fsw_success registration_success" v-if='regSuccess'>
                                    <span class="glyphicon glyphicon-ok"></span>
                                    <div class="fsw_success_infor registration_success_infor">注册成功</div>
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
                    <div id="user_registration" v-show='showUserReg'>
                        <div class="registration_box1">
                            <div class="registration_qiehua" @click="toPrev2">
                                <i class="registration_qiehua-left">
								<img src="../../images/icons/prev.png" />
							</i>
                            </div>
                            <div class="registration_userlist">
                                <div class="fsw_registration_box1">
                                    <div class="registration_userlist_info" v-for='(pages,index) in regUsernameList' v-show='showRegPage == index'>
                                        <div class="registration_danuser_td" v-for='(user,index2) in pages'>
                                            <div class="registration_danuser_info" @click="">
                                                <div class="registration_danuser_info_img">
                                                    <img src="../../images/6.jpg" />
                                                </div>
                                                <div class="registration_danuser_info_name">
                                                    <p> {{user}} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="registration_user">请确认你的用户名是否存在</p>
                                <div class="registration_btn" @click="continueReg">继续注册</div>
                            </div>
                            <div class="registration_qiehua" @click="toNext2">
                                <i class="registration_qiehua_right ">
								<img src="../../images/icons/next.png" />
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
    import {passwordLogin,createUser} from '../../config/getData' 
    import ajax from '../../config/ajax'
    import {setCookie} from '../../config/utils'
    export default{
        data(){
            return {
                loginForm: true, //登录or注册 默认登录
                registerForm: false,

                loginInfo: null,
                phonePlaceholder:'请输入手机号',
                passwordPlaceholder:'请输入密码',
                usernamePlaceholder:'请输入用户名',
                phone: null, //电话号码
                password: null, //密码
                loginUsername:false, //username input
                showUserLogin:false, //多用户登录弹出层
                username: '', //username
                usernameList: [],//用户名列表
                showPage: 0,
                phone_error:null,   //手机号错误信息
                password_error:null,    //密码错误信息
                username_error:null, //用户名错误信息
                loginSuccess:false,
                loginNeterr:false,

                registerInfo:null, //注册信息
                regPassword:null,//注册密码
                confirmPassword:null,//确认密码
                regUsername:false,//注册username显示
                showUserReg:false,//注册多用户弹出层
                regUsernameList: [],//用户名列表
                showRegPage:0,
                reg_phone_error:null, 
                reg_username_error:null,
                reg_password_error:null,
                reg_confirm_password_error:null,
                regSuccess:false,
                regNeterr:false,

                autoLogin:true, //记住密码
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
            },
            getRegUsernameList:function(){
                let usernameList = [];
                usernameList = this.registerInfo.reasons.match( /\[[\s\w]+\]/g );
                for(let i=0;i<usernameList.length;i++){
                    usernameList[i] = usernameList[i].replace(/[\[\]]/g, "").trim();
                }
                return usernameList;
            }
        },
        methods:{
            ...mapMutations([
                'RECORD_USERINFO','AUTO_LOGIN'
            ]),
            toLoginForm(){
                this.loginForm = true;
                this.registerForm = false;
                if(this.username == ''){
                    this.regUsername = false;
                }else{
                    this.regUsername = true;
                };
                this.showUserReg = false;
            },
            toRegisterForm(){
                this.loginForm = false;
                this.registerForm = true;
                if(this.username == ''){
                    this.loginUsername = false;
                }else{
                    this.loginUsername = true;
                };
                this.showUserLogin = false;
            },
            inputPhone(){
                this.phone_error = null;
            },
            inputPassword(){
                this.password_error = null;
            },
            inputUsername(){
                this.username_error = null;
            },
            regInputPhone(){
                this.reg_phone_error = null;
            },
            regInputUsername(){
                this.reg_username_error = null
            },
            regInputPassword(){
                this.reg_password_error = null
            },
            regInputConfirmPassword(){
                this.reg_confirm_password_error = null
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
            },
            toNext(){
                if(this.showPage < this.usernameList.length-1){
                    this.showPage +=1;
                }else{
                    this.showPage = 0;
                }
            },
            toPrev2(){
                if(this.showRegPage > 0){
                    this.showRegPage -=1;
                }else{
                    this.showRegPage = this.regUsernameList.length-1
                }
            },
            toNext2(){
                if(this.showRegPage < this.regUsernameList.length-1){
                    this.showRegPage +=1;
                }else{
                    this.showRegPage = 0;
                }
            },
            async login(){
                this.loginInfo = null;
                if(this.loginForm){
                    if(!this.phone){
                        this.phone_error = '手机号不能为空';
                    }else if(!this.rightPhone){
                        this.phone_error = '请输入正确的手机号';
                    }else if(!this.password){
                        this.password_error = '密码不能为空';
                    }else if(this.password.length < 8){
                        this.password_error = '密码必须大于等于八位字符';
                    }else{
                        this.loginInfo = await passwordLogin(this.phone,this.username,this.password);
                        if(!this.loginInfo){
                            this.loginNeterr = true
                        }else{
                            this.loginNeterr = false
                        }
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
                            }
                        }else{
                            //用户登录成功
                            if(this.autoLogin){
                                this.AUTO_LOGIN(true);
                            }else{
                                this.AUTO_LOGIN(false);
                            }
                            let useruuid = this.loginInfo.uuid;
                            this.RECORD_USERINFO(this.loginInfo);
                            this.$store.dispatch('getUserInfo');
                            this.$router.go(-1);
                        }
                    }
                }
            },
            multiUserLogin : async function (username) {
                this.loginInfo = null;
                this.username = username;
                this.showUserLogin = false;
                this.loginInfo = await passwordLogin(this.phone,this.username,this.password);
                if(!this.loginInfo){
                    this.loginNeterr = true
                }else{
                    this.loginNeterr = false
                }
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
                    if(this.autoLogin){
                        this.AUTO_LOGIN(true);
                    }else{
                        this.AUTO_LOGIN(false);
                    }
                    let useruuid = this.loginInfo.uuid;
                    this.RECORD_USERINFO(this.loginInfo);
                    this.$store.dispatch('getUserInfo')
                    this.$router.go(-1);
                }
            },
            async register(){
                this.registerInfo = null;
                if(this.registerForm){
                    if(!this.phone){
                        this.reg_phone_error = '手机号不能为空';
                    }else if(!this.rightPhone){
                        this.reg_phone_error = '请输入正确的手机号';
                    }else if(!this.regPassword){
                        this.reg_password_error = '密码不能为空';
                    }else if(this.regPassword.length < 8){
                        this.reg_password_error = '密码必须大于等于八位字符';
                    }else if(this.confirmPassword !== this.regPassword){
                        this.reg_confirm_password_error = '两次密码输入不一致';
                    }else{
                        this.registerInfo = await createUser(this.phone,this.username,this.regPassword);
                        if(!this.registerInfo){
                            this.regNeterr = true
                        }else{
                            this.regNeterr = false
                        }
                        if(this.registerInfo.result == 'false'){
                            let errorno = this.registerInfo.errorno;
                            switch (errorno) {
                                case "E01000":
                                    this.reg_phone_error = "至少有一个参数丢失";
                                    break;
                                case "E01010":
                                    this.reg_phone_error = "手机号格式错误";
                                    break;
                                case "E01022":
                                    this.regUsername = true;
                                    this.reg_username_error = "用户名已存在";
                            }
                            if(errorno == 'E01021'){
                                //多用户
                                this.regUsername = true;
                                this.showUserReg = true;
                                let usernameList = this.getRegUsernameList;
                                for(let i = 0;i < usernameList.length/3;i++){
                                    let pages = [];
                                    for(let j = 0;j < 3;j++){
                                        if(!(typeof(usernameList[i*3+j]) =='undefined')){
                                            pages.push(usernameList[i*3+j]);
                                        }
                                    }
                                    this.regUsernameList.push(pages);
                                }
                            }
                        }else{
                            // 注册成功
                            this.regSuccess = true;
                        }
                    }
                }
            },
            continueReg(){
                this.showUserReg = false;
            },
            rememberMe(){
                this.autoLogin = !this.autoLogin
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
    color:#555;
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
div.do_registration {
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
    color:#555;
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

