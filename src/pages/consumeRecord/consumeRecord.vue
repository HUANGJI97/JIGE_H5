<template>
    <view class="bg-white cu-page">

        <status v-if="list.length<1 " text="暂无消费记录"></status>
        <view class="cu-list  menu-avatar ">
            <view class="cu-item " v-for="(item,index) in list">
                <view class="cu-avatar round bg-white md" :style="'background-image:url('+item.headimgurl+')'"></view>
                <view class="content">
                    <view class="text-grey text-black text-bold">{{item.nickname}}接受了您的邀请</view>
                    <view class="text-gray text-sm flex">
                        <text class="text-cut">
                             {{item.created_at}}
                        </text> </view>
                </view>
                <view class="action margin-right">
                    <view class="text-blue text-sm text-bold ">粮票+8</view>
<!--                    <view class="cu-tag text-xsl round bg-white sm ">余额:{{item.cardmoney}}元</view>-->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {getRechargeRecord, getUsedRecord} from "../../api/orders";
    import Status from "../component/status";
    import {getExtensionUser} from "../../api/user";

    export default {
        name: "rechargeRecord",
        components: {Status},
        data(){
            return {
                list:[]
            }
        },
        async onLoad(options){
            const {cardno } = options;
            uni.showLoading({title:'加载中...'});
            let  data = await  getExtensionUser({});
            uni.hideLoading();
            this.list = data.list;
            console.log(`调试:使用记录查询结果`, this.list)
        }
    }
</script>

<style scoped>
    .cu-list.menu-avatar>.cu-item .content{
        left:110rpx;
    }
    .cu-list.menu-avatar>.cu-item .action {
        width:120rpx;
    }
</style>
