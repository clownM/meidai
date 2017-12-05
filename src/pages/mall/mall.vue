<template>
    <div class="mallindex">
        <p>商城首页</p>
        <button @click="$router.push('/userInfo')">跳转链接</button>
        <tabs></tabs>
    </div>
</template>
<script>
import tabs from "@/components/tabs";
export default {
  data() {
    return {};
  },
  components: {
    tabs
  }
};
</script>
<style lang="scss" scoped>
    @import '../../style/common.scss';
    div.mallindex{
        text-align: center;
        padding-top: 100px;
    }
</style>

