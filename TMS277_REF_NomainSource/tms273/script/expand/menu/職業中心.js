/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var eff3 = "#fEffect/CharacterEff/1112924/0/0#";
var eff4 = "#fEffect/CharacterEff/1112925/0/0#";//小紅心
let cat1 = "#fItem/Pet/5000000.img/alert/0#";
let cat2 = "#fItem/Pet/5000000.img/fly/0#";
let cat3 = "#fItem/Pet/5000000.img/cry/0#";
let tu1 = "#fItem/Cash/0501.img/05010045/effect/stand1/1#"
let tu2 = "#fItem/Cash/0501.img/05010002/effect/default/7#"
let tu3 = "#fUI/NameTag/medal/758/w#"
let tu4 = "#fEffect/SetEff.img/245/effect/28#"
let tu5 = "#fUI/NameTag/medal/758/e#"
let tu6 = "#fUI/NameTag/medal/758/c#"
let fy = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/1#";
let fy1 = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/2#";
let dz = "#fUI/GuildMark/Mark/Etc/00009020/1#";
let dz1 = "#fEffect/CharacterEff/1003393/1/0#";
let star = "#fEffect/CharacterEff/1051294/1/1#"
let eff2 = "#fEffect/CharacterEff/1112925/0/0#";
var eff1 = "#fEffect/CharacterEff/1112924/0/0#";
var ttt14 = "#fUI/UIWindow2.img/PotionPot/Effect/h075m075/5#";//阿拉丁
var a1 = "#fEffect/CharacterEff/1050334/2/2#"; //紅色星星
var a2 = "#fMap/MapHelper.img/weather/starPlanet/2#"; //藍色星星
var a3 = "#fEffect/CharacterEff/1050334/1/2#"; //大藍色星星
var a4 = "#fMap/MapHelper.img/weather/2011Haloween/1#"; //小蝙蝠
var a5 = "#fEffect/SetEff.img/245/effect/28#";//黑貓
var a6 = "#fItem/Cash/0501.img/05010002/effect/default/7#"//彩虹白雲
var a7 = "#fItem/Pet/5000000.img/alert/0#";// 灰貓
var a8 = "#fItem/Pet/5000000.img/fly/0#";//灰貓2
var a9 = "#fItem/Cash/0501.img/05010056/effect/walk1/5#"; //草地
var a10 = "#fItem/Cash/0501.img/05010045/effect/stand1/1#";//白雲
var a11 = "#fItem/Cash/0501.img/05010150/effect/default/3#"; //三隻猴子
var a12 = "#fMap/MapHelper.img/weather/starPlanet/2#"; //
var a13 = "#fMap/MapHelper.img/weather/2011Haloween/2#"; //小雪人
var a14 = "#fEffect/CharacterEff/1050334/2/2#"; //紅色星星
var a15 = "#fEffect/CharacterEff/1050334/1/2#";
var a16 = "#fMap/MapHelper.img/weather/2011Haloween/1#"; //小蝙蝠
var b1 = "#fItem/Cash/0501.img/05010010/effect/default/0#";//雙人相框
var b2 = "#fItem/Cash/0501.img/05010011/effect/default/0#";//單人相框
var b3 = "#fItem/Pet/5000837.img/stand0/0#";//
var a17 = "#fItem/Pet/5000152.img/sleep/5#";//
var b4 = "#fItem/Cash/0501.img/05010045/effect/stand1/1#";//
var b5 = "#fItem/Pet/5001016.img/stand0/0#";//caihonma
var b6 = "#fItem/Pet/5001016.img/jump/0#";//caihongma2
var b7 = "#fMap/MapHelper.img/weather/thankyou/4#"; //
var a11 = "#fEffect/CharacterEff/1082565/0/0#";//灰色兔子
var c11 = "#fEffect/CharacterEff/1082565/4/0#";//粉色兔子
var c12 = "#fEffect/CharacterEff/1082565/5/0#";//粉色兔子
var d6 = "#fItem/Pet/5000212.img/stand0/0#";//紅色惡魔
var d7 = "#fItem/Pet/5000213.img/stand0/0#";//藍色惡魔
var d8 = "#fItem/Pet/5000214.img/stand0/0#";//黃色惡魔
var d9 = "#fItem/Pet/5000707.img/stand0/0#";//冰騎士
var e3 = "#fUI/UIWindow2.img/MobGage/Mob/9101078#"//火焰狼
var e4 = "#fUI/UIWindow2.img/MobGage/Mob/8800002#";//"扎昆""8644011
var e5 = "#fUI/UIWindow2.img/MobGage/Mob/8880110#";//黛米安
var a20 = "#fUI/UIWindow2.img/MobGage/Mob/8880110#";//黛米安
var a21 = "#fUI/UIWindow2.img/MobGage/Mob/8880502#";//虛空之眼
var c13 = "#fItem/Pet/5000935.img/stand0/0#";//
var q1 = "#fUI/UIWindow8/mazeMiniMap/0/withParty/0#"
var q3 = "#fUI/piggyBarMinigame/crunch/2#"
var q4 = "#fUI/piggyBarMinigame/crunch/3#"


let log = require('check_log');
execute();

function execute() {
    var selStr = "#e#b#k#e#k         		 " + q1 + "轉職中心" + q1 + "\r\n";


    selStr += " #L1##d" + q4 + "快速轉職#l　#L3#" + q4 + "一鍵滿技#l　#L4#" + q4 + "前置技能#l\r\n\r\n";
    selStr += " #L5##d" + q4 + "真實符文#l　#L6#" + q4 + "六轉核心#l　#L7#" + q4 + "原初升級#l\r\n\r\n";
    selStr += " #L8##d" + q4 + "神秘升級#l　#L9#" + q4 + "鬼滅之刃#l\r\n\r\n";

    let selected = npc.askMenu(selStr);

    switch (selected) {
        case 1:
            stage.runScript("expand/change_job");
            break;
        case 2:
            stage.runScript("expand/五轉");
            break;
        case 3:
            stage.maxAllSkill();
            npc.say("一鍵滿技成功！")
            break;
        case 4:
            stage.runScript('expand/menu/技能點');
            break;
        case 5:
            if (stage.isQuestCompleted(1484) && stage.isQuestCompleted(38391)) {
                npc.meFlip().say("此任務已完成不能重複完成");
                return;
            }
            txt = "想開啟真實之力嗎？\r\n\r\n";
            txt += "需等級達到 260 才可以開啟\r\n\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            if (stage.getLevel() < 260) {
                npc.meFlip().say("抱歉..你的等級沒有達到260");
                return;
            }
            for (let i = 38391; i <= 38415; i++) {
                stage.completeQuest(i);
            }
            let quest = [36996, 64591, 34766, 38189, 67065, 68080, 504788];
            for (let i in quest) {
                stage.completeQuest(quest[i]);
            }
            stage.completeQuest(1484);
            stage.gainItem(1713000, 1);
            stage.gainItem(1713001, 1);
            npc.meFlip().say("開啟成功");
            break;
        case 6:
            if (stage.isQuestCompleted(1484) && stage.isQuestCompleted(38391)) {
                if (log.getPQLog(stage, db, '領取六轉核心') > 0) {
                    if (log.getPQLog(stage, db, '領取六轉核心每日2') > 0) {
                        npc.say('已領過')
                    } else {
                        log.addPQLog(stage, db, '領取六轉核心每日2');
                        stage.gainItem(4009548, 100)
                        stage.gainItem(2636884, 1)
                        npc.say('領取成功')
                    }
                } else {
                    log.addPQLog(stage, db, '領取六轉核心', 1, -1);
                    stage.gainItem(4009548, 100)
                    stage.gainItem(2636884, 10)
                    npc.say('領取成功')
                }
            } else {
                npc.say('請先完成六轉')
            }
            break;
        case 7:
            stage.runScript('expand/menu/裝備系統/原初升級')
            break;
        case 8:
            stage.runScript('expand/menu/裝備系統/神秘升級')
            break;
        case 9:
            stage.runScript('expand/menu/裝備系統/鬼滅之刃')
            break;
    }
}