<template>
    <div class="mycontainer">
        <toptitle title='我的美戴'></toptitle>
        <div  class="userInfo router-link" id="userinfo" @click="$router.push('/userInfo')">
            <div class="avatar" id="avatar">
                <img src="../../images/touxiang.png" alt="">
            </div>
            <div class="username-and-phone">
                <p class="username" id="username">{{username}}</p>
                <p class="phone" id="phone">{{phone}}</p>
            </div>
            <div class="userInfo-right">
                <img src="../../images/icons/向右white.png" alt="">
            </div>
        </div>

        <div class="others-wrap">
            <ul class='clear'>
                <li>
                    <router-link to='/orderlist' class="router-link">
                        <div class='aside'>
                            <img src="../../images/icons/订单.png" alt="">
                        </div>
                        <div class="right">
                            <span>我的订单</span>
                            <img src="../../images/icons/向右.png" alt="">
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to='' class='router-link'>
                      <div class="aside">
                        <img src="../../images/icons/坐标.png" alt="">
                      </div>
                      <div class="right">
                        <span>收货地址</span>
                        <img src="../../images/icons/向右.png" alt="">
                      </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <tabs></tabs>
        <!-- <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition> -->
    </div>
</template>
<script>
import toptitle from '@/components/toptitle';
import tabs from '@/components/tabs';
import {mapState,mapMutations} from 'vuex';
import {getCookie,setCookie} from '../../config/utils';
export default{
    data(){
      return{
        username:'登录/注册',
        avatar:'../../images/touxiang.png',
        phone:''
      }
    },
    mounted(){
      this.initData();
    },
    components:{
        toptitle,tabs
    },
    computed:{
      ...mapState([
        'userInfo',
      ])
    },
    methods:{
      initData(){
        if(getCookie('UserUUID')){
          if(!this.userInfo){
            this.$store.dispatch('getUserInfo');
          }
          this.username = this.userInfo.username || '暂无用户名';
          this.phone = this.userInfo.phone;
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
<style lang="scss">
@import "../../style/common.scss";
@import "../../style/fswear";
.userInfo {
  margin-top: 50px;
  width: 100%;
  background-color: rgb(11, 227, 253);
  padding: 20px 10px;
  color: white;
  .avatar {
    width: 60px;
    height: 60px;
    float: left;
    margin-right: 10px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .username-and-phone {
    height: 60px;
    display: inline-block;
    p {
      margin-bottom: 0;
    }
    p.username {
      height: 40px;
      line-height: 20px;
      font-size: 30px;
    }
    p.phone {
      height: 20px;
      line-height: 20px;
      font-size: 16px;
    }
  }
  .userInfo-right {
    height: 60px;
    float: right;
    img {
      width: 20px;
      height: 20px;
      margin-top: 20px;
    }
  }
}

.others-wrap {
  margin-top: 10px;
  width: 100%;
  ul {
    width: 100%;
    li {
      float: left;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      border-bottom: 1px solid rgb(240, 240, 240);
      padding: 0 10px;
      .router-link {
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
}
.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>

