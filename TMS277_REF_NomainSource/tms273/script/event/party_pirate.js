/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let EXIT_MAP = 251010404;

let STAGE_1 = 925100000;
let STAGE_2 = 925100100;
let STAGE_3 = 925100200;
let STAGE_3_1 = 925100201;
let STAGE_3_2 = 925100202;
let STAGE_4 = 925100300;
let STAGE_4_1 = 925100301;
let STAGE_4_2 = 925100302;
let STAGE_5 = 925100400;
let STAGE_6 = 925100500;

let party;
let members;
let endTime;
let monster;
// 新增：当前活动地图对象引用
let currentMaps = {};

function init(attachment) {
    party = attachment;
    // 初始化所有地图并保存引用
    currentMaps[STAGE_1] = event.getMap(STAGE_1);
    currentMaps[STAGE_2] = event.getMap(STAGE_2);
    currentMaps[STAGE_3] = event.getMap(STAGE_3);
    currentMaps[STAGE_3_1] = event.getMap(STAGE_3_1);
    currentMaps[STAGE_3_2] = event.getMap(STAGE_3_2);
    currentMaps[STAGE_4] = event.getMap(STAGE_4);
    currentMaps[STAGE_4_1] = event.getMap(STAGE_4_1);
    currentMaps[STAGE_4_2] = event.getMap(STAGE_4_2);
    currentMaps[STAGE_5] = event.getMap(STAGE_5);
    currentMaps[STAGE_6] = event.getMap(STAGE_6);

    // 重置所有地图
    for (let mapId in currentMaps) {
        currentMaps[mapId].reset();
    }

    // 初始化STAGE_3地图怪物
    let STAGE_3_map = currentMaps[STAGE_3];
    for (let i = 0; i < 5; i++) {
        monster = STAGE_3_map.makeMob(9300124);
        STAGE_3_map.spawnMob(monster, 430, 75);
        monster = STAGE_3_map.makeMob(9300125);
        STAGE_3_map.spawnMob(monster, 1600, 75);
        monster = STAGE_3_map.makeMob(9300124);
        STAGE_3_map.spawnMob(monster, 430, 238);
        monster = STAGE_3_map.makeMob(9300125);
        STAGE_3_map.spawnMob(monster, 1600, 238);
    }

    // 初始化STAGE_3_1地图怪物
    let STAGE_3_1_map = currentMaps[STAGE_3_1];
    for (let i = 0; i < 10; i++) {
        monster = STAGE_3_1_map.makeMob(9300112);
        STAGE_3_1_map.spawnMob(monster, 0, 238);
        monster = STAGE_3_1_map.makeMob(9300113);
        STAGE_3_1_map.spawnMob(monster, 1700, 238);
    }

    // 初始化STAGE_4地图怪物
    let STAGE_4_map = currentMaps[STAGE_4];
    STAGE_4_map.killAllMob();
    for (let i = 0; i < 10; i++) {
        monster = STAGE_4_map.makeMob(9300124);
        STAGE_4_map.spawnMob(monster, 430, 75);
        monster = STAGE_4_map.makeMob(9300125);
        STAGE_4_map.spawnMob(monster, 1600, 75);
        monster = STAGE_4_map.makeMob(9300124);
        STAGE_4_map.spawnMob(monster, 430, 238);
        monster = STAGE_4_map.makeMob(9300125);
        STAGE_4_map.spawnMob(monster, 1600, 238);
    }

    // 初始化STAGE_4_1地图怪物
    let STAGE_4_1_map = currentMaps[STAGE_4_1];
    for (let i = 0; i < 10; i++) {
        monster = STAGE_4_1_map.makeMob(9300112);
        STAGE_4_1_map.spawnMob(monster, 0, 238);
        monster = STAGE_4_1_map.makeMob(9300113);
        STAGE_4_1_map.spawnMob(monster, 1700, 238);
    }

    // 初始化STAGE_6地图BOSS
    let STAGE_6_map = currentMaps[STAGE_6];
    monster = STAGE_6_map.makeMob(2600326);
    STAGE_6_map.spawnMob(monster, 605, 237);

    // 启动30分钟倒计时
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.setAchieveRate(0);
    
    // 初始化玩家
    members = party.getLocalMembers();
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        members[i].changeMap(STAGE_1, 0);
    }
}

function removePlayer(playerId, changeMap) {
    if (party.getLeaderId() === playerId) {
        // 队长离开，解散副本
        for (let i = 0; i < members.length; i++) {
            members[i].setEvent(null);
            if (changeMap || members[i].getCharacterId() !== playerId)
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
    } else {
        // 普通成员离开
        for (let i = 0; i < members.length; i++) {
            if (members[i].getCharacterId() === playerId) {
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
        case 2600326:
            // BOSS死亡处理
            for (let i in members) {
                // 可以添加玩家奖励逻辑
				members[i].runScript("expand/menu/組隊副本獎勵/海盜")
            }
            event.setAchieveRate(100);
            
            // 修复：使用STAGE_6地图对象播放音效
            let stage6Map = currentMaps[STAGE_6];
            if (stage6Map && typeof stage6Map.playSoundEffect === 'function') {
                stage6Map.playSoundEffect("quest/party/clear");
                stage6Map.playSoundEffect("Party1/Clear");
            } else {
                // 备选方案：使用事件对象播放全局音效
                event.playSoundEffect("quest/party/clear");
                event.playSoundEffect("Party1/Clear");
            }
            break;
    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    // 检查是否离开副本区域
    if (destination.getId() < 925100000 || destination.getId() > 925100500) {
        removePlayer(stage.getCharacterId(), false);
    } else {
        // 更新进度
        let stage_map = parseInt((destination.getId() - 925100000) / 100) - 1;
        let aRate = parseInt((stage_map / 5) * 100);
        event.setAchieveRate(aRate);
        stage.showAchieveRate(event.getAchieveRate());
        stage.showTimer((endTime - new Date().getTime()) / 1000);
    }
}

function partyMemberDischarged(party, stage) {
    removePlayer(stage.getCharacterId(), true);
}

function timerExpired(key) {
    switch (key) {
        case "kick":
            // 倒计时结束，踢出所有玩家
            removePlayer(party.getLeaderId(), true);
            break;
    }
}

function deinit() {
    // 清理事件
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(null);
    }
}
