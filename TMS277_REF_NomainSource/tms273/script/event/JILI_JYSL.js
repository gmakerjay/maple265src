// 記憶試煉

let eLog = require("extend_log");
let EXIT_MAP = 100000000;


let DEATH_COUNT = 5;

let BOSS_LOG = "記憶試煉";
let party;
let members;
let endTime;
var maps = [
    800024004,
    911000840,
    993000000,//867147020,
    993000500//800024008
];
var time = 30 * 60 * 1000;  //副本時間
var roundTreeT = 30 * 60 * 1000;//第三關時間
var roundTreeTD = 5 * 60 * 1000;//第三關通關等待時間
var roundFourT = 5 * 60 * 1000;//第4關時間

//第一關怪物
var roundOne = [Array(9410222, 80000000000000, 699, -28),//黃龍
Array(9410222, 80000000000000, 699, -28)];
//第3關怪物
var roundThree = [Array(8150000, 100000000000000, 552, 27),
Array(8150000, 100000000000000, -547, -27)];

//第3關天狗的影子 障礙物
var roundThreeTg = [Array(9400071, 300000000000000, -624, 153),
//Array(9400071,300000000000000,-1326,-72),
Array(9400071, 80000000000000, 470, 153)];

//第4關簡單
var roundFour1 = new Array(
    Array(9101078, 5333_3333_3333, 399, 353)
    //Array(8800141,1200000000000000,730,-28)
);
//第4關中等
var roundFour2 = [Array(9832023, 13_3333_3333_3333, 399, 353),
Array(9832023, 53_3333_3333_3333, -538, 353)];
//第4關困難
var roundFour3 = [Array(9832024, 103_3333_3333_3333, 399, -353),
Array(9832024, 603_3333_3333_3333, -538, 353)];

var roundFour;

var killnum = 0;
var round = 0;
var roundThreeTime = 0;
var roundFourTime = 0;
var selected;
var selectedStr;
let stage;
var map_1, map_2, map_3, map_4;

function init(attachment) {
    event.initMap(maps[0], maps[1], maps[2], maps[3])
    party = attachment;
    members = party.getLocalMembers();
    stage = members[0];
    map_1 = event.getMap(maps[0]);
    map_2 = event.getMap(maps[1]);
    map_3 = event.getMap(maps[2]);
    map_4 = event.getMap(maps[3]);

    map_1.reset();
    map_2.reset();
    map_3.reset();
    map_4.reset();


    event.startTimer("kick", time);
    endTime = new Date().getTime() + time;

    event.setVariable("members", members);
    for (let i = 0; i < members.length; i++) {
        members[i].changeMap(map_1, 0);
        members[i].setEvent(event); 
        eLog.addPQLog(members[i], util, 9911, 1);
        members[i].setReviveCount(DEATH_COUNT);
    }

    map_1.showTimer(time / 1000);
    round = 1;//第一關
    event.setVariable("round", round);
    event.setVariable("round1Finish", "0");
    event.setVariable("round2Finish", "0");
    event.setVariable("round3Finish", "0");
    event.setVariable("round4Finish", "0");

    //召喚第一關怪物
    for (var i = 0; i < roundOne.length; i++) {
        makeMob(roundOne[i][0], roundOne[i][1], roundOne[i][2], roundOne[i][3], map_1);
    }
    //召喚第3關怪物
    for (var i = 0; i < roundThree.length; i++) {
        makeMob(roundThree[i][0], roundThree[i][1], roundThree[i][2], roundThree[i][3], map_3);
    }
    //召喚第3關障礙怪物
    for (var i = 0; i < roundThreeTg.length; i++) {
        makeMob(roundThreeTg[i][0], roundThreeTg[i][1], roundThreeTg[i][2], roundThreeTg[i][3], map_3);
    }
}

function makeMob(mobid, hp, x, y, map, hard) {
    var boss = map.makeMob(mobid);
    // boss.setHp(hp);
    if (hard) {
        boss.setForcedMobStat(280);
    } else {
        boss.setForcedMobStat(210);
    }
    boss.changeHp(hp); 
    map.spawnMob(boss, x, y);
}

function mobDied(mob) {
    /*
    switch (mob.getDataId()) {
        case 9450066:
         for (let i = 0; i < members.length; i++) {
             members[i].runScript("森林獎勵");
        }
        map_7.blowWeather(5120034,"獎勵已發放，3秒後自動退出");
        event.startTimer("kick", 3 * 1000);
        break;


    }*/
    if (round == 4) {
        //第4關
        if (roundFour == null) {
            roundFour = event.getVariable("roundFour")
        }
        for (var i = 0; i < roundFour.length; i++) {
            if (roundFour[i][0] == mob.getDataId()) {
                killnum++;
                break;
            }
        }

        for (let dd = 0; dd < members.length; dd++) {
            members[dd].showSystemMessage(killnum);
        }
        if (killnum >= roundFour.length) {
            //通關了
            event.setVariable("round4Finish", "1");
            map_4.blowWeather(5120034, "恭喜你通過記憶試煉<" + selectedStr + ">,十秒後自動出場", 5);
            endTime = new Date().getTime() + 10 * 1000;
            event.startTimer("kick", 10 * 1000);
            for (let dd = 0; dd < members.length; dd++) {
                members[dd].showSystemMessage("第4關通過");
                members[dd].runScript("expand/記憶試煉獎勵" + selectedStr)
                members[dd].showTimer((endTime - new Date().getTime()) / 1000);
            }
        }
    }
    if (round == 1) {
        //第一關
        for (var i = 0; i < roundOne.length; i++) {
            if (roundOne[i][0] == mob.getDataId()) {
                killnum++;
                break;
            }
        }

        for (let dd = 0; dd < members.length; dd++) {
            members[dd].showSystemMessage(killnum);
        }
        if (killnum >= roundOne.length) {
            //通關了
            round = 2;
            event.setVariable("round1Finish", "1");
            map_1.blowWeather(5120034, "第一關通過請點擊NPC<妖怪天狗進入下一關卡>", 5);
            for (let dd = 0; dd < members.length; dd++) {
                members[dd].showSystemMessage("第一關怪物擊殺完畢-請點擊NPC<妖怪天狗進入下一關卡>");
                //npc.broadcastPlayerNotice(3, "【天狗試煉】:恭喜玩家 "+player.getName()+" 完成<第一關>。請繼續加油吧");
            }
            let npc = stage.spawnTempNpc(9113000, 592, -28, 1);
            event.setVariable("rewardNpc", npc);
            killnum = 0;
        }
    }
    if (round == 3) {
        //第3關
        for (var i = 0; i < roundThree.length; i++) {
            if (roundThree[i][0] == mob.getDataId()) {
                killnum++;
                break;
            }
        }

        for (let dd = 0; dd < members.length; dd++) {
            members[dd].showSystemMessage(killnum);
        }
        if (killnum >= roundThree.length) {
            //通關了
            round = 4;
            event.setVariable("round3Finish", "1");
            map_3.blowWeather(5120034, "第三關通過,點擊NPC選擇難度吧！", 5);
            for (let dd = 0; dd < members.length; dd++) {
                members[dd].showSystemMessage("第三關通過");
            }
            killnum = 0; 
            let npc = stage.spawnTempNpc(9113000, 300, 153, 1);
            event.setVariable("rewardNpc", npc);
            let entId = event.getVariable("rewardNpc");
            map_1.destroyTempNpc(entId);
            endTime = new Date().getTime() + roundTreeTD;

            event.startTimer("kick", roundTreeTD);
            for (let dd = 0; dd < members.length; dd++) {
                members[dd].showTimer((endTime - new Date().getTime()) / 1000);
            }
        }
    }
}

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            //dissociate event before changing map so playerChangedMap is
            //not called and this method is not called again by the player
            members[i].setEvent(null);
            if (changeMap)
                members[i].changeMap(EXIT_MAP, "st00");
            //collapse the members array so we don't accidentally warp
            //this member again if the leader leaves later.
            members.splice(i, 1);
            break;
        }
    }
    if (members.length <= 0) {
        event.destroyEvent();
    }
}

function playerDisconnected(player) {
    //changeMap is false since all PQ maps force return the player to the exit
    //map on his next login anyway, and we don't want to deal with sending
    //change map packets to a disconnected client
    removePlayer(player.getCharacterId(), false);
}

function playerChangedMap(player, destination) {
    //TODO: is it true that even when a non-leader clicks Nella, the entire
    //party is booted? and that GMS forces party out when only two members
    //remain alive and online?
    switch (destination.getId()) {
        case maps[0]:
            if (event.getVariable("round1Finish") == "1") {
                player.spawnTempNpc(9113000, 592, -28, 1);
            }
        case maps[1]:
        case maps[2]:
        case maps[3]:
            player.showTimer((endTime - new Date().getTime()) / 1000);
            player.showReviveCount();
            break;
        case 800010200:
            player.changeMap(maps[0], 0)
            break;
        default:
            //player died and respawned or clicked Nella to leave PQ
            //changeMap is false so player doesn't get re-warped to exit map
            removePlayer(player.getCharacterId(), false);
    }
    if (destination.getId() == maps[3]) {
        //第4關特殊處理
        if (roundFourTime == 0) {
            roundFourTime = 1;
            selected = event.getVariable("round4selected")
            if (selected == 1) {
                roundFour = roundFour1;
                selectedStr = "簡單"
            }
            if (selected == 2) {
                roundFour = roundFour2;
                selectedStr = "中等"
            }
            if (selected == 3) {
                roundFour = roundFour3;
                selectedStr = "困難"
            }
            //召喚第4關怪物
            for (var i = 0; i < roundFour.length; i++) {
                let h = selectedStr == "困難" ? true : false;
                makeMob(roundFour[i][0], roundFour[i][1], roundFour[i][2], roundFour[i][3], map_4, h);
            }
            endTime = new Date().getTime() + roundFourT;
            event.startTimer("kick", roundFourT);
        }
        map_4.blowWeather(5120034, "最終關卡,當前挑戰難度<" + selectedStr + ">");
    }
    if (destination.getId() == maps[2]) {
        //第三關特殊處理
        if (roundThreeTime == 0) {
            roundThreeTime = 1;
            round = 3;
            endTime = new Date().getTime() + roundTreeT;
            event.startTimer("kick", roundTreeT);
        }
        player.showTimer((endTime - new Date().getTime()) / 1000);
    }
    if (destination.getId() == maps[0] && roundThreeTime == 1) {
        //如果有人從第三關回到了第一關，就要清理怪物重新召喚了。 
        killnum = 0;
        for (let dd = 0; dd < members.length; dd++) {
            members[dd].showSystemMessage("有隊友被傳送回去了！怪物將被重置！");
        }
        //召喚第3關怪物
        for (var i = 0; i < roundThree.length; i++) {
            makeMob(roundThree[i][0], roundThree[i][1], roundThree[i][2], roundThree[i][3], map_3);
        }
        //召喚第3關障礙怪物
        for (var i = 0; i < roundThreeTg.length; i++) {
            makeMob(roundThreeTg[i][0], roundThreeTg[i][1], roundThreeTg[i][2], roundThreeTg[i][3], map_3);
        }
    }
}

function partyMemberDischarged(party, player) {
    if (party.getLeader() == player.getId()) {
        kick();
    } else {
        removePlayer(player.getId(), true);
    }
}

function kick() {
    for (let i = 0; i < members.length; i++) {
        //dissociate event before changing map so playerChangedMap is not
        //called and this method is not called again by the player
        members[i].setEvent(null);
        members[i].changeMap(EXIT_MAP, 0);
    }
    event.destroyEvent();
}

function timerExpired(key) {
    switch (key) {
        case "kick":
            kick();
            break;
    }
}

function deinit() {
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(null);
        members[i].setReviveCount(-1);
    }
}