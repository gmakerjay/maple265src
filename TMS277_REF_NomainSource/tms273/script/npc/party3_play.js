/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let state, event;
player = require("check_log");
start();

function start() {
    let event = stage.getEvent();
    if (event == null) return;
    let map_stage = parseInt((map.getId() - 920010000) / 100);
    if (stage.getCharacterId() != party.getLeaderId()) return;
    let members = event.getVariable("members");
    let map_judge = event.getVariable(`stage_${map_stage}_clear`);
    switch (map_stage) {
        case 0:
            stage.dropMessage(0x15, "judge : " + map_judge);
            switch (map_judge) {
                case true:
                    event.setAchieveRate(20);
                    clear(event, map_stage, 100000);
                    npc.say("現在我將你的隊伍送到中央塔,請務必拯救女神!");
                    for (let i in members) {
                        if (members[i].getMapId() == 920010000) {
                            members[i].teleportToPortalId(3);
                        }
                    }
                    break;
            }
            break;
        case 1:
            judge = true;
            let scar = ["scar1", "scar2", "scar5", "scar6"];
            for (let i in scar) {
                if (map.getReactorState(scar[i]) != 1) {
                    judge = false;
                    break;
                }
            }
            if (map_judge == null) {
                if (!judge) {
                    npc.say("你的女神碎片還沒有集齊!請盡快去尋找靈魂碎片!!");
                } else {
                    if (stage.hasItem(4001830, 1)) {
                        for (let i in members) {
                            members[i].runScript("expand/組隊獎品");
                        }
                    } else {
                        for (let i in members) {
                            members[i].changeMap(920010800, 0);
                        }
                    }
                }
            }
            break;
        case 2:
            let killcount_2 = parseInt(event.getVariable("map_" + map_stage + "_num") || 0);
            let num_gate = parseInt(event.getVariable("maps_sum_2")) - killcount_2;
            if (num_gate <= 0) {
                if (map_judge == null) {
                    stage.gainItem(4001049, 1);
                    clear(event, map_stage, 100000);
                    event.setVariable(`stage_${map_stage}_clear`, true);
                    npc.say("這裡要做的事情已經完成了!讓我們去下一個地方吧~");
                } else {
                    npc.say("咦?什麼問題?");
                }
            } else {
                npc.say("擊殺精靈收集碎片!!別猶豫了!!");
            }
            break;
        case 3:
            let killCount = parseInt(event.getVariable("9300040"));
            if (map_judge == null) {
                if (killCount < 14) {
                    npc.say("趕快去消滅 15 只紅獨角獸 !");
                } else {
                    stage.gainItem(4001048, 1);
                    clear(event, map_stage, 100000);
                    event.setVariable(`stage_${map_stage}_clear`, true);
                    npc.say("這裡要做的事情已經完成了!讓我們去下一個地方吧~");
                }
            }
            break;
        case 4:
            let lp = [4001056, 4001057, 4001058, 4001059, 4001060, 4001061, 4001062];
            let isitemId = lp[getCurrentWeekday()];
            if (map_judge == null) {
                if (!stage.hasItem(isitemId, 1)) {
                    npc.say("請帶來當前星期的 LP 唱片!")
                } else {
                    stage.loseItem(isitemId, 1);
                    stage.gainItem(4001045, 1);
                    clear(event, map_stage, 100000);
                    event.setVariable(`stage_${map_stage}_clear`, true);
                    npc.say("這裡要做的事情已經完成了!讓我們去下一個地方吧~");
                }
            }
            break;
        case 7:
            if (map_judge == null) {
                let random_rod = event.getVariable("rod");
                if (random_rod == null) {
                    random_rod = randomizeArray();
                    event.setVariable("rod", random_rod);
                    npc.say("找到正確的踏板，爬到頂上去操縱開關！");
                } else {
                    let rod = [];
                    rod[0] = map.getReactorState(1);
                    rod[1] = map.getReactorState(2);
                    rod[2] = map.getReactorState(3);
                    stage.dropMessage(0x16, "random_rod : " + random_rod);
                    stage.dropMessage(0x16, "random_rod : " + rod);
                    if (String(random_rod) != String(rod)) {
                        npc.say("不正確!請找出正確的踏板!!");
                    } else {
                        stage.gainItem(4001046, 1);
                        clear(event, map_stage, 100000);
                        event.setVariable(`stage_${map_stage}_clear`, true);
                        npc.say("這裡要做的事情已經完成了!讓我們去下一個地方吧~");
                    }
                }
            }
            break;

        case 8:
            if (map_judge) {
                if (stage.hasItem(4001830, 1)) {
                    for (let i in members) {
                        members[i].changeMap(920010100, 0);
                    }
                }
            }
            break;
    }
    //stage.dropMessage(0x16, "judge : " + map_judge);
}

function getCurrentWeekday() {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    return currentDayIndex;
}

function clear(event, map_stage, exp) {
    if (event.getVariable("clear_" + map_stage + "_judge") == null) {
        // map.showScreenAutoLetterBox("quest/party/clear");
        map.showScreenAutoLetterBox("UI/UIWindowJP.img/inputDirectionBattle/input/0/clear");
        map.playSoundEffect("Party1/Clear");
        members = event.getVariable("members");
        exp = members.length * 30 * exp;
        for (let i in members) {
            if (members[i].getHp() <= 0) continue;
            members[i].gainExp(exp);
        }
        event.setVariable("clear_" + map_stage + "_judge", true);
    }
}

function randomizeArray() {
    var arr = [0, 0, 0];
    var onesCount = Math.floor(Math.random() * (arr.length + 1));
    var zerosCount = arr.length - onesCount;
    var randomizedArr = Array(zerosCount).fill(0).concat(Array(onesCount).fill(1));
    for (var i = randomizedArr.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var temp = randomizedArr[i];
        randomizedArr[i] = randomizedArr[randomIndex];
        randomizedArr[randomIndex] = temp;
    }
    return randomizedArr;
}