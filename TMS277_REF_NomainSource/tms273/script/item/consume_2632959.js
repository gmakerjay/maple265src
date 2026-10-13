/**
 * 箱子選擇道具 QQ:739977676
 **/

let boxId = ctx.getDataId();//箱子ID
let 物品list = [//我給你寫模板 你等下自己該1
    //物品ID   四維  攻擊 BOSS 無視 所有  天
    [1132287, 50, 50, 10, 10, 3, 10],
    [1052929, 50, 50, 10, 10, 3, 10],
    [1082647, 50, 50, 10, 10, 3, 10],
    [1073057, 50, 50, 10, 10, 3, 10],
    [1113074, 50, 50, 10, 10, 3, 10],
    [1152187, 50, 50, 10, 10, 3, 10],
    [1122306, 50, 50, 10, 10, 3, 10],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
    //[1004492, 200, 200, 10, 10, 10, 7,1],
]
let log = require('check_log');
var text = `#d您可以獲得以下道具,所有屬性都是50，限時10天：\r\n`
for (i in 物品list) {
    if (i % 2 == 0) {
        text += `\r\n`
    }
    text += `#v${物品list[i][0]}##z${物品list[i][0]}#`
}
text += `\r\n全屬性50 10BOSS 3%屬性 10無視\r\n每個賬號#r只能領取一次#d,是否領取在本角色？`//這一句你自由發揮
let YN = npc.askYesNo(text);
if (YN == 1) {
    if (log.getEventValue(stage, db, "新手全屬性套裝") == 0 || stage.isGm()) {
        for (let j = 0; j < 物品list.length; j++) {
            let newItem = util.makeItem(物品list[j][0], 1);
            newItem.setBaseStr(newItem.getBaseStr() + 物品list[j][1]); //裝備力量
            newItem.setBaseDex(newItem.getBaseDex() + 物品list[j][1]); //裝備敏捷
            newItem.setBaseInt(newItem.getBaseInt() + 物品list[j][1]); //裝備智力
            newItem.setBaseLuk(newItem.getBaseLuk() + 物品list[j][1]); //裝備運氣
            newItem.setMad(newItem.getMad() + 物品list[j][2]);
            newItem.setPad(newItem.getPad() + 物品list[j][2]);
            newItem.setBossDamageR(物品list[j][3]);//boss
            newItem.setStatRate(物品list[j][4]);//所有屬性
            newItem.setIgnorePdr(物品list[j][5]);//無視
            newItem.setChuc(5)
            newItem.setExpireDate(new Date().getTime() + 物品list[j][6] * 24 * 60 * 60 * 1000);
            //newItem.setAttribute(8);
            stage.gainItem(newItem);

            // newItem.setExpiration(30000);
            // newItem.setTitle("<可強化>+13")
        }

        // newItem.setGrade(20);
        // newItem.setOption(1, 40056, false);
        // newItem.setOption(2, 40056, false);
        // newItem.setOption(3, 40056, false);
        // newItem.setOption(1, 40056, true);
        // newItem.setOption(2, 40056, true);
        // newItem.setOption(3, 40056, true);

        // newItem.setDamR(4);
        //player.gainItem(2436444, 1, 7)
        //player.gainItem(3700299, 1, 7)
        log.addEventValue(stage, db, "新手全屬性套裝", 1, -1)
        stage.loseItem(boxId, 1);
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取全屬性50外星人新手7天套裝！`)
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取全屬性50外星人新手7天套裝！`)
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取新手7天套裝！`)
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取全屬性50外星人新手7天套裝！`)
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取全屬性50外星人新手7天套裝！`)
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取全屬性50外星人新手7天套裝！`)
        util.broadcastChatMsg(47, `玩家：${stage.getCharacterName()}領取全屬性50外星人新手7天套裝！`)
        npc.say("領取成功");
    } else {
        npc.say("您已領取過新手套裝了。")
    }
}