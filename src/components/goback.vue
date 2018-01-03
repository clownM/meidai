<template>
    <section class="top-fixed" v-if='!isPC'>
        <div class="go-back" @click="$router.go(-1)">
            <img src="../images/icons/向左.png" alt="" class='icon-back'>
            <b>{{ title }}</b>
        </div>
    </section>
</template>

<script>
import {isPC} from '../config/utils'
    export default{
        data(){
           return{
               isPC:null
           }
        },
        props:['title'],
        mounted(){
            if(isPC()){
                this.isPC = true;
            }else{
                this.isPC = false;
            }
        },
        methods:{

        }
    }
</script>

<style lang='scss'>
@import '../style/common';
.top-fixed {
  width:100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: 1px solid rgb(240, 240, 240);
  z-index: 100;
}

div.go-back {
  width: 50%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  .icon-back{
    width: 20px;
    height: 20px;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
