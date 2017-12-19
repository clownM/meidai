<template>
    <div class="home-page">
        <a href=""></a>
        <iframe src="https:/maochen.fswear.local/meidaitech" frameborder="0" width="100%" height='100%'></iframe>
        <tabs></tabs>
    </div>
</template>
<script>
import tabs from "@/components/tabs";
import {mapState} from 'vuex'
export default {
  data() {
    return {};
  },
  components: {
    tabs
  },
  computed:{
      ...mapState([
          'userInfo'
      ])
  },
  mounted(){
      console.log(this.userInfo);
  }
};
</script>
<style lang="scss" scoped>
    @import '../../style/common.scss';
    .home-page{
        height: 100%;
        padding-bottom: 60px;
    }
</style>

