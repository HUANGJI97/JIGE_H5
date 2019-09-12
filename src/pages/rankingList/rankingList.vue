<template>
  <view>
      <view class="bg-blue flex  padding-xl justify-between shadow-blur shadow" style="height: 300rpx;padding-left: 100rpx;padding-right: 100rpx;"  hover-class="bg-gradual-blue">
           <view class=" flex align-end">
               邀
               <text class="text-xxl">{{ex_count}}</text>人
           </view>
           <view class="flex align-end">
               <view class="text-center">
                   <view class="margin-bottom">{{userInfo.nickname}}</view>
                   <view class="cu-avatar xl round" :style="'background-image: url('+userInfo.headimgurl+')'"></view>
               </view>
           </view>
           <view class=" flex align-end">
               <div v-if="ex_count == 0 || index >20">
                   未上榜
               </div>
               <div v-else>
                   第
                   <text class="text-xxl">{{this.index}}</text>
                   <text>名</text></div>
           </view>
      </view>
      <view class="bg-white padding-sm">
          <view class="flex justify-between margin  round bg-gray shadow">
                <view class="flex-sub text-center padding-sm round " :class="active === index ? 'bg-blue' :''" hover-class="bg-gradual-blue" v-for="(item,index) in tabs" @click="handleTabChange(index)">{{item.name}}</view>
          </view>
      </view>
      <view>
          <view class="flex bg-white padding  align-center" v-for="(item,index) in ranking.slice(0,20)" >
              <view class="flex flex-sub align-center">
                  <view class="align-center  margin-left margin-right text-bold ">{{(index + 1)>9?index + 1:`0${index + 1}`}}</view>
                   <view class="cu-avatar round margin-right-sm md" :style="'background-image: url('+item.headimgurl+')'"></view>
                   <view>
                       <view>{{item.nickname}}</view>
                       <view v-if="index<11 && active <2" class="text-xs text-gray">赠:{{item.reward ? item.reward.name : '无'}}</view>
                   </view>
              </view>
              <view class="text-xxl margin-right-xl">{{item.value + item.fake}}</view>
          </view>
      </view>
  </view>
</template>

<script>
    import {getExtensionUser, getRanking} from "../../api/user";
    import cache from "../../utils/cache";
    import {randomIntegerInRange} from "../../utils/utils";

    export default {
        name: "rankingList",
        data(){
          return{
              ranking:[],
              index:0,
              userInfo:cache.get("userInfo"),
              active:0,
              gifts:[],
              ex_count:0,
              tabs:[{name:'周榜',key:'week'},{name:'月榜',key:'month'},{name:'总榜',key:'all'}],
              exInfo:{}
          }
        },
        async onLoad(){
            this.loadData({index:this.active});

        },
        methods:{
            async handleTabChange(index){
                this.active=index;
                this.loadData({index});

            },
            async loadData({index = 0}= {}){
                uni.showLoading({
                    title:'请稍后..'
                });
               let data =  await getRanking({type:this.tabs[index].key});
                this.ranking = data.rank;
                this.ex_count = data.ex_count
                // this.ex_count =data.ex_count;
                // this.gifts = data.ranking;
                // let realExCount = this.ranking.length >0 ? this.ranking[0]['ex_count'] : 0; //真实的最大数据
                // realExCount =  realExCount *1
                // console.log(`调试:真实的最大邀请量`, realExCount);
                // for(let i=0;i<10;i++){
                //       this.ranking.push({
                //           ex_count: randomIntegerInRange(realExCount,realExCount+100),
                //           headimgurl:'https://cdn.nlark.com/yuque/0/2018/jpeg/anonymous/1544580626166-9faae07c-19d7-44fd-bbb1-2d246fcc0131.jpeg?x-oss-process=image/resize,m_fill,w_64,h_64/format,png',
                //           nickname:'Fake User'
                //       })
                // }
                // this.ranking.sort((item1,item2)=>{
                //     return item2["ex_count"] - item1["ex_count"];
                // });
                // this.exInfo= await getExtensionUser({type:this.tabs[index].key});
                for(let index in this.ranking){
                    if(this.userInfo.id == this.ranking[index].uid){
                        this.index = (index * 1) +1;
                        break;
                    }
                }
                uni.hideLoading();
            }
        }
    }
</script>

<style scoped>

</style>
