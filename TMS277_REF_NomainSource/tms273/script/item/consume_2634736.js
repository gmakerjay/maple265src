/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


date = new Date();
sec = date.getSeconds();
let week = date.getDay();
let day = date.getDate();
let hour = date.getHours();
let min = date.getMinutes();
let log = require('check_log');

function start() {

    if (1 == 2) {

    } else if (hour == 0 && min <= 1) {
        npc.say("#d領地數據正在重載,請02分后再試")
    } else {

        let sql11 = "SELECT * FROM Smap WHERE biaoji = '1'";
        let push11 = db.select(sql11);
        if (push11.length == 0) {
            db.insert("INSERT INTO `Smap` (`ditu`, `biaoji`) VALUES ('0', '1' )");
        } else {
            var shuliang = parseInt(push11[0].get("ditu"));
        }
        if (shuliang == null) {
            shuliang = 0
        }
        if (shuliang < 5) {
            var LevelList = [
                ["S", 10],//
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

        var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
        var qq986 = "#fUI/Logo.img/GradeCN/pressed/0#"//家人冒險島

        var qq987 = "#fUI/ChatEmoticon.img/1012/10120004/effect/4#"//大城西LOGO

        var qq988 = "#fUI/ChatEmoticon.img/1012/10120004/effect/6#"//大城西LOGO
        let date = new Date();
        let sec = date.getSeconds();
        let week = date.getDay();
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let chance = rand(1, 1000000);
        //var lev = "C"

        let mapResults = db.select(`select distinct(op.map_id) as map_id
                                    from orange_pos op
                                    where op.map_id = ${map.getId()}`);
        if (mapResults.length <= 0) {
            npc.say("該地圖不能使用哦！")
            return;
        }

        var lev = getLevel();
        // player.showSystemMessage(lev);
        let sql = "SELECT * FROM orange WHERE map = '" + map.getId() + "'";
        let push = db.select(sql);
        if (push.length == 0) {
            db.insert("INSERT INTO `orange` (`level`,`passDate`,`map`) VALUES ('" + lev + "',now(),'" + map.getId() + "')");
        } else {
            var dengji = push[0].get("level");

        }

        let str = "#d\t" + qq987 + "" + qq986 + "" + qq988 + "\r\n";
        str += "#d要查看仙樹領地狀態嗎？\r\n";
        str += "#d今日S級地圖剩餘:#r" + (5 - shuliang) + "個\r\n";
        YN2 = npc.askYesNo(str);
        if (YN2 == 1) {
            var shijian = stage.getEvent()
            if (shijian == null) {
                let sql = "SELECT * FROM orange WHERE map = '" + map.getId() + "'";
                let push = db.select(sql);
                var dengji = push[0].get("level");
                var zhanlingID = push[0].get("accID");
                var zhanlingname = push[0].get("charaname");
                let str1 = "#d\t" + qq987 + "" + qq986 + "" + qq988 + "\r\n"
                if (zhanlingID == null && log.getEventValue(stage, db, "已佔領") < 1) {
                    if (dengji == "S") {
                        var cailiao = 20
                    } else if (dengji == "A") {
                        var cailiao = 15
                    } else if (dengji == "B") {
                        var cailiao = 10
                    } else if (dengji == "C") {
                        var cailiao = 5
                    }
                    str1 += "#d你今日還未佔領仙樹領地\r\n"
                    str1 += "#d當前地圖等級為:#r" + dengji + "#d級\r\n"
                    str1 += "#d當前地圖未被佔領，你是否要消耗" + cailiao + "張#v2634736#佔領該地圖\r\n"
                    YN1 = npc.askYesNo(str1);
                    if (YN1 == 1) {
                        if (map.getId() == 867133900 || map.getId() == 867134000 || map.getId() == 867133800 || map.getId() == 867133700 || map.getId() == 867133500
                            || map.getId() == 867133600 || map.getId() == 867133400 || map.getId() == 867133300 || map.getId() == 867133200 || map.getId() == 867133100
                            || map.getId() == 867133000 || map.getId() == 867132900 || map.getId() == 867132800 || map.getId() == 867132700 || map.getId() == 867132600
                            || map.getId() == 867132500 || map.getId() == 867132400 || map.getId() == 867132300 || map.getId() == 867132200 || map.getId() == 867132100
                            || map.getId() == 867135100 || map.getId() == 911003600 || map.getId() == 911003400 || map.getId() == 911001300 || map.getId() == 911001100
                            || map.getId() == 911001200 || map.getId() == 911001400 || map.getId() == 910048000 || map.getId() == 867161400) {
                            npc.say("該地圖不能使用哦！")
                            // npc.say("#d你連家人們的魔王塔都要想占來種樹嗎？")
                        } else {
                            if (stage.hasItem(2634736, cailiao)) {
                                stage.loseItem(2634736, cailiao)
                                if (dengji == "S") {
                                    let sql2 = "SELECT * FROM Smap WHERE biaoji = '1'";
                                    let push2 = db.select(sql2);
                                    var ditu2 = parseInt(push2[0].get("ditu"));
                                    var xinditu = ditu2 + 1
                                    db.update("UPDATE Smap SET ditu = '" + xinditu + "' where biaoji = '1';");
                                }
                                db.update("UPDATE orange SET accID = '" + stage.getAccountId() + "' where map = '" + map.getId() + "'");
                                db.update("UPDATE orange SET charaname ='" + stage.getCharacterName() + "' where map = '" + map.getId() + "'");
                                db.update("UPDATE orange SET open ='已佔領' where map = '" + map.getId() + "'");
                                log.addEventValue(stage, db, "已佔領")
                                //npc.broadcastWeatherEffectNotice(261, "玩家 " + player.getName() + "成功佔領了" + dengji + "級地圖 要好好守護自己的仙樹哦！", 50000)
                                npc.say("#d佔領成功,請在今日整點到該地圖收穫你的仙樹\r\n距離下次仙樹成熟還需#r" + (60 - min) + "#d分鐘")
                            } else {
                                npc.say("#d你的#v2634736##z2634736#數量不夠哦！該地圖等級為#r" + dengji + "#d級！佔領該地圖需要#r" + cailiao + "#d張")
                            }
                        }
                    }
                } else if (zhanlingID != null && log.getEventValue(stage, db, "已佔領") > 0) {
                    let sql = "SELECT * FROM orange WHERE accID = '" + stage.getAccountId() + "'";
                    let push = db.select(sql);
                    var ditu = push[0].get("map");
                    str1 += "當前地圖等級為:#r[" + dengji + "]#d級,佔領者#b[" + zhanlingname + "]\r\n"
                    str1 += "#d你佔領的地圖為#b[#m" + ditu + "#]#d\r\n距離下次仙樹成熟還需#r" + (60 - min) + "#d分鐘"
                    str1 += "要傳送到你佔領的地圖嗎？"
                    YN1 = npc.askYesNo(str1);
                    if (YN1 == 1) {
                        stage.changeMap(ditu, 0)
                    }
                } else if (zhanlingID != null && log.getEventValue(stage, db, "已佔領") <= 0) {
                    str1 += "#d當前地圖等級為:#r[" + dengji + "]#d級\r\n"
                    str1 += "#d當前地圖已被#r[" + zhanlingname + "]#d佔領，去尋找其他地圖吧!\r\n"
                    npc.next().say(str1);
                } else if (zhanlingID == null && log.getEventValue(stage, db, "已佔領") > 0) {
                    let sql = "SELECT * FROM orange WHERE accID = '" + stage.getAccountId() + "'";
                    let push = db.select(sql);
                    var ditu = push[0].get("map");
                    str1 += "當前地圖等級為:#r[" + dengji + "]#d級,#b無人佔領狀態\r\n"
                    str1 += "#d你佔領的地圖為#b[#m" + ditu + "#]#d\r\n距離下次仙樹成熟還需#r" + (60 - min) + "#d分鐘"
                    str1 += "要傳送到你佔領的地圖嗎？"
                    YN1 = npc.askYesNo(str1);
                    if (YN1 == 1) {
                        stage.changeMap(ditu, 0)
                    }
                } else {
                    npc.say("#d查詢佔領數據出錯")
                }

            } else {
                npc.say("#d查詢佔領數據出錯,以下情況是不能使用佔領卷的哦：\r\n1.你正在釣魚\r\n2.你正在副本內")
            }
        }

    }

}

start();

function rand(a, b) {
    return ~~(Math.random() * (b - a)) + a;
}