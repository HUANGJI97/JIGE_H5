<template>
    <picker @change="handlePickerChange"  range-key="name" :range="items">
        {{items[cur]['name']}}
    </picker>
</template>

<script>
    export default {
        name: "Picker",
        data() {
            return {
                cur:0,
            }
        },
        props:{
            value:{
              type:[Object,String,Number],
              default:undefined
            },
            items:{
                type:Array,
                default:()=>[]
            }
        },
        methods: {
            handlePickerChange(e){
                this.cur = e.detail.value;
                this.$emit("input",this.items[this.cur]['value'])
            }
        }
    }
</script>

<style scoped>

</style>
