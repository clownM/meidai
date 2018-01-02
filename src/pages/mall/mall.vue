<template>
    <div class="mall-page">
        <section class='curr-position' id='container'>
            <div v-if='location_point'>
                <p>当前坐标：{{ location_point }}</p>
                <p v-if='location_address != ""'>当前位置：{{ location_address }}</p>
            </div>
            <div v-else>
                <p>正在搜索当前位置……</p>
            </div>
        </section>
        <section class="frame-container" ref='frameContainer':style="{height:frameContainerHeight+'px'}">
            <div class="tr" v-for='(tr,index) in arr' :style="{height:trHeight + 'px'}">
                <div class="td" v-for='(td,index2) in tr' :style="{width:tdWidth + 'px'}" @click="clickIt(index*3 + index2)">
                    <div class="border">
                        <!-- <p>{{ td.alias }}</p> -->
                    </div>
                </div>
            </div>
        </section>

        <section class='shop-list'>
            <div class="shop">
                <div class="pic">

                </div>
                <div class="info">

                </div>
                <div class="gotoAppointment">
                    <button @click="gotoAppointment()">
                        预<br>约<br>扫<br>描
                    </button>
                </div>
            </div>
        </section>
        <tabs></tabs>
    </div>
</template>
<script>
import tabs from "@/components/tabs";
import navbar from '@/components/navbar';
import {listFrameProfiles,queryFrameProfiles} from '@/config/getData';
import { mapState,mapMutations } from 'vuex'
export default {
    data() {
        return {
            location_point:'',
            location_address:'',
            frameContainerWidth:null,
            frameContainerHeight:null,
            frameWidth:null,
            frameHeight:null,

            arr:[],
            
            frame_profiles:null,
            glass_index:null,
        };
    },
    created(){

    },
    mounted(){
        this.getCurrLocation();
        this.initData();
        window.addEventListener('resize',this.setDomSize)
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.setDomSize)
    },
    components: {
        tabs
    },
    computed:{
        ...mapState([
            'frameProfiles'
        ]),
    },
    methods:{
        ...mapMutations([
            'ADD_CART','SAVE_FRAME_PROFILES'
        ]),
        async initData(){
            this.frameContainerWidth = this.$refs.frameContainer.offsetWidth;
            let res = await listFrameProfiles();
            let uuid = res.list[0];
            let res2 = await queryFrameProfiles(uuid);
            console.log(res2);
            let frame_profiles = res2.description.frame_profiles;
            this.frame_profiles = frame_profiles;

            this.SAVE_FRAME_PROFILES(frame_profiles);

            let frame_count = frame_profiles.alias.length;

            let td_count = frame_profiles.dimensions[0];
            let tr_count = frame_profiles.dimensions[1];
            
            this.frameContainerHeight = this.frameContainerWidth/this.frame_profiles.size[0]*this.frame_profiles.size[1];
            this.trHeight = this.frameContainerHeight / tr_count;
            this.tdWidth = this.frameContainerWidth/td_count;

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
        setDomSize(){
            let width = this.$refs.frameContainer.offsetWidth;
            let frameProfiles = this.frameProfiles;
            this.frameContainerHeight =  width / frameProfiles.size[0] * frameProfiles.size[1];

            let td_count = frameProfiles.dimensions[0];
            let tr_count = frameProfiles.dimensions[1];
            this.trHeight = this.frameContainerHeight / tr_count;
            this.tdWidth = width / td_count;            
        },
        getCurrLocation(){
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
                self.location_point = '定位失败  '+data.message;
                console.log('定位失败:',data);
            }
        },
        clickIt(index){
            let alias = this.frame_profiles.alias[index];
            this.$router.push({
                path:'/glassDetails',
                query:{
                    alias:alias
                }
            });
        },
    },
    watch:{
        
    }
};
</script>
<style lang="scss">
    @import '../../style/common';
    @import '../../style/fswear';
    .mall-page{
        padding-bottom: 60px;
        .curr-position{
            width: 100%;
        }
        .frame-container{
            width: 100%;
            background-image: url('../../images/product/151515.png');
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
        .dialog-btn{
            width:120px;
            margin:10px auto;
            color:#fff;
        }
        .shop-list{
            width: 100%;
            padding-top: 10px;
            .shop{
                width: 100%;
                height: 120px;
                display: flex;
                margin-bottom: 10px;
                background-color: #fff;
                .pic{
                    width: 100px;
                    height: 100%;
                }
                .info{
                    // width: 100%;
                    height: 100%;
                    flex-grow: 1;
                }
                .gotoAppointment{
                    width: 60px;
                    height: 100%;
                    button{
                        width: 100%;
                        height: 100%;
                        background-color:rgb(11, 227, 253);
                        color:#fff;
                        text-align: center;
                    }
                }
            }
        }
        // @media screen and (min-width:768px){
        //     .dialog{
        //         width: 50%;
        //     }
        // }
        // @media screen and ( max-width: 767px){
        //     .dialog{
        //         width: 260px;
        //     }
        // }
    }
   
</style>

