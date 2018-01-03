<template>
    <nav class="topbar" v-if='isPC'>
        <div class="nav-container">
            <div class="nav-left" @click='toMeidai()'>
                <div class="logo">
                    <img src="../images/logo/LOGOxiao.png" alt="">
                </div>
                <span>美戴科技</span>
            </div>
            <div class="nav-right">
                <div class="isLogin">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class='dropdown-items' >
                            <table class='table-islogin'>
                                <tr>
                                    <td class='avatar'>
                                        <img src="../images/touxiang.png" alt="" >
                                    </td>
                                    <td>
                                        <button @click='logout'>退出登录</button>    
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <button @click="toMeidaiUser('/_userinfo')">账户管理</button>
                                    </td>
                                </tr>
                            </table>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- <div class="noLogin" @click="toMeidaiUser('/login')" v-else>
                    登录&nbsp;/&nbsp;注册
                </div> -->
                
                <span>丨</span>
                <div class="order" @click='toMeidaiUser("/orderlist")'>
                    <span>我的订单</span>
                </div>
                <span>丨</span>
                <div class="cart" :style='{paddingRight:"0"}' @click='toMeidaiUser("/shoppingCart")'>
                    <span class='icon-cart'></span> <span>购物车</span> <span v-show="cartItemNums > 0"> ({{ cartItemNums }}) </span>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import {getCookie,delCookie,isPC} from '../config/utils'
    export default{
        data(){
            return{
                username: null,
                isLogin:true,
                cartItemNums:0,
                isPC:null
            }
        },
        mounted(){
            this.initLogin();
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        methods:{
            ...mapMutations([
                'LOGOUT'
            ]),
            initLogin(){
                if(getCookie('UserUUID')){
                    if(!this.userInfo){
                        this.$store.dispatch('getUserInfo')
                    }
                    this.isLogin = true;
                    this.username = this.userInfo.username || '暂无用户名';
                } else{
                    this.isLogin = false;
                }
                if(isPC()){
                    this.isPC = true;
                }else{
                    this.isPC = false;
                }
            },
            toMeidai(){
                window.open('https://www.meidaitech.com');
            },
            toMeidaiUser(path){
                this.$router.push(path);
            },
            toLogin(){
                if(this.isLogin){
                    return
                }else{
                    this.$router.push('/login');
                }
            },
            async logout(){
                this.LOGOUT();
                delCookie('UserUUID');
                this.$router.push('/login')
            }
        },
        watch:{
            userInfo:function(val){
                if(val){
                    this.username = val.username || '暂无用户名';
                }       
            }
        }
    }
</script>   
<style lang='scss'>
    @import '../style/common';
    .el-popper[x-placement^=bottom]{
        margin-top:5px;
    }
    .topbar{
        font-size:14px;
        width: 100%;
        min-width:1226px;
        margin-bottom:10px;
        height:50px;
        line-height: 50px;
        background-color: #fff;
        .nav-container{
            width: 1226px;
            margin: 0 auto;
            .nav-left{
                float:left;  
                display:flex;
                .logo{
                    height: 50px;
                    padding-right: 10px;
                    img{
                        height: 40px;
                        margin-top:5px;
                    }
                }
            }
            .nav-right{
                float:right;
                display:flex;
                div{
                    padding:0 10px;
                }
                .cart{
                    .icon-cart{
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        background-image: url('../images/icons/购物车.png');
                        background-size: 100%;
                    }
                }
            }
        }
    }
    .table-islogin{
        tr{
            td{
                width: 80px;
                text-align:center;
                button{
                    background-color: #fff;
                }
                button:hover{
                    cursor: pointer;
                }
            }
            td.avatar{
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
        }
    }
    .nav-left:hover,
    .nav-right>div:hover{
        cursor: pointer;
    }
</style>
