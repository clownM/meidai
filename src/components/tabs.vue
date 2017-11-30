<template>
    <div class="user_tabs">
        <div class="user_tabs_wrap">
            <div class="user_tabs_tab" id="meidaitech" @click="gotoMeidai()">
                    <img src="/src/images/icons/首页.png" alt="" class="tab_icon">
                    <!-- <div class="icon"></div> -->
                    <div>主页</div>
            </div>
            <div class="user_tabs_tab" id="index">
                <img src="/src/images/icons/购物袋.png" alt="" class="tab_icon">
                <!-- <div class="icon"></div> -->
                <div>商城</div>
            </div>
            <div class="user_tabs_tab" id="cart">
                <img src="/src/images/icons/购物车.png" alt="" class="tab_icon">
                <!-- <div class="icon"></div> -->
                <div>购物车</div>
            </div>
            <div class="user_tabs_tab" id="mymeidai" @click="gotoAddress('/mymeidai')">
                <img src="/src/images/icons/我的.png" alt="" class="tab_icon">
                <div>我的美戴</div>
            </div>
        </div>
    </div>
</template>

<script>
    // import {mapState} from 'vuex'
    export default{
        data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        // computed: {
        //     ...mapState([
        //         'geohash'
        //     ]),
        // },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
            },
            gotoMeidai(){
                window.location.href = 'https://www.meidaitech.com';
            }
        },
    }
</script>

<style lang='scss'>
/* 移动端底部tabs */
@import '../style/common.scss';
.user_tabs {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #ccc;
  background-color: #fff;
}

.user_tabs_wrap {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
}

.user_tabs_tab {
  text-align: center;
}

.tab_icon {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}
</style>
