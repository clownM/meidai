<template>
    <div class='cart-page'>
        <goback title='购物车'></goback>
        <div v-if='isEmpty'>
            <section class='empty'>
                购物车是空的
            </section>
        </div>
        <div v-else class='cartitems'>
            <section class='cart-item' v-for='(item,index) in cartItems'>
                <div class="check">
                    <div class="cicle" :class='{active:selectObj[item.index]}' @click = 'selectItem(item.index)'>
                        <img src="../../images/icons/选择.png" alt="">
                    </div>
                </div>
                <div class="picture">
                    <img src="../../images/product/idra-01.png" alt="">
                </div>
                <div class="info">
                    <p> index:{{ item.index }} &emsp; alias:{{ item.alias }} &emsp; materia:{{ item.material }} &emsp; data:{{ item.data }}</p>
                    <i class='el-icon-delete' style="float:right" @click='removeCart(index,item.index)'></i>
                </div>
            </section>

            <section class='clearing'>
                <button class='btn-go'>结算 <span v-show='itemNum'>( {{itemNum}} )</span></button>
            </section>
        </div>
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
                itemNum:0,
                checkCicleStyle:{
                    border:'2px solid #ccc',
                    backgroundColor:'#fff'
                },
                selectObj:{},
                isEmpty:true
            }
        },
        created(){
            this.INIT_CART();
        },
        mounted(){
            this.initCart();
        },
        components:{
            goback
        },
        computed:{
            ...mapState([
                'cartList','login'
            ]),
            shoppingCart:function(){
                return this.cartList
            }
        },
        methods:{
            ...mapMutations([
                'INIT_CART','REMOVE_CART'
            ]),
            initCart(){
                let arr = [];
                if(this.shoppingCart){
                    let useruuid = Object.keys(this.shoppingCart)[0];
                    Object.keys(this.shoppingCart[useruuid]).forEach(index => {
                        arr.push(this.shoppingCart[useruuid][index]);
                        this.selectObj[index] = false;
                    })
                }
                if(arr.length){
                    this.isEmpty = false
                }else{
                    this.isEmpty = true
                }
                this.cartItems = arr;
            },
            selectItem(itemIndex){
                this.selectObj[itemIndex] = !this.selectObj[itemIndex];
                this.itemNum = 0;
                Object.keys(this.selectObj).forEach(i => {
                    if(this.selectObj[i]){
                        this.itemNum +=1;
                    }
                })
            },
            removeCart(index,itemIndex){
                this.cartItems.splice(index,1);
                this.REMOVE_CART({itemIndex});
            }
        },
        watch:{
            shoppingCart:function(value){
                if(value){
                    let arr = [];
                    let useruuid = Object.keys(value)[0];
                    Object.keys(value[useruuid]).forEach(index => {
                        arr.push(value[useruuid][index]);
                        this.selectObj[index] = false;
                    })
                    if(arr.length){
                        this.isEmpty = false
                    }else{
                        this.isEmpty = true
                    }
                    this.cartItems = arr;
                }
            },
        }
    }
</script>
<style lang='scss'>
@import '../../style/common';
    .cart-page{
        padding-top: 50px;
        padding-bottom: 60px;
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
                    background-color: #fff;
                    border: 2px solid #ccc;
                    img{
                        width: 20px;
                        height: 20px;
                        margin-left: 2px;
                        margin-top: 2px;
                    }
                }
                .active{
                    border:none;
                    background-color: rgb(255, 100, 0);
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
                span{
                    color:inherit;
                }
            }
        }
        .empty{
            text-align: center;
            padding-top: 50px;
        }
    }
</style>

