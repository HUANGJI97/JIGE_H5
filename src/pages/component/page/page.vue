<template>
    <view class="cu-page text-sm">
        <cu-custom bg-color="#387AFF" title-color="white"  :isBack="pagecount> 1" v-if="CUR_MP==='mp-weixin'">
            <block slot="content">{{title ||tabbarOptions.pages[tabbarOptions.index].title}}</block>
        </cu-custom>
        <view class="page-content " :style="{height:'calc(100vh - ' + CustomBar + 'px)',backgroundColor:bgColor || ''}">
            <slot></slot>
        </view>
        <view v-if="showTabbar" class="footer">
            <view class="cu-bar tabbar  " style="background:#F7F7FA;">

                <view
                        v-for="(item,index) in tabbarOptions.pages"
                        :key="index"
                        class="action "
                        :class="(index  === tabbarOptions.index ? 'text-blue' : 'text-gray') + ' '+(item.type === 'button' ? 'add-action' : '')"
                        @tap="handleTabbarTap(item,index)"
                >
                    <button v-if="item.type==='button'" class='cu-btn bg-blue shadow'
                            :class="item.loadding ? 'cuIcon-loading animation-rotate' : item.icon"
                            @tap="handleTabbarActionTap(item)"></button>
                    <view v-else :class='"cuIcon-"+item.icon' :data-key="item.key" :data-index="index"
                    ></view>
                    {{item.title}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "page",
        data() {
            return {
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                CUR_MP:this.CUR_MP,
                tabbarOptions: {},
                stack: [],
                pagecount: 0,

            };
        },

        beforeMount() {
            // console.log(`调试:beforeMount`);
            let pages = getCurrentPages();
            // console.log(`调试:`, pages);
            this.pagecount = pages.length;
            this.tabbarOptions = this.tabbar;


            //   console.log(`调试:页面栈`, pages);
            //
            //   this.stack = pages;
        },
        methods: {
            handleTabbarTap(item,index) {
                // let {target: {dataset: {key, index}}} = e;
                console.log(`调试:`,item);
                let {key,type} = item;
                if(type==='button'){
                    return 0;// 过滤类型为按钮的点击
                }
                index = parseInt(index);
                this.tabbarOptions.index = index;
                console.log(`调试:Tabbar`,this.tabbarOptions.pages[index])
                this.$emit("onTabbarChange", {key, index});
                uni.vibrateShort();
                // console.log(`调试:`, key)
            },
            handleTabbarActionTap(item) {
                // console.log(`调试:Tabbar的Action按钮被点击`, e)
                // item.loadding = !item.loadding ;
                this.$emit('onTabbarActionTap', item);
                uni.vibrateShort();

            }
        },
        watch: {
            'tabbar.pages': {
                handler: function (val, newVal) {
                    console.log(`调试:监听到数据变化\n`,JSON.stringify(val[1]), "\n",JSON.stringify(newVal[1]))
                    this.tabbarOptions.pages = newVal;

                    // console.log(`调试:`, this.tabbar.pages)
                },
                deep: true
            },
            'tabbar': {
                handler: function (val, newVal) {
                    console.log(`调试:监听到数据变化\n`,JSON.stringify(val[1]), "\n",JSON.stringify(newVal[1]))
                    this.tabbarOptions = newVal;

                    // console.log(`调试:`, this.tabbar.pages)
                },
                deep: true
            }

        },
        props: {
            title: {
                type: String,
                default: ''
            },
            isBack: {
                type: Boolean,
                default: false,
            },
            bgColor: {
                type: String,
                default: undefined
            },
            showTabbar: {
                type: Boolean,
                default: false
            },
            tabbar: {
                type: Object,
                default() {
                    return {
                        index: 0,
                        pages: [
                            {
                                key: 'home',
                                title: '首页',
                                type: 'page',
                                icon: 'homefill',
                            }, {
                                key: 'scan',
                                title: '扫码购物',
                                type: 'button',
                                icon: 'scan',
                            }, {
                                key: 'user',
                                title: '我的',
                                type: 'page',
                                icon: 'myfill',
                            }
                        ]
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .page-content {
        /*overflow-y: scroll;*/
    }

    .footer {
        position: fixed;
        bottom: 0px;
        width: 100%;
        z-index: 999;

    }

    .add-action::after {
        box-shadow: none;
    }

    .animation-rotate {
        -webkit-animation: rotate .8s linear infinite;
    }

    @-webkit-keyframes rotate {

        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }

    }
</style>
