(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addCard-addCard"],{1342:function(e,t,n){"use strict";n.r(t);var r=n("6bb5"),o=n("719a");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("5005");var u=n("2877"),i=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,"90c27e5e",null);t["default"]=i.exports},5005:function(e,t,n){"use strict";var r=n("b452"),o=n.n(r);o.a},"64c1":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("a34a")),o=n("7381"),a=n("fa7d");function u(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(r,o)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function u(e){i(a,r,o,u,c,"next",e)}function c(e){i(a,r,o,u,c,"throw",e)}u(void 0)})}}var s={name:"addCard",data:function(){return{submiting:!1,cardno:"",school:""}},methods:{handleSubmit:function(){var e=c(r.default.mark(function e(){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("调试:当前卡号",this.cardno),!this.school||""===this.school){e.next=14;break}return this.submiting=!0,e.next=5,(0,o.addCard)({cardno:this.cardno}).catch(function(e){uni.hideLoading(),uni.showToast({title:"添加失败"}),console.log("调试:添加失败",e)});case 5:return e.sent,this.submiting=!1,uni.showToast({title:"绑定成功"}),e.next=10,(0,a.delay)(1e3);case 10:console.log("调试:绑定成功",this.result),uni.navigateBack(-1),e.next=15;break;case 14:uni.showToast({title:"卡号不正确",icon:"none"});case 15:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),handleCardnoCahnge:function(){var e=c(r.default.mark(function e(){var t=this;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("调试:当前卡号",this.cardno,this.cardno.length),10!==this.cardno.length){e.next=8;break}return e.next=4,(0,o.getSchoolNameByCard)({cardno:this.cardno}).catch(function(e){t.school=""});case 4:this.school=e.sent,console.log("调试:获取到的校名",this.school),e.next=9;break;case 8:this.school="";case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}};t.default=s},"6b43":function(e,t,n){"use strict";function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){function e(){o(this,e)}return u(e,[{key:"set",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.sync,o=void 0===r||r;return t=t instanceof Object?JSON.stringify(t):t,o?uni.setStorageSync(e,t):new Promise(function(n,r){uni.setStorage({key:e,data:t,success:n,fail:r})})}},{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.sync,r=void 0===n||n;if(r){var o=uni.getStorageSync(e);return this.isJSON(o)&&(o=JSON.parse(o)),o}return new Promise(function(t,n){uni.getStorage({key:e,success:t,fail:n})})}},{key:"del",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.sync,r=void 0===n||n;return r?uni.removeStorageSync(e):new Promise(function(t,n){uni.removeStorage({key:e,success:t,fail:n})})}},{key:"isJSON",value:function(e){try{if("object"==r(JSON.parse(e)))return!0}catch(t){}return!1}}]),e}(),c=new i,s=c;t.default=s},"6bb5":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("cu-custom",{attrs:{isBack:!0}},[n("template",{attrs:{slot:"content"},slot:"content"},[e._v("添加卡片")])],2),n("v-uni-view",{staticClass:"cu-card"},[n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-view",{staticClass:"title"},[e._v("卡号")]),n("v-uni-input",{staticClass:"radius",attrs:{placeholder:"请输入卡号",type:"number",name:"input"},on:{input:function(t){t=e.$handleEvent(t),e.handleCardnoCahnge(t)}},model:{value:e.cardno,callback:function(t){e.cardno=t},expression:"cardno"}}),n("v-uni-text",{staticClass:"cuIcon-card text-gray"})],1),n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-view",{staticClass:"title"},[e._v("学校")]),n("v-uni-input",{staticClass:"radius",attrs:{placeholder:"请输入卡号自动识别",disabled:"disabled",name:"input"},model:{value:e.school,callback:function(t){e.school=t},expression:"school"}}),n("v-uni-text",{staticClass:"cuIcon-group_fill text-gray"})],1)],1),n("v-uni-button",{staticClass:"cu-btn block bg-green lg  margin-top-xl cuIcon-add",attrs:{disabled:e.submiting,loading:e.submiting},on:{click:function(t){t=e.$handleEvent(t),e.handleSubmit(t)}}},[e._v("绑定")])],1)},o=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o})},"719a":function(e,t,n){"use strict";n.r(t);var r=n("64c1"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=o.a},7381:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCardList=c,t.getCardInfo=l,t.unLinkCard=d,t.updateCardName=h,t.getSchoolNameByCard=y,t.addCard=g,t.setCardLimit=w,t.reportLossCard=k;var r=a(n("a34a")),o=n("b775");function a(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e){u(a,r,o,i,c,"next",e)}function c(e){u(a,r,o,i,c,"throw",e)}i(void 0)})}}function c(){return s.apply(this,arguments)}function s(){return s=i(r.default.mark(function e(){var t;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.request.get({url:"/wxlinkcard"});case 2:return t=e.sent,console.log("调试:获取到卡片列表",t),e.abrupt("return",t.linkcard.map(function(e){return e.cardno}));case 5:case"end":return e.stop()}},e)})),s.apply(this,arguments)}function l(e){return f.apply(this,arguments)}function f(){return f=i(r.default.mark(function e(t){var n,a;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.cardno,e.next=3,o.request.post({url:"/cardinfo",data:{cardno:n}});case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e)})),f.apply(this,arguments)}function d(e){return p.apply(this,arguments)}function p(){return p=i(r.default.mark(function e(t){var n,a;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.cardno,e.next=3,o.request.post({url:"/unlinkcard",data:{cardno:n}});case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e)})),p.apply(this,arguments)}function h(e){return v.apply(this,arguments)}function v(){return v=i(r.default.mark(function e(t){var n,a,u;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.cardno,a=t.name,e.next=3,o.request.post({url:"/cardname",data:{cardno:n,name:a}});case 3:return u=e.sent,e.abrupt("return",u);case 5:case"end":return e.stop()}},e)})),v.apply(this,arguments)}function y(e){return m.apply(this,arguments)}function m(){return m=i(r.default.mark(function e(t){var n,a;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.cardno,e.next=3,o.request.post({url:"/cardschool",data:{cardno:n}});case 3:return a=e.sent,e.abrupt("return",a.schoolname);case 5:case"end":return e.stop()}},e)})),m.apply(this,arguments)}function g(e){return b.apply(this,arguments)}function b(){return b=i(r.default.mark(function e(t){var n,a;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.cardno,e.next=3,o.request.post({url:"/addcard",data:{cardno:n}});case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e)})),b.apply(this,arguments)}function w(e){return x.apply(this,arguments)}function x(){return x=i(r.default.mark(function e(t){var n,a,u,i;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.cardno,a=t.daylimitmoney,u=t.daylimitcount,e.next=3,o.request.post({url:"/modifydaylimit",data:{cardno:n,daylimityuan:a,daylimitcount:u}});case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}},e)})),x.apply(this,arguments)}function k(e){return O.apply(this,arguments)}function O(){return O=i(r.default.mark(function e(t){var n,a,u;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.openid,a=t.cardno,e.next=3,o.request.post({url:"/suspendcard",data:{openid:n,cardno:a}});case 3:return u=e.sent,e.abrupt("return",u);case 5:case"end":return e.stop()}},e)})),O.apply(this,arguments)}},"7d46":function(e,t,n){t=e.exports=n("2350")(),t.push([e.i,".footer[data-v-90c27e5e]{width:70vw;position:absolute;left:0;right:0;bottom:40px;margin:0 auto\n    /*bottom: 0px;*/\n    /*left: 0px;*/\n    /*right: 0px;*/}",""])},a34a:function(e,t,n){e.exports=n("bbdd")},a603:function(e,t,n){"use strict";function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){i(e,t,n[t])})}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=function(){function e(){o(this,e),i(this,"config",{baseUrl:"",header:{"Content-Type":"application/json;charset=UTF-8"},method:"GET",dataType:"json",responseType:"text",success:function(){},fail:function(){},complete:function(){}}),i(this,"interceptor",{request:function(t){t&&(e.requestBeforeFun=t)},response:function(t){t&&(e.requestComFun=t)}})}return u(e,[{key:"setConfig",value:function(e){this.config=e(this.config)}},{key:"request",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n.baseUrl=n.baseUrl||this.config.baseUrl,n.dataType=n.dataType||this.config.dataType,n.url=e.posUrl(n.url)?n.url:n.baseUrl+n.url,n.data=n.data||{},n.header=n.header||this.config.header,n.method=n.method||this.config.method,new Promise(function(o,a){var u=!0,i=null;n.complete=function(t){var n=t.statusCode;t.config=i,t=e.requestComFun(t),200===n?o(t):a(t)};var c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t={errMsg:e,config:s};a(t),u=!1},s=r({},t.config,n);i=r({},s,e.requestBeforeFun(s,c)),console.log("调试:输出_config",i),u&&uni.request(i)})}},{key:"get",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.url?n=e:(n.url=e,n.data=t),n.method="GET",this.request(n)}},{key:"post",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.url?n=e:(n.url=e,n.data=t),n.method="POST",this.request(n)}}],[{key:"posUrl",value:function(e){return/(http|https):\/\/([\w.]+\/?)\S*/.test(e)}},{key:"requestBeforeFun",value:function(e){return e}},{key:"requestComFun",value:function(e){return e}}]),e}();t.default=c},b452:function(e,t,n){var r=n("7d46");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var o=n("4f06").default;o("979671ee",r,!0,{sourceMap:!1,shadowMode:!1})},b775:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.request=void 0;var r=a(n("a603")),o=a(n("6b43"));function a(e){return e&&e.__esModule?e:{default:e}}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=new r.default;t.request=c,c.setConfig(function(e){return e.baseUrl="http://eleme.lianfangti.cn",e}),c.interceptor.request(function(e,t){return e.header=u({},e.header,{token:o.default.get("token")||"","X-Token":o.default.get("X-Token")||""}),e}),c.interceptor.response(function(e){if(0!==e.data.code){var t="".concat(e.config.method," ").concat(e.config.url.replace(e.config.base,""));if(400===e.data.code&&(window.location.href=window.location.protocol+"//"+window.location.host),403===e.data.code){o.default.del("X-Token");var n=window.location.protocol+"//"+window.location.host+"/"+window.location.search;console.log("调试:要跳转的",n,window.location),window.location.href=n}return Promise.reject({from:t,error:e.data||e.data})}return e.data})},bbdd:function(e,t,n){var r=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,a=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,e.exports=n("96cf"),o)r.regeneratorRuntime=a;else try{delete r.regeneratorRuntime}catch(u){r.regeneratorRuntime=void 0}},fa7d:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.delay=l,t.comfirm=d,t.requestPayment=h,t.isJSON=y,t.navigateTo=m,t.decodeParams=b,t.dateDifference=w,t.dateFormat=x,t.isMobile=k,t.randomIntegerInRange=O;var r=o(n("a34a"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function c(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(r,o)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function u(e){c(a,r,o,u,i,"next",e)}function i(e){c(a,r,o,u,i,"throw",e)}u(void 0)})}}function l(){return f.apply(this,arguments)}function f(){return f=s(r.default.mark(function e(){var t,n=arguments;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:1e3,e.abrupt("return",new Promise(function(e){setTimeout(function(){e(!0)},t)}));case 2:case"end":return e.stop()}},e)})),f.apply(this,arguments)}function d(e){return p.apply(this,arguments)}function p(){return p=s(r.default.mark(function e(t){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("调试:你调用了comfrm"),e.abrupt("return",new Promise(function(e,n){uni.showModal(a({},t,{success:function(t){var n=t.confirm;console.log("调试:showModal Success",n),e(n)},fail:function(e){console.log("错误:showModal Fail",e),n({origin:"comfirm方法",error:e})}}))}));case 2:case"end":return e.stop()}},e)})),p.apply(this,arguments)}function h(e){return v.apply(this,arguments)}function v(){return v=s(r.default.mark(function e(t){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("调试:requestPament接收到参数",t),e.next=3,new Promise(function(e,n){uni.requestPayment(a({},t,{success:e,fail:function(e){n({origin:"支付接口",error:e})}}))});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)})),v.apply(this,arguments)}function y(e){try{if("object"==i(JSON.parse(e)))return!0}catch(t){}return!1}function m(e){e.params&&(e.url="".concat(e.url).concat(g(e.params))),uni.navigateTo(e)}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="?";for(var n in e)t+="".concat(n,"=").concat(e[n],"&");return t.substring(0,t.length-1)}function b(e){var t={};return-1!==e.indexOf("?")?e.split("?")[1].split("&").forEach(function(e){t[e.split("=")[0]]=e.split("=")[1]}):e.split("&").forEach(function(e){t[e.split("=")[0]]=e.split("=")[1]}),t}function w(e,t){var n,r,o,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"d",u={s:1e3,m:6e4,h:36e5,d:864e5};return e=e instanceof Date?e:new Date(e),t=t instanceof Date?t:new Date(t),n=e.getTime()-t.getTime(),n=Math.abs(n),r=n/u[a],"d"===a&&r%1!==0&&r<1?o=1:(o=Math.floor(r),r%1!==0&&(o+=1)),o}function x(e,t){var n=new Date(e),r={"Y+":n.getFullYear(),"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds(),"q+":Math.floor((n.getMonth()+3)/3),S:n.getMilliseconds()},o=t;return/(y+)/.test(t)&&(o=t.replace(RegExp.$1,"".concat(n.getFullYear()).substr(4-RegExp.$1.length))),Object.keys(r).forEach(function(e){new RegExp("(".concat(e,")")).test(t)&&(o=o.replace(RegExp.$1,1===RegExp.$1.length?r[e]:"00".concat(r[e]).substr("".concat(r[e]).length)))}),o}function k(){var e=navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);return e}function O(e,t){return Math.floor(Math.random()*(t-e+1))+e}}}]);