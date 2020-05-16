<template>
    <view class="text-df">
        <view class="pure_top padding">
            <view class="flex align-center ">
                <view class="round padding-xl bg-gray" style="background-image: url(https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/logo.png);background-size: cover;"></view>

                <view class="margin-left text-white ">
                    <view class="text-bold text-xl">鸡哥小助手</view>
                    <view class="margin-top-sm">
                        {{userInfo.nickname}}
                        <text class="cuIcon cuIcon-settingsfill margin-left-xs"></text>

                    </view>
                </view>
            </view>
            <view class="  justify-between text-sm bg-white padding radius-xxl"
                  style="position: relative;bottom: -20px;">


                <view class="flex margin-top-xs flex-wrap">
                    <view class=" text-center flex-sub padding-xs margin-left-xs">
                        <view class="text-xl text-black text-bold">10</view>
                        <view class="text-gary margin-top-xs">大礼包余额</view>
                    </view>
                    <view class=" text-center flex-sub padding-xs margin-left-xs">
                        <view class="text-xl text-black text-bold">10</view>
                        <view class="text-gary margin-top-xs">一键领取余额</view>
                    </view>
                    <view class=" text-center flex-sub padding-xs margin-left-xs">
                        <view class="text-xl text-black text-bold">10</view>
                        <view class="text-gary margin-top-xs">拼手气余额</view>
                    </view>
                </view>


            </view>

        </view>


        <view class="margin-top bg-white radius-xl padding-sm text-df padding-left">
            <view class="text-bold text-black text-sm">系统管理</view>
            <view class="flex margin-top-sm flex-wrap padding-left-sm">
                <view class="text-center  padding-xs   margin-right-sm radius-xl " hover-class="bg-gray"
                      v-for="(item,index) in menu" :key="index" @tap="handleMenuTap(item)">
                    <view class="cuIcon ext-sl " :class="'text-'+ item.color +'   cuIcon-'+item.icon"
                          style="font-size:50rpx;"></view>

                    <view class="text-sm margin-top-xs text-gray">{{item.title}}</view>
                </view>
            </view>
        </view>


        <view class="  justify-between text-sm bg-white padding-sm radius-xxl ">
            <!--            <view class="text-bold text-black text-df">财务数据</view>-->
            <view class="flex justify-between">
                <view class="text-bold text-black">运营数据</view>
                <picker @change="handlePickerChange" :value="curPicker" :range="picker">
                    <view class="flex align-center">
                        {{picker[curPicker]}}
                        <text class="cuIcon-unfold"></text>
                    </view>
                </picker>
            </view>
            <view class="flex margin-top-xs margin-top-sm">
                <view class=" text-center padding-xs margin-left-xs flex-sub " :class="cur === index ? 'text-white bg-blue radius-xl' :''"
                      v-for="(item,index) in dataItem" :key="index" @tap="handleSwitchData(index)">
                    <view class="text-df text-bold" :class="cur === index ? 'text-white' :'text-black '">{{item.value | formatValue(index)}}
                    </view>
                    <view class="text-gary">{{item.name}}</view>
                </view>
            </view>

        </view>
        <view class=" " style="">
            <!--    <view class="padding-sm bg-white text-black">数据视图</view>-->
            <!--                <canvas canvas-id="canvasLineA" disable-scroll=true id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"  @touchstart="touchLineA"></canvas>-->
            <canvas canvas-id="canvasLineA" disable-scroll=true id="canvasLineA" class="bg-white  bg-red"
                    :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
                    @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
            <!--                <canvas class="bg-red " style="position: relative;right: 32px; left: 16px;" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>-->
        </view>


    </view>

</template>

<script>
    import uCharts from "../component/u-charts/u-charts"
    import cache from "../../utils/cache";
    import {getLogCount, getPanelData, getRechargeCount, getUserCount} from "../../api/admin";
    var _self;
    var canvaLineA = null;
    export default {
        name: "home",
        data() {
            return {
                cur: 0,
                curPicker:0,
                panleData:{},
                userInfo:cache.get("userInfo"),
                cWidth: '',
                cHeight: '',
                pixelRatio: 3,
                picker:["本周","本月","总数据"],
                dataItem: [
                    {name: '新增用户', value: 0},
                    {name: '今日领取', value: 0},
                    {name: '今日充值', value: 0},
                    {name: '今日支出', value: 0},
                    {name: '今日盈利', value: 0}
                ],
                menu: [
                    {
                        key: 'recharge',
                        title: '粮票充值',
                        icon: 'pay',
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
                        url: '../nmsl/nmsl'
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
                        url: './admin',
                        color: 'pink'
                    },


                ],

                userInfo: {
                    nickname: '王钢蛋',
                    headimgurl: 'http://thirdwx.qlogo.cn/mmopen/NiaudYqK5icH4uI7Q6nzPJNOtUKnb2ial3uAMQUf4iakyn5Tvt43Bqs6g3AShPzeyV8CrIfTLGibXoqtZYbBF4tLlaB90avXTYpAY/132',
                    times: '10'
                },
                menu: [
                    {
                        key: 'recharge',
                        title: '用户管理',
                        icon: 'peoplefill',
                        url:'../admin/user',
                        color: 'red'

                    },
                    {
                        key: 'pay',
                        title: '充值订单',
                        icon: 'form',
                        url:'../admin/orders',
                        color: 'green'
                    },
                    {
                        key: 'qa',
                        title: '领取记录',
                        icon: 'newshot',
                        url:'../admin/log',
                        color: 'blue'
                    },
                    {
                        key: 'qa',
                        title: '充值方案',
                        icon: 'rechargefill',
                        color: 'orange'
                    },
                    {
                        key: 'qa',
                        title: '接口日志',
                        icon: 'time',
                        color: 'blue'
                    },

                    // {
                    //     key: 'qa',
                    //     title: '菜单设置',
                    //     icon: 'sort',
                    //     color: 'blue'
                    // },
                    {
                        key: 'qa',
                        title: '自动回复',
                        icon: 'markfill',
                        color: 'blue'
                    },
                    {
                        key: 'qa',
                        title: '口令红包',
                        icon: 'redpacket_fill',
                        color: 'red'
                    },

                    {
                        key: 'qa',
                        title: '积分赠送',
                        icon: 'presentfill',
                        color: 'blue'
                    },
                    {
                        key: 'qa',
                        title: '基础设置',
                        icon: 'settings',
                        color: 'purple',
                        url: '../nmsl/nmsl'
                    },
                    {
                        key: 'qa',
                        title: '平台设置',
                        icon: 'settingsfill',
                        color: 'blue'
                    },


                ],
                dataView: [
                    {
                        key: 'recharge',
                        title: '新增用户',
                        icon: 'friendaddfill',
                        color: 'blue',
                        value: 100

                    },
                    {
                        key: 'qa',
                        title: '今日领取',
                        icon: 'redpacket_fill',
                        color: 'red',
                        value: 52
                    },
                    {
                        key: 'qa',
                        title: '今日充值',
                        icon: 'rechargefill',
                        color: 'orange',
                        value: 10.73
                    },
                    {
                        key: 'qa',
                        title: '成本支出',
                        icon: 'recharge',
                        color: 'blue',
                        value: 0.19
                    },

                    {
                        key: 'qa',
                        title: '今日盈利',
                        icon: 'moneybagfill',
                        color: 'red',
                        value: -13.14
                    },


                ],
                lineData:{},
                lineDataInfo:[
                    {
                        name:'新增用户',
                        format(val){
                            return val * 1
                        }
                    },
                    {
                        name:'领取',
                        format(val){
                            return val * 1
                        }
                    },
                    {
                        name:'充值',
                        format(val){
                            return val * 1
                        }
                    },
                    {
                        name:'支出',
                        format(val){
                            return val.toFixed(2)
                        }
                    },
                    {
                        name:'盈利',
                        format(val){
                            return val.toFixed(2)
                        }
                    }
                ]
            }
        },
        async onLoad() {
            _self = this;
            let  panleData =await  getPanelData();
            let val = panleData['recharge'] - panleData['getcount']  * 0.2;
            this.dataItem[0]['value'] = panleData['newuser'];
            this.dataItem[1]['value'] = panleData['getcount'];
            this.dataItem[2]['value'] = panleData['recharge'];
            this.dataItem[3]['value'] = panleData['getcount']  * 0.2;

            this.dataItem[4]['value'] = val;
            this.dataItem[4]['name'] = val>0 ? '今日盈利' : '今日亏损';
            let userLineData = await getUserCount();
            let rechargeData  = await  getRechargeCount();
            let logData  = await  getLogCount();

            this.lineData[0] = userLineData;
            this.lineData[1] = logData;
            this.lineData[2] = rechargeData;
            this.lineData[3] = logData.map(item=>{
                let val =item["count"]*0.2;
                item["count"] =val.toFixed(2);
                console.log(`调试:支出调试`, item)
                return item;
            });
            this.lineData[4] = logData.map((item,index)=>{
                 let income = rechargeData[index]['count'];
                 console.log(`调试:收入`, income);
                 let expend = item["count"] ;
                console.log(`调试:支出`, expend);

                item["count"] = (income - expend).toFixed(2);
                 return item;

            });
            console.log(`调试:获取用户统计`, userLineData);
            this.cWidth = uni.upx2px(750);
            this.cHeight = uni.upx2px(500);
            this.setData(0);
        },
        methods: {
            handlePickerChange(e){
                let {detail} = e
                this.curPicker  = detail.value
                console.log(`调试:`, index)
            },
            handleSwitchData(index) {
                this.cur = index;
                this.setData(index,this.lineDataInfo[index]['format'])
            },
            moveLineA(e) {
                canvaLineA.scroll(e);
            },
            touchEndLineA(e) {
                canvaLineA.scrollEnd(e);
                //下面是toolTip事件，如果滚动后不需要显示，可不填写
                canvaLineA.touchLegend(e);
                canvaLineA.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data
                    }
                });
            },
            handleMenuTap(item) {
                if (item.url) {
                    uni.navigateTo({
                        url: item.url
                    })
                }
            },
            setData(index) {
                // let lineData = [
                //     {
                //         categories: ['2019-09-08', '2019-09-09', '2019-09-10', '2019-09-11', '2019-09-12', '2019-09-13', '2019-09-14'],
                //         series: [{
                //             name: '新增用户',
                //             data: [35, 20, 25, 37, 4, 20, 4],
                //             color: '#000000'
                //         }]
                //     },
                //     {
                //         categories: ['2019-09-08', '2019-09-09', '2019-09-10', '2019-09-11', '2019-09-12', '2019-09-13', '2019-09-14'],
                //         series: [{
                //             name: '今日领取',
                //             data: [3, 11, 26, 12, 42, 32, 41],
                //             color: 'red'
                //         }]
                //     },
                //     {
                //         categories: ['2019-09-08', '2019-09-09', '2019-09-10', '2019-09-11', '2019-09-12', '2019-09-13', '2019-09-14'],
                //         series: [{
                //             name: '今日充值',
                //             data: [3.22, 20.12, 25.32, 37.12, 4.5, 20.22, 4.3],
                //             color: '#000000'
                //         }]
                //     },
                //     {
                //         categories: ['2019-09-08', '2019-09-09', '2019-09-10', '2019-09-11', '2019-09-12', '2019-09-13', '2019-09-14'],
                //         series: [{
                //             name: '今日支出',
                //             data: [3.5, 20.80, 22.5, 37.11, 8, 20.90, 4.1],
                //             color: '#000000'
                //         }]
                //     }, {
                //         categories: ['2019-09-08', '2019-09-09', '2019-09-10', '2019-09-11', '2019-09-12', '2019-09-13', '2019-09-14'],
                //         series: [{
                //             name: '今日盈利',
                //             data: [35, 20, 25, 37, 4, 20, 4],
                //             color: '#000000'
                //         }]
                //     }
                // ]

                let data =this.lineData[index];
                let LineA = {categories: [], series: []};
                console.log(`调试:要渲染的数据`, data);
                LineA.categories = data.map(item=>{
                    return item.days
                });
                LineA.series=[{
                    name:this.lineDataInfo[index]['name'],
                    data:data.map(item=>{
                        return item.count
                    }),
                    color: '#000000'
                }];

                this.showLineA("canvasLineA", LineA,this.lineDataInfo[index]['format'])

            },
            showLineA(canvasId, chartData,format = (item)=>{return item;}) {
                canvaLineA = new uCharts({
                    $this: this,
                    canvasId: canvasId,
                    type: 'line',
                    fontSize: 11,
                    legend: {show: true},
                    dataLabel: false,
                    dataPointShape: true,
                    background: '#FFFFFF',
                    pixelRatio: _self.pixelRatio,
                    categories: chartData.categories,
                    series: chartData.series,
                    animation: true,
                    enableScroll: true,//开启图表拖拽功能
                    xAxis: {
                        type: 'grid',
                        gridColor: '#CCCCCC',
                        gridType: 'dash',
                        dashLength: 7,
                        itemCount: 5,
                        scrollShow: true,
                        scrollAlign: 'left',
                    },
                    yAxis: {
                        gridType: 'dash',
                        gridColor: '#CCCCCC',
                        dashLength: 8,
                        splitNumber: 5,
                        min: 10,
                        max: 180,
                        format
                    },
                    width: _self.cWidth * _self.pixelRatio,
                    height: _self.cHeight * _self.pixelRatio,
                    extra: {
                        line: {
                            type: 'curve'
                        }
                    }
                });

            },
            touchLineA(e) {
                canvaLineA.scrollStart(e);
            },
            // touchLineA(e) {
            //     canvaLineA.showToolTip(e, {
            //         format: function (item, category) {
            //             return category + ' ' + item.name + ':' + item.data
            //         }
            //     });
            // }
        },
        filters:{
            formatValue(val,index){
                let map=[0,0,2,2,2]
                return  val.toFixed(map[index]);
            }
        }
    }
</script>

<style scoped>
    .pure_top {
        width: 100%;
        position: relative;
        z-index: -1;
        height: 180px;
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

    /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
    .qiun-charts {
        width: 750 upx;
        height: 500 upx;
        background-color: #FFFFFF;
    }

    .charts {
        width: 750 upx;
        height: 500 upx;
        background-color: #FFFFFF;
    }
</style>
