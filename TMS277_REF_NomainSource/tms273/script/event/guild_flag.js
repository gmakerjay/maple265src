// Created by MetaMS
// Event flag

let fieldId;
let exitFieldId;

let party;
let members;
let endTime;
let mode;
let countdown;

function init(attachment) {
        [party, fieldId, exitFieldId, mode] = attachment;
        event.initMap(fieldId);
        countdown = 0;
        members = party.getLocalMembers();
        event.getMap(fieldId).reset();
        endTime = new Date().getTime() + 60 * 1000;
        event.startTimer("kick", 60 * 1000);
        event.startTimer("countdown", 6 * 1000);
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].updateQuestRecordEx(32581, "mode", String(mode));
                members[i].updateQuestRecordEx(32581, "complete", "0");

                members[i].setEvent(event);
                members[i].changeMap(fieldId, 0);
        }
}

function mobDied(mob) {

}

function removePlayer(playerId, changeMap) {
        for (let i = 0; i < members.length; i++) {
                if (members[i].getCharacterId() == playerId) {
                        //dissociate event before changing map so playerChangedMap is
                        //not called and this method is not called again by the player
                        members[i].setEvent(null);
                        if (changeMap)
                                members[i].changeMap(exitFieldId, 0);
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
        removePlayer(stage.getCharacterId(), false);
        if (stage.getCharacterId() == party.getLeaderId()) {
                kick();
        }
}

function playerChangedMap(stage, destination) {
        if (destination.getId() != fieldId) {
                removePlayer(stage.getCharacterId(), false);
                if (stage.getCharacterId() == party.getLeaderId()) {
                        kick();
                }
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
                members[i].changeMap(exitFieldId, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "countdown":
                        countdown++;
                        event.getMap(fieldId).startEvent();
                        if (countdown == 4) {
                                endTime = new Date().getTime() + 8 * 60 * 1000;
                                event.stopTimer("kick");
                                event.startTimer("kick", 8 * 60 * 1000);
                                event.getMap(fieldId).showTimer(8 * 60);
                                let startTime = new Date().getTime();
                                event.setVariable("start", "1");
                                event.setVariable("startTime", startTime);
                                for (let i = 0; i < members.length; i++) {
                                        members[i].setActionBar(22);
                                        members[i].updateQuestRecordEx(32581, "start", startTime);
                                }
                        } else {
                                if (countdown == 1) {
                                        event.getMap(fieldId).showTimer(3);
                                }
                                event.startTimer("countdown", 1000);
                        }
                        break;
                case "kick":
                        kick();
                        break;
        }
}

function deinit() {
        event.getMap(fieldId).endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}