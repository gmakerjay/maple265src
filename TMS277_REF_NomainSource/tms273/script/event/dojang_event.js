// Created by MetaMS
// Event: Dojang

let dojang = require("dojang_spawn");
let eLog = require("extend_log");

let EXIT_MAP = 925020002;

let FIELD_RESET = 925070000;

let STAGE_START = 925070100;
let STAGE_END = 925080000;

let TOTAL_TIME = 901;


let actStage;

let timeCountDown;
let stopEndCount;

function init(attachment) {
        event.initMap(FIELD_RESET);
        for (let i = 0; i < 100; i++) {
                event.initMap(STAGE_START + i * 100);
        }
        actStage = attachment;
        timeCountDown = TOTAL_TIME;

        actStage.updateQuestRecordEx(3847, "Nenter", util.getStringDate("yy/MM/dd/HH/mm"));
        actStage.updateQuestRecordEx(3847, "NFloor", "0");
        actStage.updateQuestRecordEx(3847, "NResult", "start");
        actStage.startQuest(7279, "1");//Quest Name:Unknown
        /* Update Quest RecordEx | Id:65197 | Name: Unknown | Data: "" */
        actStage.updateQuestRecordEx(65197, "");
        eLog.addEventLog(actStage, util, 7216, 1);
        actStage.setEvent(event);
        let portalId = parseInt(Math.random() * 5);
        actStage.changeMap(FIELD_RESET, portalId);
}

function mobDied(mob) {
        let map = event.getMap(mob.getMapId());
        dojang.respawn(mob, map);
        let diff = map.getId() - FIELD_RESET;
        let ss = parseInt(diff / 100);
        if (map.getActiveMobCount() <= 0) {
                event.setVariable("Stage_" + ss, "1");

                map.setReactorState("door", 1, 0);
                actStage.showScriptProgressMsg("透過傳送點前往下一個關卡後，過關紀錄才會登錄在排名。");
                actStage.showScriptProgressMsg("已擊敗對手，計時器將暫停計時10秒。");
                map.playSoundEffect("Dojang/clear");
                map.showScreenAutoLetterBox("dojang/end/clear");

                stopEndCount = 10;
                event.stopTimer("CountDown");
                event.startTimer("StopTick", 1000);
                actStage.showTimer(true, timeCountDown, 10);
        }
}

function playerDisconnected(stage) {
        stage.setEvent(null);
        event.destroyEvent();
}

function playerChangedMap(stage, destination) {
        if (destination.getId() == FIELD_RESET) {
                stage.setDojangClock(timeCountDown, 0);
                stage.showTimer(true, timeCountDown, 120);
                event.startTimer("StartUp", 2 * 60 * 1000);
        } else if (destination.getId() >= STAGE_START && destination.getId() <= STAGE_END) {
                let diff = destination.getId() - FIELD_RESET;
                let ss = parseInt(diff / 100 - 1);
                event.stopTimer("StopTick");//停止咕咕鐘倒計時
                event.startTimer("CountDown", 1000);
                let logTime = TOTAL_TIME - timeCountDown;
                stage.showSystemMessage(logTime)
                if (ss > 0) {
                        //Gain Point
                        stage.showSystemMessage("10點數已獲得。");
                        let point = stage.getIntQuestRecordEx(3887, "point") + 10;
                        stage.updateQuestRecordEx(3887, "point", point);

                        //Update log
                        let logFloor = stage.getIntQuestRecordEx(100464, "Floor");
                        let oldTime = stage.getIntQuestRecordEx(100464, "Time");
                        if (ss > logFloor) {
                                stage.updateQuestRecordEx(100464, "Floor", ss);
                                stage.updateQuestRecordEx(100464, "Time", logTime);
                                stage.showSystemMessage("已達成本週最高紀錄。");
                        }
                        if (ss == logFloor && oldTime < logTime) {
                                stage.updateQuestRecordEx(100464, "Time", logTime);
                        }
                        stage.updateDoJangLog(ss, logTime);

                        stage.updateQuestRecordEx(3847, "NFloor", ss);
                        stage.updateQuestRecordEx(3847, "NTime", logTime);
                }
                stage.setDojangClock(TOTAL_TIME, logTime);
                stage.showTimer(false, timeCountDown, 0);
        } else {
                stage.setEvent(null);
                event.destroyEvent();
        }
}

function kick() {
        actStage.setEvent(null);
        actStage.changeMap(EXIT_MAP, 0);
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "StopTick":
                        stopEndCount = Math.max(0, stopEndCount - 1);
                        if (stopEndCount <= 5) {
                                actStage.showScriptProgressMsg(stopEndCount == 0 ? "咕咕鐘重新開始。" : stopEndCount + "秒後咕咕鐘將會重新開始。");
                        }
                        if (stopEndCount <= 0) {
                                actStage.showTimer(false, timeCountDown, 0);
                                event.startTimer("CountDown", 1000);
                        } else {
                                event.startTimer("StopTick", 1000);
                        }
                        break;
                case "CountDown":
                        timeCountDown = Math.max(0, timeCountDown - 1);
                        if (timeCountDown <= 0) {
                                kick();
                        } else {
                                event.startTimer("CountDown", 1000);
                        }
                        break;
                case "StartUp":
                        let portalId = parseInt(Math.random() * 5);
                        actStage.changeMap(STAGE_START, portalId);
                        break;
                case "kick":
                        kick();
                        break;
        }
}

function deinit() {
        actStage.setEvent(null);
}