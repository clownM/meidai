<template>
    <div class="glassDetails-page">
        <section class="goback" @click="goBack()">
            <i class='el-icon-arrow-left'></i>
        </section>
        <section class="goCart" @click='goCart()'>
        </section>
        <section class='glass-pic' :style="{height:picHeight+'px'}">

        </section>
        <section class='info'>
            <p class="alias">
                <strong>{{ alias }}</strong> 
            </p>
            <p class="material">
                原料：{{ material }}
            </p>
            <p class="data">
                {{ data }}
            </p>
        </section>
        <section class="btn">
            <button @click="goTryOn()">前往试戴</button>
            <button @click="addToCart()">加入购物车</button>
        </section>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
// import {listFrameProfiles,queryFrameProfiles} from '@/config/getData';

export default{
    data(){
        return{ 
            index:null,
            alias:null,
            data:null,
            material:null,
            picHeight:0,
        }
    },
    mounted(){
        this.initData();
        this.setImgHeight();
        window.addEventListener('resize',this.setImgHeight);
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.setImgHeight)
    },
    computed:{
        ...mapState([
            'frameProfiles'
        ])
    },
    methods:{
        ...mapMutations([
            'ADD_CART','GET_FRAME_PROFILES'
        ]),
        async initData(){
            this.GET_FRAME_PROFILES();
            this.alias = this.$route.query.alias;
            let frame_profiles = this.frameProfiles;
            frame_profiles.alias.forEach((val,index) => {
                if(val == this.alias){
                    this.index = index;
                    this.material = frame_profiles.material[index];
                    this.data = frame_profiles.data[index];
                }
            });
        },
        setImgHeight(){
            let width = document.getElementsByClassName('glassDetails-page')[0].offsetWidth;
            let height = width / 4583 * 2500;
            this.picHeight = height;
        },
        goBack(){
            this.$router.go(-1);
        },
        goCart(){
            this.$router.push('/shoppingCart');
        },
        goTryOn(){
            console.log('试戴');
            var obj={op:'try_on',glassName:this.alias};
            var str = JSON.stringify(obj);
            window.postMessage(str,'*');
        },
        addToCart(){
            console.log('加入购物车');
            let index = this.index;
            let alias = this.alias;
            let material = this.material;
            let data = this.data;
            this.ADD_CART({ index,alias,data,material });
            this.$message({
                message:'成功加入购物车！',
                type:'success'
            });
        },
    },
}
</script>
<style lang='scss'>
@import '../../style/common';
    .glassDetails-page{
        position: relative;
        background-color: #fff;
        margin-bottom: 60px;
        .glass-pic{
            width: 100%;
            background-image: url('../../images/product/nunki-01.png');
            background-size: cover;
            border-bottom: 1px solid #ccc;
        }
        .info{
            padding:10px 15px;            
            .alias{
                font-size: 20px;
            }
        }
        .btn{
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 102;
            width: 100%;
            height: 50px;
            display: flex;
            button{
                width: 50%;
                background-color: #fff;
                color:#555;
                font-size: 16px
            }
            button:last-child{
                background-color: rgb(255, 100, 0);
                color:#fff;
            }
        }
        .goback,.goCart{
            position: absolute;
            top: 10px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 50%;
            background-color: rgba($color: #000000, $alpha: 0.7);
            text-align: center;
            .el-icon-arrow-left{
                color:#fff;
                font-size: 18px;
            }
        }
        .goback{
            left: 10px;
        }
        .goCart{
            right: 10px;
            background-image: url('../../images/icons/购物车white.png');
            background-size: 18px 18px;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
</style>
