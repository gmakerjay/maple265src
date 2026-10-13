var condition = [8500];
var reward = [
    Array(2630895, 5, 0),
    Array(2630895, 1, 0),
    Array(2000005, 1, 1),
    Array(2340000, 1, 2),
    Array(2000005, 1, 3),
    Array(4001759, 1, 4)
];

var condition1 = [8000];
var reward1 = [
    Array(2437537, 1, 0)
];
let log = require('check_log');
let info = stage.getMapleUnionInfo();
let sel = npc.askMenu("今天可是個適合去屠龍的好日子！你當前聯盟等級為：#r" + info[1] + "\r\n#k關於#b冒險島聯盟#k的工作，有什麼我可以幫忙的嗎？\r\n#L1##b<取得聯盟階段獎勵>#k#l");

switch (sel) {
    case 1:
        let sel11 = "\r\n當前聯盟等級 #r" + info[1] + "\r\n";
        for (var i = 0; i < condition1.length; i++) {
            sel11 += "#k#L" + (i) + "#" + " 聯盟階段獎勵 #r\t\t\t" + condition1[i] + "#l\r\n";
        }
        let selected1 = npc.askMenu(sel11);
        sel11 = "是否領取 #r" + condition1[selected1] + " #k聯盟獎勵？（賬號限定一次）\r\n箱中的均為17星X卷潛能12/9/9\r\n";
        for (var i = 0; i < reward1.length; i++) {
            if (reward1[i][2] == (selected1)) {
                sel11 += "\t\t\t#i" + reward1[i][0] + "# #z" + reward1[i][0] + "#[" + reward1[i][1] + "個]\r\n";
            }
        }
        let YN1 = npc.askYesNo(sel11);
        if (YN1 == 1) {
            if (log.getEventValue(stage, db, "聯盟達成" + selected1) > 0) {
                npc.next().say("您的已經領取過該階段獎勵，無法再次領取");
            } else if (info[1] < condition1[selected1]) {
                npc.next().say("聯盟等級未達標，無法領取");
            } else {
                var rewardlist = [];
                for (var i = 0; i < reward1.length; i++) {
                    if (reward1[i][2] == (selected1)) {
                        if (reward1[i][3] == null)
                            reward1[i][3] = -1;
                        rewardlist.push([reward1[i][0], reward1[i][1], reward1[i][3]]);
                    }
                }
                if (stage.getFreeSlot(1) < rewardlist.length || stage.getFreeSlot(2) < rewardlist.length || stage.getFreeSlot(3) < rewardlist.length || stage.getFreeSlot(4) < rewardlist.length || stage.getFreeSlot(5) < rewardlist.length) {
                    npc.next().say("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
                } else {
                    for (var i = 0; i < rewardlist.length; i++) {
                        stage.gainItem(rewardlist[i][0], rewardlist[i][1]);
                    }
                    log.addEventValue(stage, db, "聯盟達成" + selected1, 1, -1);
                    util.broadcastChatMsg(9, "聯盟達成獎勵:玩家 " + stage.getCharacterName() + " 領取了達成  " + condition1[selected1] + " 聯盟獎勵！");
                    npc.next().say("領取成功了。請繼續努力，打造更強的聯盟。");
                }
            }
            stage.runScript("expand/menu/萌新專區/聯盟獎勵");
        }
        break;
}