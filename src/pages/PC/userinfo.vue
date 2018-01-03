<template>
    <div class="pc-userinfo-page">
        <navbar></navbar>
        <div class="container">
            <navLeft class='nav-left' thisPage='_userinfo'></navLeft>
            <div class="content">

            </div>
        </div>
    </div>
</template>
<script>
import  navbar from '../../components/navbar'
import navLeft from '../../components/nav_left'    
export default{
    data(){
        return{

        }
    },
    components:{
        navbar,navLeft
    }
}
</script>
<style lang='scss'>
@import '../../style/common';
.pc-userinfo-page{
    width:100%;
    height:100%;
    .container{
        width: 1226px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        .nav-left{
            flex:1;
        }
        .content{
            flex:4;
            background-color: #fff;
            margin-left: 10px;
        }
    }
}
</style>
