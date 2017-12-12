<template>
    <div class="mall-page">
        <div class="frame-container" ref='frameContainer':style="frameContainerStyle" v-for='tr in arr'>
            <div class="tr" v-for="td in tr">
                <div class="td">
                    <p>{{ td.alias }}</p>
                </div>
            </div>
        </div>
        <tabs></tabs>
    </div>
</template>
<script>
import tabs from "@/components/tabs";
import {listFrameProfiles,queryFrameProfiles} from '@/config/getData';
export default {
    data() {
        return {
            frameContainerStyle:{
                backgroundImage:null,
                height:null,
            },
            arr:[],
            frame_container_width:null
        };
    },
    components: {
        tabs
    },
    mounted(){
        this.initData();
        this.frame_container_width = this.$refs.frameContainer.style.width;
        console.log(frame_container_width);
        let tr_width = this.frame_container_width/3;
        this.frameContainerStyle.height = this.frame_container_width/frame_profiles.size[0]*frame_profiles.size[0];
        this.frameContainerStyle.backgroundImage = '@/images/frame18.png';
    },
    methods:{
        async initData(){
            let res = await listFrameProfiles();
            console.log(res);
            let uuid = res.list[0];
            let res2 = await queryFrameProfiles(uuid);
            console.log(res2);
            let frame_profiles = res2.description.frame_profiles;
            
            let frame_count = frame_profiles.alias.length;
            let tr_count = Math.ceil(frame_count / 3);
            let arr = [];
            for(let i = 0;i < tr_count;i++){
                let td = [];
                for(let j = i*3;j < (i+1) *3;j++){
                    td.push({alias:frame_profiles.alias[j],data:frame_profiles.data[j],material:frame_profiles.material[j]});
                }
                arr.push[td];
            } 
            this.arr = arr;
            console.log(arr);
        }
    }
};
</script>
<style lang="scss">
    @import '../../style/common';
    @import '../../style/fswear';
    .mall-page{
        text-align: center;
        padding-top: 100px;
        .frame-container{
            width: 100%;
            background-color: #fff;
            background-size:100% 100%;
            .tr{
                width: 100%;
                .td{
                    height: 100%;
                    border: 1px solid #ccc;
                }
            }
        }
    }
</style>

