<template>
    <div class="home-page">
        <p>美戴官网</p>
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
    .home-page{
        text-align: center;
        padding-top: 100px;
    }
</style>

