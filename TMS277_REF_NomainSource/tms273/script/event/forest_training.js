// Created by MetaMS
// Event Mist forest

let eLog = require("extend_log");

let EXIT_MAP = 925020001;

let FIELD = 993198000;

let party;
let members;
let endTime;

function init(attachment) {
        event.initMap(FIELD);
        party = attachment;
        members = party.getLocalMembers();
        event.getMap(FIELD).reset();
        event.startTimer("kick", 60 * 60 * 1000);
        endTime = new Date().getTime() + 60 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                eLog.addPQLog(members[i], util, 100936, 1);
                members[i].setEvent(event);
                members[i].changeMap(FIELD, 0);
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
        removePlayer(stage.getCharacterId(), false);
        if (stage.getCharacterId() == party.getLeaderId()) {
                kick();
        }
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case FIELD:
                        //player.startQuest(7004, 0, "21/10/19");//Quest Name:Unknown
                        //stage.startQuest(7004, 0, "1");//Quest Name:Unknown
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        if (stage.getCharacterId() == party.getLeaderId()) {
                                kick();
                        }
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
        event.getMap(FIELD).endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}