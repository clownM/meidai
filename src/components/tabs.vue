<template>
    <div class="user-tabs" v-if='!isPC'>
        <div class="user-tabs-wrap">
            <div class="user-tabs-tab" id="meidaitech" @click="gotoAddress('/home')">
                <img src="../images/icons/首页.png" alt="" class="tab-icon">
                <!-- <div class="icon"></div> -->
                <div>主页</div>
            </div>
            <div class="user-tabs-tab" id="index" @click="gotoAddress('/mall')">
                <img src="../images/icons/购物袋.png" alt="" class="tab-icon">
                <!-- <div class="icon"></div> -->
                <div>商城</div>
            </div>
            <div class="user-tabs-tab" id="cart" @click="gotoAddress('/shoppingCart')">
                <img src="../images/icons/购物车.png" alt="" class="tab-icon">
                <!-- <div class="icon"></div> -->
                <div>购物车</div>
            </div>
            <div class="user-tabs-tab" id="mymeidai" @click="gotoAddress('/mymeidai')">
                <img src="../images/icons/我的.png" alt="" class="tab-icon">
                <div>我的美戴</div>
            </div>
        </div>
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
        created(){
           
        },
        mounted(){
            if(isPC()){
                this.isPC = true;
            }else{
                this.isPC = false;
            }
        },
        methods: {
            init(){

            },
        	gotoAddress(path){
        		this.$router.push(path)
            },
        },
    }
</script>

<style lang='scss'>
/* 移动端底部tabs */
@import '../style/common.scss';
.user-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #ccc;
  background-color: #fff;
}

.user-tabs-wrap {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
}

.user-tabs-tab {
  text-align: center;
}

.tab-icon {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}
</style>
