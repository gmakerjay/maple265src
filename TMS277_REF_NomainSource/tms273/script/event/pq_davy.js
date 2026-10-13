// Created by MetaMS
// PQ:party2

let eLog = require("extend_log");


let mapList = [
        925100000,
        925100100,
        925100200,
        925100201,
        925100202,
        925100300,
        925100301,
        925100302,
        925100400,
        925100500,
        925100600

]
let EXIT_MAP = 251010404;
let STAGE_FINAL = 925100500;
let STAGE_BONUS = 925100600;

let party;
let members;
let endTime;

function init(attachment) {
        party = attachment;
        members = party.getLocalMembers();
        event.initMap(mapList);
        for(key in mapList){
                event.getMap(mapList[key]).reset();
        }
        
        let finalMap = event.getMap(STAGE_FINAL);
        let mobs=[9300105,9300106,9300107]
        finalMap.reset();
        finalMap.spawnMob(mobs[Math.floor(Math.random()*mobs.length)], 713, 238);


        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("achieverate", 0);
        event.setVariable("members", members);
        event.setAchieveRate(0);
        for (let i = 0; i < members.length; i++) {
                eLog.addPQLog(members[i], util, 7914, 1);
                members[i].setEvent(event);
                members[i].removeItemAll(4001117);
                members[i].removeItemAll(4001260);
                members[i].removeItemAll(4001120);
                members[i].removeItemAll(4001121);
                members[i].removeItemAll(4001122);
                members[i].changeMap(mapList[0], 0);
        }
}

function removePlayer(playerId, changeMap) {
        if (party.getLeaderId() == playerId) {
                for (let i = 0; i < members.length; i++) {
                        members[i].setEvent(null);
                        if (changeMap || members[i].getCharacterId() != playerId)
                                members[i].changeMap(EXIT_MAP, 0);
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
        let mobs=[9300105,9300106,9300107];
        if(mobs.indexOf(mob.getDataId())>=0){
                event.setVariable("bossclear", true);
        }
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        if(mapList.indexOf(destination.getId())>=0){
                if(destination.getId()==STAGE_BONUS){
                        stage.showAchieveRate(100);
                        stage.showTimer(60);
                }else{
                        stage.showAchieveRate(event.getAchieveRate());
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                }
                
        }else{
                removePlayer(stage.getCharacterId(), false);    
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
                        for (let i = 0; i < members.length; i++) {
                                members[i].setEvent(null);
                                members[i].changeMap(251010404, 0);
                        }
                        event.destroyEvent();
                        break;
        }
}

function deinit() {
        for (let i = 0; i < members.length; i++)
                members[i].setEvent(null);

}