/*
 * Boss: Kalos
 */

const EXIT_MAP = 450002023;

const FIELD_1 = 921170100;
const FIELD_2 = 450002024;

/**
 * @type ScriptPlayer[]
 */
let members;

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            //dissociate event before changing map so playerChangedMap is
            //not called and this method is not called again by the player
            members[i].setEvent(null);
            members[i].updateQuestRecordEx(34222, "inGame", "0");
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

function kick() {
    for (let member of members) {
        //dissociate event before changing map so playerChangedMap is not
        //called and this method is not called again by the player
        member.setEvent(null);
        member.changeMap(EXIT_MAP);
    }
    event.destroyEvent();
}
 
    function init(attachment) {
        /**
         * @type {ScriptParty}
         */
        let party = attachment;
        event.initMap(FIELD_1);
        let f1 = event.getMap(FIELD_1);
        f1.reset() 
        f1.startEvent();
        members = party.getLocalMembers();
        event.startTimer("kick", 10 * 60 * 1000)

        for (let member of members) {
            member.setEvent(event);
            member.changeMap(FIELD_1, 0)
            member.updateQuestRecordEx(34222, "inGame", "1");
            member.updateQuestRecordEx(34222, "clear", "0");
        }
    } 
    function  mobDied(mob, killer) {
        if (mob.getDataId() == 9833046) {
            event.getMap(FIELD_1).showTopScre("Map/Effect3.img/hungryMutoMsg/msg7")
        }
    } 
    function playerDisconnected(player) {
        //changeMap is false since all PQ maps force return the player to the exit
        //map on his next login anyway, and we don't want to deal with sending
        //change map packets to a disconnected client
        removePlayer(player.getCharacterId(), false);
    } 
    function playerChangedMap(player, destination) {
        switch (destination.getId()) {
            case FIELD_1:
                break
            case FIELD_2:
                event.stopTimer("kick")
                event.destroyEvent()
                break;
            default:
                removePlayer(player.getCharacterId(), false);
                break
        }
    } 
    function partyMemberDischarged(party, player) {
        if (party.getLeader() == player.getCharacterId()) {
            kick();
        } else {
            removePlayer(player.getCharacterId(), true);
        }
    }
    function timerExpired(key) {
        switch (key) {
            case "kick":
                kick();
                break;
        }
    } 
    function deinit() {
        event.getMap(FIELD_1).endEvent();
        for (let member of members) {
            member.setEvent(null);
        }
    }
