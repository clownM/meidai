<template>
    <div class="delivery-page">
        <goback title='物流信息'></goback>
        <div class="wrap">
          <ul>
              <li v-for="info in delivery_info">
                  <p class="dot"></p>
                  <p v-text="info.date"></p>
                  <p v-text="info.context"></p>
              </li>
          </ul>
        </div>
    </div>
</template>
<script>
    import goback from '../../components/goback'
    import {mapState,mapMutations} from 'vuex'
    import {queryDelivery} from '../../config/getData'
    import {getSessionStore} from '../../config/utils'
    export default{
        data(){
            return{
                delivery_info:[]
            }
        },
        mounted(){
          this.initData();
        },
        computed:{
            ...mapState([
              'delivery_company','delivery_postid','userInfo'
            ])
        },
        components:{
          goback
        },
        methods:{
            ...mapMutations([
                'SAVE_DELIVERY'
            ]),
            async initData(){
                if(!(this.delivery_company && this.delivery_postid)){
                    this.SAVE_DELIVERY({company:getSessionStore('delivery_company'),postid:getSessionStore('delivery_postid')});
                }
                let res = await queryDelivery(this.delivery_company,this.delivery_postid);
                res = JSON.parse(res.express);
                let datas = res.data;
                console.log(datas);
                datas.forEach(data => {
                    this.delivery_info.push({
                        'date':data.time,
                        'context':data.context
                    })
                });
            }
        },
        watch:{
            userInfo:function(value){
                this.initData()
            }
        }
    }
</script>
<style lang='scss'>
    @import '../../style/common';
    .delivery-page{
        .wrap{
            min-height: 200px;
            padding: 60px 20px 10px;
            background-color: #fff;
            ul{
                li{
                    border-top: 1px dotted #ccc;
                    border-left: 1px dashed rgb(2, 207, 243);
                    position: relative;
                    padding-left: 20px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    .dot{
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        top: 50%;
                        left: -5px;
                        margin-top: -5px;
                        border-radius: 50%;
                        background-color: rgb(255, 90, 90);
                    }
                } 
            }
        }
    }
</style>

