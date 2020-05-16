// 充值套餐获取
import {request} from "../utils/request";
import {requestPayment} from "../utils/utils";
import cache from "../utils/cache";




export async function getRechargeList(){
    let result = await  request.get({
        url:"/jige/recharge",
    });
    return  result.data;
}

export async function pay({repid}){
  let {id,openid}=cache.get("userInfo");
  let result = await request.post({
    url:'/jige/pay',
    data:{
        uid: id,
        repid,
        openid
    }
  });
  if(result.data){
      window.location.href = result.data
  }
  return result.data
}


export async function createOrder({price,cardno}){
    return  await  request.post({
        url:"/createordergetsign",
        data:{
            moneyyuan:price,
            cardno
        }
    });
}

// 创建 并且支付订单
export async function createAndPaymentOrder({price,cardno}){
    let orders = await  createOrder({price,cardno});
    console.log(`调试:订单创建返回值`, orders);
    let payResult =await requestPayment(orders);
    return  {...orders,...payResult}
}


export async function checkRechargeReuslt({outtradeno}){
    return  await request.post({
        url:'/checkrechargeresult',
        data:{
            outtradeno
        }
    })
}

//充值记录
export async function getRechargeRecord({page=1,size=20}={}){
    let {id} = cache.get("userInfo");
    return  await request.get({
        url:'/jige/rechargerecord',
        data:{
            id,
            page,
            size
        }
    }).then(res=>{
        return Promise.resolve(res.data);
    })
}

// 消费记录
export async function getUsedRecord({cardno,starttime,recordnum=20}){
    return  await request.post({
        url:'/usedrecord',
        data:{
            cardno,
            recordnum
        }
    }).then(res=>{
        return Promise.resolve(res.record);
    })
}
