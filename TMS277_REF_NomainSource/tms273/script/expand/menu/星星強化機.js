//強化 -- 神秘套
var a1 =
    "#fUI/UIAchievement/achievement/pages/normalCategory/categoryTitle/sub/equip#"; //裝備字體
var a2 =
    "#fUI/UIAchievement/achievement/pages/normalCategory/categoryTitle/sub/level#"; //等級字體
var a3 = "#fUI/CashShop/CSBeauty/hairColor/Disable/4#"; //綠色方塊
var a6 = "#fUI/CashShop/CSBeauty/hairColor/Disable/3#"; //橙色方塊
var a7 = "#fUI/CashShop/CSBeauty/hairColor/Disable/2#"; //紅色方塊
var a8 = "#fUI/CashShop/CSBeauty/hairColor/Disable/1#"; //方塊
var a4 = "#fUI/CashShop/CSTab/SubTab/2/Enable/0#"; //強化
var a5 = "#fUI/UIPVP/DoubleEvent/LauncherFlag/1/Survival#"; //加倍
var b1 = "#fUI/UIWindowBT/Strengthen/result/failed/mainText#";
var b2 = "#fUI/UIWindowBT/Strengthen/result/success/mainText#";
var c1 = "#fEffect/PetEff/Basic/LevelUp/12#";
var c2 = "#fUI/UIWindowString/Scenario/quest_info/scene/summary_icon/summary#";
var c3 = "#fUI/UIWindow8/danceBattleTimer/icon#";
var c4 = "#fUI/UIPVP/MiniMapIcon/red#"; //紅色
var c5 = "#fUI/UIPVP/MiniMapIcon/blue#";
var ttt2 = "#fItem/Pet/5000231.img/stand/0#";
//配置

//屬性配置
var baseItem = 4310306; //基礎材料煥新寶石
var baseItem2 = 4001839; //基礎材料星星

//加倍概率設置
var doubleWeek = 9; //星期幾
var doubleHour = 20; //幾點
var cantDoubleLevel = 12; //多少級後不參與加倍

//其他配置
var failLockLevel = 2; //開始鎖裝備級別(升級到上一級失敗後會鎖)

//增加成功率
var itemA = 4032031; // A材料 每次使用一個 強化率增加5% 強化失敗不封印裝備
var itemASuccess = 5; // A材料 增加成功率
var itemB = 4000928; // B材料
var itemBNum = 10; //每1%成功率需要多少個B
var itemBMax = 10; //B最多增加多少次

var itemC = 4000928; //failLockLevel 之前必成
var itemCNum = 50;

let lv25item = 4009330
let lv25conts = 1
let item1 = 4001839;
let item2 = 4036361;
let item3 = 4036720;

const mesos = 20_0000_0000;

//解鎖配置
var unLockAitem = 4001839; //A方式解鎖需要物品
var unLockAitemNum = 1; //A方式解鎖需要物品
var unLockBitem = 4036361; //A方式解鎖需要物品
var unLockBitemNum = 1; //A方式解鎖需要物品
//var toDrop = stage.getInventorySlot(1, 1);
//npc.say(toDrop.getAttribute() )
// let list = [
//   // 星星, 幸運星, 成功率, 鎖定率, 四維,
//   [1000, 1, 10, 20, 11, 15],
//   [1000, 1, 8, 20, 13, 18],
//   [1000, 1, 6, 20, 17, 22],
//   [1000, 1, 5, 20, 20, 25],
//   [1000, 1, 1, 30, 25, 30],
//   [1000, 1, 800, 100, 25, 30],
//   [1000, 1, 700, 100, 25, 30],
//   [1000, 1, 500, 100, 25, 30],
//   [1000, 1, 300, 100, 25, 30],
//   [1000, 1, 100, 100, 25, 30],
// ];
let list = [
    // 星星, 幸運星, 成功率, 鎖定率, 四維,攻擊
    [1000, 1, 300, 100, 0, 0],
    [1000, 1, 300, 100, 0, 0],
    [1000, 1, 300, 100, 0, 0],
    [1000, 1, 300, 100, 0, 0],
    [1000, 1, 300, 100, 0, 0],
    [1000, 1, 300, 500, 18, 25],
    [1000, 1, 300, 500, 18, 25],
    [1000, 1, 300, 500, 18, 25],
    [1000, 1, 300, 500, 18, 25],
    [1000, 1, 300, 500, 18, 25],
];
let listReal = [
    // 星星, 幸運星, 成功率, 鎖定率, 四維,攻擊
    [1000, 1, 250, 100, 0, 0],
    [1000, 1, 250, 100, 0, 0],
    [1000, 1, 250, 100, 0, 0],
    [1000, 1, 250, 100, 0, 0],
    [1000, 1, 250, 100, 0, 0],
    [1000, 1, 250, 500, 18, 25],
    [1000, 1, 250, 500, 18, 25],
    [1000, 1, 250, 500, 18, 25],
    [1000, 1, 250, 500, 18, 25],
    [1000, 1, 250, 500, 18, 25],
];
// let list = [
//   // 星星, 幸運星, 成功率, 鎖定率, 四維,
//   [1000, 2, 1000, 100, 11, 15],
//   [1000, 1, 1000, 100, 13, 18],
//   [1000, 1, 1000, 100, 17, 22],
//   [1000, 1, 1000, 100, 20, 25],
//   [1000, 1, 1000, 100, 25, 30],
//   [1000, 2, 1000, 100, 11, 15],
//   [1000, 1, 1000, 100, 13, 18],
//   [1000, 1, 1000, 100, 17, 22],
//   [1000, 1, 1000, 100, 20, 25],
//   [1000, 1, 1000, 100, 25, 30],
// ];

const upgradeList = {
    24: 25000,
    25: 25000,
    26: 25000,
    27: 35000,
    28: 35000,
    29: 50000,
};



function start() {
    var str =
        "#d伺服器當前時間" + c3 + ":#r<" + new Date().toLocaleString() + ">\r\n";
    str += "#d" + c2 + "\r\n";
    //str += "#d加倍強化開啟時間:#r每【周"+doubleWeek+" "+doubleHour  +"】點 開啟加倍概率\r\n"
    //str += "#d加倍強化持續:#r1小時#d\r\n#r"
    str += "#r24#k星以上裝備可強化\r\n";
    str += "#d最高可強化至#r<30星>";
    str += "\r\n#d請將<裝備>放到第一格後開始使用\r\n\r\n";
    str += "#L1##r" + a6 + "開始強化#l";
    // str += "#L3##r" + a3 + "強化失敗黑人榜單#l\r\n";
    // str += "#L2#" + a3 + "解鎖裝備#l";
    var selll = npc.askMenu(str);

    if (selll == 1) {
        var toDrop = stage.getItemBySlot(1, 1);
        if (toDrop == null) {
            npc.say("請將裝備放到第一格後使用");
        } else {
            let nowLevel = toDrop.getChuc();
            let toDropId = toDrop.getItemId();
            let onlyId = toDrop.getId();
            if (nowLevel < 24 || nowLevel >= 30) {
                npc.say("只支持24星到30星的強化");
                return;
            }
            let failTimes = 0;
            let failResults = db.select(`select * from zsf_star_upgrade where id = ${onlyId}`)
            if (failResults.length == 0) {
                db.insert(`insert into zsf_star_upgrade(id, fail_times, success_times, all_fail_times) values(${onlyId}, 0, 0, 0)`);
            } else {
                failTimes = failResults[0].get('fail_times')
            }

            let cost = upgradeList[nowLevel];
            var upRate = 1 + (Number(failTimes))
            str = a1 + " #r【#v" + toDropId + "#】 當前" + a2 + "：#r<" + nowLevel + ">星\r\n";
            str += `#b下一等級#r<${nowLevel + 1}>\r\n`;
            str += "#b成功率#r<" + upRate + "%> #b失敗不會降級已經損壞裝備\r\n";
            str += "#b每次失敗,會為該裝備增加1%成功率\r\n";
            str += "#k\r\n需要釣魚積分: " + cost + '\r\n';
            let myFishCoin = 獲取積分();
            str += "我的釣魚積分: " + myFishCoin + '\r\n';
            if (myFishCoin >= cost) {
                str += "#L1#" + a3 + "開始升星#l\r\n";
            } else {
                npc.say('釣魚積分不足')
                return;
            }

            var sel = npc.askMenu(str);
            if (sel == 1) {
                消耗積分(cost);
                if ((Math.random() * 100) < upRate) {
                    db.update(`update zsf_star_upgrade set fail_times = 0, success_times = success_times + 1 where id = ${onlyId}`)
                    toDrop.setChuc(Number(nowLevel) + 1);
                    stage.updateItemBySlot(1, 1)
                    util.broadcastGachaponMsg("[星星強化機] : 玩家 " + stage.getCharacterName() + ` 將<{}>星力 提升成功到(${Number(nowLevel)+1})並發出全服通告.萬丈高樓平地起，輝煌只能靠自己 `, toDrop);
                    npc.say(`${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}${b2}`);
                } else {
                    db.update(`update zsf_star_upgrade set fail_times = fail_times + 1, all_fail_times = all_fail_times + 1 where id = ${onlyId}`)
                    npc.say(`${b1}${b1}${b1}${b1}${b1}${b1}${b1}${b1}${b1}${b1}${b1}`);
                }
                start();
            } 
        }
    } 
}
function checkDouble() {
    var date1 = new Date();
    var week1 = date1.getDay();
    var hour1 = date1.getHours();
    if (week1 == doubleWeek && hour1 == doubleHour) return true;
    return false;
}
function 獲取積分() {
    var sql = ` select * from 釣魚表_積分表 where  character_id = ${stage.getCharacterId()}  `;
    var resultList = db.select(sql)
    var point = -1;
    for (var i = 0; i < resultList.length; i++) {
        var result = resultList[i];
        if (result == null) {
            break;
        }
        point = result.get("point");
    }
    return point;
}


function 消耗積分(point) {
    let 積分 = 獲取積分(); 
    stage.showSystemMessage(`消耗釣魚積分: ${point}  剩餘: ${積分 - point}`)


    var sql = ` update   釣魚表_積分表 set point = point - ${point} where character_id = ${stage.getCharacterId()}  `
    db.update(sql)
}



start();


