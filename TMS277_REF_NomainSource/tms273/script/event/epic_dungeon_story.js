// Created by MetaMS
// Quest Event: epic dungeon

let mapId;
let exitMap;
let tStage;
let time = 60;
let maxCount;

function init(attachment) {
        [tStage, mapId, exitMap] = attachment;
        event.initMap(mapId); //init indie map
        let map = event.getMap(mapId);
        map.reset();
        maxCount = map.getActiveMobCount();
        event.startTimer("kick", time * 60 * 1000);
        endTime = new Date().getTime() + time * 60 * 1000;
        tStage.setEvent(event);
        tStage.changeMap(mapId, 0);
}

function mobDied(mob) {
        let map = event.getMap(mapId);
        switch (mob.getDataId()) {
                default:
                        if (maxCount > 0) {
                                tStage.showScriptProgressMsg("消滅泰奴斯的手下：" + (maxCount - map.getActiveMobCount()) + " / " + maxCount);
                        }
                        if (map.getActiveMobCount() == 0) {
                                event.setVariable("CLEAR", "1");
                                switch (mapId) {
                                        case 993241100:
                                                map.blowWeather(5120245, "哼，暖身活動終於結束了。", 5);
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=1" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "1");
                                                break;
                                        case 993241200:
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=2" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "2");
                                                tStage.setMapTaggedObjectVisible("clearPortal", true, 0, 0);
                                                break;
                                        case 993241300:
                                                map.blowWeather(5120245, "別以為你們數量多就能擋得住我。", 5);
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=3" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "3");
                                                break;
                                        case 993241400:
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=4" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "4");
                                                tStage.setMapTaggedObjectVisible("clearPortal", true, 0, 0);
                                                break;
                                        case 993241500:
                                                map.blowWeather(5120245, "我就是太陽神米特拉，現在輪到你們的主人被燒成灰燼了！", 5);
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=5" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "5");
                                                break;
                                        case 993241600:
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=6" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "6");
                                                tStage.setMapTaggedObjectVisible("clearPortal", true, 0, 0);
                                                break;
                                        case 993241700:
                                                map.showScreenAutoLetterBox("Effect/HighMountain.img/effect/clearEff");
                                                map.playSoundEffect("Sound/SoundEff.img/HighMountainEff/clearEff");
                                                /* Update Quest RecordEx | Id:26205 | Name: Unknown | Data: "clearStage=6" */
                                                tStage.updateQuestRecordEx(26205, "clearStage", "7");
                                                tStage.setMapTaggedObjectVisible("clearPortal", true, 0, 0);
                                                event.startTimer("Stage_7", 2000);
                                                break;
                                }
                        }
                        break;
        }
}

function playerDisconnected(stage) {
        event.destroyEvent();
}

function playerChangedMap(stage, destination) {
        if (destination.getId() == mapId) {
                stage.showTimer((endTime - new Date().getTime()) / 1000);
        } else {
                removePlayer();
                event.destroyEvent();
        }
}

function removePlayer() {
        tStage.setEvent(null);
}

function kick() {
        removePlayer();
        tStage.changeMap(exitMap, 0);
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "kick":
                        kick();
                        break;
                case "Stage_7":
                        tStage.changeMap(993240016, 0);
                        break;
        }
}

function deinit() {
        tStage.setEvent(null);
}