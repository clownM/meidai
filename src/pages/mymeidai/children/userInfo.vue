<template>
    <div class="container">
        <goback title='用户信息'></goback>
        <div class="ullist">
            <ul>
                <li>
                    <router-link to="./">
                        <span>
                            <img src="../../../images/icons/我的.png" alt="">
                        </span>
                        <span>{{ username }}</span>
                        <span>
                            <img src="../../../images/icons/向右.png" alt="">
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="./">
                        <span>
                            <img src="../../../images/icons/phone.png" alt="">
                        </span>
                        <span>{{ phone }}</span>
                        <span>
                            <img src="../../../images/icons/向右.png" alt="">
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="./">
                        <span>
                            <img src="../../../images/icons/性别.png" alt="">
                        </span>
                        <span>{{ gender }}</span>
                        <span>
                            <img src="../../../images/icons/向右.png" alt="">
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="./">
                        <span>
                            <img src="../../../images/icons/生日.png" alt="">
                        </span>
                        <span>{{ birthday }}</span>
                        <span>
                            <img src="../../../images/icons/向右.png" alt="">
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="./switchUser">
                        <span>
                            <img src="../../../images/icons/group_fill.png" alt="">
                        </span>
                        <span>切换关联用户</span>
                        <span>
                            <img src="../../../images/icons/向右.png" alt="">
                        </span>
                    </router>
                </li>
                <li>
                    <a href="./newPwd">
                        <span>
                            <img src="../../../images/icons/lock.png" alt="">
                        </span>
                        <span>修改登录密码</span>
                        <span>
                            <img src="../../../images/icons/向右.png" alt="">
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <button>退出登录</button>
    </div>
</template>
<script>
import goback from '@/components/goback';
import {mapState,mapMutations} from 'vuex';
import {getCookie,setCookie} from '../../../config/utils';
export default{
    data(){
      return{
        username:null,
        phone:'phone',
        gender:'gender',
        birthday:'birthday'
      }
    },
    mounted(){
      this.initData();
    },
    components:{
        goback
    },
    computed:{
      ...mapState([
        'userInfo',
      ])
    },
    methods:{
      initData(){
        if(this.userInfo && this.userInfo.uuid){
          this.username = this.userInfo.username || '暂无用户名';
          this.phone = this.userInfo.phone;
          this.gender = this.userInfo.gender;
          this.birthday = this.userInfo.birthday;
        }
      }
    },
    watch: {
        userInfo: function (value){
            this.initData()
        }
    }
}
</script>
<style lang='scss'>
    @import '../../../style/common';
    .container{
        width:100%;
        height: 100%;
        .ullist{
            margin-top: 60px;
            width: 100%;
            ul{
                width: 100%;
                li{
                    float: left;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    background-color: #fff;
                    border-bottom: 1px solid rgb(240, 240, 240);
                    padding: 0 10px;
                    a{
                        display: block;
                        width: 100%;
                        height: 50px;
                        span:nth-child(2){
                            font-size: 16px
                        }
                        span:last-child{
                            float:right
                        }
                    }
                    img{
                        width: 20px;
                        height: 20px;
                        margin-top: -4px;
                    }
                }
            }
        }
        button{
            width: 90%;
            height: 50px;
            margin-top: 20px;
            margin-left: 5%;
            border-radius: 5px;
            background-color: rgb(255, 91, 91);
            color: #fff;
        }
    }
</style>
