<template>
    <div class="mycontainer">
        <toptitle title='我的美戴'></toptitle>
        <router-link to="/userInfo" class="userInfo router-link" id="userinfo">
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
        </router-link>

        <div class="others-wrap">
            <ul>
                <li>
                    <router-link to='/orderlist' class="router-link">
                        <span><img src="../../images/icons/订单.png" alt=""></span>
                        <span>我的订单</span>
                        <span><img src="../../images/icons/向右.png" alt=""></span>
                    </router-link>
                </li>
                <li>
                    <a href="javascript:0">
                        <span><img src="../../images/icons/坐标.png" alt=""></span>
                        <span>收货地址</span>
                        <span><img src="../../images/icons/向右.png" alt=""></span>
                    </a>
                </li>
            </ul>
        </div>
        <tabs></tabs>
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
        if(this.userInfo && this.userInfo.uuid){
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
        span:nth-child(2) {
          font-size: 16px;
        }
        span:last-child {
          float: right;
        }
      }
    }
    img {
      width: 20px;
      height: 20px;
      margin-top: -4px;
    }
  }
}
</style>

