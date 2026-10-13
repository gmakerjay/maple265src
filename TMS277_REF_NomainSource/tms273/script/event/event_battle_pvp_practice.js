// Created by MetaMS
// Event
// Battle PvP

let NOTICE_FINAL = -1;
let START_FINAL = -2;
let FINAL_TIME_OUT = -3;

let EXIT_MAP = 921174008;
let GAME_MAP = 921174900;
let START_MAP = 921174007;

let members = [];
let countdown = 16;

function init(attachment) {
        members = attachment;
        event.initMap(GAME_MAP);
        for (let i = 0; i < members.length; i++) {
                members[i].cancelAllBuffStat();
                members[i].setEvent(event);
                members[i].changeMap(GAME_MAP, 0);
        }
        event.startTimer("Select_Check", 2000);
        event.startTimer("End_Game_Phase", 483 * 1000);
        event.startTimer("End_Game_Notice", 478 * 1000);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case GAME_MAP:
                        stage.showTimer(8 * 60);
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        break;
        }
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), true);
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
                case "Select_Check":
                        countdown--;
                        if (countdown > 0) {
                                gameField.eventAction(countdown);
                                event.startTimer("Select_Check", 1000);
                        } else if (countdown == 0) {
                                gameField.eventAction(0);
                                gameField.startEvent();
                        }
                        break;
                case "End_Game_Notice":
                        gameField.eventAction(NOTICE_FINAL);
                        break;
                case "End_Game_Phase":
                        //Warp to top
                        for (let i = 0; i < members.length; i++) {
                                members[i].showTimer(60);
                                members[i].revival(100);
                        }
                        gameField.eventAction(START_FINAL);
                        event.startTimer("Game_End", 5000);
                        break;
                case "Game_End":
                        event.startTimer("Warp_Out", 3000);
                        break;
                case "Warp_Out":
                        gameField.endEvent();
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
