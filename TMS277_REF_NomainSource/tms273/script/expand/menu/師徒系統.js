/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 師徒系統 31629595
 **/
let log = require('check_log');
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var ttt1 = "#fEffect/BasicEff/MainNotice/maple9th/Appear/9#";
var wi1 = "#fUI/SoulUI.img/DungeonMinimap/BtMaxi/pressed/0#";
var wi2 = "#fUI/RunnerGame.img/RunnerGameUI/UI/BtClose/normal/0#";
var wi3 = "#fUI/piggyBarMinigame.img/crunch/1#";
var eff1 = "#fEffect/CharacterEff/1112924/0/0#";
var eff2 = "#fEffect/CharacterEff/1112925/0/0#";
var eff3 = "#fEffect/CharacterEff/1112924/0/0#";

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
//玩家最多可以帶的”未出師“的數量
var maxNoGra = 10;
//拜師等級
var minLevel = 30;
var maxLevel = 275;

//每個階段需要的出師數量
var upLevelNum = [2, 5, 10, 15, 20, 25];
//每個階段的稱號
var upLevelTitle = ["初為人師", "為人師表", "循循善誘", "誨人不倦", "厚得樹人", "桃李天下"];
//師傅每日獎勵
var teacherItemList = Array(
    Array(//2
        Array(5062009, 3), //紅
        Array(5062500, 3), //綠
        Array(5062020, 1), //六
        Array(5062010, 1), //鏡
        Array(2432206, 1), //X
    //    Array(4001839, 20), //星
        Array(4001714, 5), //百萬
    //    Array(2637954, 3), //1E突破
    ),
    Array(//5
        Array(5062009, 5), //紅
        Array(5062500, 5), //綠
        Array(5062020, 2), //六
        Array(5062010, 2), //鏡
        Array(2432206, 1), //X
    //    Array(4001839, 50), //星
        Array(4001714, 5), //百萬
     //   Array(2637954, 5), //1E突破
//    Array(
    ),
    Array(//10
        Array(5062009, 5), //紅
        Array(5062500, 5), //綠
        Array(5062020, 3), //六
        Array(5062010, 3), //鏡
        Array(2432206, 1), //X
    //    Array(4001714, 80), //星
        Array(4001714, 5), //百萬
    //    Array(2637954, 10), //1E突破
    ),
    Array(//15
        Array(5062009, 8), //紅
        Array(5062500, 8), //綠
        Array(5062020, 3), //六
        Array(5062010, 3), //鏡
        Array(2432206, 1), //X
    //    Array(4001839, 100), //星
        Array(4001714, 5), //百萬
    //    Array(2637954, 12), //1E突破
        Array(2636883, 2), // 抵用
    ),
    Array(//20
        Array(5062009, 10), //紅
        Array(5062500, 10), //綠
        Array(5062020, 4), //六
        Array(5062010, 4), //鏡
        Array(2432206, 1), //X
    //    Array(4001839, 120), //星
        Array(4001714, 8), //百萬
        Array(2472000, 2), //白金錘
        Array(2636883, 5), // 抵用
   //     Array(2637954, 15), //1E突破
        Array(4009548, 50), // 碎片
    ),
    Array(//25
        Array(5062009, 12), //紅
        Array(5062500, 12), //綠
        Array(5062020, 5), //六
        Array(5062010, 5), //鏡
        Array(2432206, 2), //X
   //     Array(4001839, 150), //星
        Array(4001714, 8), //百萬
        Array(2472000, 2), //白金錘
        Array(2636883, 10), // 抵用
    //    Array(2637954, 25), //1E突破
        Array(2636884, 4), // 碎片
    )
);

//解除關係需要的冒險幣
var byeMoney = 100000000;
//出師等級
var graduateLevel = 276;
var graduateReward = Array(
//    Array(2637954, 10), //30億破功石
    Array(4001715, 5), //5E
    Array(2432206, 10) //X卷自選

);

var nowLevelIndex = -1;

var myStudentInfo = getStudentInfo();
var myTeacherInfo = getTeacherInfo();
start();

function start() {


    var text = "";
    text += "#d" + wi3 + " 升級所需出師人數:";
    for (var i = 0; i < upLevelNum.length; i++) {
        text += "#r" + upLevelNum[i] + "#d - ";
    }
    text = text.substring(0, text.length - 2) + "\r\n";
    if (myStudentInfo != null) {
        for (var i = upLevelNum.length - 1; i >= 0; i--) {
            if (parseInt(myStudentInfo[0].get("graduatedNum") ? myStudentInfo[0].get("graduatedNum") : 0) >= upLevelNum[i]) {
                nowLevelIndex = i;
                break;
            }
        }
        text += "#d" + wi3 + " 教學等級 [ #r" + (nowLevelIndex + 1) + "#d ]，稱謂 [ #r" + upLevelTitle[nowLevelIndex] + "#d ]\r\n";
        text += "#d" + wi3 + " 您當前有 [ #r" + myStudentInfo.length + "#d ] 位徒弟";
        text += "   #d" + wi3 + " 已出師數 [ #r" + myStudentInfo[0].get("graduatedNum") + "#d ] 位徒弟\r\n";
    } else {
        text += "#d" + wi3 + " 您目前還沒有收徒哦！";
    }
    if (myTeacherInfo != null) {
        text += "#d" + wi3 + " 你的師父 [ #r" + myTeacherInfo[0].get("teacherName") + "#d ] #d" + wi3 + " 出師狀態 [ #r" + (myTeacherInfo[0].get("graduated") == 0 ? "未出師" : "已出師") + "#d ] \r\n";
    } else {
        text += "#d" + wi3 + " 你目前還沒有拜師哦！\r\n";
    }
    text += "#b#L0#" + wi2 + "怎樣拜師或收徒？\t#b#L4#" + wi2 + "師傅成就獎勵表查看#l\r\n\r\n";
    text += "  #e#d我是師傅              我是徒弟#n\r\n";
    text += "#b#L1#" + wi1 + " 我來帶徒弟拜師#l     " + "#L5#" + wi1 + " 我要進行出師儀式#l\r\n";
    text += "#L2#" + wi1 + " 我想查看/清理徒弟#l  " + "#L6#" + wi1 + " 我想離開師門#l\r\n";
    text += "#L3#" + wi1 + " 領取師傅每日獎勵#l  " + "#L7#" + wi1 + " 領取徒弟每日獎勵#l\r\n";
    // text += "#L99#" + wi1 + " 師徒每日副本#l  ";
    // if (player.isGm()) {
    text += "\t\t\t\t";
    // text += "#L99#" + wi1 + " 徒弟一條龍#l"
    // }
    var selected = npc.askMenu(text);
    if (selected == 10086) {
        stage.runScript("expand/menu/百寶功能")
    } else {
        switch (selected) {
            case 0:
                //怎樣拜師或收徒？

                text = head;
                text += icon + " #d#e如何拜師？#n#k\r\n";
                text += "\t等級 " + minLevel + "~" + maxLevel + " 級的玩家與符合收徒的玩家組隊，由師傅擔任隊長，在我這裏進行拜師儀式，徒弟只能同時拜一位玩家為師，如果自行取消師徒關係，需要 #r1#k 天後才能拜新的師傅。\r\n";
                text += icon + " #d#e如何收徒？#n#k\r\n";
                text += "\t等級大於 #r250#k 級的玩家，武器突破20億，與符合拜師的玩家組隊，由師傅擔任隊長，在我這裏進行拜師儀式，每位師傅同時最多可收取 #r5#k 名徒弟。\r\n";
                text += icon + " #d#e如何出師？#n#k\r\n";
                text += "\t玩家等級大於 #r265#k 級時就可以出師了，才可以#b#e單人#n#k在我這裏進行出師儀式。出師后，玩家將獲得出師獎勵。\r\n";
                text += icon + " #d#e什麼是師徒獎勵？#n#k\r\n";
                text += "\t當徒弟等級大於 #r" + graduateLevel + "#k 級時，可以來我這裏出師。\r\n";
                npc.say(text);
                stage.runScript("expand/menu/師徒系統")
                break;
            case 99:
                //怎樣拜師或收徒？

                stage.runScript('expand/menu/師徒副本入口');
                break;

            case 1:
                if (stage.getLevel() >= 250 && (myStudentInfo == null || (myStudentInfo.length - parseInt(myStudentInfo[0].get("graduatedNum") )) < maxNoGra)) {
                    //帶人拜師
                    let toDrop = stage.getItemBySlot(-1, -11);
                    if (toDrop == null) {
                        npc.say("請裝備武器！");
                    } else if (party == null || stage.getCharacterId() != party.getLeaderId() || party.getMembersCount() != 2) {
                        npc.say("請滿足以下條件再來找我吧！\r\n#d1.您需要與您想收的徒弟進行組隊！\r\n2.隊伍只有你們兩人\r\n3.需要您是隊長！\r\n4.徒弟等級為 #r" + minLevel + " ~ " + maxLevel);
                    } else {
                        var members = party.getLocalMembers();
                        var myIndex = -1;
                        var studentIndex = -1;
                        for (var i = 0; i < members.length; i++) {
                            if (members[i].getCharacterId() == stage.getCharacterId()) {
                                myIndex = i;
                                break;
                            }
                        }
                        if (myIndex == 0) {
                            studentIndex = 1;
                        } else {
                            studentIndex = 0;
                        }
                        //studentIndex = 0;
                        var YN = npc.askYesNo("#d您是否確定想收 #r" + members[studentIndex].getCharacterName() + " #d為徒？");
                        if (YN == 1) {
                            if (members[studentIndex].getLevel() >= minLevel && members[studentIndex].getLevel() <= maxLevel) {
                                //需要查詢目標玩家是否有師傅
                                var sql = "select * from jili_teacher where studentAccId = '" + members[studentIndex].getAccountId() + "'";
                                var push = db.select(sql);
                                if (push.length > 0) {
                                    npc.say("#d你想要收 #r" + members[studentIndex].getCharacterName() + " #d為徒,首先得問問他的師傅的意見吧？");
                                } else {
                                    util.broadcastNoticeWithoutPrefix("[師徒系統]: 祝賀 " + members[studentIndex].getCharacterName() + " 拜入 " + members[myIndex].getCharacterName() + " 門下", 1);
                                    db.insert("INSERT INTO `jili_teacher` (`teacherName`, `studentName`,`graduated`, `teacherAccId`, `studentAccId`, studentId) VALUES ('" + members[myIndex].getCharacterName() + "', '" + members[studentIndex].getCharacterName() + `','0', ${members[myIndex].getAccountId()}, ${members[studentIndex].getAccountId()}, ${members[studentIndex].getCharacterId()})`);
                                    npc.id(9900000).say("成功拜師！");
                                }

                            } else {
                                npc.id(9900000).say("#d對方等級不滿足#r(" + minLevel + " ~ " + maxLevel + ")#d！無法拜師！");
                            }
                        } else {
                            npc.id(9900000).say("真遺憾，想好了再來吧！");
                        }

                    }
                } else {
                    npc.id(9900000).say("#d您無法收徒弟！原因可能：\r\n1.最多同時帶 #r" + maxNoGra + " #d個未出師徒弟！\r\n2.您的等級未到250級");
                }
                break;
            case 2:
                //清理查看門戶
                text = "#d以下是你的徒弟信息(如果需要清理門戶,請點擊對應徒弟):\r\n\r\n"
                try {
                    for (var i = 0; i < myStudentInfo.length; i++) {
                        text += "#L" + i + "# #d" + myStudentInfo[i].get("studentName") + " #b等級:" + myStudentInfo[i].get("studentLevel") + " " + (myStudentInfo[i].get("graduated") == 0 ? " #r未出師" : " #g已出師") + " \r\n"
                    }
                    selected = npc.id(9900000).askMenu(text);
                    if (myStudentInfo[selected].get("graduated") == 1) {
                        npc.id(9900000).say("不能與已出師的徒弟解除關係哦！");
                    } else {
                        var YN = npc.id(9900000).askYesNo("#b你是否確認與 #r" + myStudentInfo[selected].get("studentName") + " #b解除師徒關係？\r\n需要花費冒險幣 #r" + byeMoney);
                        if (YN == 1) {
                            if (stage.hasMesos(byeMoney)) {
                                stage.loseMesos(byeMoney);
                                db.delete("delete from jili_teacher where studentAccId = '" + myStudentInfo[selected].get("studentAccId") + "'");
                                util.broadcastNoticeWithoutPrefix("[師徒系統]: " + myStudentInfo[selected].get("studentName") + " 練功不勤！被 " + stage.getCharacterName() + " 逐出師門！", 1);
                                npc.id(9900000).say(myStudentInfo[selected].get("studentName") + "已離開師門");
                            } else {
                                npc.id(9900000).say("你的錢不夠哦！");
                            }
                        } else {
                            npc.id(9900000).say("再想想吧！");
                        }
                    }
                } catch (e) {
                    npc.say("沒有找到徒弟信息");
                }

                break;
            case 3:
                //老師每日獎勵
                try {
                    if (nowLevelIndex == -1) {
                        npc.id(9900000).say("你的教師等級不足，沒有獎勵！");
                    } else {
                        if (nowLevelIndex == 1) {
                            getTaskCount(1, 18);
                        } else if (nowLevelIndex == 3) {
                            getTaskCount(1, 19);
                        }
                        if (stage.getFreeSlot(1) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(2) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(3) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(4) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(5) < teacherItemList[nowLevelIndex].length) {
                            npc.id(9900000).say("請清理背包");
                        } else if (log.getEventValue(stage, db, "老師每日福利") > 0) {
                            npc.id(9900000).say("你今天已經領過了！");
                        } else {
                            var str = "#b恭喜你獲得今日#r【" + upLevelTitle[nowLevelIndex] + "】#b教師福利：\r\n";
                            for (var i = 0; i < teacherItemList[nowLevelIndex].length; i++) {
                                str += "\r\n#v" + teacherItemList[nowLevelIndex][i][0] + "# x " + teacherItemList[nowLevelIndex][i][1] + "\r\n"
                                stage.gainItem(teacherItemList[nowLevelIndex][i][0], teacherItemList[nowLevelIndex][i][1]);
                            }
                            log.addEventValue(stage, db, "老師每日福利", 1, 1);
                            npc.id(9900000).say(str);
                        }
                    }
                } catch (e) {
                    npc.id(9900000).say("不滿足領取要求！");
                }
                break;
            case 4:
                //老師每日獎勵查看
                text = head;
                //text = icon + " #d#e#n#k\r\n";
                text += icon + " #r#e[初為人師]：(2個出師徒弟或以上)#b";
                for (var i = 0; i < teacherItemList[0].length; i++) {
                    text += " #v" + teacherItemList[0][i][0] + "# x " + teacherItemList[0][i][1];
                }
                text += "\r\n";
                text += icon + " #r#e[為人師表]：(5個出師徒弟或以上)#b";
                for (var i = 0; i < teacherItemList[1].length; i++) {
                    text += " #v" + teacherItemList[1][i][0] + "# x " + teacherItemList[1][i][1];
                }
                text += "\r\n";

                text += icon + " #r#e[循循善誘]：(10個出師徒弟或以上)#b";
                for (var i = 0; i < teacherItemList[2].length; i++) {
                    text += " #v" + teacherItemList[2][i][0] + "# x " + teacherItemList[2][i][1];
                }
                text += "\r\n";

                text += icon + " #r#e[誨人不倦]：(15個出師徒弟或以上)#b";
                for (var i = 0; i < teacherItemList[3].length; i++) {
                    text += " #v" + teacherItemList[3][i][0] + "# x " + teacherItemList[3][i][1];
                }
                text += "\r\n";

                text += icon + " #r#e[厚得樹人]：(20個出師徒弟或以上)#b";
                for (var i = 0; i < teacherItemList[4].length; i++) {
                    text += " #v" + teacherItemList[4][i][0] + "# x " + teacherItemList[4][i][1];
                }
                text += "\r\n";

                text += icon + " #r#e[桃李天下]：(25個出師徒弟或以上)#b";
                for (var i = 0; i < teacherItemList[5].length; i++) {
                    text += " #v" + teacherItemList[5][i][0] + "# x " + teacherItemList[5][i][1];
                }

                text += "\r\n";
                text += "\r\n";
                npc.id(9900000).say(text);
                stage.runScript("expand/menu/師徒系統")
                break;
            case 5:
                //出師
                if (myTeacherInfo == null) {
                    npc.say("#b你連師傅都沒有，談什麼出師？");
                } else if (stage.getLevel() < graduateLevel) {
                    npc.say("#b加油修鍊吧！達到 #r" + graduateLevel + " #b級,就可以出師獲得獎勵啦！");
                } else if (myTeacherInfo[0].get("graduated") == 1) {
                    npc.say("#b你已經進行了出師禮儀，並且領取了獎勵，不可再次領取！");
                } else if (log.getPQLog(stage, db, "出師獎勵")) {
                    npc.say("#b你已經進行了出師禮儀，並且領取了獎勵，不可再次領取！");
                } else if (log.getEventValue(stage, db, "出師獎勵") > 0) {
                    npc.say("#b你已經進行了出師禮儀，並且領取了獎勵，不可再次領取！");
                    return;
                } else if (stage.getFreeSlot(1) < graduateReward.length || stage.getFreeSlot(2) < graduateReward.length || stage.getFreeSlot(3) < graduateReward.length || stage.getFreeSlot(4) < graduateReward.length || stage.getFreeSlot(5) < graduateReward.length) {
                    npc.say("#b請清理背包,至少需要 " + graduateReward.length + " 格空餘。");
                    // } else if (player.getPQLog("一條龍組隊") < 1) {
                    //     npc.say("徒弟完成一條龍的次數小於1，無法出師！");
                } else {
                    //領獎
                    var ttt = "#b恭喜你出師!這是你師傅給你準備的禮物！\r\n";
                    for (var i = 0; i < graduateReward.length; i++) {
                        stage.gainItem(graduateReward[i][0], graduateReward[i][1]);
                        ttt += "#v" + graduateReward[i][0] + "##z" + graduateReward[i][0] + "# x " + graduateReward[i][1] + "\r\n"
                    }

                    log.addEventValue(stage, db, "出師獎勵", 1, -1);
                    log.addPQLog(stage, db, "出師獎勵", 10, -1);
                    db.update("update jili_teacher set graduated = 1 where studentAccId = '" + stage.getAccountId() + "'");
                    utiladcastNoticeWithoutPrefix("[師徒系統]: " + myTeacherInfo[0].get("teacherName") + " 的徒弟 " + stage.getCharacterName() + " 刻苦修鍊！成功出師！", 1);
                    npc.say(ttt);
                }

                break;
            case 6:
                //離開師門
                if (myTeacherInfo != null) {
                    if (myTeacherInfo[0].get("graduated") == 0) {
                        text = "#d是否確定離開你的師父 [ #r" + myTeacherInfo[0].get("teacherName") + "#d ] #r(需要金幣:" + byeMoney + ")?\r\n";
                        var YN = npc.askYesNo(text);
                        if (YN == 1) {
                            if (stage.hasMesos(byeMoney)) {
                                stage.loseMesos(byeMoney);
                                db.delete("delete from jili_teacher where studentAccId = '" + stage.getAccountId() + "'");
                                util.broadcastNoticeWithoutPrefix("[師徒系統]: " + myTeacherInfo[0].get("teacherName") + " 誤人子弟！ " + stage.getCharacterName() + " 憤憤的離開了師門！", 1);
                                npc.say("已離開師門");
                            } else {
                                npc.say("你的錢不夠哦！");
                            }
                        } else {
                            npc.say("好好考慮清楚吧！");
                        }
                    } else {
                        text = myTeacherInfo[0].get("teacherName") + "教導你畢業，可不能忘本哦！"
                        npc.say(text);
                    }
                } else {
                    text = "#d你目前還沒有拜師哦！\r\n";
                    npc.say(text);
                }
                break;
            case 7:
                if (myTeacherInfo == null) {
                    npc.say("抱歉..你還沒有拜師哦");
                    return;
                }
                let master_num = g_master(myTeacherInfo[0].get("teacherAccId"));
                if (master_num != null) {
                    for (var i = upLevelNum.length - 1; i >= 0; i--) {
                        if (parseInt(master_num[0].get("graduatedNum")) >= upLevelNum[i]) {
                            nowLevelIndex = i;
                            break;
                        }
                    }
                    if (nowLevelIndex == 1) {
                        getTaskCount(1, 18);
                    } else if (nowLevelIndex == 3) {
                        getTaskCount(1, 19);
                    }
                    if (nowLevelIndex < 0) {
                        npc.say("你的徒弟等級不足，沒有獎勵！");
                        return;
                    }
                    if (stage.getFreeSlot(1) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(2) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(3) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(4) < teacherItemList[nowLevelIndex].length || stage.getFreeSlot(5) < teacherItemList[nowLevelIndex].length) {
                        npc.say("請清理背包");
                    } else if (log.getEventValue(stage, db, "徒弟每日福利") > 0) {
                        npc.say("你今天已經領過了！");
                    } else {
                        var str = "#b恭喜你獲得今日#r【" + upLevelTitle[nowLevelIndex] + "】#b教師福利：\r\n";
                        for (var i = 0; i < teacherItemList[nowLevelIndex].length; i++) {
                            str += "\r\n#v" + teacherItemList[nowLevelIndex][i][0] + "# x " + teacherItemList[nowLevelIndex][i][1] + "\r\n"
                            stage.gainItem(teacherItemList[nowLevelIndex][i][0], teacherItemList[nowLevelIndex][i][1]);
                        }
                        log.addEventValue(stage, db, "徒弟每日福利", 1, 1);
                        npc.say(str);
                    }
                }
                break;

        }
    }
}

//獲取成就次數
function getTaskCount(count, taskId) {
    stage.showSystemMessage("【成就系統】:成就編號:" + taskId + " 完成次數+1")
    db.update("update jili_task_character set taskCount = taskCount + " + parseInt(count) + " where taskId = '" + taskId + "' and characterId = '" + stage.getCharacterId() + "'");
}


function getTeacherInfo() {
    var sql = "select * from jili_teacher where studentAccId = '" + stage.getAccountId() + "'";
    var push = db.select(sql);
    if (push.length > 0) {

        return push;
    } else {
        return null;
    }
}

function g_master(tAccId) {
    var sql =  `SELECT
  jt.*,
  c.LEVEL AS studentLevel,
  jt.studentId AS charactorId,
  jt.studentAccId AS studentCId,
  ( SELECT count( 0 ) FROM jili_teacher WHERE teacherAccId = ${tAccId} AND graduated = 1 ) AS graduatedNum 
FROM
  jili_teacher jt
  LEFT JOIN character_stat c ON studentId = c.id
WHERE
  jt.teacherAccId = ${tAccId}`


    // var sql = "select jt.*,c.level as studentLevel, c.id as charactorId,c.accountid as studentCId, (select count(0) from jili_teacher where teacherAccId = '" + tAccId + "' and graduated = 1) as graduatedNum from jili_teacher jt left join `character` c on studentAccId = c.`account_id`  where jt.teacherAccId = '" + tAccId + "';"
    var push = db.select(sql);
    if (push.length > 0) {
        return push;
    } else {
        return null;
    }
}

function getStudentInfo() {
    var sql = "select jt.*,  jt.studentAccId AS studentCId, cs.level as studentLevel,  jt.studentId AS charactorId, (select count(0) from jili_teacher where teacherAccId = '" + stage.getAccountId() + "' and graduated = 1) as graduatedNum from jili_teacher jt left join character_stat cs on jt.studentId = cs.id  where jt.teacherAccId = '" + stage.getAccountId() + "'"
    var push = db.select(sql);
    if (push.length > 0) {
        return push;
    } else {
        return null;
    }
}