// Created by MetaMS
// Event
// Multi Soccer

let EXIT_MAP = 993246002;
let SEL_MAP = 993245200;
let GAME_MAP = 993246100;
let START_MAP = 993246001;

let members = [];

function init(attachment) {
        members = attachment;
        event.initMap(SEL_MAP, GAME_MAP);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(SEL_MAP, 0);
        }
        event.startTimer("Select_End", 10500);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case SEL_MAP:
                case GAME_MAP:
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        break;
        }
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), false);
}

function removePlayer(characterId, changeMap) {
        for (let i = 0; i < members.length; i++) {
                if (members[i].getCharacterId() == characterId) {
                        members[i].setEvent(null);
                        if (changeMap) {
                                members[i].changeMap(EXIT_MAP, 0);
                        }
                        members.splice(i, 1);
                        break;
                }
        }
        if (members.length <= 0) {
                event.destroyEvent();
        }
}

function kick() {
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "Select_End":
                        let selField = event.getMap(SEL_MAP);
                        selField.transferTo(GAME_MAP, 0)
                        event.startTimer("Ready_Game", 3000);
                        event.startTimer("Warp_Out", 10 * 60 * 1000);
                        break;
                case "Ready_Game":
                        let gameField = event.getMap(GAME_MAP);
                        gameField.startEvent();
                        break;
                case "Game_End":
                        event.stopTimer("Warp_Out");
                        event.startTimer("Warp_Out", 10000);
                        break;
                case "Warp_Out":
                        kick();
                        break;
                default:
                        break;
        }
}

function deinit() {
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}
