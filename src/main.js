import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue';
import './utils/ican-clipBoard'


Vue.component('cu-custom',cuCustom);
Vue.config.productionTip = false;
Vue.prototype.ENV = "prod";

App.mpType = 'app';


const app = new Vue({
  ...App
});
app.$mount();
