/**
 * 抽獎
 *
 * 機制說明： 抽獎首先會生成0-100的隨機數，獎品裏面幾率大於這個數的才會進入最終獎池，最終獲得的獎品將在最終獎池裡面隨機獲得一個。
 *
 **/
const chairList = require('constant/Mounts');
 
 

let type = 4009485;// 1=點券 2=抵用 3=金幣 4=餘額 物品ID=材料抽獎（梅花7）
let needNum = 1;//需要數量
let title = "獎券";
let haveMoney = 0;

//獎品
let laba = 100;//公告喇叭需要的機率

const listShow = [
    
[80002441,'愛之信使騎寵'], 
[80002294,'愛心星座騎寵'], 
[80001870,'哎呀鬆餅騎寵'], 
[80012449,'阿努比斯騎寵'], 
[80001986,'阿麗莎之花翼騎寵'], 
[80002272,'阿爾卡那風精靈騎寵'],  

]; 

function start() {


    while (true) {

        title = "";
        haveMoney = parseInt(stage.getItemQuantity(type));
        let str = "#b┏              #fUI/GuildMark/Mark/Etc/00009023/10#   #r#e騎寵幣轉蛋#b#n   #fUI/GuildMark/Mark/Etc/00009023/10#          ┓#k\r\n\r\n";
        str += ("#b擁有騎寵幣 #v" + type + "##r " + haveMoney + " #b個.\r\n每次需要消耗 #r" + needNum + " #b個\r\n#v4001680#產出方式：#r雜貨商店，跳跳，控制之神等")
        str += "\r\n#r騎寵收藏為帳號為單位(全角色可消耗一定金幣取出):"
        str += "\r\n#k已收藏過的騎寵不會在抽到\r\n"
        str += "\r\n#e#k獎品展示:\r\n"



        for (let j in listShow) {
            str += "#s" + listShow[j][0] + "#"
            // str += ``;
        }


        //str += "\r\n#k如果你足夠幸運，還能抽到2-3個箱子，是否抽獎？"
        let YN = npc.askYesNo(str);
        if (YN == 1) {
            let canGet = false;
            if (haveMoney >= needNum) {
                stage.loseItem(type, needNum);
                canGet = true;
            }
            if (canGet) {
                // 獲取玩家已收藏的騎寵
                let collectedItems = db.select(`SELECT 收藏_騎寵圖鑑表_收集.itemid
                FROM 收藏_騎寵圖鑑表_收集
                WHERE 收藏_騎寵圖鑑表_收集.accountid = ${stage.getAccountId()}`);

                let collectedItemIds = [];
                for (let i in collectedItems) {
                    collectedItemIds.push(collectedItems[i].get('itemid'));
                }
                
                // = collectedItems.map(item => item.get('itemid'));
                // let collectedItemIdsList = collectedItemIds.length > 0 ? `AND 收藏_騎寵圖鑑表.itemid NOT IN (${collectedItemIds.join(',')})` : '';



                //抽獎
                let highRand = 0.03;
                if (stage.isGm()) {
                    // highRand = 1;
                }
                // let listReal = [];
                let highFlg = false;
                // let highFlg = Math.random() < highRand;
                // if (highFlg) {
                    // let setb = new Set(collectedItemIds);
                    // stage.showSystemMessage('已擁有: ' + setb.size);
                    // let listReal = chairList.list.filter(item => !setb.has(item));  


                let listReal = chairList.list.filter(item => !collectedItemIds.includes(item)); 

                if (listReal.length == 0) {
                    stage.gainItem(type, 1);
                    npc.say("已經收集了所有的騎寵，不能再獲取了");
                    return;
                }


                let finalItemInfo = listReal[Math.floor(Math.random() * listReal.length)];
                // stage.showSystemMessage(finalItemInfo);
                // return;

                // if (finalItems[random1][2] <= laba)
                //     stage.gainGachaponItem("[" + title + "初級名椅錄]", finalItems[random1][0], finalItems[random1][1], 1);
                // else
                try {

                    stage.showSystemMessage(finalItemInfo);
                    // let finalReward = stage.makeItemWithId(finalItemInfo);
                    // finalReward.setTradeBlock(true);
                    stage.changeSkillLevel(finalItemInfo, 1);
                    插入圖鑑收集表(finalItemInfo, highFlg);
                    // let levelResult = db.select(`select * FROM 收藏_騎寵圖鑑表 where itemid = ${finalItemInfo}`);
                    // stage.showSystemMessage(levelResult);
                    // switch (levelResult['level']) {
                    //     case '特級':
                    //     case '一級':
                    //         let str = `[${levelResult['level']}騎寵獎池]: 恭喜玩家 <` + stage.getName() + ">獲得一級騎寵 " + finalReward.getName() + "！！！"
                    //         sh.broadcastWeatherEffectNotice(299, str, 10000);
                    //     case '二級':
                    //         itemLaba(`[${stage.getName()}]`, `我從[${levelResult['level']}騎寵池]中獲得了<${finalReward.getName()}>，大家一起恭喜我吧!`, finalReward);
                    //         break;
                    // }
                    npc.say(`抽取成功！獲得騎寵\r\n#b#s${finalItemInfo}:i#`);
                } catch (e) {
                    stage.showSystemMessage(e);
                    stage.gainItem(type, 1);
                    npc.say("騎寵轉蛋機有點疲憊，請重新搖獎");
                }
            } else {
                npc.say("您的" + title + "不足或背包不足！無法抽取");
            }

        }
    }
}


start();
 
 
 
function 插入圖鑑收集表(itemid, highFlg) {
    // if (highFlg) {
    //     let checkResult = stage.customSqlResult(`select * from 收藏_騎寵圖鑑表_收集 where itemid = ${itemid} and accountid = ${stage.getAccountId()}`);
    //     if (checkResult.size() > 0) {
    //         return;
    //     }
    // }
    let sql = `insert into 收藏_騎寵圖鑑表_收集(itemid, accountid, paytime) values(${itemid},${stage.getAccountId()},now())`;
    db.insert(sql );
}