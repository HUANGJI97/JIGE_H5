<template>
    <view class="bg-white cu-page">
        <status v-if="list.length<1 " text="暂无充值记录"></status>
        <view class="cu-list  menu-avatar" v-for="(item,index) in  list">
            <view class="cu-item ">
                <view class="cu-avatar round md"
                      style="background-image:url('https://deepand.oss-cn-shenzhen.aliyuncs.com/icon/recharge.png');">
                </view>
                <view class="content">
                    <view class="text-black">{{item.order_id}}</view>
                    <view class="text-gray text-sm flex">
                        <text class="text-cut">
                            <text class=" margin-right-sm">{{item.name}}</text>
<!--                            <text class="tex-xxxs">{{item.more}}</text>-->
                        </text>
                    </view>
                </view>

                <view class="action margin-right  padding-right">
                                        <view class="text-orange text-sm   ">粮票+{{item.coin}}</view>
                    <view class="cu-tag text-sm round bg-white sm ">{{item.pay_time}}</view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    import {getRechargeRecord} from "../../api/orders";
    import Status from "../component/status";
    import {dateFormat} from "../../utils/utils";

    export default {
        name: "rechargeRecord",
        components: {Status},
        data() {
            return {
                list: []
            }
        },
        async onLoad(options) {
            console.log(`调试:充值记录页收到参数`, options);
            const {cardno} = options;
            let rechargeRecord = await getRechargeRecord();
            this.list = rechargeRecord.list;
            this.list =  this.list.map(item=>{
                item.pay_time = dateFormat(item.pay_time,'YYYY-MM-dd hh:mm');
                console.log(`调试:`,item.pay_time)
                return item;
            })
            console.log(`调试:充值记录查询结果`, this.list)
        }
    }
</script>

<style scoped>
    .cu-list.menu-avatar>.cu-item .content{
        left:110rpx;
    }
    .cu-list.menu-avatar>.cu-item .action {
        width:150rpx;
    }
</style>
