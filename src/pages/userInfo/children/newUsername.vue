<template>
    <div class="newUsername-page">
        <goback title="修改用户名"></goback>
        <section>
            <input type="text" v-model='username'>
        </section>
        <div class='btn-wrap-app'>
            <button @click="submit">确认修改</button>
        </div>
    </div>
</template>
<script>
import goback from '../../../components/goback'
import {mapState,mapMutations} from 'vuex'
import {newUsername} from '../../../config/getData'
import {getCookie} from '../../../config/utils'
    export default{
        data(){
            return{
                username:null
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        mounted(){
            this.initData();
        },
        components:{
            goback
        },
        methods:{
            ...mapMutations([
                'RESET_USERNAME'
            ]),
            initData(){
                if(!this.userInfo){
                    this.$store.dispatch('getUserInfo')
                }
                this.username = this.userInfo.username;
            },
            async submit(){
                let uuid = getCookie('UserUUID');
                let res = await newUsername(uuid,this.username);
                if(res.result == 'true'){
                    alert('修改成功');
                    this.RESET_USERNAME(this.username);
                }else{
                    alert(res.reason);
                }
            }
        }
    }    
</script>
<style lang='scss'>
@import '../../../style/common';
@import '../../../style/fswear';
.newUsername-page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 101;
    padding-top: 60px;
    height: 100%;
    overflow: auto;
    section{
        width: 100%;
        input{
            padding: 0 10px;
            width: 100%;
            height: 40px;
        }
    }
}
</style>
