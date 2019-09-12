import {request} from "../utils/request";

export async function getCardList() {
    let list = await request.get({
        url: '/wxlinkcard'
    })
    console.log(`调试:获取到卡片列表`, list);

    return list.linkcard.map(item=>{
        return item.cardno
    })
}

export async function getCardInfo({cardno}) {
    let detaile = await request.post({
        url: '/cardinfo',
        data: {cardno}
    });
    // let lastRechargeDetaile = detaile['lastrecharge'].split(',');
    // detaile['lastrecharge'] = {
    //     date:lastRechargeDetaile[0],
    //     money:lastRechargeDetaile[1],
    //     give:lastRechargeDetaile[2]
    // }
    // console.log(`调试:卡详细`,detaile)
    return  detaile
}

// 解绑卡片
export async function unLinkCard({cardno}){
    let result = await  request.post({
        url:"/unlinkcard",
        data:{
            cardno
        }
    })
    return  result;
}

// 卡片改名字
export async function updateCardName({cardno,name}){
    let result = await  request.post({
        url:"/cardname",
        data:{
            cardno,
            name
        }
    })
    return  result;
}

// 根据卡号获取学校名称
export async function getSchoolNameByCard({cardno}){
    let result = await  request.post({
        url:"/cardschool",
        data:{
            cardno
        }
    });
    return  result.schoolname;
}


// 绑定新卡片
export async function addCard({cardno}){
    let result = await  request.post({
        url:"/addcard",
        data:{
            cardno
        }
    });
    return  result;
}
// 卡限制设置
export async function setCardLimit({cardno,daylimitmoney,daylimitcount}){
    let result = await  request.post({
        url:"/modifydaylimit",
        data:{
            cardno,
            daylimityuan:daylimitmoney,
            daylimitcount
        }
    });
    return  result;
}
// 卡挂失
export async function reportLossCard({openid,cardno}){
    let result = await  request.post({
        url:"/suspendcard",
        data:{
            openid,
            cardno
        }
    });
    return  result;
}

