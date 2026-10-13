// Created by MetaMS
// Server Tip

let stage;
let map;
let finishTime;
let FIELD_1 = 871000100;

function init(attachment) {
        event.initMap(FIELD_1);
        stage = attachment;
        event.setVariable("count", 0);
        stage.setEvent(event);
        finishTime = stage.getIntQuestRecordExShare(500767, "finishTime");
        stage.changeMap(FIELD_1, 0);
        if (finishTime <= 10000) {
                stage.addPopupSay(9400920, 5000, "#face0#目前正在最後的檢查中。即將完成，先做好前往新家的準備吧！", "", false);
        } else {
                event.startTimer("Down_10", finishTime - 10000);
        }
        event.startTimer("end", finishTime);
}

function playerDisconnected(player) {
        event.destroyEvent();
}

function playerChangedMap(player, destination) {
        if (destination.getId() != FIELD_1) {
                stage.setEvent(null);
                event.destroyEvent();
        } else {
                stage.showTimer(finishTime / 1000);
        }
}

function timerExpired(key) {
        switch (key) {
                case "Down_10":
                        stage.addPopupSay(9400920, 5000, "#face0#目前正在最後的檢查中。現在只剩下10秒了，先做好前往新家的準備吧！", "", false);
                        break;
                case "end":
                        stage.enterMyHome();
                        break;
                default:
                        break;
        }
}

function deinit() {
        stage.setEvent(null);
}