<template>
    <div class='cart-page'>
        <goback title='购物车'></goback>

        <section class='cart-item' v-for='item in cartItems'>
            <div class="check">
                <div class="cicle" :style="checkCicleStyle" @click = 'selectItem(item.index)'>
                    <img src="../../images/icons/选择.png" alt="">
                </div>
            </div>
            <div class="picture">
                <img src="../../images/product/idra-01.png" alt="">
            </div>
            <div class="info">
                <p> index:{{ item.index }} &emsp; alias:{{ item.alias }} &emsp; materia:{{ item.material }} &emsp; data:{{ item.data }}</p>
                <i class='el-icon-delete' style="float:right" @click='removeCart(item.index)'></i>
            </div>
        </section>

        <section class='clearing'>
            <button class='btn-go'>结？算</button>
        </section>
    </div>
</template>
<script>
    // import tabs from '../../components/tabs'
    import goback from '../../components/goback';
    import {mapState,mapMutations} from 'vuex';
    export default{
        data(){
            return{
                cartItems:null,
                checkCicleStyle:{
                    border:'2px solid #ccc',
                    backgroundColor:'#fff'
                }
            }
        },
        created(){
            this.INIT_CART();
        },
        mounted(){
            this.cartItems = this.cartList;
        },
        components:{
            goback
        },
        computed:{
            ...mapState([
                'cartList'
            ]),
            shoppingCart:function(){
                return this.cartList;
            }
        },
        methods:{
            ...mapMutations([
                'INIT_CART',
            ]),
            initCart(){
                let arr = [];
                let arr2 = [];
                if(this.shoppingCart){
                    let useruuid = Object.keys(this.shoppingCart)[0];
                    Object.keys(this.shoppingCart[useruuid]).forEach(index => {
                        arr.push(this.shoppingCart[useruuid][index]);
                    })
                }
                arr.forEach(item => {
                    arr2.push(item)
                })
                console.log(arr);
                console.log(arr2);
                this.cartItems = arr;
            },
            selectItem(index){
                console.log(index);
            },
            removeCart(index){
                console.log(index);
            }
        },
        watch:{
            shoppingCart:function(value){
                console.log(value);
                this.initCart();
            }
        }
    }
</script>
<style lang='scss'>
@import '../../style/common';
    .cart-page{
        padding-top: 50px;
        .cart-item{
            width: 100%;
            height: 120px;
            margin-top: 10px;
            background-color: #fff;
            display: flex;
            padding: 10px 0px;
            .picture,.check,.info{
                height: 100%;
            }
            .check{
                width: 50px;
                .cicle{
                    width: 24px;
                    height: 24px;
                    margin:43px 13px 43px 13px;
                    border-radius: 50%;
                    background-color: rgb(255, 100, 0);
                    img{
                        width: 20px;
                        height: 20px;
                        margin-left: 2px;
                        margin-top: 2px;
                    }
                }
            }
            .picture{
                width: 100px;
                margin-top: 15px;
                height: 80px;
                border: 1px solid #ccc;
                img{
                    width:100px;
                    margin-top: 15px;
                }
            }
            .info{
                width: 100%;
                padding:0px 10px;
            }
        }
        .clearing{
            width: 100%;
            height: 50px;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #fff;
            .btn-go{
                position: absolute;
                height: 100%;
                width: 120px;
                right: 0;
                top: 0;
                color:#fff;
                background-color: rgb(255, 100, 0);
            }
        }
    }
</style>

