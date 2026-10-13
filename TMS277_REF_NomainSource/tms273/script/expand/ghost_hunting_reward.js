
let eLog = require("extend_log");
const questId = 18831; //小鬼獎勵
const questId2 = 18832; //鬼王獎勵
// eLog.getPQLog(stage, util, questId, 1)
 
const maxDaily1 = 20
const maxDaily2 = 55
let rate;
let memCnt = party.getLocalMembers().length;

if (memCnt >= 3) {
    rate = 1;
} else if (memCnt >= 2) {
    rate = 0.7;
} else {
    rate = 0.4;
}
function entry() {

    
    if (party.getLeaderId() == stage.getCharacterId()) {
        db.delete(`delete from ghost_hunting_map where  map_id = ${stage.getMapId()} and channel_id = ${stage.getChannelId()}`)
    }

    // 固定獎勵
    let e = stage.getEvent(); 
    if (e.getVariable("flag") == 'true') { 
//        if (stage.#getEventValue("捉鬼鬼王獎勵") >= maxDaily2) {
        if (eLog.getEventLog(stage, util, questId2, 1) >= maxDaily2) {
            stage.dropMessage(0x12, "今日捉鬼鬼王領獎次數已經達到上限了！")
            return;
        }

        if (Math.random() < 0.1) {
            let cnt = parseInt(parseInt(Math.random() * 100) * rate) + 1;
            // let cnt = parseInt(Math.random() * 80) + 1;
            stage.gainItem(4001714, cnt);
        } else {
            let cnt = parseInt(Math.random() * 10 * rate) + 1;
            const list = [5062500, 2048761, 5062503, 5062020, 5062010];
            const randomElement = list[Math.floor(Math.random() * list.length)];
            stage.gainItem(randomElement, cnt);
        }
        if (party.getLeaderId() == stage.getCharacterId()) {
            // npc.broadcastPlayerNotice(6, "【捉鬼大師】: 恭喜 " + stage.getCharacterName() + "捕捉了正在破壞頑皮島的鬼王，獲得了大量獎勵！");
        }
        
        eLog.addEventLog(stage, util, questId2, 1);  
    } else {
//        if (stage.#getEventValue("捉鬼小鬼獎勵") >= maxDaily1) { 
        if (eLog.getEventLog(stage, util, questId, 1) >= maxDaily1) {
            stage.dropMessage(0x12, "今日捉鬼普通領獎次數已經達到上限了！")
            return;
        }
        stage.gainItem(4001714, parseInt(5 * rate));
        if (party.getLeader() == stage.getCharacterId()) {
            // npc.broadcastPlayerNotice(6, "【捉鬼小吏】: 恭喜 " + stage.getCharacterName() + "完成了任務，獲得了完成了捉鬼任務！");
        }
//        stage.#addEventValue("捉鬼小鬼獎勵"); 
        eLog.addEventLog(stage, util, questId, 1);  
    } 
 
}

entry()
