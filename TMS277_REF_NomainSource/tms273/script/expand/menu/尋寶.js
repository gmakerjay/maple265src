/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var text = "";
var questid = 200100;
var maxtimes = 0;
if (stage.hasItem(3700661, 1)) {
    maxtimes = 10;
} else if (stage.hasItem(3700662, 1)) {
    maxtimes = 5;
} else if (stage.hasItem(3700664, 1)) {
    maxtimes = 3;
}

var playerid = 0;
var accepttimes = 0;
var questitemid = 0;
var questitemcs = 0;
var mapid = 0;
var qinfo = "";
var lastMapList = Array();
var maplist = Array(
    // Array(749050400, "轉蛋屋"),
    //	Array(450001000,"無名村-忘卻之湖"),
    Array(450002000, "啾啾村-啾啾島"),
   // Array(270010111, "關照者的房間-時間領主"),
    Array(910001000, "專業技術村莊<匠人街>"),
    Array(104000000, "明珠港"),
    Array(100000000, "射手村"),
    Array(101000000, "魔法密林"),
    Array(102000000, "勇士部落"),
    Array(103000000, "廢棄都市"),
    // Array(120000000, "諾特勒斯碼頭"),
    Array(105000000, "林中之城"),
    Array(200000000, "天空之城"),
    Array(211000000, "冰峰雪域"),
    Array(230000000, "水下世界"),
    Array(220000000, "玩具城"),
    // Array(701102000, "住宅區-上海外圍"),
    Array(250000000, "武陵"),
    Array(260000000, "阿里安特"),
    // Array(600000000, "新恭弘=恭弘=叶 恭弘 恭弘都市市中心-新恭弘=恭弘=叶 恭弘 恭弘都市"),
    Array(240000000, "神木村"),
    Array(261000000, "瑪加提亞"),
    Array(221000000, "地球防禦本部"),
    Array(251000000, "百草堂"),
    Array(300000000, "阿爾泰營地-艾琳森林"),
    // Array(270000000, "三個門-時間神殿"),
    // Array(800000000, "蘑菇神社-櫻之島"),
    Array(130000000, "聖地"),
    Array(310000000, "埃德爾斯坦"),
//    Array(800040000, "楓城 天下泰平"),
 //   Array(865000000, "桑凱梅爾茲"),
  //  Array(701100000, "豫園村"),
    //Array(701210000,"嵩山鎮"),
 //   Array(701220000, "大雄寶殿"),
 ////   Array(310070000, "避風港"),
//    Array(105300000, "廢棄營地"),
  //  Array(252000000, "黃金寺院"),
 //   Array(240090000, "勘探本部"),
  //  Array(100000205, "埃歐雷"),
  //  Array(101072000, "妖精學院艾利涅大廳"),
  //   Array(120040000, "金海灘度假村"),
  //  Array(410000000, "尖耳狐狸村"),
    Array(400000000, "萬神殿"),
  //  Array(401000000, "赫里希安反攻總部"),
  //  Array(801000000, "昭和村"),
    Array(224000000, "童話村"),
  // Array(103041000, "大廳"),
   // Array(867118200, "開拓總部"),
 ////   Array(222100000, "夢幻主題公園<正門>"),
    Array(450003000, "拉克蘭市中心"),
  //  Array(450005000, "精靈之樹所在地	"),
 //   Array(866000000, "大樹口村"),
   // Array(807000000, "楓恭弘=恭弘=叶 恭弘 恭弘山丘"),
    //Array(860000000,"新蔚藍道路"),
 //   Array(241000000, "克里蒂亞斯"),
 //   Array(610050000, "BDF西部防線"),
    Array(271010000, "破壞的射手村"),
    Array(273000000, "黃昏勇士部落"),
    // Array(703000000, "被破壞的 新恭弘=恭弘=叶 恭弘 恭弘城"),
    Array(867116900, "阿特利埃大廳"),
//    Array(450007040, "大本營"),
//    Array(749050400, "轉蛋屋"),
    Array(100000104, "射手村美髮店"),
    Array(100000103, "射手村整容院"),
    // Array(867123400, "銀色山脈下山"),
    // Array(910530200, "第5階段"),
 //   Array(993028070, "精靈森林"),
    // Array(500000000, "水上市場"),
    // Array(702000000, "嵩山鎮"),
///Array(680000000, "婚禮村"),
 //////   Array(620110001, "經典小屋婚禮禮堂"),
    // Array(600000000, "新恭弘=恭弘=叶 恭弘 恭弘都市市中心"),
    //Array(540000000,"中心商務區"),
 //   Array(800000000, "蘑菇神社 - 古代神社"),
 //   Array(701100000, "豫園村"),
    Array(711000001, "水下世界"),
    // Array(993012000, "藍海星球"),
    Array(307000300, "影子神殿入口"),
  //  Array(749050502, "精靈釣魚場"),
    //Array(910000018, "自由市場<18>"),
 //   Array(993013000, "送上太空等候室"),
    //Array(706052000,"海拔2300M:山頂瀑布"),
    // Array(993010000, "冒險星系"),
    // Array(970000000, "冒險島攝影棚"),
    // Array(970000001, "玩具城攝影棚"),
    // Array(970000002, "天空之城攝影棚"),
    // Array(970000003, "阿里安特攝影棚"),
    // Array(970000004, "武陵攝影棚"),
    // Array(970000005, "瑪加提亞攝影棚"),
    // Array(940200405, "精靈之樹可見處"),
    // Array(867120800, "艾利涅湖前面"),
    // Array(701220000, "大雄寶殿"),
    // Array(940204110, "守護靈的散步路"),
    // Array(100000200, "射手村 - 射手村公園"),
    // Array(100000201, "射手村 - 弓箭手培訓中心"),
    // Array(100000202, "射手村 - 寵物公園"),
    // Array(100010000, "射手村 - 射手村北部小山"),
    // Array(100010001, "射手村 - 奇怪的山丘"),
    // Array(100010100, "射手村 - 夢境小道"),
    // Array(100000001, "射手村 - 瑪亞的家"),
    // Array(100000002, "射手村 - 長老斯坦的家"),
    // Array(100000003, "射手村 - 麗娜的家"),
   // Array(102000000, "勇士部落 - 勇士部落"),
  //  Array(102000003, "勇士部落 - 戰士聖殿"),
    Array(102030000, "火焰之地 - 野豬的領土"),
    Array(102030100, "火焰之地 - 野生豬豬的領土"),
    Array(102030200, "火焰之地 - 鐵甲豬豬的領土"),
    Array(102030300, "火焰之地 - 燃燒的熱氣"),
    Array(102030400, "火焰之地 - 灰燼之地"),
    Array(103000000, "廢棄都市 - 廢棄都市"),
    Array(103000001, "廢棄都市 - 廢都武器店"),
    Array(103000002, "廢棄都市 - 廢都藥店"),
    Array(103000003, "廢棄都市 - 廢都爵士酒吧"),
    Array(103000004, "廢棄都市 - 廢都醫院"),
    Array(103000005, "廢棄都市 - 廢都美髮店"),
    Array(103000006, "廢棄都市 - 廢都修理店"),
    //Array(104010000, "頑皮島 - 明珠港郊外"),
    //Array(100000204, "射手村 - 弓箭手的殿堂"),
    //Array(101000004, "魔法密林 - 魔法師的殿堂"),
    // Array(102000004, "勇士部落 - 戰士的殿堂"),
    //Array(103000007, "廢棄都市 - 廢都夜市"),
    //Array(103000008, "廢棄都市 - 飛俠的殿堂"),
  //  Array(800000000, "蘑菇神社 - 古代神社"),
    // Array(800010000, "江戶村 - 櫻花山林"),
    Array(220000001, "玩具城 - 雜貨店"),
    Array(220000002, "玩具城 - 藥店"),
    Array(220000003, "玩具城 - 玩具城整形醫院"),
    Array(220000004, "玩具城 - 玩具城美髮店"),
 //   Array(220000005, "玩具城 - 玩具城護膚中心"),
  //  Array(220000006, "玩具城 - 玩具城寵物訓練場"),
 //   Array(220000100, "玩具城 - 玩具城售票處"),
    Array(220000110, "玩具城 - 碼頭<開往天空之城>")
    // Array(220000111, "玩具城 - 候船室<開往星精靈>")

);
const rewards = Array(
    //物品ID 數量
    // Array(2614025, 1),
    // Array(2614025, 2),
    // //Array(4002001, 2),  //藍蝸牛郵票20
    // //Array(4002001, 2),  //藍蝸牛郵票20
    // //Array(4002001, 2),  //藍蝸牛郵票20
    // //Array(4002001, 2),  //藍蝸牛郵票20
    // //Array(4002001, 5),  //藍蝸牛郵票20
    // //Array(4002001, 5),  //藍蝸牛郵票20
    // Array(4033356, 1), //正義火種1
    // Array(4033356, 2),//正義火種1
    // Array(4001618, 3),//黃金楓恭弘=恭弘=叶 恭弘 恭弘
    // Array(4001618, 2),//黃金楓恭弘=恭弘=叶 恭弘 恭弘
    // //Array(4021041, 1), //AS精華
    // //Array(4021042, 1), //AS精華
    // Array(4001785, 1), //500W金幣
    // Array(4001785, 1), //500W金幣
    // Array(4001785, 1), //500W金幣
    // Array(4001785, 2), //500W金幣
    // Array(4001785, 1), //500W金幣
    // //	Array(4001485, 999),
    // Array(2614064, 1)  //	500萬極限突破石100%
    //   Array(2439137,1 ),//	小軍團
    // Array(2439138,1 ),//	大軍團
    //Array(2439139,1 ),//	藍球
    Array(2635748, 10),//原處
    Array(2636883, 5),//6大
    Array(4009548, 20),//6小
    Array(4001715, 1),//	1E金幣
);
let log = require('check_log');
playerid = stage.getCharacterId();
accepttimes = maxtimes - parseInt(log.getEventValue(stage, db, "尋寶任務"));


let date = stage.getQuestRecordEx(questid, "date");
//比對時間 如果數據庫記錄的不是今天的日期 則全部刷新
if (date != getNowFormatDate()) {
    stage.updateQuestRecordEx(questid, "date", getNowFormatDate());
    stage.updateQuestRecordEx(questid, "questN", "-1");
}

let questN = stage.getQuestRecordEx(questid, "questN"); //任務地圖

text = "\t\t\t\t#e月卡每日尋寶#n\r\n\r\n";
text += "我的財富，遍布世界各地……\r\n#r90%的地圖都可以在萬能傳送-城鎮地圖、旅遊地圖中找到哦，注意用心觀察！\r\n";
text += "到達寶藏地點后，再次打開背包中<尋寶便簽>可以確認保證是否在當前地圖哦！\r\n";
text += "#d隨機獎勵預覽：\r\n";
for (let i in rewards) {
    text += "#v" + rewards[i][0] + ":i#";
}
text += "#r\r\n今日剩餘尋寶次數：#r" + accepttimes + "#k 次\r\n";
text += "#r#L999#尋寶任務簡介#l#k";
if (questN != -1) {  // 判斷是否接取了任務
    if (stage.isQuestCompleted(questid)) { // 判斷是否完成任務
        if (accepttimes <= 0) { // 判斷是否超過完成次數
            text += "\r\n\r\n您已經完成了今天的尋寶任務，請明天0點后再來吧~\r\n";
        } else {
            text += "#b#L0#接受任務#l#k";
        }
    } else {
        text += "#r#L100#確定當前地圖為藏寶地圖#l\r\n";
        text += "#r#L2#查看任務提示#l\r\n";
        text += "#r#L4#放棄任務 (無法獲得任何獎勵，且會消耗一次任務次數)#l\r\n";
    }
} else if (accepttimes > 0) {
    text += "#b#L3#接受任務#l\r\n";
} else {
    text += "  您已經完成了今天的尋寶任務，請明天0點后再來吧~\r\n";
}
text += "#b#L222#購買黃金羅盤#l#k";
var selected = npc.askMenu(text);
switch (selected) {
    case 999:
        text = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n\r\n#e#d什麼是尋寶任務？#n#k\r\n";
        text += "\t接受尋寶任務之後，你將會獲得一個#b尋寶便簽#k，我會告訴你可能藏有寶藏的5個地圖，並且會保存在尋寶便簽中，你需要找到這個#b正確的地圖#k並打開便簽確認正確的地圖。\r\n";
        text += "\t#r90%的地圖都可以在萬能傳送-城鎮地圖、旅遊地圖中找到哦，注意用心觀察！。\r\n";
        text += "該任務為月卡玩家專屬，銀月卡每天3次，金月卡每天5次，鑽月卡每天10次不可疊加"
        //text += "#e#d什麼是黃金羅盤？#n#k\r\n";
        //text += "\t使用黃金羅盤，可以幫助你直接尋找到正確的寶藏地圖。您可以通過購買獲得黃金羅盤，同時尋寶過程中有幾率獲得黃金羅盤。\r\n";
        npc.say(text);
        break;
    case 222:
        // var YN = npc.askYesNo("是否要花費#r100#k抵用券購買黃金羅盤？");
        let cnt = npc.defNum(1).minNum(1).maxNum(99).askNumber("請問您需要購買多少幸運羅盤，每個#r100#k抵用券")

        if (cnt > 0) {
            if (stage.getCurrency(2) < 100 * cnt) {
                npc.say("你沒有" + 100 * cnt + " 抵用券");
            } else {
                stage.gainItem(2430030, cnt);
                stage.modifyCurrency(2, -100 * cnt);
                npc.say("購買成功!");
            }
        } else {
            npc.say("需要再來找我吧！");
        }
        break;
    case 3:
        //接受任務
        if (stage.getLevel() < 160) {
            npc.say("等級不足160級，無法領取任務。");
        } else if (stage.getFreeSlot(2) < 1) {
            npc.say("你的消耗欄格子不足，請先整理一下吧。");
        } else {
            getRandomArray();
            var questrandid = Math.floor(Math.random() * lastMapList.length);
            mapid = lastMapList[questrandid][0] // 任務地圖ID
            stage.gainItem(2430251, 1);
            text = "寶箱有可能藏匿在一下幾個地圖，尋找到正確的地圖並打開寶箱！\r\n#r90%的地圖都可以在萬能傳送-城鎮地圖、旅遊地圖中找到哦，注意用心觀察！\r\n";
            var jj = 1;
            for (var key in lastMapList) {
                stage.updateQuestRecordEx(questid, "map" + jj, lastMapList[key][0]);
                qinfo += "#b" + lastMapList[key][1] + "\r\n";
                text += "#b" + lastMapList[key][1] + "\r\n";
                jj++;
            }
            stage.updateQuestRecordEx(questid, "questN", mapid);
            stage.updateQuestRecordEx(questid, "mapsInfos", lastMapList);
            log.addEventValue(stage, db, "尋寶任務");
            npc.say(text);
        }
        break;
    case 4:
        //放棄任務
        var YN = npc.askYesNo("是否放棄任務？");
        if (YN == 1) {
            stage.updateQuestRecordEx(questid, "questN", "-1");
            stage.loseItem(2430251, 1);
            npc.say("放棄成功，可以重新接取任務了！");
        } else {
            npc.say("請繼續加油");
        }
        break;
    case 2:
        //查看任務提示
        var mapsInfos = stage.getQuestRecordEx(questid, "mapsInfos");
        var maps = mapsInfos.split(",");
        text = "寶箱有可能藏匿在一下幾個地圖，尋找到正確的地圖並打開寶箱！\r\n";
        for (var i = 0; i < 5; i++) {
            text += "#b" + (i + 1) + ". " + maps[2 * i + 1] + "\r\n"
        }
        npc.say(text);
        break;
    case 100:
        //完成任務

        if (map.getId() == questN) {
            //這裏給獎勵。。。。


            var ran = Math.floor(Math.random() * rewards.length)


            stage.updateQuestRecordEx(questid, "questN", "-1");
            stage.gainItem(rewards[ran][0], rewards[ran][1])
            stage.gainItem(4310209, 10);
            stage.loseItem(2430251, 1);
            util.broadcastChatMsg(13, "【冒險探寶】:恭喜摸金校尉 " + stage.getCharacterName() + " 歷盡千辛萬苦找到了寶藏所在地,獲得豐厚的獎勵道具");
            npc.say("恭喜你，尋寶成功！獲得#v" + rewards[ran][0] + "# x " + rewards[ran][1] + "");
            //npc.broadcastPlayerNotice(13,"【冒險探寶】:恭喜摸金校尉 "+player.getName()+" 歷盡千辛萬苦找到了寶藏所在地,獲得豐厚的獎勵道具");
        } else {
            npc.say("尋寶失敗，這不是藏匿寶藏的地圖哦!");
        }
}


function getRandomArray() {
    if (lastMapList.length >= 5)
        return true;
    var newMapId = maplist[Math.floor(Math.random() * maplist.length)];
    for (var key in lastMapList) {
        if (lastMapList[key] == newMapId) {
            getRandomArray();
            return false;
        }
    }
    lastMapList.push(newMapId);
    getRandomArray();
}

//獲取當前時間，格式YYYY-MM-DD
function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}