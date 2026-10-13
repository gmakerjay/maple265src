/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

const EXIT_MAP = 100030301;
const STAGE_1 = 920010000;
const STAGE_2 = 920010100;
const STAGE_3 = 920010200;
const STAGE_4 = 920010300;
const STAGE_5 = 920010400;
const STAGE_6 = 920010500;
const STAGE_7 = 920010600;
const STAGE_8 = 920010700;
const STAGE_FINAL = 920010800;
const STAGE_BONUS = 922011000;
const BOSS_LOG = "party3";
const TICKET_ITEM_ID = 4001063;

const STAGE_COMBO_0 = ["3", "2", "1"];
const STAGE_COMBO_1 = ["0", "0", "1"];
const STAGE_COMBO_2 = ["0", "1", "1"];
const STAGE_COMBO_6 = ["00", "01", "02", "03", "04", "05", "06", "07", "08"];
const POSITION_X = [-222, 124, -221, 137, -228];
const POSITION_Y = [-505, -718, -916, -1122, -1311];

let party;
let members;
let endTime;

function init(attachment) {
    party = attachment;
    event.initMap(STAGE_1, STAGE_2, STAGE_3, STAGE_4, STAGE_5, STAGE_6, STAGE_7, STAGE_8, STAGE_FINAL, STAGE_BONUS);
    members = party.getLocalMembers();

    // Reset maps
    for (let map_stage of [STAGE_2, STAGE_3, STAGE_4, STAGE_5, STAGE_6, STAGE_7, STAGE_8, STAGE_FINAL, STAGE_BONUS]) {
        event.getMap(map_stage).reset();
        // event.getMap(map_stage).removeNpc(2013001);
    }

    let startMaps = event.getMap(STAGE_1);
    startMaps.reset();
    startMaps.removeNpc(2013001);
    startMaps.overridePortal("in00", "party3_Next");
    for (let i = 1; i < 6; i++) {
        startMaps.overridePortal("hiden0" + i, "party3_back");
    }

    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;

    event.setVariable("achieverate", 0);
    event.setVariable("members", members);
    event.setAchieveRate(0);

    let randomComboIndex = Math.floor(Math.random() * STAGE_COMBO_0.length);
    let randomNum = Math.random();
    let combo_0 = randomNum < 0.33;
    let combo_1 = randomNum < 0.66;

    event.setVariable("summon_ower", Math.floor(Math.random() * 5) + 1);
    event.setVariable("maps_sum_2", event.getMap(STAGE_3).getActiveMobCount());
    event.setVariable("stage_4_0", combo_0 ? STAGE_COMBO_0[randomComboIndex] : (combo_1 ? STAGE_COMBO_1[randomComboIndex] : STAGE_COMBO_2[randomComboIndex]));
    event.setVariable("stage_4_1", combo_0 ? STAGE_COMBO_1[randomComboIndex] : (combo_1 ? STAGE_COMBO_2[randomComboIndex] : STAGE_COMBO_0[randomComboIndex]));
    event.setVariable("stage_4_2", combo_0 ? STAGE_COMBO_2[randomComboIndex] : (combo_1 ? STAGE_COMBO_0[randomComboIndex] : STAGE_COMBO_1[randomComboIndex]));
    event.setVariable("stage_6", "0");
    event.setVariable("variable", "7");
    // event.setVariable("eak", 0);
    // event.getMap(STAGE_1).setReactorState("eak", 1, 0);
    event.setVariable("summon", "0");
    event.setVariable("pre", "0");
    event.setVariable("stage", "0");

    for (let combo of STAGE_COMBO_6) {
        for (let i = 0; i < 4; i++) {
            event.setVariable(`stage_6_${combo}${i + 1}`, "0");
        }
    }

    for (let combo of STAGE_COMBO_6) {
        let found = false;
        while (!found) {
            for (let i = 0; i < 4; i++) {
                if (!found) {
                    let founded = false;
                    for (let j = 0; j < 4; j++) {
                        let stage6Variable = event.getVariable(`stage_6_${combo}${j + 1}`);
                        if (stage6Variable == null) {
                            event.setVariable(`stage_6_${combo}${j + 1}`, "0");
                        } else if (stage6Variable.equals("1")) {
                            founded = true;
                            break;
                        }
                    }
                    if (!founded && Math.random() < 0.25) {
                        event.setVariable(`stage_6_${combo}${i + 1}`, "1");
                        found = true;
                        break;
                    }
                }
            }
        }
    }

    for (let member of members) {
        member.setEvent(event);
        for (let itemId of [4001818, 4001819, 4001820, 4001821, 4001822, 4001823, 4001824, 4001825, 4001826, 4001827, 4001828, 4001829, 4001830]) {
            member.removeItemAll(itemId);
        }
        for (let itemId of [4001044, 4001045, 4001046, 4001047, 4001048, 4001049, 4001050, 4001051, 4001052, 4001053, 4001054, 4001055, 4001056, 4001057, 4001058, 4001059, 4001060, 4001061, 4001062, 4001063]) {
            member.removeItemAll(itemId);
        }
        member.changeMap(STAGE_1, 0);
    }
}

function removePlayer(playerId, changeMap) {
    if (party.getLeaderId() == playerId) {
        for (let member of members) {
            //member.setEvent(null);
            if (changeMap || member.getCharacterId() != playerId) {
                member.changeMap(EXIT_MAP, 0);
            }
        }
        event.destroyEvent();
    } else {
        for (let i = 0; i < members.length; i++) {
            if (members[i].getCharacterId() == playerId) {
                members[i].setEvent(null);
                if (changeMap) {
                    members[i].changeMap(EXIT_MAP, 0);
                }
                members.splice(i, 1);
                break;
            }
        }
    }
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case 9300040:
            event.setVariable("achieverate", Number(event.getVariable("achieverate")) + 0.5);
            if (event.getVariable("9300040") == null) {
                event.setVariable("9300040", 0)
            }
            let killCount = parseInt(event.getVariable("9300040"));
            let maps_3 = event.getMap(STAGE_4);
            if (killCount < 14) {
                maps_3.blowWeather(5120019, `怪物已經在地圖上的某處衍生，還有${14 - killCount}只。`, 10);
                event.setVariable("9300040", killCount + 1);
                let coordinate = Math.floor(Math.random() * POSITION_X.length);
                maps_3.spawnMob(9300040, POSITION_X[coordinate], POSITION_Y[coordinate]);
            } else {
                maps_3.blowWeather(5120019, "怪物已經清理完畢，請與我對話。", 10);
                event.setVariable("stage3mobclear", true);
            }
            break;
        case 9300045:
        case 9300046:
        case 9300047:
            let maps_2 = event.getMap(mob.getMapId());
            maps_2.dropItems(mob.getPosX(), mob.getPosY(), [4001050, 999999]);
            break;
        case 9300048:
            let maps_8 = event.getMap(mob.getMapId());
            maps_8.dropItems(mob.getPosX(), mob.getPosY(), [4001053, 999999]);
            break;
        case 9300937:
            maps_8 = event.getMap(mob.getMapId());
            let monster = maps_8.makeMob(9300938);
            monster.changeHp(5 * 1E12);
            maps_8.spawnMob(monster, -633, 562);
            maps_8.blowWeather(5120019, "精靈爸爸出現了。", 10);
            break;
        case 9300938:
            maps_8 = event.getMap(mob.getMapId());
            let mapStage = parseInt((maps_8.getId() - 920010000) / 100);
            maps_8.dropItems(mob.getPosX(), mob.getPosY(), [4001830, 999999]);
            maps_8.blowWeather(5120019, "消滅了精靈爸爸!請攜帶生命草進行對話!移動到中央房間!!", 10);
            event.setVariable(`stage_${mapStage}_clear`, true);
            break;

    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    switch (destination.getId()) {
        case STAGE_1:
        case STAGE_2:
        case STAGE_3:
        case STAGE_4:
        case STAGE_5:
        case STAGE_6:
        case STAGE_7:
        case STAGE_8:
        case STAGE_FINAL:
            stage.showAchieveRate(event.getAchieveRate());
            stage.showTimer((endTime - new Date().getTime()) / 1000);
            break;
        case STAGE_BONUS:
            stage.showAchieveRate(100);
            stage.showTimer(60);
            break;
        default:
            removePlayer(stage.getCharacterId(), false);
            break;
    }
}

function partyMemberDischarged(party, stage) {
    removePlayer(stage.getCharacterId(), true);
}

function timerExpired(key) {
    switch (key) {
        case "kick":
            removePlayer(party.getLeaderId(), true);
            break;
        case "clear":
            for (let member of members) {
                member.setEvent(null);
                member.changeMap(922011100, 0);
            }
            let nsid = event.getVariable("nvshennpcid");
            event.getMap(STAGE_7).destroyTempNpc(nsid);
            event.destroyEvent();
            break;
    }
}

function playerPickupItem(stage, map, itemId) {
    let mapStage = parseInt((map.getId() - 920010000) / 100);
    switch (mapStage) {
        case 0:
            if (itemId === TICKET_ITEM_ID) {
                let count = stage.getItemQuantity(itemId)
                let remainingTickets = 20 - count;
                if (remainingTickets <= 0) {
                    if (!event.getVariable("npc")) {
                        event.setVariable("npc", true);
                        event.setVariable(`stage_${mapStage}_clear`, true);
                        map.showSystemMessage("閃閃發光處,出現了一朵雲!");
                        map.blowWeather(5120019, "感謝你們，現在我的力量恢復了，可以將你們送到中央塔了。", 10);
                        map.spawnNpc(2013001, 375, 142, 1);
                        map.setReactorState("eak", 21, 21);
                    }
                }
                if (stage.isGm()) {
                    stage.dropMessage(0x15, "map:" + map.getId() + " num : " + stage.getItemQuantity(itemId));
                }
            }
            break;
        case 2:
            if (itemId === 4001050) {
                stage.loseItem(4001050, 1);
                let killcount_2 = parseInt(event.getVariable("map_" + mapStage + "_num") || 0);
                killcount_2 += 1;
                event.setVariable("map_" + mapStage + "_num", killcount_2);
                let num_gate = parseInt(event.getVariable("maps_sum_2")) - killcount_2;
                if (num_gate <= 0) {
                    map.blowWeather(5120019, "請與我對話!進入下一關!!", 10);
                } else {
                    map.blowWeather(5120019, "收集到了 " + killcount_2 + " 個碎片 ! 還差 " + num_gate + " 個!", 10);
                }
            }
            break;
    }
}

function deinit() {
    for (let member of members) {
        member.setEvent(null);
    }
}
