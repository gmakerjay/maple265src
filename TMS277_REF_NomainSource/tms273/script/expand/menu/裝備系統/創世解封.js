let {getBossEventRealByPlayerId} = require("constant/event");

let log = require('check_log');
var a1 = "#fUI/UIWindowString/Scenario/quest_info/scene/summary_icon/summary#"

function start() {
    let tod1 = stage.getItemBySlot(-1, -11);
    if (tod1 && util.getItemName(tod1.getItemId()).includes("創世")) {
        if (log.getPQLog(stage, db, "創世武器") == 0) {
            log.addPQLog(stage, db, "創世武器");
        }
    }
    if (stage.isQuestCompleted(35666)) {
        if (log.getPQLog(stage, db, "創世技能1") == 0) {
            log.addPQLog(stage, db, "創世技能1");
        }
    }
    if (stage.isQuestCompleted(35667)) {
        if (log.getPQLog(stage, db, "創世技能2") == 0) {
            log.addPQLog(stage, db, "創世技能2");
        }
    }

    var str = "			 #fn黑體##fs18##v1213022##r創世武器#v1213022##fs13\r\n\r\n";
    str += "" + a1 + "\r\n"
    str += "#b恭喜你險家終於走到了這一步~\r\n"

    if (log.getPQLog(stage, db, "創世武器") == 0) {
        // 查詢次數
        let count1 = getBossEventRealByPlayerId("黑魔法師[hard]", db, stage);
        if (count1 >= 9) {
            str += `#k黑魔法師[hard] #e已達成#n#k\r\n`;
        } else {
            str += `#k黑魔法師[hard] #r#e${count1} / 9#n#k\r\n`;
        }

        if (count1 >= 9) {
            str += `#L0#領取創世武器#l`;
            let sel = npc.askMenu(str);
            if (sel == 0) {
                log.addPQLog(stage, db, "創世武器");
                stage.gainItem(2439614, 1);
                npc.say("恭喜你，領取成功");
            }
        } else {
            npc.say(str);
        }
    } else {
        // if (!player.isGm()) {
        //     return;
        // }
        if (!stage.isQuestCompleted(35666)) {
            let bossList = [
                ["戴米安[normal]"],
                ["戴米安[hard]"],
                ["史烏[normal]"],
                ["史烏[hard]"],
                ["露希妲[normal]"],
                ["露希妲[hard]"],
                ["威爾[normal]"],
                ["威爾[hard]"],
                ["頓凱爾[normal]"],
                ["頓凱爾[hard]"],
                ["戴斯克[normal]"],
                ["戴斯克[chaos]"],
                ["真‧希拉[normal]"],
                ["真‧希拉[hard]"],
                ["黑魔法師[hard]"],
            ];
            let str = `創世武器會附帶兩個強力的技能，要獲取他們，還需要通過一些測試和付出一點小小的代價。`;
            let can1 = true;

            let info = {};
            let bossResults = db.select(`select bossName, count(1) as cnt
                                         from zz_boss_event
                                         where player_id = ${stage.getCharacterId()}
                                           and mode = 1
                                           and status in (1, 3)
                                         group by bossName`);
            for (let i in bossResults) {
                info[bossResults[i].get("bossName")] = bossResults[i].get('cnt')
            }
            let bossStr = ``;
            for (let i in bossList) {
                bossStr += `\r\n${bossList[i]} : `;
                if (info[bossList[i]] && parseInt(info[bossList[i]]) >= 0) {
                    bossStr += `已完成`;
                } else {
                    bossStr += `#r未完成#k`;
                    can1 = false;
                }
            }

            if (can1) {
                str = `你已經充分證明了自己的實力，接下來我會將創世之力的一半贈於你，準備好了么`;
                if (npc.askYesNo(str) == 1) {
                    log.addPQLog(stage, db, "創世技能1");
                    stage.completeQuest(35666);
                    util.broadcastWeatherEffectNotice("==創世之力== 恭喜玩家<" + stage.getCharacterName() + ">在不懈努力下，學會了[破壞之黑暗劍靈]", 22, 10000, true);

                    npc.say("好了，快去看看你的新技能吧。(需將創世武器脫下重新穿戴)");
                }
            } else {
                str += `請看下面是你要經歷的挑戰,完成后再回來找我\r\n`;
                str += bossStr;
                npc.say(str);

            }
        } else if (!stage.isQuestCompleted(35667)) {
            let str = `另一個技能則是要看看你的誠意,傳授創世技能需要消耗大量體力，準備100億遊戲幣犒勞我一下吧`;
            if (stage.getMesos() < 100_0000_0000) {
                str += `\r\n你先回去準備一下吧`;
                npc.say(str);
                return;
            }
            if (npc.askYesNo(str) == 1 && stage.getMesos() >= 100_0000_0000) {
                log.addPQLog(stage, db, "創世技能2");
                stage.loseMesos(100_0000_0000);
                stage.completeQuest(35667);
                util.broadcastWeatherEffectNotice("==創世之力== 恭喜玩家<" + stage.getCharacterName() + ">在不懈努力下，學會了[創造之光明劍靈]", 22, 10000, true);

                npc.say("好了，快去看看你的新技能吧。(需將創世武器脫下重新穿戴)");
            }
        } else {
            npc.say("我已經沒什麼能教給你的了");
        }
    }


}


start();