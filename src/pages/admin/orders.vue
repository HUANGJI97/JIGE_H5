<template>
    <view>
       <SearchBar :condition-data="conditionData" placeholder="订单号 订单备注"></SearchBar>


        <view class="bg-white flex padding">
            <view v-for="(item,index) in orderItem" :key="index" @tap="handleOrderItemChange(item)"
                  :class="item.order!==''? 'text-blue' : ''" class="margin-left-sm">{{item.name}}
                <text class="cuIcon  " :class="item.order !=='asc' ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
            </view>
        </view>
        <view class=" radius-xl padding-sm ">
            <view class="flex justify-between radius-xl padding margin-top bg-white" v-for="(item,index) in list"
                  :key="index">
                <view class="flex">
                    <view class="margin-left-sm text-sm">
                        <view class="flex align-center">
                            <view class="flex">
                                <view class="text-df text-black text-bold  ">{{item.order_id}}</view>
                                <view class="cu-tag sm  radius margin-left-sm solid  " :class='["line-red","line-green"][item.status]'> {{["未支付","已支付"][item.status]}}</view>
                            </view>
<!--                            <view class="margin-left cuIcon-phone cuIcon">18757739042</view>-->
                        </view>
                        <view class="text-xs text-gray margin-top-xs">
                           <view>{{item.name}}</view>
                            <view>中秋特惠 截止2019年09月15号</view>
                        </view>
                        <view class="flex margin-top-xs align-center text-xs">
                            <view class="cu-avatar x2s round bg-black" style="background-image: url(http://thirdwx.qlogo.cn/mmopen/PiajxSqBRaEK7JpcmjIuj3bZ2sNicm3AGBar9ia0t6Dfhkb50Gw5bbYZViawOO52gfolic4T69468HIw7lI9Plunz6w/132);background-size: cover;" ></view>
                            <view class="margin-left-xs text-black">{{item.buyer}}</view>
                            <view class="cuIcon-time margin-left-sm">{{item.created_at}}</view>
                        </view>
<!--                        <view class="flex text-sm margin-top-xs">-->
<!--                            <view>推广:10</view>-->
<!--                            <view class="margin-left-sm">领取:10</view>-->
<!--                            <view class="margin-left-sm">充值:10</view>-->
<!--                            <view class="margin-left-sm">积分:10</view>-->
<!--                        </view>-->

                    </view>
                </view>
                <view class=" text-xs text-right flex align-center">
                    <!--                    <view class="flex">2019年6月24日 13:11 </view>-->
                    <view class="text-center justify-center margin-top-sm">
                        <view class="text-df text-bold text-price text-orange">{{item.price}}</view>
                        <button class="cu-btn sm bg-red round margin-top-xs" v-if="item.status == 1">退款</button>
                    </view>
                </view>

            </view>
        </view>
        <Paging v-model="paging.cur" :total="paging.total" :size="paging.size" @change="handlePageChange"></Paging>

    </view>
</template>

<script>
    import Index from "../index/index";
    import SearchBar from "../component/SearchBar/SearchBar";
    import {getOrderList} from "../../api/admin";
    import Paging from "../component/Paging";

    export default {
        name: "orders",
        data() {
            return {
                paging:{
                    cur:1,
                    total:0,
                    size:20
                },
                list:[],
                searchConditon: false,
                curSex: 0,
                switchA: false,
                sexPicker: ['全部', '男', '女'],
                conditionData: {
                    name: '筛选条件',
                    items: [
                        {
                            name: '充值用户',
                            key: 'father',
                            type: 'input',
                            placeholder: '用户昵称 手机号'

                        },
                        {
                            name: '订单状态',
                            key: 'sub',
                            type: 'btn_radio',
                            items: [
                                {name: "全部", value: 'all'},
                                {name: "已支付", value: 'payed'},
                                {name: "未支付", value: 'unpay'},


                            ]
                        }
                    ]
                },

                orderItem: [  //排序项目
                    {
                        key: 'coin',
                        name: '充值金额',
                        order: ''
                    },
                    {
                        key: 'coin',
                        name: '充值时间',
                        order: ''
                    }
                ]
            }
        },
        components: {Paging, SearchBar, Index},
        onLoad(){
            this.getList();
        },
        methods: {
            async getList({page = 1} = {}){
                let condition =this.condition;
                let  orders = await  getOrderList({page,condition,size:20});
                this.list= orders.results;
                this.paging.total = orders.total;
                console.log(`调试:订单列表`, orders)
            },
            handleOrderItemChange(item) {
                if (item.order === 'asc') {
                    item.order = 'desc'
                } else if (item.order == 'desc') {
                    item.order = ''
                } else {
                    item.order = 'asc'
                }
            },
            handleSexPickerChange(e) {
                this.curSex = e.detail.value
            },
            SwitchA(e) {
                this.switchA = e.detail.value
            },
        }
    }
</script>

<style scoped>

</style>
