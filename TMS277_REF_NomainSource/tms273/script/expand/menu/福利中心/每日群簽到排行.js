
let log = require('check_log');
var accountId = stage.getAccountId();
var qq

function start() {
    qq = loadQQ()
    let str = ``;  
    if (qq) {
        if (log.getEventValue(stage, db, '群活躍獎勵') < 1) {

            let cnt = db.select(`SELECT COUNT(*) AS count
                FROM chat_history
                WHERE qq = ${qq}
                AND DATE(time) = CURDATE();
                `)[0].get('count')
                if (cnt >= 100) {
                    log.addEventValue(stage, db, '群活躍獎勵');
                    stage.gainItem(4009548, 30);
					stage.gainItem(2636884, 2);
					stage.gainItem(2431738, 1);
					stage.gainItem(2437750, 30);
					stage.gainItem(2633336, 10);
					stage.gainItem(2430376, 1);
					stage.gainItem(2472000, 3);
					stage.gainItem(5060048, 4);
                    stage.gainItem(4001889, 1);
					stage.gainItem(4001878, 1);
                    npc.say('群活躍獎勵領取成功')
                } else {
                    npc.say(`群活躍條件未達成，需要今日群發言100條:\r\n當前: ${cnt}`)
                }




        } else {
            npc.say('今天已經領取過')
        }

    } else {
        npc.say('請先綁定QQ')
    } 

}

 


function loadQQ() {
    if (!qq) {
        try {
            let results = db.select(`SELECT qq FROM zsf_robot_bind WHERE account_id = ${accountId}`);
            if (results.length > 0) { 
                return results[0].get('qq');
            }
        } catch (e) {
        }
    }
    return null;
}
 




start();