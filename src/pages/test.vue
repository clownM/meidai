<template>
    <div class="wrap">
        <div class="header">
            header
        </div>
        <div class="main">
            <div class="left">
                left
            </div>
            <div class="mid">
                mid
            </div>
            <div class="right">
                right
            </div>
        </div>
        <div class="footer">
            footer
        </div>
    </div>
</template>
<script>
    
</script>
<style lang='scss'>
.wrap{
    display: flex;
    height:100%;
    flex-direction: column;
    // align-items:stretch;
    // justify-content: space-between;
    background-color: yellow;
    .main{
        flex:1;
        display:flex;
        // flex-direction: row;
        .left{
            width: 120px;
            // height: 100%;
            // flex:1;
            border-right: 1px solid #ccc;
        }
        .mid{
            flex:100;
        }
        .right{
            flex:1;
        }
    }
    .header{
        height: 60px;
        line-height: 60px;
        background-color: rgb(100, 255, 255)
    }
    
    .footer{
        height: 60px;
        line-height: 60px;
        background-color: rgb(255, 100, 100);
    }
}
</style>
