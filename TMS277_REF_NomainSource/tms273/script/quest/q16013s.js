// Created by MetaMS
// Quest ID:16013
// [冒险岛联盟]冒险岛联盟的开端


npc.completeQuest();
// Unhandled Message [47] Packet: 2F 01 00 00 00 DC 05 00 00 
stage.completeQuest(16173);//Quest Name:Unknown
/* Update Quest RecordEx | Id:18793 | Name: Unknown | Data: "q0=1;q1=0;pq=0;q2=0;q1Date=23/06/21;pqDate=23/06/21;q2Date=23/06/21" */
stage.updateQuestRecordExShare(18793, "q0", "1");
stage.updateQuestRecordExShare(18793, "q1", "0");
stage.updateQuestRecordExShare(18793, "q2", "0");
stage.updateQuestRecordExShare(18793, "q1Date", util.getStringDate("yy/MM/dd"));
stage.updateQuestRecordExShare(18793, "q2Date", util.getStringDate("yy/MM/dd"));
stage.updateQuestRecordExShare(18793, "pqDate", util.getStringDate("yy/MM/dd"));

npc.id(9010106).next().say("勇士！\r\n現在你可以創建#b#e<楓之谷聯盟>#k#n了。");
npc.id(9010106).next().say("<楓之谷聯盟>是指#b同一世界內我的角色們#k組成的集團。#r只有60級以上/完成2轉的角色#k可以進入聯盟。");
npc.id(9010106).next().say("將<楓之谷聯盟>所屬的角色配置在#b戰鬥地圖#k中，可以獲得#r特別的效果#k。\r\n根據如何配置角色，可以獲得各種不同的效果。");
npc.id(9010106).next().say("此外，配置在戰鬥地圖上的攻擊隊員們可以合力挑戰#b巨大的龍#k，獲得#r聯盟幣#k。\r\n可以在聯盟幣商店中購買珍貴的道具。");
npc.id(9010106).next().say("好的，現在利用#b協作之力#k，讓自己變得更強吧！\r\n\r\n<楓之谷聯盟>可以通過畫面下方的#b菜單按鈕#k開始！");
stage.openUI(1148);
stage.showProgressMessageFont("從現在起，可以在詳細菜單中對楓之谷聯盟進行管理了。", 3, 20, 20, 0);//unk:[byte]0
