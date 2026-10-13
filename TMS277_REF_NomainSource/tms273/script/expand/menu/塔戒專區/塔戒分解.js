/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


let log = require('check_log');

const 碎片 = 2432468;

var list = [
    [1113098, 20, '剋制之戒'],
    [1113122, 10, '風險之戒'],
    [1113108, 1, '集成之戒'],
    [1113109, 2, '等級增益S'],
    [1113110, 2, '等級增益D'],
    [1113111, 2, '等級增益I'],
    [1113112, 2, '等級增益L'],
    [1113113, 5, '武器增益S'],
    [1113114, 5, '武器增益D'],
    [1113115, 5, '武器增益I'],
    [1113116, 5, '武器增益L'],
    [1113104, 7, '爆擊傷害戒指	'],
    [1113125, 1, '水晶HM'],
];


var list2 = {
    1113098: 20,
    1113122: 10,
    1113108: 1,
    1113109: 2,
    1113110: 2,
    1113111: 2,
    1113112: 2,
    1113113: 5,
    1113114: 5,
    1113115: 5,
    1113116: 5,
    1113104: 7,
    1113125: 1,
};

start();

function start() {
    let str = '4級塔戒分解\r\n';
    str += `單獨回收將要分解的4級塔戒放在第一格\r\n`;
    str += `#L999##r#e一鍵回收前64格#k#n#l\r\n\r\n`
    for (let i in list) {
        let item = list[i];
        str += `#L${i}##v${item[0]}##z${item[0]}# -> #v2432468:i# x ${item[1]} #k#l\r\n`;
    }

    let sel = npc.askMenu(str);

    if (sel == 999) {
        var sb = "";
        sb += "#r回收前64格所有塔戒(左8列),回收後無法返回\r\n"
        sb += "是否回收\r\n"

        var YN = npc.askYesNo(sb.toString());
        let count = 0;
        let fenjieList = [];
        if (YN == 1) {
            for (let i = 1; i < 65; i++) {
                let item = stage.getItemBySlot(1, i);
                if (item == null) {
                    continue;
                }
                if (item && list2[item.getItemId()] && item.getLevel() >= 4) {
                    fenjieList.push([i, item.getItemId(), list2[item.getItemId()]]);
                    count += list2[item.getItemId()];
                }
            }
            if (fenjieList.length == 0) {
                npc.say("未檢測到可分解物品");
                return;
            }
            let str = `是否確認分解,可得#v2432468# x #r${count}#k\r\n`;
            for (let i in fenjieList) {
                str += `#v${fenjieList[i][1]}#`;
            }
            if (npc.askYesNo(str) == 1) {
                if (stage.canHold(2432468, count)) {
                    for (let j in fenjieList) {
                        let item = fenjieList[j];
                        stage.removeItemBySlot(1, fenjieList[j][0]);
                        stage.gainItem(2432468, item[2]);
                        log.addEventValue(stage, db, "分解" + util.getItemName(item[1]),);
                        stage.showSystemMessage("分解" + util.getItemName(item[1]));
                        util.broadcastChatMsg(7, "阿麗莎" + " :恭喜 " + stage.getName() + " 分解了<" + util.getItemName(item[1]) + ">");
                    }
                    npc.say(`分解成功!\r\n獲得#v2432468# x ${count}`);
                } else {
                    npc.say(`請清理揹包`);
                }
            }
            ;
        }

        // }
    } else {
        let toDrop = stage.getItemBySlot(1, 1);
        if (toDrop == null) {
            npc.say("請將您需要分解的裝備放到第一格！");
        } else if (toDrop.getItemId() != list[sel][0] || toDrop.getLevel() != 4) {
            npc.say("請將您需要分解的裝備放到第一格！");
        } else if (npc.askYesNo(`是否確認分解:\r\n#v${list[sel][0]}##z${list[sel][0]}# -> #v${list[sel][1]}:i# x ${list[sel][2]}`) == 1) {
            if (stage.canHold(2432468, list[sel][1])) {
                stage.removeItemBySlot(1, 1);
                stage.gainItem(2432468, list[sel][1]);
                util.broadcastChatMsg(7, "阿麗莎" + " :恭喜 " + stage.getName() + " 分解了<" + util.getItemName(toDrop.getItemId()) + ">");

                npc.say("分解成功");
            } else {
                npc.say("揹包空間不足！");
            }

        }

    }

}