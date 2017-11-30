<template>
    <div class="top-fixed">
        <div class="go-back">
            <span class="icon-back"></span>
            <p>{{ title }}</p>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
           
        },
        props:['title']
    }
</script>

<style>
.top-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid rgb(240, 240, 240);
  z-index: 9999;
}

div.go-back {
  width: 50%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
}

.go-back .icon-back {
  width: 20px;
  height: 20px;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  /* background-color: yellowgreen; */
  background-image: url("/src/images/icons/向左.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
