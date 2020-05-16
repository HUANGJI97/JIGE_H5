import {request} from "../utils/request";

/**
 * 获取看板数据
 * @returns {Promise<void>}
 */
export async function getPanelData(){
    let data=  await request.get({
        url: '/home/paneldata'
    });
    return  Promise.resolve(data.data)

}

/**
 * 获取用户统计数据
 * @returns {Promise<Promise<any>>}
 */
export async function getUserCount(){
    let data=  await request.get({
        url: '/count/user'
    });
    return  Promise.resolve(data.data)

}

/**
 * 获取充值统计数据
 * @returns {Promise<Promise<any>>}
 */
export async function getRechargeCount(){
    let data=  await request.get({
        url: '/count/recharge'
    });
    return  Promise.resolve(data.data)

}

/**
 * 获取领取记录统计
 * @returns {Promise<Promise<any>>}
 */
export async function getLogCount(){
    let data=  await request.get({
        url: '/count/log'
    });
    return  Promise.resolve(data.data)

}


export async function getUserList({page= 1,size = 20,condition = {}}={}) {
    let  result = await request.get({
        url: '/user/list',
        data:{page,size,...condition}
    })
    return  result.data
}

export async function getOrderList({page= 1,size = 20,condition = {}}={}) {
    let  result = await request.get({
        url: '/recharge/list',
        data:{page,size,...condition}
    })
    return  result.data
}
