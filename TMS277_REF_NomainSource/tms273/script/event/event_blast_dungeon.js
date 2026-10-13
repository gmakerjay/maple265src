// Created by MetaMS
// ID:[280030200]
// MapName:殘暴炎魔祭壇
// 殘暴炎魔祭壇

let EXIT_MAP = 993225503;

let FIELD_1 = 993225600;
let FIELD_2 = 993226400;
let FIELD_3 = 993226500;
let FIELD_4 = 993226600;

let party;
let members;
let endTime;

function init(attachment) {
        event.initMap(FIELD_1, FIELD_2, FIELD_3, FIELD_4);
        party = attachment;
        members = party.getLocalMembers();
        let field = event.getMap(FIELD_1);
        field.reset();
        field.startEvent();
        event.getMap(FIELD_2).reset();
        event.getMap(FIELD_3).reset();
        event.getMap(FIELD_4).reset();
        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].updateQuestRecordEx(101488, "MixGolem=0;TauroDefender=0;ZombieMushmom=0;enter=0");
                members[i].cancelAllBuffStat();
                members[i].setEvent(event);
                members[i].completeQuest(101471);
                members[i].changeMap(FIELD_1, 0);
        }
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9834145:
                        for (let i = 0; i < members.length; i++) {
                                members[i].updateQuestRecordEx(101488, "MixGolem", "1");
                        }
                        break;
                case 9834143:
                        for (let i = 0; i < members.length; i++) {
                                members[i].updateQuestRecordEx(101488, "ZombieMushmom", "1");
                        }
                        break;
                case 9834151:
                        for (let i = 0; i < members.length; i++) {
                                members[i].updateQuestRecordEx(101488, "TauroDefender", "1");
                        }
                        break;
                case 9834152:
                        event.stopTimer("kick");
                        event.getMap(mob.getMapId()).showTopScreen("Map/Effect.img/quest/party/clear");
                        event.getMap(mob.getMapId()).playSoundEffect("Sound/Field.img/Party1/Clear");
                        event.startTimer("kick", 5 * 1000);
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
                        //player.startQuest(7004, 0, "21/10/19");//Quest Name:Unknown
                        //stage.startQuest(7004, 0, "1");//Quest Name:Unknown
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