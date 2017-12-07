<template>
  <div class="orderDetails-page">
      <goback title='订单详情'></goback>
      <div class="orderdetails">
          <div class="status">
                <template v-if="delivery_state != ''">
                        <span v-text="delivery_state"></span>
                </template>
                <template v-else>
                    <span v-text=" orderstatus">{{ orderobj.status }}</span>
                </template>
            </div>
            <div class="wuliu">
                <div class="wuliu-top">
                    <span v-text="delivery_postid"></span>
                    <span v-text="delivery_company"></span>
                </div>
                <p v-text="delivery_context" class="delivery_context"></p>
                <p v-text="delivery_date"></p>
            </div>
            <div class="userinfo">
                |-----收货人信息-----|
            </div>
            <div class="shop"> {{ orderobj.station }} </div>
            <div class="orderinfo">
                <!--startprint-->
                <div id="printPage">
                    <table>
                        <caption>验光参数</caption>
                        <tr>
                            <th></th>
                            <th>左眼</th>
                            <th>右眼</th>
                        </tr>
                        <tr>
                            <th>度数</th>
                            <td v-text="left_degrees"></td>
                            <td v-text="right_degrees"></td>
                        </tr>
                        <tr>
                            <th>散光</th>
                            <td v-text="left_cyl"></td>
                            <td v-text="right_cyl"></td>
                        </tr>
                        <tr>
                            <th>轴距</th>
                            <td v-text="left_axis"></td>
                            <td v-text="right_axis"></td>
                        </tr>
                        <tr>
                            <th>瞳距</th>
                            <td colspan="2" style="text-align:center" v-text="pupilDistancs"></td>
                        </tr>
                    </table>
                    <table>
                        <caption>镜框参数</caption>
                        <tr>
                            <th></th>
                            <th>镜框</th>
                            <th>镜腿</th>
                        </tr>
                        <tr>
                            <th>镜型</th>
                            <td class="frameimg">
                                <div :style="{backgroundPosition:+lensProfileFile_img.left+'px '+lensProfileFile_img.left+'px'}"></div>
                                <!-- <div :style="{backgroundPosition:'-101px -168px'}"></div> -->
                            </td>
                            <td class="legimg">
                                <img :src="legProfile" alt="">
                            </td>
                        </tr>
                        <tr>
                            <th>颜色</th>
                            <td class="colorwrap">
                                <span class="colorblock" :style="{background:frameColor}"></span>
                                <span v-text="frameColor"></span>
                            </td>
                            <td class="colorwrap">
                                <span class="colorblock" :style="{background:frameColor}"></span>
                                <span v-text="legColor"></span>
                            </td>
                        </tr>
                    </table>
                    <table class="jingkuang2">
                        <tr>
                            <th>镜框比</th>
                            <td colspan="3" v-text="widthScale"></td>
                        </tr>
                        <tr>
                            <th>鼻中位</th>
                            <td colspan="3" v-text="heightScale"></td>
                        </tr>
                        <tr>
                            <th>鼻中宽</th>
                            <td colspan="3" v-text="bridgeSpanRatio"></td>
                        </tr>
                    </table>
                    <table style="table-layout:fixed">
                        <caption>刻字</caption>
                        <tr>
                            <th>镜框左</th>
                            <td v-text="slotMessage1"></td>
                            <th>镜框右</th>
                            <td v-text="slotMessage2"></td>
                        </tr>
                        <tr>
                            <th>镜腿</th>
                            <td v-text="legMessage1"></td>
                            <td v-text="legMessage2"></td>
                            <td v-text="legMessage3"></td>
                        </tr>
                    </table>
                </div>
                <!--endprint-->
                <button id="print">打印</button>
                <div id="clearBoth"></div>
            </div>


            <div class="price">
                订单价格：
                <span v-text="'  ￥'+price"></span>
            </div>
            <div class="orderdate">
                <div class="orderuuid">orderuuid：{{ orderuuid }}</div>
                <div class="ordertime">order.createdate：{{ orderCreatedate }}</div>
                <div class="dealuuid">dealuuid：{{ dealuuid }}</div>
                <div class="dealcreatedate">deal.createdate：{{ dealobj.createDate }}</div>
            </div>
      </div>
  </div>
</template>
<script>
    import goback from '../../../components/goback'
    import {mapState,mapMutations} from 'vuex'
    import {getSessionStore} from '../../../config/utils'
    import {get_glass_data} from '../../../config/fswear'
    import {queryOrder} from '../../../config/getData'
    export default{
        data(){
            return{
                orderstatus: "", //订单状态
                station: "", //扫描预约门店
                right_degrees: "", //右眼度数
                right_cyl: "", //右眼散光
                right_axis: "", //右眼轴距
                left_degrees: "", //左眼度数   
                left_cyl: "", //左眼散光
                left_axis: "", //左眼轴距
                pupilDistancs: "", //瞳距
                widthScale: "", //镜框比
                heightScale: "", //鼻中位
                bridgeSpanRatio: "", //鼻中宽   
                slotMessage1: "", //镜框刻字
                slotMessage2: "",
                legMessage1: "", //镜腿刻字
                legMessage2: "",
                legMessage3: "",
                lensProfileFile: "",
                lensProfileFile_img: {},
                frameColor: "", //镜框颜色
                legProfile: "", //镜框图片
                legColor: "", //镜腿颜色

                price: "", //价格

                delivery_state: "",
                delivery_company: "", //快递公司
                delivery_postid: "", //快递单号
                delivery_context: "", //最近一条快递内容
                delivery_date: "", //最近一条快递时间

                orderuuid: "",
                orderCreatedate: "", //订单创建时间
                dealuuid: "",
                dealcreatedate: "",

                orderobj:{},
                dealobj:{},
                glassdataobj:{}
                
            }
        },
        mounted(){
            this.initData();
        },
        components:{
            goback
        },
        computed:{
            ...mapState([
                'orderObj','dealObj'
            ])
        },
        methods:{
            ...mapMutations([
               'ORDEROBJ' 
            ]),
            async initData(){
                this.$nextTick(function () {
                    let orderobj = getSessionStore('orderobj');
                console.log(orderobj.config);
               
                
                // let _obj = await get_glass_data(orderobj);
                // if(_obj){
                //     this.glassdataobj = this._obj;
                // }else{
                //     console.log('获取眼镜数据失败')
                // }
                // this.orderobj = this.orderObj;
                // this.dealobj = this.dealObj;
 })
            }
        },
        watch:{

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

