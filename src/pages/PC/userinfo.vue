<template>
    <div class="pc-userinfo-page">
        <navbar></navbar>
        <div class="container">
            <navLeft class='nav-left' thisPage='_userinfo'></navLeft>
            <div class="content">
                <h1>个人信息</h1>
                <section class='avatar'>
                    <span>头像</span>
                    <div class="avatarwrap">
                        <img src="../../images/touxiang.png" alt="">
                    </div>
                </section>
                <section>
                    <label for="username">用户名</label>
                    <input type="text" id='username'>
                </section>
                <section>
                    <label>性别</label>
                    <el-radio v-model="gender" label="1">男</el-radio>
                    <el-radio v-model="gender" label="2">女</el-radio>
                </section>
                <section>
                    <label for='birthday'>生日</label>
                    <el-date-picker 
                        v-model="birthday"
                        type="date"
                        placeholder="选择日期"
                        clearable="false">
                    </el-date-picker>
                </section>
                <section>
                    <label>居住地</label>
                    <VDistpicker></VDistpicker>
                </section>
                <section class='save'>
                    <button @click="save()">保存</button>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import  navbar from '../../components/navbar'
import navLeft from '../../components/nav_left'    
import {mapState,mapMutations} from 'vuex'
import {updateUser} from '../../config/getData'
import VDistpicker from 'v-distpicker'

export default{
    data(){
        return{
            username:null,
            birthday:null,
            _birthday:null,
            gender:"1",
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapState([
            'userInfo'
        ])
    },
    components:{
        navbar,navLeft,VDistpicker
    },
    methods:{
        async initData(){
            if(!this.userInfo){
                this.$store.dispatch('getUserInfo')
            }
            this.username = this.userInfo.username;
            let _birthday = this.userInfo.birthday || '';
            this.birthday = new Date(this._birthday);
            this._birthday = new Date(_birthday).toLocaleDateString();
            this.userInfo.gender == 'female' ? this.gender='1' : this.gender='2';
            // switch(this.userInfo.gender){
            //     case 'male':
            //         this.gender = '1';
            //         break;
            //     case 'female':
            //         this.gender = '2'
            //         break;
            //     default:
            //         this.gender = '1';
            //         break;
            // }
        },
        async save(){
            let username = this.username;
            let _gender;
            this.gender == '2' ? _gender='female' : _gender='male';
            let birthday = this.birthday;
            let res = await updateUser(username,_gender,birthday);
            if(res.result == 'true'){
                alert('修改成功')
            }else{
                alert('修改失败')
            }
        }
    },
    watch:{
        userInfo:function(val){
            this.username = val.username;
            let _birthday = val.birthday || '';
            this.birthday = new Date(this._birthday);
            this._birthday = new Date(_birthday).toLocaleDateString();
            switch(val.gender){
                case 'male':
                    this.gender = '1';
                    break;
                case 'female':
                    this.gender = '2'
                    break;
                default:
                    this.gender = '1';
                    break;
            }
        }
    }
}
</script>
<style lang='scss'>
@import '../../style/common';
.pc-userinfo-page{
    width:100%;
    height:100%;
    .container{
        width: 1226px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        .nav-left{
            flex:1;
            margin-right: 10px;
        }
        .content{
            flex:4;
            background-color: #fff;
            padding: 20px 30px;
            section{
                height: 50px;
                line-height: 50px;
                padding-top: 5px;
                label{
                    display: inline-block;
                    width: 50px;
                    margin-right: 15px;
                }
                input{
                    width: 300px;
                    height: 30px;
                    border: 1px solid #ccc;
                    padding:5px 10px;
                    border-radius: 5px;
                }
                .el-date-editor{
                    width: 300px;
                    height: 40px;
                    margin-top: 5px;
                    input{
                        height: 30px;
                        padding-left: 30px;
                    }
                }
                input:focus{
                    border-color: rgb(64, 158, 255);
                }
                .address{
                    display:inline-block;
                    select{
                        height: 30px;
                        padding: 0;
                    }
                }

            }
            .avatar{
                height: 80px;
                line-height: 80px;
                span{
                    vertical-align: middle;
                    display: inline-block;
                    width: 50px;
                    margin-right: 15px;
                }
                .avatarwrap{
                    width: 80px;
                    height: 80px;
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                        vertical-align: middle;
                    img{
                        height: 70px;
                        margin-top: 4px;
                        margin-left: 4px;
                    }
                }
            }
            .save{
                margin-top: 10px;
                border-top: 1px dotted #ccc;
                button{
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 5px;
                    background-color: rgb(255, 91, 91);
                    color:#fff;
                }
            }
        }
    }
}
</style>
