(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{3285:function(e,n,t){"use strict";t.r(n);var r=t("8439"),o=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,function(){return r[e]})}(a);n["default"]=o.a},"33d2":function(e,n,t){var r=t("835e");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var o=t("4f06").default;o("64bfe2ae",r,!0,{sourceMap:!1,shadowMode:!1})},"554e":function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("v-uni-view",{staticClass:"cu-page   "},[r("img",{staticStyle:{height:"100%",width:"100%"},attrs:{src:t("d15f")}})])},o=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return o})},"835e":function(e,n,t){n=e.exports=t("2350")(),n.push([e.i,'.bg-milk[data-v-49696e4d]{background-image:url(https://deepand.oss-cn-shenzhen.aliyuncs.com/image/bg-image-milk3.jpg);\n    /*background-image:url("https://deepand.oss-cn-shenzhen.aliyuncs.com/image/bg-milk.jpg") ;*/\n    /*background-image:url("https://deepand.oss-cn-shenzhen.aliyuncs.com/image/bg-image-milk.jpg") ;*/background-size:cover\n    /*background-color: #f4f5f0;*/}.bg-cow[data-v-49696e4d]{background-image:url(https://deepand.oss-cn-shenzhen.aliyuncs.com/image/mow-huawen.jpeg);background-size:cover\n    /*color: white;*/}.footer[data-v-49696e4d]{width:70vw;position:absolute;left:0;right:0;bottom:40px;margin:0 auto\n    /*bottom: 0px;*/\n    /*left: 0px;*/\n    /*right: 0px;*/}\n\n/*https://deepand.oss-cn-shenzhen.aliyuncs.com/image/mow-huawen.jpeg*/',""])},8439:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(t("a34a")),o=t("c24f"),a=t("fa7d"),u=i(t("6b43"));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,n,t,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void t(s)}i.done?n(c):Promise.resolve(c).then(r,o)}function s(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){var a=e.apply(n,t);function u(e){c(a,r,o,u,i,"next",e)}function i(e){c(a,r,o,u,i,"throw",e)}u(void 0)})}}var l={name:"login",data:function(){return{loading:!1}},onLoad:function(){var e=s(r.default.mark(function e(){var n,t,i,c,s,l;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=u.default.get("tokens"),t=(0,a.decodeParams)(window.location.href),i=t.token,c=t.code,s=t.state,console.log("调试:获取缓存",n),!u.default.get("X-Token")){e.next=10;break}return i&&u.default.set("token",i),uni.reLaunch({url:"../user/user"}),e.abrupt("return",0);case 10:if(!c){e.next=20;break}return e.next=13,(0,o.getAccessToken)({code:c,token:s});case 13:return l=e.sent,u.default.set("token",s),uni.reLaunch({url:"../user/user"}),console.log("调试:获取",l),e.abrupt("return",0);case 20:i?(console.log("调试不存在缓存正在调用登录:"),(0,o.Login)({token:i,env:"prod"})):console.log("调试:啥都没有 程序结束",t,n);case 21:case"end":return e.stop()}},e)}));function n(){return e.apply(this,arguments)}return n}(),methods:{handleLogin:function(){uni.reLaunch({url:"../index/index"})},handleGetMobile:function(){var e=s(r.default.mark(function e(n){var t,a,u;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=n.detail,a=t.encryptedData,u=t.iv,console.log("调试:获取手机号调试",a),e.next=5,(0,o.getMobile)({encryptedData:a,iv:u});case 5:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}(),handelGetUserInfo:function(){var e=s(r.default.mark(function e(n){var t;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=n.detail,t.userInfo,t.encryptedData,t.iv,e.next=4,(0,o.Login)();case 4:e.sent,this.loading=!1,uni.redirectTo({url:"../index/index"});case 7:case"end":return e.stop()}},e,this)}));function n(n){return e.apply(this,arguments)}return n}()}};n.default=l},9234:function(e,n,t){"use strict";var r=t("33d2"),o=t.n(r);o.a},a86a:function(e,n,t){"use strict";t.r(n);var r=t("554e"),o=t("3285");for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);t("9234");var u=t("2877"),i=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,"49696e4d",null);n["default"]=i.exports},d15f:function(e,n,t){e.exports=t.p+"static/img/haibao.acaed6be.jpg"},fa7d:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.delay=l,n.comfirm=d,n.requestPayment=h,n.isJSON=m,n.navigateTo=v,n.decodeParams=w,n.dateDifference=y,n.dateFormat=k,n.isMobile=x,n.randomIntegerInRange=M;var r=o(t("a34a"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){u(e,n,t[n])})}return e}function u(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function c(e,n,t,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void t(s)}i.done?n(c):Promise.resolve(c).then(r,o)}function s(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){var a=e.apply(n,t);function u(e){c(a,r,o,u,i,"next",e)}function i(e){c(a,r,o,u,i,"throw",e)}u(void 0)})}}function l(){return f.apply(this,arguments)}function f(){return f=s(r.default.mark(function e(){var n,t=arguments;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:1e3,e.abrupt("return",new Promise(function(e){setTimeout(function(){e(!0)},n)}));case 2:case"end":return e.stop()}},e)})),f.apply(this,arguments)}function d(e){return p.apply(this,arguments)}function p(){return p=s(r.default.mark(function e(n){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("调试:你调用了comfrm"),e.abrupt("return",new Promise(function(e,t){uni.showModal(a({},n,{success:function(n){var t=n.confirm;console.log("调试:showModal Success",t),e(t)},fail:function(e){console.log("错误:showModal Fail",e),t({origin:"comfirm方法",error:e})}}))}));case 2:case"end":return e.stop()}},e)})),p.apply(this,arguments)}function h(e){return g.apply(this,arguments)}function g(){return g=s(r.default.mark(function e(n){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("调试:requestPament接收到参数",n),e.next=3,new Promise(function(e,t){uni.requestPayment(a({},n,{success:e,fail:function(e){t({origin:"支付接口",error:e})}}))});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)})),g.apply(this,arguments)}function m(e){try{if("object"==i(JSON.parse(e)))return!0}catch(n){}return!1}function v(e){e.params&&(e.url="".concat(e.url).concat(b(e.params))),uni.navigateTo(e)}function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n="?";for(var t in e)n+="".concat(t,"=").concat(e[t],"&");return n.substring(0,n.length-1)}function w(e){var n={};return-1!==e.indexOf("?")?e.split("?")[1].split("&").forEach(function(e){n[e.split("=")[0]]=e.split("=")[1]}):e.split("&").forEach(function(e){n[e.split("=")[0]]=e.split("=")[1]}),n}function y(e,n){var t,r,o,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"d",u={s:1e3,m:6e4,h:36e5,d:864e5};return e=e instanceof Date?e:new Date(e),n=n instanceof Date?n:new Date(n),t=e.getTime()-n.getTime(),t=Math.abs(t),r=t/u[a],"d"===a&&r%1!==0&&r<1?o=1:(o=Math.floor(r),r%1!==0&&(o+=1)),o}function k(e,n){var t=new Date(e),r={"Y+":t.getFullYear(),"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()},o=n;return/(y+)/.test(n)&&(o=n.replace(RegExp.$1,"".concat(t.getFullYear()).substr(4-RegExp.$1.length))),Object.keys(r).forEach(function(e){new RegExp("(".concat(e,")")).test(n)&&(o=o.replace(RegExp.$1,1===RegExp.$1.length?r[e]:"00".concat(r[e]).substr("".concat(r[e]).length)))}),o}function x(){var e=navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);return e}function M(e,n){return Math.floor(Math.random()*(n-e+1))+e}}}]);