<template>
    <div class="userInfo-page">
        <goback title='用户信息'></goback>
        <section>
            <router-link to="/userInfo/newUsername" class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/我的.png" alt="">
                </div>
                <div class="right">
                    <span>{{ username }}</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <section>
            <div class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/phone.png" alt="">
                </div>
                <div class="right">
                    <span>{{ phone }}</span>
                    <div></div>
                </div>
            </div>
        </section>
        <section>
            <div class='router-link' @click='genderVisible = true'>
                <div class='aside'>
                    <img src="../../images/icons/性别.png" alt="">
                </div>
                <div class="right">
                    <span>{{ gender }}</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </div>
        </section>
        <section>
            <div class='router-link' @click='datepickerVisible = true'>
                <div class='aside'>
                    <img src="../../images/icons/生日.png" alt="">
                </div>
                <div class='right'>
                    <span>{{ _birthday }}</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </div>
        </section>
        <section>
            <router-link to="/switchUser" class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/group_fill.png" alt="">
                </div>
                <div class='right'>
                    <span>切换关联用户</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <section>
            <router-link to="/userInfo/newPwd" class='router-link'>
                <div class='aside'>
                    <img src="../../images/icons/lock.png" alt="">
                </div>
                <div class='right'>
                    <span>修改登录密码</span>
                    <img src="../../images/icons/向右.png" alt="">
                </div>
            </router-link>
        </section>
        <div class='datepicker'>
            <van-popup v-model="datepickerVisible" position='bottom'>
                <van-datetime-picker 
                    v-model='birthday' 
                    :min-date='minDate'
                    :max-date='maxDate'
                    type='date'
                    @confirm='datePickerConfirm' 
                    @cancel='datepickerVisible = false'>
                </van-datetime-picker>
            </van-popup>
        </div>
        <div class="genderPicker">
            <van-actionsheet v-model='genderVisible' :actions='actions'></van-actionsheet>
        </div>
        <div class='btn-wrap-app'>
            <button @click="logout">退出登录</button>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import goback from '@/components/goback';
import {mapState,mapMutations} from 'vuex';
import {getCookie,setCookie,delCookie} from '../../config/utils';
import {newBirthday,newGender} from '../../config/getData'

export default{
    data(){
        return{
            show:true,
            datepickerVisible:false,
            genderVisible:false,
            username:null,
            phone:null,
            gender:null,
            birthday: null,
            _birthday:null,

            minDate:new Date(1970,0,2),
            maxDate:new Date(),

            actions: [
                {
                    name:'男',
                    callback:this.genderMale
                },
                {
                    name:'女',
                    callback:this.genderFemale
                }
            ]
        }
    },
    mounted(){
        this.initData();
    },
    components:{
        goback,
    },
    computed:{
      ...mapState([
        'userInfo',
      ])
    },
    methods:{
        ...mapMutations([
            'LOGOUT','RESET_BIRTHDAY','RESET_GENDER'
        ]),
        initData(){                             
            if(!this.userInfo){
                this.$store.dispatch('getUserInfo')
            }
            this.username = this.userInfo.username;
            this.phone = this.userInfo.phone;
            let _birthday = this.userInfo.birthday || '';
            this.birthday = new Date(this._birthday);
            this._birthday = new Date(_birthday).toLocaleDateString();
            switch(this.userInfo.gender){
                case 'male':
                    this.gender = '男';
                    break;
                case 'female':
                    this.gender = '女'
                    break;
                default:
                    this.gender = '男';
                    break;
            }
        },
        async logout(){
            this.LOGOUT();
            delCookie('UserUUID');
            this.$router.push('/login')
        },

        async changeGender(gender){
            let uuid = getCookie('UserUUID');
            this.RESET_GENDER(gender);
            let res = await newGender(uuid,gender);
        },
        genderMale(){
            this.genderVisible = false;
            let gender = 'male';
            this.changeGender(gender);
        },
        genderFemale(){
            this.genderVisible = false;
            let gender = 'female';
            this.changeGender(gender);
        },

        async datePickerConfirm(value){
            let uuid = getCookie('UserUUID');
            let birthday = value.toGMTString().replace('GMT','-0000');
            this.RESET_BIRTHDAY(birthday);
            let res = await newBirthday(uuid,birthday);
            console.log(res);
            this.datepickerVisible = false;
        },
    },

    watch: {
        userInfo: function (value){
            if(value){
                console.log(value);
                this.username = value.username;
                this.phone = value.phone;
                this.gender = value.gender;
                this.birthday = new Date(value.birthday);
                if(value.birthday != ''){
                    this._birthday = new Date(value.birthday).toLocaleDateString();
                }else{
                    this._birthday = '请选择生日'
                }
                switch(value.gender){
                    case 'male':
                        this.gender = '男';
                        break;
                    case 'female':
                        this.gender = '女';
                        break;
                    default:
                        this.gender = '男';
                        break;
                }
            }
        }
    }
}
</script>
<style lang='scss'>
@import '../../style/common';
@import '../../style/fswear';
    .userInfo-page{
        width:100%;
        padding-top: 60px;
        padding-bottom: 50px;
        position: relative;
        section{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            border-bottom: 1px solid rgb(240, 240, 240);
            padding: 0 10px;
            .router-link{
                width: 100%;
                height: 50px;
                display: flex;
                .aside{
                    width: 30px;
                    display: flex;
                    align-items: flex-start;
                    align-items: center;
                }
                .right{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                img{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>
