// Created by MetaMS
// Event
// Multi Soccer

let EXIT_MAP = 993247500;
let GAME_MAP = 993247400;
let START_MAP = 993247399;

let members = [];

function init(attachment) {
        members = attachment;
        event.initMap(GAME_MAP);
        event.startTimer("Ready_Game", 3500);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(GAME_MAP, i);
        }
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
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
        let gameField = event.getMap(GAME_MAP);
        switch (key) {
                case "Ready_Game":
                        gameField.startEvent();
                        event.startTimer("Start_Game", 3000);
                        break;
                case "Start_Game":
                        gameField.startEvent();
                        event.startTimer("Select_Special", 1000);
                        event.startTimer("Check_Ball", 3000);
                        event.startTimer("Game_End", 180000);
                        break;
                case "Game_End":
                        event.startTimer("Warp_Out", 5000);
                        gameField.endEvent();
                        break;
                case "Warp_Out":
                        kick();
                        break;
                case "Check_Ball":
                        gameField.eventAction(3);
                        event.startTimer("Check_Ball", 3000);
                        break;
                case "Select_Special":
                        gameField.eventAction(1);
                        event.startTimer("Start_Special", 5000);
                        break;
                case "Start_Special":
                        gameField.eventAction(2);
                        event.startTimer("Select_Special", 30000);
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

