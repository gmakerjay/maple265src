/**
 * 釣魚
 *
 *
 */
let mapid = 100000000;
let maps;
let time = 1 * 60 * 1000;
let rodid = 5340001;//高級魚竿
let yeid = 2300003;//高級魚餌
let rodid1 = 5340000;//普通釣竿
let yeid1 = 2300000;//普通魚餌
function init() {

    var players = Array();

    maps = event.getMap(mapid);
    event.setVariable("players", players);
 
    util.broadcastWorldChatMsg(22, "[釣魚]：釣魚已開啟！"); 
    event.startTimer("PD", 1);
    event.startTimer("HPD", 1);
}


function timerExpired(key) {
    // if (event.getChannel() != 1) {
//     return;
    // }
    switch (key) {
        case "PD": 
            players = maps.getAllStage();
            // event.debug("pd" + players);
            if (players.length > 0) {
                for (let i = 0; i < players.length; i++) {
                    if (null != players[i]) {
                        let p = players[i]; 
                        if (p.hasItem(rodid1, 1) && (p.hasItem(yeid1, 1) || p.hasItem(yeid, 1))) { 
                            players[i].runScript("expand/menu/釣魚獎勵")
                        }
                    }
                }
            } 
            event.startTimer("PD", time);
            break;
        case "HPD":
            players = maps.getAllStage(); 
            if (players.length > 0) {
                for (let i = 0; i < players.length; i++) {
                    if (null != players[i]) {
                        let p = players[i];
                        if (p.hasItem(rodid, 1) && (p.hasItem(yeid1, 1) || p.hasItem(yeid, 1))) {
                            players[i].runScript("expand/menu/釣魚獎勵高級")
                        }
                    }
                }
            }
            event.startTimer("HPD", time);
            break;
    }
}
