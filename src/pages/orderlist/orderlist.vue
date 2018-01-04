<template>
    <div class='orderlist-page'>
        <navbar></navbar>
        <div class="container">
            <navLeft thisPage='orderlist'></navLeft>
            <div class='_content'>
                <goback title='订单列表'></goback>
                <div class="content" id="content">
                    <div class="tabs-body" id="tabs-body">
                        <div class="tabs-head">
                            <ul class="tabs-ul clear">
                                <li>
                                    <a href="javascript:0" v-bind:class='{active:(0 == i || isActive == true)}' @click='tabsToggle(0)'>全部</a>
                                </li>
                                <li>
                                    <a href="javascript:0" v-bind:class='{active:1 == i}' @click='tabsToggle(1)'>待扫描</a>
                                </li>
                                <li>
                                    <a href="javascript:0" v-bind:class='{active:2 == i}' @click='tabsToggle(2)'>待支付</a>
                                </li>
                                <li>
                                    <a href="javascript:0" v-bind:class='{active:3 == i}' @click='tabsToggle(3)'>生产中</a>
                                </li>
                                <li>
                                    <a href="javascript:0" v-bind:class='{active:4 == i}' @click='tabsToggle(4)'>待收货</a>
                                </li>
                            </ul>
                        </div>
                        <!-- 全部订单 -->
                        <div class="tabs-contents" v-bind:class='{active:(i == 0 || isActive == true)}'>
                            <div class="failorder" v-if="isEmpty(toscan_array) && isEmpty(topay_array) && isEmpty(printing_array) && isEmpty(delivering_array) && isEmpty(done_array)">
                                1没有相关订单
                            </div>
                            <div v-else>
                                <!-- 全部/待扫描 -->
                                <div class="order" v-for="(order,index) in toscan_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="order.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderno">订单编号：
                                            <span v-text="order.orderuuid"></span>
                                        </div>
                                        <div class="createdate">订单创建时间:
                                            <span v-text="order.createdate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="order.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="order.appointmentdate"></span>
                                        </div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="cancelOrder" @click='cancel(order.orderuuid)'>取消预约</button>
                                    </div>
                                </div>
                                <!--  全部/待支付-->
                                <div class="order" v-for="(deal,index) in topay_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid
                                            <span v-text="deal.orderuuid"></span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="">付款</button>
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                                <!-- 全部/生产中 -->
                                <div class="order" v-for="(deal,index) in printing_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid
                                            <span v-text="deal.orderuuid"></span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="">催单</button>
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                                <!-- 全部/待收货 -->
                                <div class="order" v-for="(deal,index) in delivering_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid
                                            <span v-text="deal.orderuuid"></span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="to_delivery" @click='toDelivery(deal.delivery_company,deal.delivery_postid)'>查看物流</button>
                                        <button class="">确认收货</button>
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                                <!-- 全部/已收货 -->
                                <div class="order" v-for="(deal,index) in done_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid
                                            <span v-text="deal.orderuuid"></span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 待扫描 -->
                        <div class="tabs-contents div-toscan" v-bind:class='{active:i == 1}'>
                            <div class="failorder" v-if="isEmpty(topay_array)">
                                2没有相关订单
                            </div>
                            <div v-else>
                                <div class="order" v-for="(order,index) in toscan_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="order.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid：
                                            <span v-text="order.orderuuid"></span>
                                        </div>
                                        <div class="createdate">订单创建时间:
                                            <span v-text="order.createdate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="order.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="order.appointmentdate"></span>
                                        </div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="cancelOrder" @click='cancel(order.orderuuid)'>取消预约</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 待支付 -->
                        <div class="tabs-contents div-topay" v-bind:class='{active:i == 2}'>
                            <div class="failorder" v-if="isEmpty(topay_array)">
                                3没有相关订单
                            </div>
                            <div v-else>
                                <div class="order" v-for="(deal,index) in topay_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">
                                            orderuuid: <span>{{deal.orderuuid}}</span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="">付款</button>
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 生产中 -->
                        <div class="tabs-contents div-printing" v-bind:class='{active:i == 3}'>
                            <div class="failorder" v-if="isEmpty(printing_array)">
                                4没有相关订单
                            </div>
                            <div v-else>
                                <div class="order" v-for="(deal,index) in printing_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid
                                            <span v-text="deal.orderuuid"></span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="">催单</button>
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 待收货 -->
                        <div class="tabs-contents div-delivering" v-bind:class='{active:i == 4}'>
                            <div class="failorder" v-if="isEmpty(delivering_array)">
                                5没有相关订单
                            </div>
                            <div v-else>
                                <div class="order" v-for="(deal,index) in delivering_array">
                                    <div class="order-header">
                                        <div></div>
                                        <div class="status" v-text="deal.status"></div>
                                    </div>
                                    <div class="order-body">
                                        <div class="orderuuid">orderuuid
                                            <span v-text="deal.orderuuid"></span>
                                        </div>
                                        <div class="dealuuid">dealuuid:
                                            <span v-text="deal.dealuuid"></span>
                                        </div>
                                        <div class="createdate">order创建时间:
                                            <span v-text="deal.orderCreatedate"></span>
                                        </div>
                                        <div class="station">预约扫描地址：
                                            <span v-text="deal.station"></span>
                                        </div>
                                        <div class="appointmentdate">预约扫描时间：
                                            <span v-text="deal.appointmentdate"></span>
                                        </div>
                                        <div class="scandate">实际扫描时间：
                                            <span v-text="deal.scandate"></span>
                                        </div>
                                        <div class="dealCreatedate">deal创建时间：
                                            <span v-text="deal.dealCreatedate"></span>
                                        </div>
                                        <div class="price" v-text="'合计： ￥ '+deal.price"></div>
                                    </div>
                                    <div class="order-footer">
                                        <button class="to_delivery" @click='toDelivery(deal.delivery_company,deal.delivery_postid)'>查看物流</button>
                                        <button class="">确认收货</button>
                                        <button class="to_order_details" @click="toOrderDetails(deal.orderuuid,deal.dealuuid)">订单详情</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <transition name="router-slid" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import goback from "@/components/goback";
import navbar from "@/components/navbar";
import navLeft from '@/components/nav_left'
import {mapState,mapMutations} from 'vuex';
import { queryOrder,cancelOrder,queryDeal } from "@/config/getData"
import {formatDate,getStatus} from '../../config/fswear'
import {getCookie,setSessionStore} from '../../config/utils'
export default {
  data() {
    return {
      marginLeft:0,
      ordersArray: [],
      toscan_array: [],
      topay_array: [],
      printing_array: [],
      delivering_array: [],
      done_array: [],

      i: 0,
      isActive:true
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    goback,navbar,navLeft
  },
  computed: {
      ...mapState([
          'userInfo'
      ]),
  },
  methods: {
    ...mapMutations([
        'ORDEROBJ',
        'DEALOBJ',
        'SAVE_DELIVERY'
    ]),
    async initData() {
        if(getCookie('UserUUID')){
            if (!this.userInfo) {
                this.$store.dispatch('getUserInfo');
            }
        }
        let orders = this.userInfo.orders;
         orders.forEach(async (orderuuid) => {
            let res = await queryOrder(orderuuid);
            let deals = res.deals;         
            if(res){
                // 待扫描
                if(res.status == 'toscan'){
                    this.toscan_array.push({
                        'orderuuid':orderuuid,
                        'createdate':formatDate(res.createdate,'long_'),
                        'station':res.station,
                        'appointmentdate':formatDate(res.appointmentdate,'long_'),
                        'scandate':formatDate(res.scandate,'long_'),
                        'status':'等待扫描'
                    })
                }else{
                    if(deals.length !== 0){
                        deals.forEach(async (dealuuid) => {
                            let dealobj = await queryDeal(dealuuid);
                            /* 待支付 */
                            if(dealobj.paymentstatus == 'topay'){
                                this.topay_array.push({
                                    'orderuuid':orderuuid,
                                    'dealuuid':dealuuid,
                                    'station': res.station,
                                    'status':'待支付',
                                    'price':dealobj.price,
                                    'appointmentdate':formatDate(res.appointmentdate,'long_'),
                                    'scandate':formatDate(res.scandate,'long_'),
                                    'orderCreatedate':formatDate(res.createdate,'long_'),
                                    'dealCreatedate':formatDate(dealobj.createdate,'long_'),
                                    'discount':dealobj.discount
                                })
                            /* 生产中 */
                            }else if(dealobj.paymentstatus == 'paid' && dealobj.status == 'printing'){
                                this.printing_array.push({
                                    'orderuuid':orderuuid,
                                    'dealuuid':dealuuid,
                                    'station': res.station,
                                    'status': '生产中',
                                    'price':dealobj.price,
                                    'appointmentdate':formatDate(res.appointmentdate,'long_'),
                                    'scandate':formatDate(res.scandate,'long_'),
                                    'orderCreatedate':formatDate(res.createdate,'long_'),
                                    'dealCreatedate':formatDate(dealobj.createdate,'long_'),
                                    'discount':dealobj.discount
                                })
                            /* 运输中 */
                            }else if(dealobj.paymentstatus == 'paid' && dealobj.status == 'delivering'){
                                let delivery = dealobj.delivery;
                                let delivery_company = '';
                                let delivery_postid = '';
                                delivery = JSON.parse(delivery);
                                if (delivery.postprocessing_delivery == undefined) {
                                    delivery_company = delivery.production_delivery.courier_company;
                                    delivery_postid = delivery.production_delivery.courier_number;
                                } else {
                                    delivery_company = delivery.postprocessing_delivery.courier_company;
                                    delivery_postid = delivery.postprocessing_delivery.courier_number;
                                }
                                this.delivering_array.push({
                                    'orderuuid':orderuuid,
                                    'dealuuid':dealuuid,
                                    'station': res.station,
                                    'status': '运输中',
                                    'price':dealobj.price,
                                    'appointmentdate':formatDate(res.appointmentdate,'long_'),
                                    'scandate':formatDate(res.scandate,'long_'),
                                    'orderCreatedate':formatDate(res.createdate,'long_'),
                                    'dealCreatedate':formatDate(dealobj.createdate,'long_'),
                                    'discount':dealobj.discount,
                                    'delivery_company':delivery_company,
                                    'delivery_postid': delivery_postid
                                })
                            /* 已完成 */
                            }else if(dealobj.paymentstatus == 'paid' && dealobj.status =='done'){
                                this.done_array.push({
                                    'orderuuid':orderuuid,
                                    'dealuuid':dealuuid,
                                    'station': res.station,
                                    'status': '交易完成',
                                    'price':dealobj.price,
                                    'appointmentdate':formatDate(res.appointmentdate,'long_'),
                                    'scandate':formatDate(res.scandate,'long_'),
                                    'orderCreatedate':formatDate(res.createdate,'long_'),
                                    'dealCreatedate':formatDate(dealobj.createdate,'long_'),
                                    'discount':dealobj.discount
                                })
                            }
                        })
                    }
                }
            }
        });
    },
    isEmpty(array) {
      if (array.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    tabsToggle(index) {
      this.i = index;
      this.isActive = false;
      document.body.scrollTop = 0;//切换tabs滚动条回到顶部
    },
    // 取消预约order
    async cancel(orderuuid){
        let res = await cancelOrder(orderuuid);
        if(res.result = 'true'){
            alert('订单取消成功');
        }else{
            alert('取消失败');
        }
    },
    // 订单详情
    async toOrderDetails(orderuuid,dealuuid){
        let orderobj = await queryOrder(orderuuid);
        let dealobj = await queryDeal(dealuuid);
        this.ORDEROBJ(orderobj);
        this.DEALOBJ(dealobj);
        setSessionStore('orderuuid',orderuuid);
        setSessionStore('dealuuid',dealuuid);
        this.$router.push('/orderlist/orderDetails');
    },
    //查看物流
    toDelivery(company,postid){
        this.SAVE_DELIVERY({company:company,postid:postid});
        setSessionStore('delivery_company',company);
        setSessionStore('delivery_postid',postid)
        this.$router.push('/delivery')
    },
  },
  watch: {
    userInfo: function (value){
        this.initData()
    }
  }
};
</script>

<style lang='scss'>
@import "../../style/common";
@import '../../style/fswear';
.orderlist-page{
    width:100%;
    .container{
        display: flex;
        width: 1226px;
        margin: 0 auto;
        .nav-left{
            flex:1,
        }
        ._content{
            // position: relative;
            flex:4;
        }
    }
}
.tabs-body{
    position: relative;
}
.tabs-head {
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid rgb(240, 240, 240);
  position: absolute;
  z-index: 100;
}

.tabs-head ul li {
  float: left;
  width: 20%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.tabs-head ul li a {
  display: block;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid #fff;
  color: inherit;
}

.tabs-head ul li a:hover,
.tabs-head ul li a.active {
  color: rgb(11, 227, 253);
  border-bottom: 2px solid rgb(11, 227, 253);
}

.tabs-body {
  width: 100%;
//   margin-top: 110px;
}

.tabs-body .tabs-contents {
  width: 100%;
  display: none;
  padding-top: 60px;
}

.tabs-body > div.active {
  display: block;
}

.tabs-contents .order {
  margin-bottom: 10px;
  border-top: 1px solid rgb(240, 240, 240);
  border-bottom: 1px solid rgb(240, 240, 240);
  background-color: #fff;
}

.order .order-header {
  width: 100%;
  height: 40px;
  margin-left: 0;
  line-height: 40px;
  background-color: rgb(11, 227, 253);
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}

.order .order-body {
  width: 100%;
  min-height: 25px;
  padding-left: 10px;
  padding-right: 10px;
}
.order .order-body > div {
  min-height: 25px;
  line-height: 25px;
}
.order .order-body > div > span {
  word-wrap: break-word;
}

.order .order-footer {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  border-top: 1px solid #ccc;
}
.order .order-footer button {
  width: 80px;
  height: 30px;
  margin-top: 5px;
  border-radius: 15px;
  border: none;
  background-color: rgb(255, 79, 79);
  color: white;
  margin-right: 5px;
}
.order .order-footer button:last-child {
  margin-right: 0;
}
.failorder {
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #fff;
}
.price {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: right;
  border-top: 1px solid rgb(240, 240, 240);
}
.tabs-contents {
  position: relative;
}
</style>
