<template>
    <div class='cart-page'>
        <p>购物车</p> 
        <tabs></tabs>
    </div>
</template>
<script>
    import tabs from '../../components/tabs'
    export default{
        components:{
            tabs
        }
    }
</script>
<style lang='scss'>
@import '../../style/common';
    .cart-page{
        text-align: center;
        padding-top: 100px;
    }
</style>

