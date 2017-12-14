<template>
    <div class="userInfo-page">
        <goback title='用户信息'></goback>
        <section>
            <router-link to="/userInfo/newUsername" class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/我的.png" alt="">
                </div>
                <div class="right">
                    <span>{{ username }}</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <section>
            <div class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/phone.png" alt="">
                </div>
                <div class="right">
                    <span>{{ phone }}</span>
                    <!-- <img src="../../images/icons/向右.png" alt=""> -->
                    <div></div>
                </div>
            </div>
        </section>
        <section>
            <router-link to="/" class='router-link'>
                <div class=''aside>
                    <img src="../../images/icons/性别.png" alt="">
                </div>
                <div class="right">
                    <span>{{ gender }}</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <section>
            <router-link to="/" class='router-link'>
                <div class='right'>
                    <img src="../../images/icons/生日.png" alt="">
                </div>
                <div class='right'>
                    <span>{{ birthday }}</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <section>
            <router-link to="/switchUser" class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/group_fill.png" alt="">
                </div>
                <div class='right'>
                    <span>切换关联用户</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <section>
            <router-link to="/userInfo/newPwd" class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/lock.png" alt="">
                </div>
                <div class='right'>
                    <span>修改登录密码</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <div class='btn-wrap-app'>
            <button @click="logout">退出登录</button>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import goback from '@/components/goback';
import {mapState,mapMutations} from 'vuex';
import {getCookie,setCookie,delCookie} from '../../config/utils';
export default{
    data(){
      return{
        username:null,
        phone:null,
        gender:null,
        birthday: null
      }
    },
    mounted(){
        this.initData();
        this.$router.go(0);

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
        ...mapMutations([
            'LOGOUT'
        ]),
        initData(){                             
            if(!this.userInfo){
                this.$store.dispatch('getUserInfo')
            }
            this.username = this.userInfo.username;
            this.phone = this.userInfo.phone;
            this.gender = this.userInfo.gender || '';
            this.birthday = this.userInfo.birthday || '';
        },
        async logout(){
            this.LOGOUT();
            delCookie('UserUUID');
            this.$router.push('/login')
        }
    },

    watch: {
        userInfo: function (value){
            if(value){
                this.username = value.username;
                this.phone = value.phone;
                this.gender = value.gender;
                this.birthday = value.birthday;
            }
        }
    }
}
</script>
<style lang='scss'>
@import '../../style/common';
@import '../../style/fswear';
    .userInfo-page{
        width:100%;
        padding-top: 60px;
        section{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            border-bottom: 1px solid rgb(240, 240, 240);
            padding: 0 10px;
            .router-link{
                width: 100%;
                height: 50px;
                display: flex;
                .aside{
                    width: 30px;
                    display: flex;
                    align-items: flex-start;
                    align-items: center;
                }
                .right{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                img{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>
