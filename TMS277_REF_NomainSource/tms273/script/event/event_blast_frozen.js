// Created by MetaMS
// Event: blast frozen Zakum

let EXIT_MAP = 993225503;

let FIELD_1;
let FIELD_2;
let FIELD_3;
let FIELD_4;
let FIELD_5;
let FIELD_6;

let party;
let members;
let endTime;

function init(attachment) {
        FIELD_1 = 993226900;
        FIELD_2 = Math.random() < 0.5 ? 993227000 : 993227100;
        FIELD_3 = Math.random() < 0.5 ? 993227200 : 993227300;
        FIELD_4 = Math.random() < 0.5 ? 993227400 : 993227500;
        FIELD_5 = Math.random() < 0.5 ? 993227600 : 993227700;
        FIELD_6 = 993227800;
        event.initMap(FIELD_1, FIELD_2, FIELD_3, FIELD_4, FIELD_5, FIELD_6);
        event.setVariable("Field_2", FIELD_2);
        event.setVariable("Field_3", FIELD_3);
        event.setVariable("Field_4", FIELD_4);
        event.setVariable("Field_5", FIELD_5);
        party = attachment;
        members = party.getLocalMembers();
        let field = event.getMap(FIELD_1);
        field.reset();
        field.startEvent();
        event.getMap(FIELD_2).reset();
        event.getMap(FIELD_3).reset();
        event.getMap(FIELD_4).reset();
        event.getMap(FIELD_5).reset();
        event.getMap(FIELD_6).reset();
        let duration = 30 * 60 * 1000 + 30000;
        event.startTimer("kick", duration);
        endTime = new Date().getTime() + duration;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].updateQuestRecordEx(101489, "npcHeal=1;lazy=0;enter=0;result=0");
                members[i].cancelAllBuffStat();
                members[i].setEvent(event);
                members[i].completeQuest(101471);
                members[i].changeMap(FIELD_1, 0);
        }
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9834208: 
                        event.stopTimer("kick");
                        event.getMap(mob.getMapId()).showTopScreen("Map/Effect.img/quest/party/clear");
                        event.getMap(mob.getMapId()).playSoundEffect("Sound/Field.img/Party1/Clear");
                        event.startTimer("kick", 5 * 1000);
                        for (let i in members) {
                                members[i].runScript("expand/reward/reward_blast_frozen");
                        }
                        break;
                case 9834209:
                case 9834210:
                case 9834211:
                case 9834212:
                case 9834213:
                case 9834214:
                case 9834215:
                case 9834216:
                        let map = event.getMap(mob.getMapId());
                        let mobs = [9834209, 9834210, 9834211, 9834212, 9834213, 9834214, 9834215, 9834216];
                        let check = true;
                        for (let mobId of mobs) {
                                if (map.getMobCount(mobId) > 0) {
                                        check = false;
                                }
                        }
                        if (check && map.getMobCount(9834217) > 0) {
                                map.spawnMob(9834206, -10, -251);//main boss
                                map.killMob(9834217);
                        }
                        break;
        }
}

function removePlayer(playerId, changeMap) {
        for (let i = 0; i < members.length; i++) {
                if (members[i].getCharacterId() == playerId) {
                        //dissociate event before changing map so playerChangedMap is
                        //not called and this method is not called again by the player
                        members[i].setEvent(null);
                        members[i].removeRolePlaying();
                        members[i].removeTemporarySkill();
                        members[i].cancelAllBuffStat();
                        if (changeMap)
                                members[i].changeMap(EXIT_MAP, 0);
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

function playerDisconnected(stage) {
        //changeMap is false since all PQ maps force return the player to the exit
        //map on his next login anyway, and we don't want to deal with sending
        //change map packets to a disconnected client
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case FIELD_1:
                case FIELD_2:
                case FIELD_3:
                case FIELD_4:
                case FIELD_5:
                case FIELD_6:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        break;
                default:
                        //player died and respawned or clicked Nella to leave PQ
                        //changeMap is false so player doesn't get re-warped to exit map
                        removePlayer(stage.getCharacterId(), false);
                        break;
        }
}

function partyMemberDischarged(party, stage) {
        if (party.getLeaderId() == stage.getCharacterId()) {
                kick();
        } else {
                removePlayer(stage.getCharacterId(), true);
        }
}

function kick() {
        for (let i = 0; i < members.length; i++) {
                //dissociate event before changing map so playerChangedMap is not
                //called and this method is not called again by the player
                members[i].setEvent(null);
                members[i].removeRolePlaying();
                members[i].removeTemporarySkill();
                members[i].cancelAllBuffStat();
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
        let field = event.getMap(FIELD_1);
        field.endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}