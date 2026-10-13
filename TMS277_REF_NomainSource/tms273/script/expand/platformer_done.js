// Created by MetaMS
// Event:Platformer

let btl = [[20, 30, 50], //1
        [20, 30, 50], //2
        [20, 30, 50], //3
        [10, 30, 50], //4
        [20, 60, 100], //5
        [15, 45, 75], //6
        [30, 90, 180], //7
        [15, 45, 75], //8
        [20, 60, 100], //9
        [35, 105, 175], //10

        [30, 90, 150], //11
        [20, 30, 100], //12
        [25, 75, 125], //13
        [15, 45, 75], //14
        [15, 45, 75], //14
        [20, 60, 100], //16
        [20, 60, 100], //17
        [120, 200, 300], //18
        [40, 120, 200], //19
        [50, 150, 250], //20

        [30, 90, 150], //21
        [30, 90, 150], //22
        [30, 90, 150], //23
        [30, 90, 150], //24
        [40, 120, 200], //25
        [40, 120, 200], //26
        [60, 180, 300], //27
        [60, 180, 300], //28
        [35, 105, 175], //29
        [30, 90, 150], //30


        [30, 90, 150], //31
        [15, 45, 75], //32
        [60, 180, 300], //33
        [15, 45, 75], //34
        [60, 180, 300], //35
        [40, 120, 200], //36
        [40, 120, 200], //37
        [45, 135, 225], //38
        [35, 105, 175], //39
        [540, 570, 600]];

let nowSel = parseInt(stage.getQuestData(34502));

let questId = getPlatformerQuestId(nowSel);

let nowTime = new Date().getTime();

let event = stage.getEvent("platformer");
if (event != null) {
        let st = event.getVariable("st");
        let br = (nowTime - st) / 1000;
        let stc = btl[nowSel - 1];
        let cs = 0;
        if (br < stc[0]) {
                cs = 3;
        } else if (br < stc[1]) {
                cs = 2;
        } else if (br < stc[2]) {
                cs = 1;
        }
        stage.updateQuestRecordEx(18838, "hack", "0");
        if (stage.getIntQuestRecordEx(18838, "stage") < nowSel) {
                stage.updateQuestRecordEx(18838, "stage", String(nowSel));
                stage.updateQuestRecordEx(18838, "stageT", util.getStringDate("yyyyMMddHHmm"));
        }
        stage.updateQuestRecordEx(18870, "timeSum", "0");
        stage.updateQuestRecordEx(18870, "timeSumT", util.getStringDate("yyyyMMddHHmm"));

        stage.updateQuestRecordEx(questId, "isClear", "1");
        stage.updateQuestRecordEx(questId, "br", String(br));//時間
        stage.updateQuestRecordEx(questId, "cs", String(cs));//星星
        if (!"1".equals(stage.getQuestRecordEx(questId, "first"))) {
                stage.updateQuestRecordEx(questId, "first", "1");
        }
        stage.showPlatformerTimer(3, -1, 0, 34500);
        stage.updateQuestRecordEx(34500, "time", "0");
        stage.updateQuestRecordEx(34500, "type", "0");
        stage.updateQuestRecordEx(500651, "1", String(Math.floor(nowSel / 5)));

        let starSum = 0;
        for (let i = 18839; i <= 18879; i++) {
                starSum += stage.getIntQuestRecordEx(i, "cs");
        }
        stage.updateQuestRecordEx(18869, "starSum", String(starSum));
        stage.updateQuestRecordEx(18869, "starSumT", util.getStringDate("yyyyMMddHHmm"));

        dir.setInGameCurNodeEventEnd(true);
        dir.lockUI().setInGameDirectionMode();
        dir.removeAdditionalEffect();
        dir.setStandAloneMode(true);

        eff.uol("monsterPark/clearF").delay(-1).showScreenAutoLetterBox();
        eff.uol("Sound/MiniGame.img/prize").volume(100).playSoundEffect();
        stage.showWeatherEffectNotice("已通關，前往大廳。", 212, 2000, false);
        dir.setDelay(100);
        stage.setUserEmotionLocal(10, 3000, false);
        stage.showScriptProgressMsg(stage.getCharacterName() + "以" + cs + "顆星通關！");
        eff.uol("Sound/MiniGame.img/Catch").volume(100).playSoundEffect();
        usr.uol("Effect/CharacterEff.img/12thMiniGame/getMesso2").showAvatarOriented();
        dir.setDelay(2400);

        dir.block().setInGameDirectionMode();
        dir.setStandAloneMode(false);
}
stage.changeMap(993001000, 0);

function getPlatformerQuestId(nowSel) {
        switch (nowSel) {
                case 31:
                        return 18878;
                case 32 :
                        return 18879;
                case 33 :
                        return 18880;
                case 34:
                        return 18881;
                case 35 :
                        return 18882;
                case 36 :
                        return 18927;
                case 37:
                        return 18928;
                case 38:
                        return 18929;
                case 39:
                        return 18930;
                case 40:
                        return 18931;
                default:
                        return 18838 + nowSel
        }
}