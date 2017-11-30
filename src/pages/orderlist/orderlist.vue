<template>
    <div>
        <goback title='订单列表'></goback>
        <div class="content" id="content">
            <div class="tabs-body" id="tabs-body">
                <div class="tabs-head">
                    <ul class="tabs-ul clear">
                        <li>
                            <a href="javascript:0" v-bind:class='{active:(index == i || isActive == true)}' @click='tabsToggle(0)'>全部</a>
                        </li>
                        <li>
                            <a href="javascript:0" v-bind:class='{active:index == i}' @click='tabsToggle(1)'>待扫描</a>
                        </li>
                        <li>
                            <a href="javascript:0" v-bind:class='{active:index == i}' @click='tabsToggle(2)'>待支付</a>
                        </li>
                        <li>
                            <a href="javascript:0" v-bind:class='{active:index == i}' @click='tabsToggle(3)'>生产中</a>
                        </li>
                        <li>
                            <a href="javascript:0" v-bind:class='{active:index == i}' @click='tabsToggle(4)'>待收货</a>
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
                                <div class="status" v-text="order.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="order.orderno"></span>
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
                                <button class="cancelOrder">取消预约</button>
                            </div>
                        </div>
                        <!--  全部/待支付-->
                        <div class="order" v-for="(deal,index) in topay_array">
                            <div class="order-header">
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <button class="">付款</button>
                                <button class="to_order_details">订单详情</button>
                            </div>
                        </div>
                        <!-- 全部/生产中 -->
                        <div class="order" v-for="(deal,index) in printing_array">
                            <div class="order-header">
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <button class="">催单</button>
                                <button class="to_order_details">订单详情</button>
                            </div>
                        </div>
                        <!-- 全部/待收货 -->
                        <div class="order" v-for="(deal,index) in delivering_array">
                            <div class="order-header">
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <span class="delivery-company-hidden">{{ deal.delivery_company }}</span>
                                <span class="delivery-postid-hidden">{{ deal.delivery_postid }}</span>
                                <button class="to_delivery">查看物流</button>
                                <button class="">确认收货</button>
                                <button class="to_order_details">订单详情</button>
                            </div>
                        </div>
                        <!-- 全部/已收货 -->
                        <div class="order" v-for="(deal,index) in done_array">
                            <div class="order-header">
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <button class="to_order_details">订单详情</button>
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
                                <div class="status" v-text="order.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="order.orderno"></span>
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
                                <button class="cancelOrder">取消预约</button>
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
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <button class="">付款</button>
                                <button class="to_order_details">订单详情</button>
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
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <button class="">催单</button>
                                <button class="to_order_details">订单详情</button>
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
                                <div class="dealuuid" v-text="deal.uuid"></div>
                                <div class="status" v-text="deal.status"></div>
                            </div>
                            <div class="order-body">
                                <div class="orderno">订单编号：
                                    <span v-text="deal.orderno"></span>
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
                                <span class="orderuuid-hidden">{{ deal.orderuuid }}</span>
                                <span class="dealuuid-hidden">{{ deal.uuid }}</span>
                                <span class="delivery-company-hidden">{{ deal.delivery_company }}</span>
                                <span class="delivery-postid-hidden">{{ deal.delivery_postid }}</span>
                                <button class="to_delivery">查看物流</button>
                                <button class="">确认收货</button>
                                <button class="to_order_details">订单详情</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>
<script>
import goback from "@/components/goback";
import { getOrderList } from "@/config/getData";
import { imgBaseUrl } from "@/config/env";
export default {
  data() {
    return {
      ordersArray: [],
      toscan_array: [],
      topay_array: [],
      printing_array: [],
      delivering_array: [],
      done_array: [],
      offset: 0,
      preventRepeat: false, //防止重复获取
      showLoading: true, //显示加载动画
      i: 0,
      isActive:true
    };
  },
  mouted() {
    this.initData();
  },
  mixins: [],
  components: {
    goback
  },
  computed: {},
  methods: {
    async initData() {
      if (true) {
        // let res = await getOrderList(this.userInfo.user_id, this.offset);
        // this.orderList = [...res];
      }
    },
    isEmpty(array) {
      if (array.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    tabsToggle(index) {
      //    var links = document.getElementsByClassName("link");
      this.i = index;
      this.isActive = false;
    }
  },
  watch: {}
};
</script>

<style lang='scss'>
@import "../../style/common";
body{
    padding-top: 110px;
}
.tabs-head {
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid rgb(240, 240, 240);
  position: fixed;
  top: 50px;
  z-index: 999;
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
}

.tabs-body .tabs-contents {
  width: 100%;
  display: none;
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
  /* line-height: 100%; */
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
#loading {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  background-color: rgb(240, 240, 240);
}
.orderuuid-hidden,
.dealuuid-hidden,
.delivery-company-hidden,
.delivery-postid-hidden {
  display: none;
}
</style>
