let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";
const {getPay, loseRMB} = require('vipCommon.js');

var filter = [
    1003843, 1012626, 1032234, 1022286, 1703119, 1703004, 1702925, 1082553, 1103113, 1102604, 1051547, 1050480,
    1102963, 1113220, 1112941, 3700341, 3700342, 3700343, 3700344, 3700345, 3700346, 3700347, 1115012, 1115013,
    1115014, 1115100, 1115101, 1115102, 1102142, 1102872, 1102873, 1102982, 1115140, 1115153, 1112734, 1103041,
    1103141, 1102511, 1102723, 1102724, 1003843, 1082553, 1073773, 1102604, 1114403, 1703407,
    1053704,
    1103113,
    1005782,
    1005365,
    1003889,
    1005300,
    1005299,
    1005298,
    1005297,
    1001124,
    1000101,
    1703219,
    1703119,
    1703004,
    1103462,
    1103361,
    1103257,
    1006015,
    1005840,
    1005541,
    1114000, 1112918, 1113299, 1114317
]
var menus = [
    [170, '武器', "抵用"],
    [100, '帽子', "抵用"],
    [110, '披風', "抵用"],
    [105, '套服', "抵用"],
    [104, '服飾', "抵用"],
    [106, '褲裙', "抵用"],
    [107, '鞋子', "抵用"],
    [108, '手套', "抵用"],
    [101, '前額', "抵用"],
    [102, '眼飾', "抵用"],
    [103, '耳飾', "抵用"],
    [109, '副手', "抵用"],
    [111, '戒指', "抵用"],
    // [180,'寵裝',"抵用"],
    // [502,'飛鏢',"抵用"],
    // [580,'變身',"抵用"]
    // [501,'特效',"點券"]

]
// 1%概率直接獲得6維10的屬性點裝(寵裝除外)\r\n"

// for(var i =0;i<menus.length;i++){
//     if(undefined!=menus[i][3] && menus[i][3]!=""){
//         sb+="#r"+menus[i][3]+"#d\r\n"
//     }
//     sb+="#L"+i+"##d"+xing+menus[i][1]+"#l#k#n   "
//     if((i+1)%4==0){
//         sb+="\r\n\r\n"
//     }
// }
// sb += "#r#L999#"+xing+"時裝名字,或者代碼id自選#l"
// let menu_index = npc.askMenu(sb,false);
let log = require('check_log');
let 單價 = 199;
let 擁有資產 = player.getCashShopCurrency(1)
let 使用單位 = "樂豆";
let 每頁多少條 = 100;
let 總業數 = 1;
let 當前頁數 = 1;

let itemlist = [];


// if(menu_index==999){
//    自選時裝()
// }else{
// if(使用單位=="點券"){
//     擁有資產= player.getCashShopCurrency(2);
// }else if(

// }else if(使用單位=="金幣"){
//     擁有資產= player.getMeso();
// }
// let demo =require("data/遊戲商店/時裝商店/"+menus[menu_index][1]);
for (let i in menus) {
    let demo = require("constant/遊戲商店/時裝商店/" + menus[i][1]);
    itemlist = itemlist.concat(demo.itemlistall);
}


// 總業數 = Math.ceil((itemlist.length/每頁多少條));
// 當前頁數 = 1;
// 分頁(當前頁數)
// let str = `是否消耗#r${單價}#d抵用券進行抽取\r\n獎池和自選一致,概率均等\r\n\r\n`
// for (let i in itemlist) {
//     str += "#v" + itemlist[i] + ":i#";
// }
let loopFlg = true;
while (loopFlg) {
    var sb = "#d\t\t\t\t" + xiaoxingxing + "屬性暖暖" + xiaoxingxing + "#l\r\n";
    sb += "當前樂豆: " + 擁有資產 + " #d\r\n"
    sb += "每次屬性暖暖消耗#r199#d樂豆\r\n"
    sb += "從#r所有種類#d中隨機抽取(概率均等，獎池參照自選)\r\n六維屬性波動範圍(#r5~25#d)\r\n"
    sb += "來一發嗎\r\n"
    loopFlg = false;
    if (npc.defText("是").minLen(0).maxLen(2).askText(sb) == "是") {
        if (擁有資產 < 單價) {
            npc.say("樂豆不足");
        } else {
            //db.update(`update hypay
            //           set pay =pay + ${-單價}
            //           where accname = '${getAccountName()}';`);
             player.modifyCashShopCurrency(1, -單價);
            let itemid = 0;
            while (itemid == 0 || filter.indexOf(itemid) != -1) {
                itemid = itemlist[Math.floor(Math.random() * itemlist.length)];
            }
            // 1%概率出有屬性的
            // if (Math.random() < 0.01 && !["飛鏢", "寵裝", "變身"].includes(menus[menu_index][1])) {
            let newItem = util.makeItem(itemid, 1);

            newItem.setBaseStr(Math.floor(Math.random() * 21) + 5);
            newItem.setBaseDex(Math.floor(Math.random() * 21) + 5);
            newItem.setBaseInt(Math.floor(Math.random() * 21) + 5);
            newItem.setBaseLuk(Math.floor(Math.random() * 21) + 5);
            let tvFlg = false;
            let rand = Math.floor(Math.random() * 21) + 5;
            if (rand == 25) {
                tvFlg = true;
            }
            newItem.setMad(rand);
            rand = Math.floor(Math.random() * 21) + 5;
            if (rand == 25) {
                tvFlg = true;
            }
            newItem.setPad(rand);
            stage.gainItem(newItem);
            if (tvFlg) {
                util.broadcastGachaponMsg("【時裝抽獎】" + `恭喜玩家<${stage.getCharacterName()}>獲得了高屬性時裝!!!{}`, newItem);
            }

            npc.say("恭喜您獲得#r#e屬性時裝#n#d:#v" + itemid + ":i##t" + itemid + ":i#快去試試效果吧！");
            //     // laba 屬性點狀 TODO
            // } else {
            // player.gainItem(itemid, 1);
            // npc.say("恭喜您獲得#v"+itemid+":i##t"+itemid+":i#快去試試效果吧！");
            // }
            loopFlg = true;
            擁有資產 = player.getCashShopCurrency(1)
        }
    }
}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}