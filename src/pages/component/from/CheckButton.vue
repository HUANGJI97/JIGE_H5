<template>
   <view class="flex">
       <view v-if="type === 'radio'" class="cu-tag  radius" :class="cur === index ? 'bg-blue' : 'solid line-blue'" v-for="(item,index) in innerItems" :key="index" @tap="handleCheckButtonTap(item,index)">{{item.name}}</view>
       <view v-if="type === 'check'" class="cu-tag  radius" :class="item.checked ? 'bg-blue' : 'solid line-blue'" v-for="(item,index) in innerItems" :key="index" @tap="handleCheckButtonTap(item,index)">{{item.name}}</view>

   </view>
</template>

<script>
    export default {
        name: "CheckButton",
        data() {
            return {
                cur:0,
                innerItems:[]
            }
        },
        created(){
            // this.innerItems =  this.items
        },
        methods: {
            handleCheckButtonTap(item,index){
                let value;
                if(this.type==='radio'){
                    this.cur = index;
                    value = this.items[index]['value']

                }else{
                    // this.innerItems[index].checked = !this.innerItems[index].checked;

                    // console.log(`调试:改变完后的items`,JSON.stringify( this.innerItems))
                    item.checked = !item.checked;
                    value= this.innerItems.filter(res=>{
                        return  res.checked
                    }).map(res=>{
                        return res.value
                    })
                }
                this.$emit("input",value);
                console.log(`调试:向外提交值`, value)

            }
        },
        // mounted(){
        //     this.innerItems = this.items.map((item,index)=>{
        //         item['checked'] = !index;
        //         return item;
        //     })
        //
        // },
        props:{
            value:{
                type:[String,Number,Object,Array],
                default:undefined
            },
            items:{
                type:Array,
                default:[]
            },
            type:{
                item:String,
                default:'radio',
                validator(val){
                    return ["radio","check"].includes(val)
                }
            }
        },
        watch:{
            'items':{
                deep:true,
                immediate: true ,   // 这句重要
                handler(val,v2){
                    console.log(`调试:监听到items的变化`, val,v2);
                    console.log(`调试:`, this);
                    this.innerItems = val.map(item=>{

                        return {
                            checked:false,
                            ...item
                        };
                    });
                }

            },
            'innerItems':{
                deep:true,
                immediate: true ,   // 这句重要
                handler(val,v2){
                    // console.log(`调试:监听到innerItems变化`, val,v2);
                    // console.log(`调试:`, this);
                    // this.innerItems = val;
                }

            }
        }
    }
</script>

<style scoped>

</style>
