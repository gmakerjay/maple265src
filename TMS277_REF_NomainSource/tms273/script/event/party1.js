

let EXIT_MAP = 100030301;

let party;
let members;
let endTime;

function init(attachment) {
    party = attachment;

    event.getMap(910340400).reset();
    let field = event.getMap(910340500);
    field.reset();
    field.spawnMob(9300003, 32, -435);
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    members = party.getLocalMembers();
    event.setVariable("members", members);
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        members[i].changeMap(910340100, 0);
    }
}

function removePlayer(playerId, changeMap) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            //dissociate event before changing map so playerChangedMap is
            //not called and this method is not called again by the player
            members[i].setEvent(null);
            if (changeMap) {
                members[i].changeMap(EXIT_MAP, 0);
            }
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
}

function mobDied(mob) {
    let maps = event.getMap(mob.getMapId());
    switch (mob.getDataId()) {
        case 9300001:
            maps.dropItems(mob.getPosX(), mob.getPosY(), [4001007, 999999]);
            break;

        case 9300002:
            maps.dropItems(mob.getPosX(), mob.getPosY(), [4001008, 999999]);
            break;
    }
}

function playerChangedMap(stage, destination) {
    switch (destination.getId()) {
        case 910340100:
        case 910340200:
        case 910340300:
        case 910340400:
        case 910340500:
            stage.showTimer((endTime - new Date().getTime()) / 1000);
            stage.showReviveCount();
            break;
        default:
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
    }
}