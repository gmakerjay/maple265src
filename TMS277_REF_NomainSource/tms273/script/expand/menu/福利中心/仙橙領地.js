/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

date = new Date();
sec = date.getSeconds();
let week = date.getDay();
let day = date.getDate();
let hour = date.getHours();
let min = date.getMinutes();
let 賽季 = require('constant/賽季信息');
let log = require('check_log');

execute();

function execute() {

    if (hour == 0 && min <= 1) {
        npc.say("#d領地數據正在重載,請02分后再試")
    } else {

        if (parseInt(getServerKeyValue("S級地圖", "0")) < 11) {
            var LevelList = [
                //["S", 10],//
                ["A", 20],//
                ["B", 30],//
                ["C", 40],//
            ]
        } else {
            var LevelList = [
                //["S", 0],//
                ["A", 20],//
                ["B", 30],//
                ["C", 40],//
            ]
        }

        function getLevel() {
            let abc = 0;
            let t = -1, r = 0;
            for (let i = 0; i < LevelList.length; i++) {
                let weight = LevelList[i][1];
                let k = Math.log(Math.random()) / weight;
                if (k > t) {
                    t = k;
                    r = i;
                }
            }
            abc = LevelList[r][0];
            weight = LevelList[r][1];
            return abc;
        }

        let date = new Date();
        let sec = date.getSeconds();
        let week = date.getDay();
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let chance = rand(1, 1000000);
        //var lev = "C"
        var cailiao = 5
        var lev = getLevel();
        if (lev == "S") {
            cailiao = 20
        } else if (lev == "A") {
            cailiao = 15
        } else if (lev == "B") {
            cailiao = 10
        } else if (lev == "C") {
            cailiao = 5
        }
        let sql = "SELECT * FROM orange WHERE map = '" + map.getId() + "'";
        let push = db.select(sql);
        if (push.length == 0) {
            db.insert("INSERT INTO `orange` (`level`,`passDate`,`map`) VALUES ('" + lev + "',now(),'" + map.getId() + "')");
        } else {
            var dengji = push[0].get("level");
        }
        var qq882 = "#fUI/CashShop/CSBeauty/hairColor/Disable/3#";//粉色蝴蝶

        var qq986 = "#fUI/Logo.img/GradeCN/pressed/0#"//家人冒險島

        var qq987 = "#fUI/ChatEmoticon.img/1012/10120004/effect/4#"//大城西LOGO

        var qq988 = "#fUI/ChatEmoticon.img/1012/10120004/effect/6#"//大城西LOGO
        let text = "#d\t" + qq987 + "" + qq986 + "" + qq988 + "\r\n\t\t#e日常整點活動——<仙樹領地>\r\n#n#d"
        //text += "#L0#" + qq882 + "領取飛翔卷#v2635945##l\r\n"
        text += "----------------------已開啟---------------------\r\n"
        text += "#L1#" + qq882 + "傳送到我的領地#l"
        text += "     #L2#" + qq882 + "領取每日佔領卷#v2634736##l\r\n"
        text += "#L3#" + qq882 + "查看全服佔領狀態#l"
        text += "   #L4#" + qq882 + "查看玩法說明#l\r\n\r\n"
        let selected = npc.askMenu(text)
        switch (selected) {
            // case 0:
            //     if (player.getFreeSlots(2) > 1) {
            //         player.gainItem(2635945, 1)
            //         npc.say("領取成功！在摘橙子的時候夠不着可以使用哦！")
            //     } else {
            //         npc.say("你的背包空間不足！請保證消耗欄有1格以上空間！")
            //     }
            //     break
            case 1:
                if (log.getEventValue(stage, db, "已佔領") >= 1) {
                    let str1 = "" + qq986 + "\r\n";
                    let sql1 = "SELECT * FROM orange WHERE accID = '" + stage.getAccountId() + "'";
                    let push1 = db.select(sql1);
                    if (push.length != 0) {
                        var ditu = push1[0].get("map");
                        str1 += "#d你佔領的地圖為#b[#m" + ditu + "#]#d\r\n距離下次仙樹成熟還需#r" + (60 - min) + "#d分鐘"
                        str1 += "要傳送到你佔領的地圖嗎？"
                        YN1 = npc.askYesNo(str1);
                        if (YN1 == 1) {
                            stage.changeMap(ditu, 0)
                        }
                    }
                } else {
                    npc.say("你今日還沒有佔領仙樹領地,先使用#v2634736##z2634736#佔領吧！")
                }
                break
            case 2:
                let str2 = "" + qq986 + "\r\n";
                str2 += "#d每日可以免費領取15/20張(購買高級戰令)#v2634736##z2634736#\r\n如需更多可到點券商店購買！\r\n"
                str2 += `#r(該玩法第一禮拜無需購買戰令，每天可領取20)#d\r\n`;
                str2 += "要領取今日份的#v2634736#嗎？"
                YN1 = npc.askYesNo(str2);
                if (YN1 == 1) {
                    if (stage.getFreeSlot(2) > 1) {
                        if (log.getEventValue(stage, db, "免費佔領卷") < 1) {
                            log.addEventValue(stage, db, "免費佔領卷")
                            let cnt = 20;
                            if (是否購買高級版()) {
                                cnt = 20;
                            }
                            stage.gainItem(2634736, cnt, 1)
                            npc.say("領取成功！趕快使用#v2634736#去尋找屬於你的地圖吧！")
                        } else {
                            npc.say("你今天已經領取過啦！")
                        }
                    } else {
                        npc.say("你的背包空間不足！請保證消耗欄有1格以上空間！")
                    }
                }
                break;
            case 3:
                let txt = ""
                // var sql2 = " SELECT * FROM orange a WHERE open = '已佔領' ORDER BY id DESC ";
                var sql2 = "select  distinct(op.map_id) as map_id, o.map, o.accId, o.charaname, o.level as level, o.open  from orange_pos op left join orange o ON op.map_id = o.map";
                // var sql2 = "select * from orange order by id asc";
                var result = db.select(sql2);
                for (let i = 0; i < result.length; i++) {
                    if (result.length > 0) {
                        let open1 = result[i].get("open");
                        let level1 = result[i].get("level");
                        txt += "#L" + i + "##d地圖:#b#m" + result[i].get("map_id") + "#";

                        if (open1 == '已佔領') {
                            if (level1 && level1 != null) {
                                txt += "#d 等級:#b " + result[i].get("level");
                            }
                            txt += " #d佔領者:#b" + result[i].get("charaname") + "#d\r\n"
                        } else {
                            txt += "#d\r\n"
                        }

                    }
                }     //}
                let selection4 = npc.askMenu(txt);
                let map12 = result[selection4].get("map_id")
                let selection5 = npc.askYesNo("確定要傳送到#b#m" + map12 + "#嗎?")
                if (selection5 == 1) {
                    stage.changeMap(map12, 0);
                } else {
                    execute();
                }

                break

            case 4:
                let txt1 = "#e勞動節整點活動——<仙樹領地>活動說明:\r\n"
                txt1 += "#n#d每日0點過後,所有地圖會刷新為未佔領狀態\r\n"
                txt1 += "玩家可以在該界面領取#b#v2634736##z2634736##d每日可以領取10張\r\n"
                txt1 += "如需多的#v2634736#可以到點券商店購買\r\n"
                txt1 += "可佔領的地圖分為S/A/B/C等級\r\n"
                txt1 += "#r每天只能佔領一次地圖！#d\r\n"
                txt1 += "S/A/B/C等級4個等級的地圖佔領分別需要消耗#v2634736#20張/15張/10張/5張\r\n"
                txt1 += "佔領過的S/A/B/C等級地圖會在整點結出仙樹，4種等級地圖分別結出10~15個\r\n"
                txt1 += "佔領過的S/A/B/C等級地圖每天可打數上限數為50/40/30/30\r\n"
                // txt1 += "佔領過的S/A/B/C等級地圖會在整點結出仙樹，4種等級地圖分別結出10~15個\r\n"
                txt1 += "#r仙樹只會出現在1頻道#d\r\n"
                txt1 += "整點的0分到05分玩家可以在自己佔領的地圖打仙樹，仙樹將獲得各種獎勵\r\n"
                txt1 += "整點的05分到10分可以前往其他玩家的領取偷取仙樹，仙樹將獲得各種獎勵\r\n"
                // txt1 += "仙樹獲得的#v4002003##v2614002##v4001006##v1712006##v1712005##v1712004##v4021043##v4023026每日上限為50點\r\n"
                npc.next().say(txt1);
                execute();
                break

        }

    }

}

function setServerKeyValue(key, value) {
    try {
        //event.setVariable("lucklyParty", PQS[Math.floor(Math.random() * PQS.length)]);
        let line = db.update("UPDATE c_keyvalue SET `value` = " + value + " WHERE `key` = " + key + ";");
        if (line < 1) {
            db.insert("INSERT INTO c_keyvalue (`key`, `value`) VALUES (" + key + ", " + value + ");");
        }
    } catch (e) {
        stage.dropAlertNotice("ERROR while updating " + key + "! Fail to update database :" + e);
    }
}

function getServerKeyValue(key, def) {
    try {
        let lpq = db.select("SELECT `value` FROM c_keyvalue WHERE `key` = '" + key + "';");
        if (lpq.length > 0) {
            return lpq[0].get("value");
        }
    } catch (e) {
        stage.dropAlertNotice("ERROR while getting " + key + "! Fail to select database :" + e);
    }
    return def;
}

function rand(a, b) {
    return ~~(Math.random() * (b - a)) + a;
}

function 是否購買高級版() {
    const sql = "SELECT COUNT(1) AS number FROM zz_pass_vip a WHERE a.characters_id = '" + stage.getCharacterName() + "' AND season = '" + 賽季.get賽季標號() + "'";
    const resultList = db.select(sql)[0]; // 僅獲取第一個結果
    return !!(resultList && resultList.number > 0);
}