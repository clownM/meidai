<template>
    <div class="top-fixed">
        <p>{{ title }}</p>
    </div>
</template>
<script>
    export default{
        data() {
            return {

            }
        },
        props:['title']
    }
</script>
<style lang='scss'>
    @import '../style/common';
    .top-fixed{
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        border-bottom: 1px solid rgb(240, 240, 240);
        z-index: 9999;
        text-align: center;
        line-height: 50px;
    }
</style>
