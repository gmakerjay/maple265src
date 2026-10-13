 
let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";

let rewardRate = 1;
let 積分 = 獲取積分();
if (積分 == -1) {
    添加積分(0);
    積分 = 0;
}
var sb = "#d\t\t\t\t" + xiaoxingxing + "釣魚系統" + xiaoxingxing + "#l\r\n\r\n";
sb += "玩家 #r#h # #n#d你好！釣魚積分值：#r" + 積分 + "#d 點\r\n";
sb += "歡迎來到釣魚積分商城!這裡可以用釣來的魚換取積分！\r\n";
sb += "也可以用釣魚積分來購買一些稀有物品！\r\n";

// sb+= "#d#L1#"+xing+"購買普通餌料#l    #L2#"+xing+"購買高級餌料#l\r\n\r\n";
sb += "#d#L1#" + xing + "購買魚竿魚餌#l\r\n\r\n";
sb += "#d#L3#" + xing + "用魚換取積分#l    #L4#" + xing + "釣魚積分換購#l\r\n\r\n";
sb += "#d#L5#" + xing + "離線釣魚#l        #L6#" + xing + "離線釣魚魚簍#l\r\n\r\n";
// sb += "#d#L5#" + xing + "離線釣魚#l\r\n\r\n";
if (stage.isGm() && stage.getChannelId() == 1) {
    let e = ctx.getEvent('ZSF_FISH');
    if (!e) {
        ctx.makeEvent('ZSF_FISH', true, null)
    }
}
// sb += `---------------------------------------------\r\n`;
// sb += "#r#L5#" + xing + "僱傭離線漁民#l    #L6#" + xing + "離線釣魚倉庫#l\r\n\r\n";
// sb+= "#d#L5#"+xing+"釣魚積分排行#l    #L6#"+xing+"排行上交說明#l\r\n\r\n";
// sb+= "#d#L7#"+xing+"本周上交排行#l    #L8#"+xing+"上周上交領獎#l\r\n\r\n";
用魚換取積分();
// let menu_index = npc.askMenu(sb);
// if (menu_index == 1) {
//     stage.runScript("expand/menu/商店大全/釣魚商店"); 
// } else if (menu_index == 3) {
//     用魚換取積分();
// } else if (menu_index == 4) {
    
//     // if (stage.isGm()) {

//         釣魚積分換購();
//     // } else {
//     //     npc.say("積分商店正在建設中！", 9330045);
//     // }
// } else if (menu_index == 5) {
//     stage.runScript("expand/menu/釣魚/離線釣魚")
    
// } else if (menu_index == 6) {
//     stage.runScript("expand/menu/釣魚/離線釣魚保管箱")
//     // 排行上交說明();
// } else if (menu_index == 7) {
//     stage.runScript("排行榜單/本周釣魚排行")
// } else if (menu_index == 8) {
//     stage.runScript("排行榜單/上周釣魚排行")
// }

function 排行上交說明() {

    var sb = "#d\t\t\t\t" + xiaoxingxing + "排行上交說明" + xiaoxingxing + "#l\r\n\r\n";
    sb += "用魚換取積分後自動計入本周排行\r\n";
    sb += "排行截止時間為每周日23.59分\r\n";
    sb += "#r第一名：#d#v2634900#x1,#v2630873#x3,破功x500萬,\r\n";
    sb += "#r第二~第五名：#d#v2630873#x3,破功x400萬\r\n";
    sb += "#r第六~第十名：#d#v2630873#x2,破功x300萬\r\n";
    sb += "#r第十~第二十名：#d#v2630873#x1,破功x200萬\r\n";
    npc.askText(sb, "了解規則", 1, 10)

}
function 用魚換取積分() {
    
    if (stage.getVipLevel() >= 2) {
        rewardRate = 3;
        stage.showSystemMessage('由於您是VIP用戶,提交釣魚積分三倍獲取')
    }
    //魚換積分 自行設置 建議按照魚的大小設置
    var itemList = 所有魚();
    let sb = "你當前的釣魚積分為：#r" + 積分 + "#k 點\r\n";

    sb += "#L9999##r一鍵提交所有魚#d#l\r\n"

    for (var i = 0; i < itemList.length; i++) {
        sb += "\r\n#L" + i + "#" + "#d#i" + itemList[i][0] + ":i# " + nbsp(util.getItemName(itemList[i][0]), 12) + "x #r" + stage.getItemQuantity(itemList[i][0]) + "#d 單價：#r" + itemList[i][1];
    }
    let index = npc.askMenu(sb);
    if (index == 9999) {
        一鍵提交所有魚()
    } else {
        let number = npc.defNum(1).minNum(1).maxNum(stage.getItemQuantity(itemList[index][0])).askNumber("#d請輸入你請你輸入想要兌換的數量\r\n\r\n現有此類魚數量#r" + stage.getItemQuantity(itemList[index][0]) + "#d條\r\n\r\n#r每個#r#v" + itemList[index][0] + "##t" + itemList[index][0] + "##d可以兌換#b" + itemList[index][1] + "#d積分#k");
        if (stage.getItemQuantity(itemList[index][0]) >= number) {
            let 獲得積分 = number * itemList[index][1];
            stage.loseItem(itemList[index][0], number);
            添加積分(獲得積分);
            添加積分記錄(獲得積分, itemList[index][0], number)
            npc.say("兌換成功了！");
        } else {
            npc.say("兌換失敗，原因如下：\r\n#r你沒有足夠的#r#v" + itemList[index][0] + "##t" + itemList[index][0] + "##k，您需要" + number + "個該物品來兌換！\r\n");
        }
    }
    
    積分 = 獲取積分();
    用魚換取積分();
}

function 一鍵提交所有魚() {
    var itemList = 所有魚();
    var 獲得積分 = 0;
    for (var i = 0; i < itemList.length; i++) {
        let number = stage.getItemQuantity(itemList[i][0]);
        if (number > 0) {
            獲得積分 += number * itemList[i][1];
            添加積分記錄(獲得積分, itemList[i][0], number)
            stage.loseItem(itemList[i][0], number)
        }
    }
    添加積分(獲得積分);
    積分 = 獲取積分();
    npc.say(`兌換成功了！\r\n當前積分: #r${積分}#k`);
}

function 所有魚() {
    var itemList = Array(
        Array(4036036, 1, 1),//沙丁魚
        Array(2434974, 500, 1),//黃金魚
        Array(4031630, 5, 1),//鯉魚(30cm)大小為30公分的鯉魚。
        Array(4031637, 8, 1),//鯉魚(53cm)大小為53公分的鯉魚。
        Array(4031638, 10, 1),//鯉魚(60cm)大小為60公分的鯉魚。
        Array(4031639, 20, 1),//鯉魚(100cm)大小為100公分的鯉魚。
        Array(4031640, 30, 1),//鯉魚(113cm)大小為113公分的鯉魚。
        Array(4031631, 10, 1),//鮭魚(150cm)大小為150公分的鮭魚。
        Array(4031645, 12, 1),//鮭魚(166cm)大小為166公分的鮭魚。
        Array(4031646, 15, 1),//鮭魚(183cm)大小為183公分的鮭魚。
        Array(4031647, 20, 1),//鮭魚(227cm)大小為227公分的鮭魚。
        Array(4031648, 50, 1),//鮭魚(288cm)大小為288公分的鮭魚。
        Array(4031644, 20, 1),//劍魚(148cm)大小為148公分的劍魚。
        Array(4031628, 5, 1),//劍魚(120cm)大小為120公分的劍魚。
        Array(4031641, 7, 1),//劍魚(128cm)大小為128公分的劍魚。
        Array(4031642, 8, 1),//劍魚(131cm)大小為131公分的劍魚。
        Array(4031643, 10, 1),//劍魚(140cm)大小為140公分的劍魚。
        Array(4031627, 2, 1),//青魚(3cm)大小為3公分的青魚。
        Array(4031633, 3, 1),//青魚(3.6cm)大小為3.6公分的青魚。
        Array(4031634, 5, 1),//青魚(5cm)大小為5公分的青魚。
        Array(4031635, 7, 1),//青魚(6.5cm)大小為6.5公分的青魚。
        Array(4031636, 9, 1)//青魚(10cm)大小為10公分的青魚。
    );
    return itemList;
}
function 釣魚積分換購() {
    
    積分 = 獲取積分();
    var itemList = Array(
        Array(1113195, 33000, 1),// 白
        Array(1113196, 35000, 1),// 白
        Array(2472000, 260, 1),// 白金錘
        Array(2439279, 99, 1),// 經驗核心
        Array(2048761, 3500, 1),// 火花
        Array(5064502, 7000, 1),// 火花
        Array(5062026, 300, 1),// 唯一魔方 
        Array(5062009, 90, 1),// 紅
        Array(5062010, 90, 1),// 黑
        Array(5062021, 180, 1),// 平等 
        Array(5062500, 180, 1),// 綠
        Array(5062500, 180, 1),// 綠
        Array(5062031, 210, 1),// 白
        Array(4310086, 180000, 1),// 白
        Array(2430377, 90000, 1),// 白
        Array(2049376, 60000, 1),// 白
        Array(5743003, 90, 1),// 白


    );
    let sb = "你當前的釣魚積分為：#r" + 積分 + "#k 點\r\n";
    for (var i = 0; i < itemList.length; i++) {
        sb += "\r\n#L" + i + "#" + "#b#i" + itemList[i][0] + ":# #z" + itemList[i][0] + "#需要釣魚積分：" + itemList[i][1];
    }
    let index = npc.askMenu(sb);
    let number = npc.defNum(1).minNum(1).maxNum(1000).askNumber("請輸入你請你輸入想要購買的數量\r\n\r\n#r每個#v" + itemList[index][0] + "#需要" + itemList[index][1] + "#b積分#k");
    let yes = npc.askYesNo("你想購買" + number + "個#r#i" + itemList[index][0] + "# #k？\r\n你將使用掉" + (number * itemList[index][1]) + "積分。");
    if (yes == 1) {
        let 積分 = 獲取積分();
        let 所需積分 = number * itemList[index][1];
        if (積分 >= 所需積分) {
            if (stage.gainItem(itemList[index][0], number)) {
                添加積分(-所需積分)
                npc.say("購買完成,您獲得:#z" + itemList[index][0] + "#x" + number);
            } else {
                npc.say("您沒有足夠的背包空間裝下:#t" + number + "#");
            }  
        } else {
            npc.say("購買失敗，原因如下：\r\n#r你的積分不足以購買這樣物品，您需要" + 所需積分 + "釣魚積分來支付。\r\n");
        } 
    }
    
    積分 = 獲取積分();
    釣魚積分換購();
}

function 購買餌料(ordinary, itemid) {
    var buynum = npc.defNum(1).minNum(1).maxNum(500).askNumber("請你輸入想要購買的數量\r\n\r\n#d每個#v" + itemid + "##t" + itemid + "#\r\n\r\n#d需要#r" + ordinary + "金幣#k");
    var yesno = npc.askYesNo("#d你想購買" + buynum + "個#i" + itemid + "# #t" + itemid + "#？\r\n你將使用掉#r" + (buynum * ordinary) / 10000 + "萬#d金幣。");
    if (yesno == 1) {
        var money = buynum * ordinary;
        if (stage.canGainItem(itemid, buynum)) {
            if (stage.hasMesos(money)) {
                stage.gainMesos(-money);
                // gainMesoLog(money, "普通魚餌", itemid);
                stage.gainItem(itemid, buynum);
                npc.say("成功支付:" + money / 10000 + "萬金幣!\r\n\r\n獲得：" + buynum + " x #v" + itemid + "#.");
            } else {
                npc.say("您的金幣不足支付，您需要：" + money + "金幣。");
            }
        } else {
            npc.say("您的背包空間不足");
        }
    }
}

function 添加積分記錄(point, itemid, number) {
    var sql = ` insert into 釣魚表_上交表(characters_id,point,itemid,number,paytime, vipLevel)VALUES(${stage.getCharacterId()},${point},${itemid},${number},NOW(), ${stage.getVipLevel()}) `;
    db.insert(sql)
}
function 添加積分(point) {
    point = point * rewardRate;
    stage.showSystemMessage(`恭喜您,上交水產,增加積分: ${point}`)
    let 積分 = 獲取積分(); 
    if (積分 == -1) {
        var sql = ` insert into 釣魚表_積分表(character_id,point,time)VALUES(${stage.getCharacterId()},${point},NOW()) `;
        db.insert(sql)
    } else {
        var sql = ` update   釣魚表_積分表 set point = point + ${point} where character_id = ${stage.getCharacterId()}  `
        db.update(sql)
    }
}
function 獲取積分() {
    var sql = ` select * from 釣魚表_積分表 where  character_id = ${stage.getCharacterId()}  `;
    var resultList = db.select(sql)
    var point = -1;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        point = result.get("point");
    }
    return point;
}

 
 function  nbsp(str,len){
    var str = str+"";
    var nbspStr = "";
    if(chkstrlen(str)<len){
       for(var i=0;i<len-chkstrlen(str);i++){
          nbspStr += " ";
       }
    }
    return str+nbspStr;
 }

 function  chkstrlen(str){
    var strlen = 0;
    for(var i = 0;i < str.length; i++){
       if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
          strlen += 2;
       else
          strlen++;
    }
    return strlen;
 }