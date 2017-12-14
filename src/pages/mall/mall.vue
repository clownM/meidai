<template>
    <div class="mall-page">
        <section class='curr-position' id='container'>
            <p>当前坐标：{{ location_point }}</p>
            <p v-if='location_address != ""'>当前位置：{{ location_address }}</p>
        </section>
        <section class="frame-container" ref='frameContainer':style="frameContainerStyle">
            <div class="tr" v-for='tr in arr' :style="{height:trHeight + 'px'}">
                <div class="td" v-for='td in tr' :style="{width:tdWidth + 'px'}">
                    <div class="border">
                        <p>{{ td.alias }}</p>
                    </div>
                </div>
            </div>
        </section>
        <tabs></tabs>
    </div>
</template>
<script>
import tabs from "@/components/tabs";
import {listFrameProfiles,queryFrameProfiles} from '@/config/getData';
export default {
    data() {
        return {
            location_point:'',
            location_address:'',
            frameContainerStyle:{
                backgroundImage:null,
                height:null,
            },
            trHeight:null,
            tdWidth:null,
            frame_container_width:null,
            arr:[]  
        };
    },
    components: {
        tabs
    },
    ready:function(){
        
    },
    mounted(){
        this.frame_container_width = this.$refs.frameContainer.offsetWidth;
        // this.getCurrLocation();
        this.getCurrLocation2();
        this.initData();
    },
    methods:{
        async initData(){
            let res = await listFrameProfiles();
            console.log(res);
            let uuid = res.list[0];
            let res2 = await queryFrameProfiles(uuid);
            console.log(res2);
            let frame_profiles = res2.description.frame_profiles;

            this.frameContainerStyle.height = this.frame_container_width/frame_profiles.size[0]*frame_profiles.size[1];
            this.frameContainerStyle.backgroundImage = "url(/151515.png)";
            this.tdWidth = this.frame_container_width/3;

            let frame_count = frame_profiles.alias.length;
            let tr_count = Math.ceil(frame_count / 3);
            this.trHeight = this.frameContainerStyle.height / tr_count;
            let arr = [];
            for(let i = 0;i < tr_count;i++){
                let tr = [];
                for(let j = 0;j < 3 ;j++){
                    let td = {};
                    if((i*3+j) < frame_count){
                        td = {alias:frame_profiles.alias[i * 3 + j],data:frame_profiles.data[i * 3 + j],material:frame_profiles.material[i * 3 + j]};
                        tr.push(td);
                    }
                }
                arr.push(tr);
            } 
            this.arr = arr;
        },
        getCurrLocation(){
            var self = this;
            let geolocation = new BMap.Geolocation();
            geolocation.enableSDKLocation();
            let geoc = new BMap.Geocoder();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    self.location_point = r.point.lng+','+r.point.lat;
                    geoc.getLocation(new BMap.Point(r.point.lng, r.point.lat),function(res){
                        console.log(res);
                        self.location_address = res.address;
                    });
                }
                else {
                    self.location_point = 'failed'+this.getStatus();
                }        
            });
        },
        getCurrLocation2(){
            var self = this;
            let map, geolocation;
            //加载地图，调用浏览器定位服务
            map = new AMap.Map('');
            map.plugin('AMap.Geolocation', function() {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            });
            //解析定位结果
            function onComplete(data) {
                console.log(data);
                self.location_point = data.position.getLng()+','+data.position.getLat();
                self.location_address = data.formattedAddress;
            }
            //解析定位错误信息
            function onError(data) {
                self.location_point = '定位失败';
                console.log('定位失败');
                console.log(data);
            }
        }
    }
};
</script>
<style lang="scss">
    @import '../../style/common';
    @import '../../style/fswear';
    .mall-page{
        text-align: center;
        padding-bottom: 70px;
        .curr-position{
            width: 100%;
            height: 60px;
        }
        .frame-container{
            width: 100%;
            background-color: #fff;
            background-size:100% 100%;
            .tr{
                width: 100%;
                display: flex;
                border-bottom: 3px solid rgba(0,0,0,0);
                .td{
                    height: 100%;
                    border-right: 3px solid rgba(0,0,0,0);
                    .border{
                        width:100%;
                        height:100%;
                        border: 2px solid #ccc;
                        border-radius: 8px;
                        position: relative;
                        p{
                            width: 100%;
                            position: absolute;
                            bottom: 0;
                        }
                    }
                }
                .td:last-child{
                    border-right:none;
                }
            }
            .tr:last-child{
                border-bottom: none;
            }
        }
    }
</style>

