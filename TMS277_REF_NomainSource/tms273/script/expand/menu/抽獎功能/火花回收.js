/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


start();

function start() {
    let list = [];
    let results = db.select(`select *
                             from zsf_huishou
                             where type = '火花'`);
    for (let i in results) {
        let item = results[i];
        list.push([item.id, item.item, item.count, item.saled, item.sum]);
    }
    let str = '火花回收\r\n';
    str += `請將要分解的裝備放在裝備欄第一格\r\n`;
    str += `次數每週五20:00刷新\r\n`;
    for (let i in list) {
        let item = list[i];
        str += `#L${i}##v${item[0]}##z${item[0]}# -> #v${item[1]}:i# x ${item[2]}  #r${item[3]} / ${item[4]} #k#l\r\n`;
    }

    let sel = npc.askMenu(str);
    if (sel == 0) {
        let toDrop = util.makeItem(1, 1);
        if (toDrop == null) {
            npc.say("請將您需要分解的裝備放到第一格！");
        } else if (toDrop.getItemId() != list[sel][0]) {
            npc.say("請將您需要分解的裝備放到第一格！");
        } else if (toDrop.getChuc() < 1) {
            npc.say("不要糊弄我哦");
        } else if (list[sel][3] >= list[sel][4]) {
            npc.say("本週次數已滿,請在週五20:00後再來");
        } else if (npc.askYesNo(`是否確認分解:\r\n#v${list[sel][0]}##z${list[sel][0]}# -> #v${list[sel][1]}:i# x ${list[sel][2]}`) == 1) {
            if (stage.canHold(list[sel][1], list[sel][2])) {
                util.broadcastChatMsg(1, `<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`);
                util.broadcastChatMsg(2, `<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`);
                util.broadcastChatMsg(3, `<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`);
                util.broadcastChatMsg(4, `<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`);
                util.broadcastChatMsg(5, `<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`);
                util.broadcastChatMsg(6, `<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`);
                util.broadcastWeatherEffectNotice(`<${stage.getCharacterName()}> 在火花回收中心分解了 <${util.getItemName(toDrop.getItemId())}>`, 224, 100000, true);
                stage.removeItemBySlot(1, 1);
                stage.gainItem(list[sel][1], list[sel][2]);
                db.update(`update zsf_huishou
                           set saled = saled + 1
                           where id = ${list[sel][0]}`);

                npc.say("分解成功");

            } else {
                npc.say("揹包空間不足！");
            }
        }
    } else {
        let toDrop = util.makeItem(1, 1);
        if (toDrop == null) {
            npc.say("請將您需要分解的裝備放到第一格！");
        } else if (toDrop.getItemId() != list[sel][0]) {
            npc.say("請將您需要分解的裝備放到第一格！");
        } else if (list[sel][3] >= list[sel][4]) {
            npc.say("本週次數已滿,請在週五20:00後再來");
        } else if (npc.askYesNo(`是否確認分解:\r\n#v${list[sel][0]}##z${list[sel][0]}# -> #v${list[sel][1]}:i# x ${list[sel][2]}`) == 1) {
            if (stage.canHold(list[sel][1], list[sel][2])) {
                let sstr = `<${stage.getCharacterName()}> 剛剛在火花回收中心精心分解了一件 <${util.getItemName(toDrop.getItemId())}>，展示了高超的技藝。`;
                util.broadcastChatMsg(1, sstr);
                util.broadcastChatMsg(2, sstr);
                util.broadcastChatMsg(3, sstr);
                util.broadcastChatMsg(4, sstr);
                util.broadcastChatMsg(5, sstr);
                util.broadcastChatMsg(6, sstr);
                util.broadcastWeatherEffectNotice(sstr, 224, 100000, true);
                stage.removeItemBySlot(1, 1);
                stage.gainItem(list[sel][1], list[sel][2]);
                db.update(`update zsf_huishou
                           set saled = saled + 1
                           where id = ${list[sel][0]}`);
                npc.say("分解成功");
            } else {
                npc.say("揹包空間不足！");
            }

        }
    }
}