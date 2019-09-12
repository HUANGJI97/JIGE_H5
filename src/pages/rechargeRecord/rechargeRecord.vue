<template>
    <view class="bg-gray cu-page">
        <status v-if="list.length<1 " text="暂无充值记录"></status>
        <view class="cu-list margin  menu-avatar" >
            <view class="cu-item margin-top-sm radius-xxxl" v-for="(item,index) in  list" :key="index">
                <view class="cu-avatar bg-white round md"
                      style="background-image:url('https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-recharge-record.png');">
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
                    <view class="cu-tag text-sm round bg-white sm ">{{item.pay_time | DateFormat}}</view>
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
                list: [],
                page:1
            }
        },
        onPullDownRefresh(){
            console.log(`调试:触发下拉` );
            this.page =1;
            this.loadData();
        },
        onReachBottom(){
            console.log(`调试:触发触底` );
            this.loadData()
        },
        async onLoad(options) {
            console.log(`调试:充值记录页收到参数`, options);
            const {cardno} = options;
            let rechargeRecord = await getRechargeRecord();
            this.list = rechargeRecord.list;
            this.list =  this.list.map(item=>{
                item.pay_time = dateFormat(item.pay_time,'yyyy-MM-dd hh:mm');
                console.log(`调试:`,item.pay_time)
                return item;
            })
            console.log(`调试:充值记录查询结果`, this.list)
        },
        filters:{
            DateFormat(val){
                return dateFormat(new Date(val),"yyyy-MM-dd hh:mm")
            },
        },
        methods:{
            async loadData({page=1}={}){
                uni.showLoading({title:'加载中...'});
                let  data = await  getRechargeRecord({page:this.page});
                uni.hideLoading();
                if(data.list.length){
                    if(this.page == 1){
                        this.list = data.list;
                    }else{
                        this.list = [...this.list,...data.list];

                    }
                    this.page = this.page + 1;



                }else{
                    uni.showToast({
                        title:"已经到底了",
                        icon:'none'
                    })
                }

                console.log(`调试:使用记录查询结果`, this.list)
            }
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
