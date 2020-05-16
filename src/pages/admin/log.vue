<template>
    <view>
       <SearchBar :condition-data="conditionData" @search="handleSearch" placeholder="手机号  昵称"></SearchBar>
        <view class="bg-white flex padding margin-top-xs">
            <view v-for="(item,index) in orderItem" :key="index" @tap="handleOrderItemChange(item)"
                  :class="item.order!==''? 'text-blue' : ''" class="margin-left-sm">{{item.name}}
                <text class="cuIcon  "
                      :class="item.order !=='asc' ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
            </view>
        </view>
        <view class=" radius-xl padding-sm "  style="overflow-y: scroll;">
            <view class="flex justify-between radius-xl padding margin-top bg-white" v-for="(item,index) in 10"
                  :key="index">
                <view class="flex">
                    <view class="margin-left-sm text-sm">
                        <view class="flex align-center">
                            <view class="flex">
                                <view class="text-df text-black text-bold  ">品质联盟专享红包</view>
                                <view class="cu-tag sm  radius margin-left-sm solid line-green ">满40-5</view>
                            </view>
                            <!--                            <view class="margin-left cuIcon-phone cuIcon">18757739042</view>-->
                        </view>
                        <view class=" text-sm margin-top-xs">
                            <view>领取号码:187657739044</view>
                        </view>
                        <view class="flex margin-top-xs align-center text-xs">
                            <view class="cu-avatar x2s round bg-black"
                                  style="background-image: url(http://thirdwx.qlogo.cn/mmopen/PiajxSqBRaEK7JpcmjIuj3bZ2sNicm3AGBar9ia0t6Dfhkb50Gw5bbYZViawOO52gfolic4T69468HIw7lI9Plunz6w/132);background-size: cover;"></view>
                            <view class="margin-left-xs text-black">王钢蛋</view>
                            <view class="cuIcon-time margin-left-sm">2019-09-16 10:07</view>
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
                        <!--                        <view class="text-df text-bold text-price text-orange">8.15</view>-->
                        <button class="cu-btn sm bg-red round">退款</button>
                    </view>
                </view>

            </view>
        </view>

    </view>
</template>

<script>
    import Index from "../index/index";
    import SearchCondition from "../component/SearchBar/SearchCondition";
    import SearchBar from "../component/SearchBar/SearchBar";

    export default {
        name: "orders",
        data() {
            return {
                searchConditon: true,
                curSex: 0,
                curPage: 1,
                switchA: false,
                conditionData:{
                    name:'筛选条件',
                    items:[
                        {
                            name:'领取状态',
                            key:'status',
                            type:'btn_radio',
                            items:[
                                { name:"全部", value:'all'},
                                { name:"未退款", value:'unrefund'},
                                { name:"已退款", value:'refund'},
                            ]
                        },
                        {
                            name:'红包类型',
                            key:'type',
                            type:'picker',
                            items:[
                                { name:"全部", value:'all'},
                                { name:"品质联盟", value:'pzlm'},
                                { name:"拼手气", value:'psq'},
                                { name:"饿了么大礼包", value:'dlb'},

                            ]
                        }
                    ]
                },
                sexPicker: ['全部', '男', '女'],
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
        components: {SearchBar, SearchCondition, Index},
        methods: {
            handleSearch(){

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
            handlePagePickerChange(e) {
                this.cur = e.detail.value + 1
            },
            SwitchA(e) {
                this.switchA = e.detail.value
            },
        }
    }
</script>

<style scoped>

</style>
