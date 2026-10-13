let partyBoss = require("party_boss");
if (stage.isGm()) {
        while (true) {
                let msg = "查看BOSS完成狀態:#b\r\n"
                let allName = partyBoss.Name;
                for (let i = 0; i < allName.length; i++) {
                        let bossName = allName[i];
                        if (!"UNK".equals(bossName)) {
                                msg += "#L" + i + "#" + bossName + "#b#l\r\n";
                        }
                }
                let sel = npc.askMenu(msg);
                let selType = npc.askMenu("#e#r" + allName[sel] + "#k#n - 選擇：#b\r\n#L0#重置通關次數#l\r\n")
                if (selType == 0) {
                        let res = "#e#r" + allName[sel] + ":";
                        res += "\r\n\r\n#k#b";
                        let find = false;
                        for (let i = 0; i < 3; i++) {
                                if (stage.checkBossClearLog(sel, i)) {
                                        find = true;
                                        res += "#L" + i + "#" + partyBoss.difficulty[i] + " Clear:" + stage.checkBossClearLog(sel, i) + "#b#l\r\n";
                                }
                        }
                        if (!find) {
                                res += "當前無完成記錄";
                        }
                        res += "\r\n#k#b#L999#返回#l";
                        let reset = npc.askMenu(res)
                        if (reset != 999) {
                                stage.resetBossClearLog(sel, reset);
                        }
                } else {
                        let res = "#e#b" + allName[sel] + ":";
                        res += "\r\n\r\n#k#b";
                        for (let i = 0; i < 3; i++) {
                                let count = stage.getBossEnterRemainCount(sel, i);
                                if (count != -1) {
                                        res += "#L" + i + "#" + partyBoss.difficulty[i] + " RemainCount:" + stage.getBossEnterRemainCount(sel, i) + "#b#l\r\n";
                                }
                        }
                        let reset = npc.askMenu(res)
                        stage.resetBossEnterLog(sel, reset);
                }
        }
} else {
        stage.showSystemMessage("無法使用此指令。")
}