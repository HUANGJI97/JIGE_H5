<template>
    <view>
        <SearchBar :condition-data="conditionData" placeholder="输入昵称或手机号"></SearchBar>


        <view class="bg-white flex justify-between padding">
            <view v-for="(item,index) in orderItem" :key="index" @tap="handleOrderItemChange(item)"
                  :class="item.order!==''? 'text-blue' : ''">{{item.name}}
                <text class="cuIcon  "
                      :class="item.order !=='asc' ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
            </view>
        </view>


        <view class=" radius-xl padding-sm ">
            <view class="flex justify-between radius-xl padding margin-top bg-white" v-for="(item,index) in list"
                  :key="index">
                <view class="flex">
                    <view class="flex align-center">
                        <view class="padding-xl bg-gray radius-xl round" :style="'background-image: url('+item.headimgurl+');background-size:cover;'"></view>
                    </view>
                    <view class="margin-left-sm text-sm">
                        <view class="flex align-center">
                            <view class="text-df text-black text-bold ">{{item.nickname}}</view>
                            <view class="margin-left cuIcon-phone cuIcon">{{item.phone}}</view>
                        </view>
                        <view class="flex margin-top-xs">
                            <view class="cuIcon-locationfill ">{{item.city}}</view>
                            <view class="cuIcon-male text-blue margin-left-sm">{{['-','男','女'][item.sex]}}</view>
                            <view class="cuIcon-likefill text-red margin-left-sm">{{item.subscribe ? '关注中':'已取关'}}</view>
                            <view class="cuIcon-time margin-left-sm text-gray text-xs">190624 13:11</view>
                        </view>
                        <view class="flex text-sm margin-top-xs">
                            <view>推广:{{item.ex_count}}</view>
                            <view class="margin-left-sm">领取:{{item.get_count}}</view>
                            <view class="margin-left-sm">充值:{{item.recharge_count}}</view>
                            <view class="margin-left-sm">积分:{{item.times}}</view>
                        </view>

                    </view>
                </view>
                <view class=" text-xs text-right flex align-center">
                    <!--                    <view class="flex">2019年6月24日 13:11 </view>-->
                    <view class="flex justify-center margin-top-sm">
                        <button class="cu-btn sm bg-green round">赠送</button>
                    </view>
                </view>

            </view>
        </view>
        <Paging v-model="page" :total="total" :size="20" @change="handlePageChange"></Paging>
    </view>
</template>

<script>
    import Index from "../index/index";
    import SearchBar from "../component/SearchBar/SearchBar";
    import Paging from "../component/Paging";
    import {getUserList} from "../../api/admin";

    export default {
        name: "user",
        data() {
            return {
                searchConditon: false,
                curSex: 0,
                page:1,
                switchA: false,
                list:[],
                total:0,
                orderItem: [  //排序项目
                    {
                        key: 'coin',
                        name: '积分',
                        order: ''
                    },
                    {
                        key: 'coin',
                        name: '领取',
                        order: ''
                    },
                    {
                        key: 'coin',
                        name: '充值',
                        order: ''
                    },
                    {
                        key: 'coin',
                        name: '注册时间',
                        order: ''
                    }
                ],
                condition: {
                    word: '',
                    city: '',
                    sex: '',
                    father_name: '',
                    subscribe: '',
                    sortby: '',
                },
                conditionData: {
                    name: '筛选条件',
                    items: [
                        {
                            name: '邀请者',
                            key: 'father',
                            type: 'input',
                            placeholder: '邀请者昵称 手机号'

                        },
                        {
                            name: '关注状态',
                            key: 'sub',
                            type: 'btn_radio',
                            items: [
                                {name: "全部", value: 'all'},
                                {name: "关注中", value: 'ing'},
                                {name: "取关", value: 'un'},


                            ]
                        },
                        {
                            name: '性别',
                            key: 'sex',
                            type: 'btn_radio',
                            items: [
                                {name: "全部", value: 'all'},
                                {name: "男", value: 'man'},
                                {name: "女", value: 'woman'},


                            ]
                        }
                    ]
                },

            }
        },
        components: {Paging, SearchBar, Index},
        onLoad() {
            console.log(`调试:页面加载`)
            this.loadData();
        },
        methods: {
            async loadData({page = 1} = {}) {
                let condition =this.condition;
                uni.showLoading({
                    title:'加载中'
                });
                let users = await getUserList({page,condition,size:20});
                uni.hideLoading()
                this.list= users.results;
                this.total = users.total;
                console.log(`调试:获取用户`, users)

            },
            handlePageChange(page){
                console.log(`调试:Page发生变化`, page);

                this.loadData({page})
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
