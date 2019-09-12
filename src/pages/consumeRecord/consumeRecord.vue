<template>
    <view class="bg-gray cu-page">

        <status v-if="list.length<1 " text="暂无邀请记录"></status>
        <view class="cu-list margin-sm padding-sm radius-xl bg-white  menu-avatar ">
            <view class="cu-item solid-bottom " v-for="(item,index) in list" :key="index">
                <view class="cu-avatar round bg-white md" :style="'background-image:url('+item.headimgurl+')'"></view>
                <view class="content">
                    <view class="text-grey text-black text-bold">{{item.nickname}}</view>
                    <view class="text-gray text-sm flex">
                        <text class="text-cut">
                             {{item.created_at | DateFormat}}
                        </text> </view>
                </view>
                <view class="action margin-right">
                    <view class="text-blue text-sm text-bold ">邀请成功</view>
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
    import {dateFormat} from "../../utils/utils";

    export default {
        name: "rechargeRecord",
        components: {Status},
        data(){
            return {
                list:[],
                page:1,
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
        async onLoad(options){
                this.loadData();
        },
       filters:{
           DateFormat(val){
               return dateFormat(new Date(val),"yyyy-MM-dd hh:mm:ss")
           },
       },
        methods:{

            async loadData({page=1}={}){
                uni.showLoading({title:'加载中...'});
                let  data = await  getExtensionUser({page:this.page});
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
        width:120rpx;
    }
</style>
