<template>
    <div class="nav-wrap nav-left" v-if='isPC'>
        <ul>
            <li class='title'>
                <strong>订单中心</strong>
            </li>
            <li>
                <router-link to="">我的订单</router-link>
            </li>
            <li class='title'>
                <strong>账户管理</strong>
            </li>
            <li :class='{active:thisPage == "_userinfo"}'>
                <router-link to='/_userinfo' >个人信息</router-link>
            </li>
            <li :class='{active:thisPage == "newPwd"}'>
                <router-link to='/newPwd'>密码修改</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import {isPC} from '../config/utils'
    export default{
        data(){
            return{
                isPC:null
            }
        },
        props:['thisPage'],
        mounted(){
            if(isPC()){
                this.isPC = true
            }else{
                this.isPC = false
            }
        },
        watch:{
            $route(to,from){
                console.log(to);
                console.log(from);
            }
        }
    }
</script>
<style lang='scss'>
    @import '../style/common';
    .nav-wrap{
        padding-top: 50px;
        padding-bottom: 150px;
        background-color: #fff;
        ul{
            margin-left: 40px;
            li{
                height: 30px;
                line-height: 30px;
                a{
                    color: inherit;
                }
            }
            li.active{
                color:rgb(255, 91, 91);
            }
            li.title{
                height: 50px;
                line-height: 50px;
                font-size: 1.2em;
            }
        }
        .avtive{
            color:rgb(255, 91, 91);
        }
    }
</style>
