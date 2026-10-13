// Created by MetaMS
// Event
// 賓果

let rewarditem = Array(//注意：最後一行括號後面不要加逗號。 獎勵可以自己重寫
        //括號裡數字依次代表(道具ID，道具數量)
        Array(4009548, 60), //前5名 獎勵
        Array(4001715, 2), 
        Array(5060048, 2),
        Array(5680865, 2),
        //6-10 名獎勵
        Array(4009548, 30),
        Array(5680865, 1),
        Array(5060048, 1),
        Array(4001715, 1),
        //11以後獎勵、
        Array(5680865, 1),
         Array(4009548, 20)
        //注意：最後一行括號後面不要加逗號。
);
let best = 999;

let event = ctx.getEvent("event_bingo");
if (event != null) {
        let selStr = "#r#e[主題活動 - 賓果遊戲]#k#n  \r\n\r\n#e#b我的排名：#k#n\r\n\r\n";
        for (let i = 1; i <= 3; i++) {
                selStr += "#e第" + i + "輪：#n";
                let table1 = event.getVariable("Rank_" + i + "_0_" + stage.getCharacterName());
                let table2 = event.getVariable("Rank_" + i + "_1_" + stage.getCharacterName());
                if (table1 != null) {
                        best = Math.min(best, Number(table1));
                        selStr += "#b第" + table1 + "名#k ";
                }
                if (table2 != null) {
                        best = Math.min(best, Number(table2));
                        selStr += "#b第" + table2 + "名#k";
                }
                if (table1 == null && table2 == null) {
                        selStr += "#b無排名#k";
                }
                selStr += "\r\n\r\n";
        }
        npc.me().next().say(selStr);
        if (best <= 30) {
                let gain = event.getVariable(stage.getCharacterName);
                if ("1".equals(gain)) {
                        npc.me().next().say("已經領取過獎勵了！");
                        let rMap = stage.getIntQuestRecordEx(100642, "rMap");
                        stage.changeMap(rMap, 0);
                } else {
                        let msg = "\t\t#b最好成績 #r第" + best + "名#k 獎勵如下#k\r\n\r\n";
                        if (best <= 5) {
                                for (let i = 0; i <= 3; i++) {
                                        stage.gainItem(rewarditem[i][0], rewarditem[i][1])
                                        msg += `#v${rewarditem[i][0]}:i##z${rewarditem[i][0]}:i# x ${rewarditem[i][1]}\r\n`;
                                }
                        } else if (best <= 10) {
                                for (let i = 4; i <= 7; i++) {          
                                        stage.gainItem(rewarditem[i][0], rewarditem[i][1])
                                        msg += `#v${rewarditem[i][0]}:i##z${rewarditem[i][0]}:i# x ${rewarditem[i][1]}\r\n`;
                                }
                        } else {
                                for (let i = 8; i <= 9; i++) {          
                                        stage.gainItem(rewarditem[i][0], rewarditem[i][1])
                                        msg += `#v${rewarditem[i][0]}:i##z${rewarditem[i][0]}:i# x ${rewarditem[i][1]}\r\n`;
                                }
                        }



                        // let rIdx = parseInt((best - 1) / 5);
                        // let itemId = rewarditem[rIdx][0];
                        // let itemCount = rewarditem[rIdx][1];
                        // msg += "物品:#v" + itemId + "# 數量：#r" + itemCount + "#k\r\n\r\n";
                        // msg += "是否領取獎勵，並離開這裡？"
                        // if (npc.me().askYesNo(msg)) {
                                // if (stage.gainItem(itemId, itemCount)) {
                                        event.setVariable(stage.getCharacterName(), "1");
                                        let rMap = stage.getIntQuestRecordEx(100642, "rMap");
                                        stage.changeMap(rMap, 0);
                                        
                                        npc.say(msg);
                                // } else {
                                //         npc.me().next().say("揹包空間不足請清理後繼續。");
                                // }
                        // } else {
                        //         npc.me().next().say("還有其他事情要做嗎。");
                        // }
                }
        } else {
                npc.me().next().say("沒有成績是沒有獎勵的！！！");
        }
} else {
        stage.changeMap(100000000, 0);
}