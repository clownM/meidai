<template>
    <div class='container-absolute'>
        <goback title='修改密码'></goback>
        <div class="mt50px">
            <div class='section'>
                <input type="password" placeholder="请输入旧密码" v-model="oldpwd" class='inputarea'>
            </div>
            <div class='section'>
                <input type="password" placeholder="请输入新密码（密码长度最少为8位）" v-model="newpwd1" class='inputarea'>
            </div>
            <div class='section'>
                <input type="password" placeholder="请确认新密码" v-model="newpwd2" class='inputarea'>
            </div>
        </div>
        <div class="divbtn">
            <button @click="submit" class='btn-red-large'>确认提交</button>
        </div>
    </div>
</template>
<script>
    import goback from '../../components/goback'
    import {changePassword} from '../../config/getData'
    import {mapState,mapMutations} from 'vuex'
    import {getCookie,delCookie} from '../../config/utils'
    export default{
        data(){
            return{
                oldpwd:null,
                newpwd:null,
                newpwd2:null
            }
        },
        components:{
            goback
        },
        computed:{
            ...mapState([
                'userInfo',
            ])
        },
        methods:{
            ...mapMutations([
                'LOGOUT'
            ]),
            async submit(){
                let useruuid = getCookie('UserUUID');
                if(this.oldpwd === ''){
                    alert('请输入旧密码！');
                }else{
                    if(this.newpwd1.length < 8){
                        alert('新密码不能少于八位')
                    }else{
                        if(this.newpwd1 !== this.newpwd2){
                            alert('两次输入密码不一致');
                        }else{
                            let res = await changePassword(useruuid,this.oldpwd,this.newpwd1);
                            if(res){
                                if(res.result == 'true'){
                                    alert('修改成功');
                                    this.LOGOUT();
                                    delCookie('UserUUID');
                                    this.$router.push('/login')
                                }else{
                                    alert(res.reasons);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</script>
<style lang='scss'>
    @import '../../style/common';
    @import '../../style/fswear';
    .mt50px{
        width: 100%;
        padding: 5px 10px;
        background-color: #fff;
        .section{
            width: 100%;
            height: 40px;
            padding-top: 3px;
            padding-bottom: 3px;
            border-top: 1px solid rgb(240, 240, 240);
            .inputarea{
                width: 100%;
                height: 34px;
                margin-top: 10px;
                border: none;
                border-radius: 5px;
            }
            .inputarea:first-child{
                margin-top: 0;
            }
        }
        .section:first-child{
            border-top: none;
        }
    }
    .divbtn{
        width: 100%;
        padding: 20px 10px;
        .btn-red-large{
            width: 100%;
            height: 50px;
            border-radius: 5px;
            color: #fff;
            background-color: rgb(255, 90, 90)
        }
    }
</style>
