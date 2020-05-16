<template>
   <view>
       <view class="flex bg-white padding">
           <view class="flex round bg-gray align-center padding-xs flex-sub">
               <view class="cuIcon-search margin-left-xs"></view>
               <input class="margin-left-xs flex-sub" @focus="searchConditon = true" @blur="searchConditon = true"
                      :placeholder="placeholder"></input>
           </view>
           <button class="cu-btn bg-blue round  margin-left-sm" @tap="handleSearch">搜索</button>
       </view>
       <SearchCondition @close="searchConditon = false" v-model="condition"  v-if="searchConditon" :data="conditionData"></SearchCondition>
   </view>
</template>

<script>
    import SearchCondition from "./SearchCondition";

    export default {
        name: "SearchBar",
        components:{SearchCondition},
        data() {
            return {
                condition:{},
                searchConditon:false
            }
        },

        props:{
            name:{
              type:String,
              default:undefined
            },
            placeholder:{
              type:String,
              default:''
            },
            conditionData:{
                type:Object,
                default:()=>{}
            },
            value:{
                type:Object,
                default:undefined
            }
        },
        methods: {
            handleSearch(){
                this.searchConditon=false;

            }
        }
    }
</script>

<style scoped>

</style>
