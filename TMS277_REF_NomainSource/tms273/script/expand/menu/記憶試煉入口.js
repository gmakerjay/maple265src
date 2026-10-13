
let partyCheck = require("party_check"); 

let minPlayers = 1;
let maxPlayers = 6;
let minLevel = [140];
let maxLevel = [300];
let maxenter = [21];
let BossName = ["記憶試煉-火焰狼"];
let event = ["JILI_JYSL"];
let onlyOne = true;
let startmap = 870000000;
let prizeA = Array(    
Array(4001551, 1),//千萬突破石
)
let prizeB = Array(
    Array(4001551, 5),//千萬突破石
)

let prizeC = Array(
    Array(4001551, 15),//千萬突破石
)
//if (map.getCharacterId() == startmap) {
if (true) {
    let text = "";
    
    text += "    #e<記憶試煉>#n\r\n         #fs15##e火焰狼試煉：4-6人副本#fs12#\r\n";
    text += "#b副本時間：前三關=#r30#b分鐘，最終關卡#r5#b分鐘-帳號限制\r\n";
    text += "次數說明：每日可參與#r1#b次，最大領獎次數#r1#b次！\r\n";
    text += "關卡總數:共4關！\r\n通過最後一個關卡才可以獲得獎勵!\r\n";
    text += "其中[No.4]分為3個難度，不同難度對應不同獎勵！\r\n";
    text += "#b#e獎池預覽： \r\n";
    text += "#b簡單試煉：#k\r\n";
    for (let i = 0; i < prizeA.length; i++) {
        text += "#v" + prizeA[i][0] + "# #t" + prizeA[i][0] + "# #rx" + prizeA[i][1] + "#k\r\n";
    }
    text += "#b#e中等試煉：#k\r\n";
    for (let i = 0; i < prizeB.length; i++) {
        text += "#v" + prizeB[i][0] + "# #t" + prizeB[i][0] + "# #rx" + prizeB[i][1] + "#k\r\n";
    }
    text += "#r#e困難試煉：#k\r\n";
    for (let i = 0; i < prizeC.length; i++) {
        text += "#v" + prizeC[i][0] + "# #t" + prizeC[i][0] + "# #rx" + prizeC[i][1] + "#k\r\n";
    }
    text += "\r\n              #e#b#L0#申請進入#r<記憶試煉>#b#l#k\r\n";
    let sel = npc.askMenu(text);
    if (party == null || stage.getCharacterId() != party.getLeaderId()) {
                npc.me().say("請讓你的組隊長和我對話吧!");
    } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.me().say("好像有隊員在其他地方，請把隊員都召集到這裡！");  
    } else if ((name = partyCheck.getNotPQLogCharacter(party, util, 9911, 1, maxenter[sel])) != null) {
            npc.say("你隊員#r#e" + name + "#n#k進入次數已經達到上限了。");


    } else if (ctx.makeEvent(event[sel], onlyOne, party) == null) {
        npc.say("已經有隊伍在進行了,請更換其他頻道嘗試。");
    }
} else {
    let ret = npc.askYesNo("#e<記憶試煉>#n\r\n\r\n你想要現在就離開這裡嗎？");
    if (ret == 1) {
        stage.changeMap(100000205);
    }
}
