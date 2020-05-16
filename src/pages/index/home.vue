<template>
    <view class="text-df">
        <view class="pure_top padding">
            <view class="flex align-center ">
                <view class="round padding-xl bg-gray" :style="'background-image: url('+userInfo.headimgurl+');background-size:cover;'"></view>

                <view class="margin-left text-white ">
                    <view class="text-bold text-xl">{{userInfo.nickname}}</view>
                    <view class="margin-top-sm">
                        {{userInfo.phone}}
                        <text class="cuIcon cuIcon-settingsfill margin-left-xs"></text>

                    </view>
                </view>
            </view>
            <view class=" flex justify-between text-sm" style="position: relative;bottom: -20px;">
                <view class="bg-white padding radius-xxl flex-sub">
                    <view class="flex justify-center align-center text-bold ">
                        <view class="text-xxl ">0</view>
                        <view class="margin-left-xs">个</view>
                    </view>
                    <view class="flex align-center justify-center">
                        <view class="cuIcon cuIcon-moneybagfill round text-red bg-gray "></view>
                        <view class="margin-left-xs text-sm text-gray ">可提现余额</view>
                        <view class="cuIcon cuIcon-right"></view>
                    </view>
                </view>
                <view class="bg-white padding radius-xxl flex-sub margin-left">
                    <view class="flex justify-center align-center text-bold ">
                        <view class="text-xxl ">{{userInfo.times}}</view>
                        <view class="margin-left-xs">张</view>
                    </view>
                    <view class="flex align-center justify-center">
                        <view class="cuIcon cuIcon-ticket round text-blue bg-gray "></view>
                        <view class="margin-left-xs text-sm text-gray">我的粮票</view>
                        <view class="cuIcon cuIcon-right"></view>
                    </view>
                </view>
            </view>

        </view>
        <view class="margin bg-white radius-xl padding text-df">
            <view class="text-bold">常用功能</view>
            <view class="flex margin-top-sm flex-wrap padding-left-sm">
                <view class="text-center  padding-xs   margin-right-xs radius-xl " hover-class="bg-gray"
                      v-for="(item,index) in menu" :key="index" @tap="handleMenuTap(item)" >
                    <view class="cuIcon ext-sl " :class="'text-'+ item.color +'   cuIcon-'+item.icon"
                          style="font-size:50rpx;"></view>
                    <view class="text-sm margin-top-xs text-gray">{{item.title}}</view>
                </view>
            </view>
        </view>
    </view>

</template>

<script>
    import {
        checkSignin,
        getExtensionCode,
        getExtensionUser, getMpConfig,
        getNotice,
        getUserInfo,
        Login,
        signin
    } from "../../api/user";
    import cache from "../../utils/cache";

    export default {
        name: "home",
        data() {
            return {
                userInfo: {
                    nickname: '王钢蛋',
                    headimgurl: 'http://thirdwx.qlogo.cn/mmopen/NiaudYqK5icH4uI7Q6nzPJNOtUKnb2ial3uAMQUf4iakyn5Tvt43Bqs6g3AShPzeyV8CrIfTLGibXoqtZYbBF4tLlaB90avXTYpAY/132',
                    times: '10'
                },
                menu: [
                    {
                        key: 'recharge',
                        title: '粮票充值',
                        icon: 'pay',
                        url:'../recharge/recharge',
                        color: 'red'

                    },
                    {
                        key: 'pay',
                        title: '每日签到',
                        icon: 'roundcheckfill',
                        color: 'green'
                    },
                    {
                        key: 'qa',
                        title: '常见问题',
                        icon: 'creativefill',
                        color: 'orange'
                    },
                    {
                        key: 'qa',
                        title: '口吐芬芳',
                        icon: 'emoji',
                        color: 'purple',
                        url:'../nmsl/nmsl'
                    },
                    {
                        key: 'qa',
                        title: '联系客服',
                        icon: 'servicefill',
                        color: 'blue'
                    },
                    {
                        key: 'qa',
                        title: '运营管理',
                        icon: 'circlefill',
                        url:'./admin',
                        color: 'pink'
                    },



                ],
                dataView: [


                ],
            }
        },
        created(){
            console.log(`调试:首页2.0开始加载数据`);
            this.loadData();
        },
        methods:{
            async loadData(){
                // cache.set("token",token);
                uni.showLoading({
                    title:'loading',
                });
                    try {
                        this.userInfo  = await getUserInfo();
                        console.log(`调试:获取到用用户信息`, this.userInfo);
                        let config = await getMpConfig();
                        this.config= config;
                        console.log(`调试:获取到系统配置`, config);


                        this.signInfo = await  checkSignin();
                        console.log(`调试:获取到的签到信息`, this.signInfo);

                        this.exinfo = await  getExtensionUser({page:1,size:5});
                        // this.exinfo =exinfo
                        // console.log(`调试:获取到推广用户信息`, exinfo)
                        uni.hideLoading();

                        let notice = await  getNotice({status:0});
                        this.unreadNoticeCount = notice.list.length;
                        console.log(`调试:获取到通知信息`, notice)

                    }catch (e) {
                        console.log(`调试:出错`, e);
                        uni.hideLoading();
                    }
            },
            handleMenuTap(item){
                if(item.url){
                    uni.navigateTo({
                        url:item.url
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .pure_top {
        width: 100%;
        position: relative;
        z-index: -1;
        height: 170px;
        overflow: hidden;
    }

    .pure_top::after {
        content: '';
        width: 140%;
        height: 120px;
        position: absolute;
        left: -20%;
        top: 0;
        z-index: -1;
        border-radius: 10% 10% 50% 50%;
        background: #1496f1;
    }
</style>
