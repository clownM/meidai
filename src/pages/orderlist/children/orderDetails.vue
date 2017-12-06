<template>
  <div class="orderDetails-page">
      <goback title='订单详情'></goback>
      <div class="wrap">
          <p>订单详情页面</p>
      </div>
  </div>
</template>
<script>
    import goback from '../../../components/goback'
    export default{
        data(){
            return{
    
            }
        },
        mounted:{

        },
        components:{
            goback
        },
        methods:{
            
        }
    }
</script>
<style lang='scss'>
    @import '../../../style/common';
    .orderDetails-page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 101;
        padding-top: 50px;
        .wrap{

        }
    }
</style>

