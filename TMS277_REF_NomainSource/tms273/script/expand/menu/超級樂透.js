const config = [
    {
        "sessionId": "0",
        "name": "金幣1E區",
        "ticketId": 4001715,  // 1E定居金
        "quantity": 1,
        "max": 10,  // 滿多少人開
        "bonusRatio": 0.8, // 中獎比例
        "limit": 10
    }
    ,{
        "sessionId": "1",
        "name": "金幣10E區",
        "ticketId": 4001715,  // 1E定居金
        "quantity": 10,
        "max": 10,  // 滿多少人開
        "bonusRatio": 0.8, // 中獎比例
        "limit": 10
    }
    // },{
    //     "sessionId": "2",
    //     "name": "金幣100E區",
    //     "ticketId": 4001715,  // 1E定居金
    //     "quantity": 100,
    //     "max": 10,  // 滿多少人開
    //     "bonusRatio": 0.8, // 中獎比例
    //     "limit": 3
    // },{
    //     "sessionId": "11",
    //     "name": "材料A區",
    //     "ticketId": 4001525,       //  
    //     "quantity": 100,
    //     "max": 10,  // 滿多少人開
    //     "bonusRatio": 0.8, // 中獎比例
    //     "limit": 3
    // },{
    //     "sessionId": "21",
    //     "name": "材料B區",
    //     "ticketId": 4001836,       //  
    //     "quantity": 100,
    //     "max": 10,  // 滿多少人開
    //     "bonusRatio": 0.8, // 中獎比例
    //     "limit": 3
    // },{
    //     "sessionId": "31",
    //     "name": "材料C區",
    //     "ticketId": 4310080,       //  
    //     "quantity": 100,
    //     "max": 10,  // 滿多少人開
    //     "bonusRatio": 0.8, // 中獎比例
    //     "limit": 3
    // },{
    //     "sessionId": "41",
    //     "name": "材料D區",
    //     "ticketId": 4001876,       //  
    //     "quantity": 100,
    //     "max": 10,  // 滿多少人開
    //     "bonusRatio": 0.8, // 中獎比例
    //     "limit": 3
    // },{
    //     "sessionId": "51",
    //     "name": "材料E區",
    //     "ticketId": 4034999,       //  
    //     "quantity": 100,
    //     "max": 10,  // 滿多少人開
    //     "bonusRatio": 0.8, // 中獎比例
    //     "limit": 3
    // },
]; 
function start() {
    let str = `楓之谷大樂透\r\n`;
    str += `開獎時軍等概率獲取6/9/15倍獎勵\r\n`;
    str += `請選擇你要參加的分區\r\n`;

    for (let i in config) {
        str += `#L${i}#${config[i]["name"]} #l\r\n`;
        // str += `#L${i}#${config[i]["name"]} 單價: ${config[i]["ticketId"] > 0 ? "#v" + config[i]["ticketId"] + ":i#" : "金幣"} #l\r\n`;
    }
    // if (stage.isGm()) {

        str += `#L999#我要領獎#l`;
    // }
    // str += `\r\n#L1000#查看排行#l`;
    let sel = npc.askMenu(str); 
    // sel = 0;
    if (sel == 999) {
        let rewardList = db.select(`select * from 新葷素 where player_id = ${stage.getCharacterId()} and award_time is null`);
        if (rewardList.length > 0) {
            for (let i in rewardList) {
                let f = db.select(`select * from 新葷素明細 where id = ${rewardList[i].get('lucky_id')}`)[0];
 
                let itemId = f.get('ticket_id');
                let quantity = f.get('reward_quantity');
                if (stage.gainItem(itemId, quantity)) {
                    db.update(`update 新葷素 set award_time = now() where lucky_id = ${rewardList[i].get('lucky_id')}`);
                    stage.showSystemMessage(`成功領取 ${rewardList[i].get('session_name')}-第${rewardList[i].get('session_state')}期 獎勵`); 

                    util.broadcastWorldChatMsg(6, `${stage.getCharacterName()}: 成功領取 ${rewardList[i].get('session_name')}-第${rewardList[i].get('session_state')}期 獎勵`);

                }else {
                    npc.say("背包空間不足");
                    return;
                }

 
            }
            npc.say("領取成功");
        } else {
            npc.say("您沒有中獎");
        }
        return;
    } else if (sel == 1000) {
        show();
        return;
    }
    let info = config[sel];
    let sessionId = info['sessionId'];
    // npc.say(JSON.stringify(info));
    str = `歡迎參加楓之谷大樂透 <${info['name']}> 分區\r\n`;
    // 本期滿幾個開
     
    let nowResult = db.select(`select * from 新葷素 where session_id = ${sessionId} order by session_state desc limit 1`); 
    let state = 1; 
    if (nowResult.length > 0) {
        nowResult = nowResult[0];
        state = Number(nowResult.get('session_state')) + 1;
    } 
     
    // if (nowResult['lucky_id'] > 0) {
    //     npc.say("當期已開獎");
    //     return;
    // } 
    str += `當前是第 ${state} 期`;


 
    let detailResult = db.select(`select * from 新葷素明細 where session_id = ${sessionId} and session_state = ${state}`); 
    let times = detailResult.length;
    if (times >= info['max']) {
        lottery(detailResult, state, info);
        return;
    }
    let selfTimes = 0;
    if (times > 0) {
        for (let i in detailResult) {
            if (detailResult[i]['player_id'] == stage.getCharacterId()) {
                selfTimes++;
            }
        }
    }

    str += `當前人數${times} / ${info['max']}\r\n`;
    str += `你已購買 ${selfTimes} 份\r\n`; 
    if (selfTimes >= parseInt(info['limit'])) {
        str += `本期還可購買0份`;
        npc.say(str);
        return;
    } else   {
        let sCan = parseInt(info['limit']) - selfTimes;
        info['max'] - times;
        sCan = sCan > info['max'] - times ? info['max'] - times : sCan;
        str += `本期還可購買${ sCan}份， 是否購買一份`;
    }
    // if (true) {
    if (npc.askYesNo(str) == 1) {
        let reResult = db.select(`select * from 新葷素 where session_id = ${sessionId} order by id desc limit 1`);
        if (reResult.length == 0 || reResult[0]['session_state'] != state) {
            let itemId = info['ticketId'];
            let quantity = info['quantity'];
            if (stage.getItemQuantity(itemId) < quantity) {
                npc.say("材料不足");
                return;
            }
            stage.loseItem(itemId, quantity);
            db.insert(`insert into 新葷素明細(player_id, account_id, session_id, session_state, player_name, ticket_id, quantity) values(${stage.getCharacterId()}, ${stage.getAccountId()}, ${sessionId}, ${state}, '${stage.getCharacterName()}', ${info['ticketId']}, ${info['quantity']})`);

            reResult = db.select(`select * from 新葷素 where session_id = ${sessionId} order by id desc limit 1`);
            if (reResult.length == 0 || reResult[0]['session_state'] != state) {
                detailResult = db.select(`select * from 新葷素明細 where session_id = ${sessionId} and session_state = ${state}`);
                if (detailResult.length >= 10) {
                    
                    lottery(detailResult, state, info);
                    // let luk = detailResult[Math.floor(Math.random() * 10)];
                    // try {
                    //     npc.customSqlInsert(`insert into 新葷素(session_id, session_state, lucky_id, player_id, player_name) values(${sessionId}, ${state}, ${luk['id']}, ${luk['player_id']}, '${luk['player_name']}')`);

                    // } catch (e) {
                    //     stage.showSystemMessage("本期已開獎");
                    // }
                    // npc.customSqlInsert(`insert into 新葷素(session_id, session_state, lucky_id, player_id, player_name) values(${sessionId}, ${state}, ${luk['id']}, ${luk['player_id']}, '${luk['player_name']}')`);
                    // npc.broadcastPlayerNotice(21,`${info['name']}-第${state}期:恭喜玩家: ${stage.getCharacterName()} 贏得${sh.getItemName(info['ticketId'])} x ${Math.floor(info['quantity'] * 10 * info['bonusRatio'])}`);
                } else { 
                    
                    util.broadcastWorldChatMsg(21, `${info['name']}-第${state}期: 神秘玩家購買成功，當前人數 ${detailResult.length} / 10`);
                }
                
            } 
            npc.say("購買成功");
            start();
        } else {
            // npc.say("當前期已開獎，請重新購買");
            stage.showSystemMessage("當前期已開獎，請重新購買");
            return;
        }

    }
    

    function lottery(detailResult, state, info) {
        stage.showSystemMessage('lottery start')
        let rand = Math.floor(Math.random() * 10);
            let luk = detailResult[rand]; 
            let rate = Math.random();
            if (rate < 0.2) {
               rate = 1.5; 
            } else if (rate < 0.6) {
                rate = 0.9;
            } else {
                rate = 0.6;
            } 
            try {
                let rewardQuantity = Math.floor(info['quantity'] * 10 * rate); 
                db.insert(`insert into 新葷素(session_id, session_name, session_state, lucky_id, player_id, player_name) values(${info['sessionId']}, '${info['name']}', ${state}, ${luk.get('id')}, ${luk.get('player_id')}, '${luk.get('player_name')}')`);
                db.update(`update 新葷素明細 set reward_quantity = ${rewardQuantity} where id = ${luk.get('id')}`);
               
                util.broadcastWorldChatMsg(21, `${info['name']}-第${state}期:恭喜玩家: ${luk.get('player_name')} 贏得${util.getItemName(info['ticketId'])} x ${rewardQuantity}`);
            } catch (e) {
                // npc.say(e);
                stage.showSystemMessage("本期已開獎2");
            }
            // npc.customSqlInsert(`insert into 新葷素(session_id, session_state, lucky_id, player_id, player_name) values(${sessionId}, ${state}, ${luk['id']}, ${luk['player_id']}, '${luk['player_name']}')`);

    }
    
    
    // 當前已買幾個
    // 單價多少
    // 開獎發多少
 
    // for (let info of config) {
    //     str += `#L${info["sessionId"]}#${info["name"]} 單價: ${info["ticketId"] > 0 ? "#v" + info["ticketId"] + ":i#" : "金幣"} `;
    //     let getNewList = db.select("select id, session_id, session_state, ");
    // }
}
function show() {
    const { lastMonday, lastSunday } = getLastWeekMondayAndSunday();
    let str = `新葷素排行榜(${lastMonday} 至 ${lastSunday})\r\n`;
    let lastWeekRankList = db.select(`select player_id, player_name, count(1) as cnt from 新葷素 where lottery_time >= '${lastMonday}' and lottery_time <= '${lastSunday} 23:59:59' group by player_id order by cnt desc limit 10`);
    let myRank = 0;
    for (let i = 1; i <= lastWeekRankList.length; i++) {
        str += `${i}.  ${lastWeekRankList[i-1]['player_name']}  ${lastWeekRankList[i-1]['cnt']}\r\n`;
        if (lastWeekRankList[i-1]['player_id'] == stage.getCharacterId()) {
            myRank = i;
        }
    }
    if (myRank > 0 && stage.getPQLog(`R${lastMonday}`) < 1) {
        let str2 = `恭喜在上周楓之谷大樂透中榮獲第${myRank}\r\n請先領取您的獎勵\r\n`;
        let rewardList = [];
        switch (myRank) {
            case 1:
                rewardList.push([4001714, 10]);
                rewardList.push([4001715, 10]);
                break;
            case 2:
                rewardList.push([4001714, 9]);
                rewardList.push([4001715, 9]);
                break;
            case 3:
                rewardList.push([4001714, 8]);
                rewardList.push([4001715, 8]);
                break;
            default:
                rewardList.push([4001714, 5]);
                rewardList.push([4001715, 5]);
        }
        for (let i in rewardList) {
            str2 += `#v${rewardList[i][0]}:i#  x  ${rewardList[i][1]}\r\n`;
        }
        if (npc.askYesNo(str2) == 1) {
            stage.addPQLog(`R${lastMonday}`, 1, -1);
            for (let i in rewardList) {
                stage.gainItem(rewardList[i][0], rewardList[i][1]);
            }
            npc.say("領取成功");
        }
    } else {

        npc.say(str);
    }

}
// for (let i = 0; i < 101; i ++) {
    
//     start();
// }
start();

function getLastWeekMondayAndSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 今天是本周的第幾天，周日是0，周一是1，以此類推
    const diffMonday = today.getDate() - dayOfWeek - 6; // 上周周一的日期
    const lastMonday = new Date(today.setDate(diffMonday));
    const lastSunday = new Date(today.setDate(today.getDate() + 6)); // 上周周日的日期
    return {
        lastMonday: lastMonday.getFullYear() + '-' + (lastMonday.getMonth() + 1).toString().padStart(2, '0') + '-' + lastMonday.getDate().toString().padStart(2, '0'),
        lastSunday: lastSunday.getFullYear() + '-' + (lastSunday.getMonth() + 1).toString().padStart(2, '0') + '-' + lastSunday.getDate().toString().padStart(2, '0')
    };
}
