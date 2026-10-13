// Created by MetaMS
// My home Skill buff

let maxLeve = 6;
let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;
let nowTime = new Date().getTime();
let buffDate = stage.getQuestRecordExShare(500773, "buffDate");
let nowDate = util.getStringDate("yy/MM/dd/HH/mm");

if (!nowDate.equals(buffDate)) {
        stage.updateQuestRecordExShare(500773, "buffDate", "0");
        let time = 10;
        let s1 = stage.getIntQuestRecordExShare(500773, "s1");
        let lv = Math.min(maxLeve, Math.floor(Math.max(1, (s1 / 20))));
        time += 2 * lv;
        let menu = "#face0#你知道我每天都在為你應援吧？今天需要什麼幫助呢？\r\n\r\n#L80011827##b#s80011827# #q80011827##k#l\r\n#L80011830##b#s80011830# #q80011830##k#l\r\n#L80011831##b#s80011831# #q80011831##k#l\r\n#L80011832##b#s80011832# #q80011832##k#l";
        let sel = npc.id(npcId).uiMax().askMenu(menu);
        let text = "#face0#要以今天的增益領取#b#s" + sel + "# #q" + sel + "##k嗎?\r\n\r\n";
        switch (sel) {
                case 80011827:
                        text += "#b※增加獲得經驗值 (可以和經驗券等疊加應用) ";
                        break;
                case 80011830:
                        text += "#b※BOSS怪物攻擊力提高 ";
                        break;
                case 80011831:
                        text += "#b※攻擊力/魔力提高 ";
                        break;
                case 80011832:
                        text += "#b※增加暴擊機率";
                        break;
        }
        text += " ( 技能等級" + lv + " )\r\n※ 持續時間: " + time + "分#k";
        let ret = npc.id(npcId).ui(1).askAccept(text);
        if (ret == 1) {
                stage.updateQuestRecordExShare(500773, "buffDate", util.getStringDate("yy/MM/dd/HH/mm"));
                stage.applySkillBuff(sel, lv);
                npc.id(npcId).ui(1).next().say("#face0#啦啦~怎麼樣？通過今天的增益， #b#s" + sel + "# #q" + sel + "#變為" + lv + "級#k了！");
        }
} else {
        npc.id(npcId).ui(1).next().say("#face0#今天已經施展了每日增益，明天我再幫你吧！");
}