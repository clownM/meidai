<template>
    <nav class="topbar">
        <div class="nav-container">
            <div class="nav-left" @click='toMeidai()'>
                <div class="logo">
                    <img src="../images/logo/LOGOxiao.png" alt="">
                </div>
                    <span>美戴科技</span>
            </div>
            <div class="nav-right">
                <div class="userinfo" @click='toLogin()'>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class='dropdown-items' >
                            <table class='table-userinfo' :style='{display:dropdownVisible}'>
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
                                        <button>账户管理</button>
                                    </td>
                                </tr>
                            </table>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <span>丨</span>
                <div class="order" @click='toMeidaiUser("/orderlist")'>
                    <span>我的订单</span>
                </div>
                <span>丨</span>
                <div class="cart" :style='{paddingRight:"0"}'>
                    <span>购物车</span>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import {getCookie} from '../config/utils'
    export default{
        data(){
            return{
                username: '登录 / 注册',
                dropdownVisible:'',
                login:false
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
            initLogin(){
                if(getCookie('userUUID')){
                    if(!this.userInfo){
                        this.$store.dispatch('getUserInfo')
                    }
                    this.login = true;
                    this.dropdownVisible = '';
                    this.username = this.userInfo.username;
                } else{
                    this.login = false;
                    this.dropdownVisible = 'none';
                }
            },
            toMeidai(){
                window.open('https://www.meidaitech.com');
            },
            toMeidaiUser(path){
                this.$router.push(path);
            },
            toLogin(){
                // if(this.login){
                //     return
                // }else{
                    this.$router.push('/login');
                // }
            }
        },
        watch:{

        }
    }
</script>   
<style lang='scss'>
    @import '../style/common';
    .topbar{
        width: 100%;
        margin: 0;
        min-width:996px;
        margin-bottom:10px;
        height:50px;
        line-height: 50px;
        background-color: #fff;
        .nav-container{
            width: 1024px;
            margin: 0 auto;
            .nav-left{
                float:left;  
                display:flex;
                .logo{
                    height: 60px;
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
            }
        }
    }
    .table-userinfo{
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
    @media screen and (max-width:1024px){
        .topbar{
            display:none;
        }
    }
</style>
