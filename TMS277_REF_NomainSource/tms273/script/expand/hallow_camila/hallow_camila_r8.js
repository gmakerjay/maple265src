// Created by MetaMS

let key = "r8";
let reward = 2632290;
let count = 10;
if (stage.getIntWorldShareRecord(391, key) <= 0) {
        if (stage.getIntQuestRecordExShare(503096, "mCnt") > 0) {
                if (npc.id(9063069).askYesNo("是否立即領取獎勵？\r\n#b#e#i" + reward + ":# #t" + reward + ":# " + count + "個\r\n\r\n#r※ 有效期限為獎勵領取日起14天。\r\n#r※ 每個楓之谷帳號僅可獲得1次的獎勵。\r\n\r\n#k#e#fs16#當前角色:\r\n#r" + util.getServerName() + "#k 世界 #b" + stage.getLevel() + "#k 等級 #b" + stage.getCharacterName() + "#k")) {
                        /* Response is Yes */
                        let item = util.makeItem(reward, count);
                        item.setExpireDate(util.calcExpireDay(14));
                        if (stage.gainItem(item)) {
                                let hallowClick = stage.getIntQuestRecordExShare(503096, "hallowClick");
                                hallowClick += 1;
                                /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "point=3;mComplete=2;mCnt=1;date=241017;hallowClick=1;camilaClick=0;week=1" */
                                //stage.updateQuestRecordEx(503096, "point=3;mComplete=2;mCnt=1;date=241017;hallowClick=1;camilaClick=0;week=1");
                                stage.updateQuestRecordExShare(503096, "hallowClick", String(hallowClick));
                                stage.updateWorldShareRecord(391, key, "1");
                                npc.id(9063069).next().say("在背包放入獎勵了~\r\n希望你滿意！");
                        } else {
                                npc.id(9063069).say("背包空間不足，請清理後再試。");
                        }
                } else {
                        /* Response is No */
                        npc.id(9063069).say("想領取獎勵時請再告訴我一聲！\r\n\r\n#r#e[活動期間]#n\r\n - 2024年11月12日下午11點59分為止#k");
                }
        }
}