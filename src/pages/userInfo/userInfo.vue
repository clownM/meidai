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
        <div class='btn-wrap-app'>
            <button @click="logout">退出登录</button>
        </div>
        <!-- 性别修改dialog -->
        <el-dialog title="修改性别" :visible.sync="genderVisible" width='260px'>

            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
                
            <div slot="footer" class="dialog-footer">
                <el-button @click="genderVisible = false">取 消</el-button>
                <el-button type="primary" @click="genderVisible = false,changeGender()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 生日修改dialog -->
        <el-dialog title="修改生日" :visible.sync="datepickerVisible" width='260px'>

            <el-date-picker v-model='birthday'></el-date-picker>
                
            <div slot="footer" class="dialog-footer">
                <el-button @click="datepickerVisible = false">取 消</el-button>
                <el-button type="primary" @click="datepickerVisible = false,changeBirthday()">确 定</el-button>
            </div>
        </el-dialog>
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
            datepickerVisible:false,
            genderVisible:false,
            username:null,
            phone:null,
            gender:null,
            birthday: null,
            _birthday:null,
            radio:'1',
        }
    },
    mounted(){
        this.initData();
        // this.$router.go(0);
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
            this.birthday = this._birthday;
            this._birthday = new Date(_birthday).toLocaleDateString();
            switch(this.userInfo.gender){
                case 'male':
                    this.gender = '男';
                    this.radio = '1';
                    break;
                case 'female':
                    this.gender = '女'
                    this.radio = '2';
                    break;
                default:
                    this.gender = '男';
                    this.radio = '1';
                    break;
            }
        },
        async logout(){
            this.LOGOUT();
            delCookie('UserUUID');
            this.$router.push('/login')
        },
        async changeBirthday(){
            let uuid = getCookie('UserUUID');
            let birthday = this.birthday.toGMTString().replace('GMT','-0000');
            this.RESET_BIRTHDAY(birthday);
            let res = await newBirthday(uuid,birthday);
            console.log(res);
        },
        async changeGender(){
            let uuid = getCookie('UserUUID');
            let gender;
            switch (this.radio) {
                case '1':
                    gender = 'male';   
                    break;
                case '2':
                    gender = 'female';
                    break;
                default:
                    gender = 'male';
                    break;
            };
            console.log(gender);
            this.RESET_GENDER(gender);

            let res = await newGender(uuid,gender);
            console.log(res);
        }
    },

    watch: {
        userInfo: function (value){
            if(value){
                console.log(value);
                this.username = value.username;
                this.phone = value.phone;
                this.gender = value.gender;
                this.birthday = value.birthday;
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
