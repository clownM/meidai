<template>
  <div class="orderDetails-page" :style="{marginLeft:-marginLeft + 'px'}">
      <goback title='订单详情'></goback>
      <div class="orderdetails">
          <div class="status">
                <template v-if="dely_state != ''">
                        <span v-text="dely_state"></span>
                </template>
                <template v-else>
                    <span v-text=" orderstatus">{{ orderstatus }}</span>
                </template>
            </div>
            <div class="wuliu">
                <div v-if='wuliuInfo'>
                    <div class="wuliu-top">
                        <span v-text="dely_postid"></span>
                        <span v-text="dely_company"></span>
                    </div>
                    <p v-text="dely_context" class="delivery_context"></p>
                    <p v-text="dely_date"></p>
                </div>
                <div v-else class='wuliuNone'>
                    暂无物流信息
                </div>
            </div>
            <div class="userinfo">
                |-----收货人信息-----|
            </div>
            <div class="shop">{{ station }} </div>
            <div class="orderinfo clear">
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
                <button id="print" v-if='isPC'>打印</button>
            </div>


            <div class="price">
                订单价格：
                <span v-text="'  ￥'+price"></span>
            </div>
            <div class="orderdate">
                <div class="orderuuid">orderuuid：{{ orderuuid }}</div>
                <div class="ordertime">order.createdate：{{ orderCreatedate }}</div>
                <div class="dealuuid">dealuuid：{{ dealuuid }}</div>
                <div class="dealcreatedate">deal.createdate：{{ dealCreatedate }}</div>
            </div>
      </div>
  </div>
</template>
<script>
    import goback from '../../../components/goback'
    import {mapState,mapMutations} from 'vuex'
    import {getSessionStore} from '../../../config/utils'
    import {get_glass_data,formatDate,getStatus,get_delivery_status} from '../../../config/fswear'
    import {queryOrder,queryDeal,queryDelivery} from '../../../config/getData'
    export default{
        data(){
            return{
                marginLeft:0,
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

                wuliuInfo:true,
                dely_state: "",
                dely_company: "", //快递公司
                dely_postid: "", //快递单号
                dely_context: "", //最近一条快递内容
                dely_date: "", //最近一条快递时间

                orderuuid: "",
                orderCreatedate: "", //订单创建时间
                dealuuid: "",
                dealCreatedate: "",

                isPC:false
                
            }
        },
        mounted(){
            this.getMarginLeft();
            this.initData();
        },
        components:{
            goback
        },
        computed:{
            ...mapState([
                'orderObj','dealObj'
            ]),
            
        },
        methods:{
            ...mapMutations([
                'SAVE_DELIVERY'
            ]),
            async initData(){
                if (!this.orderObj) {
                    await this.$store.dispatch('getOrderObj');
                }
                if (!this.dealObj) {
                    await this.$store.dispatch('getDealObj');
                }

                let paymentstatus = this.dealObj.paymentstatus;
                if(paymentstatus == 'topay'){
                    this.orderstatus = '待支付';
                }else{
                    this.orderstatus = getStatus(this.dealObj.status);
                }

                this.station = this.orderObj.station;

                let res = await get_glass_data(this.orderObj);
                if(res){
                    this.right_degrees = res.right_degrees;
                    this.right_cyl = res.right_cyl;
                    this.right_axis = res.right_axis;
                    this.left_degrees = res.left_degrees;
                    this.left_cyl = res.left_cyl;
                    this.left_axis = res.left_axis;
                    this.pupilDistancs = res.pupilDistancs;
                    this.widthScale = res.widthScale;
                    this.heightScale = res.heightScale;
                    this.bridgeSpanRatio = res.bridgeSpanRatio;
                    this.slotMessage1 = res.slotMessage1;
                    this.slotMessage2 = res.slotMessage2;
                    this.legMessage1 = res.legMessage1;
                    this.legMessage2 = res.legMessage2;
                    this.legMessage3 = res.legMessage3;

                    this.price = res.price || 0;
                }

                this.orderuuid = getSessionStore('orderuuid');
                this.dealuuid = getSessionStore('dealuuid');
                this.orderCreatedate = formatDate(this.orderObj.createdate,'long') ;
                this.dealCreatedate = formatDate(this.dealObj.createdate,'long');

                let _delivery = this.dealObj.delivery,
                    _company = '',
                    _postid = '';
                if(_delivery != ''){
                    this.wuliuInfo = true;
                    _delivery = JSON.parse(_delivery);
                    if (_delivery.postprocessing_delivery == undefined) {
                        _company = _delivery.production_delivery.courier_company;
                        _postid = _delivery.production_delivery.courier_number;
                    } else {
                        _company = _delivery.postprocessing_delivery.courier_company;
                        _postid = _delivery.postprocessing_delivery.courier_number;
                    }
                    let res2 = await queryDelivery(_company,_postid)
                    this.wuliuInfo = true;
                    res2 = JSON.parse(res2.express);
                    this.dely_state = get_delivery_status(res2.state);
                    let datas = res2.data;
                    this.dely_company = _company;
                    this.dely_postid = _postid;
                    this.dely_context = datas[0].context;
                    this.dely_date = datas[0].time;
                }else{
                    this.wuliuInfo = false;
                }
            },
            getMarginLeft:function(){
                let width = document.getElementsByClassName('orderDetails-page')[0].offsetWidth;
                let marginLeft = width / 2;
                this.marginLeft = marginLeft; 
            }
        },
        watch: {
            userInfo: function (value){
            this.initData()
        }
  }
    }
</script>
<style lang='scss'>
    @import '../../../style/common';
    .orderDetails-page{
        position: fixed;
        width: 100%;
        max-width: 768px;
        height: 100%;
        top: 0;
        left: 50%;
        background-color: #f5f5f5;
        z-index: 101;
        padding-top: 60px;
        height: 100%;
        overflow: auto;
        .orderdetails{
            div{
                padding-left: 10px;
                padding-right: 10px;
            }
            .status,
            .wuliu,
            .userinfo,
            .shop,
            .orderinfo {
                background-color: #fff;
            }
            .status{
                width: 100%;
                height: 40px;
                line-height: 40px;
                /* text-align: right; */
                background-color: rgb(11, 227, 253);
                color:#fff;
            }
            .wuliu {
                width: 100%;
                min-height: 40px;
                border-bottom: 1px solid #ccc;
                .wuliu-top{
                    display: flex;
                    justify-content: space-between;
                }
                p.delivery_context{
                    font-size: 20px;
                }
                .wuliuNone{
                    text-align: center;
                    line-height: 40px;
                }
            }
            .userinfo {
                width: 100%;
                height: 80px;
                margin-bottom: 10px;
                text-align: center;
            }

            .shop {
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ccc
            }

            .orderinfo {
                width: 100%;
                padding-top: 10px;
                padding-bottom: 10px;
                table{
                    width: 100%;
                    border-collapse: collapse;
                    caption{
                        text-align: left;
                    }
                    tr{
                        width: 100%;
                        height: 50px;
                        th,td{
                            border: 1px solid #ccc;
                            text-align: center;
                            height: 50px;
                            border-collapse: collapse;
                        }
                    }
                }
            }
            .frameimg>div{
                width: 80px;
                height: 100%;
                margin: 0 auto;
                /* background-color: #ccc; */
                background: url("");
                background-size: 283px 325px;
                background-attachment: scroll;
                background-repeat: no-repeat;
                /* background-position:-100px -105px; */
            }
            .legimg img {
                max-width: 80px;
            }

            .jingkuang2 {
                table-layout: fixed;
                tr{
                    td,th{
                        width: 50%;
                    }
                }
                tr:first-child{
                    th,td{
                        border-top: none;
                    }
                }
            }
            .colorblock {
                display: inline-block;
                width: 20px;
                height: 20px;
                border-radius: 10px;

            }
            .orderdate{
                width: 100%;
                margin-top: 10px;
                margin-bottom: 10px;
                padding: 10px;
                background-color: #fff;
                font-size: 12px;
                color:#555;
            }
            .price{
                width: 100%;
                background-color: #fff;
                min-height: 40px;
                line-height: 40px;
                text-align: right;
                border-top: 1px solid rgb(240, 240, 240);
            }
            #print{
                width: 100px;
                height: 30px;
                margin-top: 5px;
                float: right;
                background-color: rgb(255, 92, 92);
                color:#fff;
                border-radius: 8px;
            }

        }
    }
</style>

