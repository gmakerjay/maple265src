/**副本：跑商入口
 **/

let log = require('check_log');
 
let npcModal = 9001089;
let minPlayers = 1;
let maxPlayers = 1;
let minLevel = [200];
let maxLevel = [300];
let maxenter = [25];
let bossTitle = "沙漠貿易";
let BossName = ["沙漠貿易"];
let PQLog = ["沙漠貿易"];
let event = ["trade_king"];
let onlyOne = true;
let startmap = 993000837;
if (map.getId() == startmap) {
    let text = "";
    for (let i = 0; i < BossName.length; i++) {
        text += "#b#L" + i + "#開始沙漠貿易挑戰！(本周剩餘 #r" + (maxenter[0] - log.getEventValue(stage, db, PQLog[0])) + " #b次)#b#l#k";
    }
    let sel = npc.askMenu("#e<跑商副本:" + bossTitle + ">#n\r\n\r\n#b副本介紹：#b沙漠貿易，通過購買不同地圖中NPC的商品進行倒賣賺取差價可獲得大量貿易貨幣。\r\n#k入場說明：每個帳號每天只能進入#r" + maxenter + "#k次 需要#r" + minLevel + "級#k才可以進場\r\n每次跑商時間為30分鐘\r\n" + text);
    if (party != null) {
        npc.say("你只能單人進去，不能組隊哦！");
    } else if (stage.getLevel() < minLevel[0]) {
        npc.say("你必須達到" + minLevel[0] + "級以上才可以挑戰");
    } else if (log.getEventValue(stage, db, PQLog[0]) >= maxenter[0]) {
        npc.say("進入次數已經達到上限了。");
    } else if (ctx.makeEvent(event[sel], false, stage) == null) {
        npc.say("已經有隊伍在進行了,請更換其他頻道嘗試。");
    } else {
        log.addEventValue(stage, db, PQLog[0])
    }
} else {
    let ret = npc.askYesNo("#e<跑商福利:" + bossTitle + ">#n\r\n\r\該副本只能從自由市場進入，是否回去？");
    if (ret == 1) {
        player.changeMap(startmap);

    }
}
 