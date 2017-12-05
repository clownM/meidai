<template>
    <div class='container-absolute'>
        <goback title='修改密码'></goback>
        <div class="mt50px">
            <div class='section'>
                <input type="password" placeholder="请输入旧密码" v-model="oldpwd">
            </div>
            <div class='section'>
                <input type="password" placeholder="请输入新密码（密码长度最少为8位）" v-model="newpwd1">
            </div>
            <div class='section'>
                <input type="password" placeholder="请确认新密码" v-model="newpwd2">
            </div>
        </div>
        <div class="divbtn">
            <button @click="submit">确认提交</button>
        </div>
    </div>
</template>
<script>
    import goback from '../../components/goback'
    import {changePassword} from '../../config/getData'
    import {mapState} from 'vuex'
    export default{
        data(){
            return{
                oldpwd,
                newpwd1,
                newpwd2
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
            async submit(){
                if(this.oldpwd === ''){
                    alert('请输入旧密码！');
                }else{
                    if(this.newpwd1.length < 8){
                        alert('新密码不能少于八位')
                    }else{
                        if(this.newpwd1 !== this.newpwd2){
                            alert('两次输入密码不一致');
                        }else{
                            let res = await changePassword(this.userInfo.uuid,oldpwd,newpwd1);
                            if(res){
                                if(res.result == 'true'){
                                    alert('修改成功');

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
    .mt50{
        width: 100%;
        padding: 5px 10px;
        background-color: #fff;
        div{
            width: 100%;
            height: 40px;
            padding-top: 3px;
            padding-bottom: 3px;
            border-top: 1px solid rgb(240, 240, 240);
            input{
                width: 100%;
                height: 34px;
                margin-top: 10px;
                border: none;
                border-radius: 5px;
            }
            input:first-child{
                margin-top: 0;
            }
        }
        div:first-child{
            border-top: none;
        }
    }
    .divbtn{
        width: 100%;
        padding: 20px 10px;
        button{
            width: 100%;
            height: 50px;
            border-radius: 5px;
            color: #fff;
            background-color: rgb(255, 90, 90)
        }
    }
</style>
