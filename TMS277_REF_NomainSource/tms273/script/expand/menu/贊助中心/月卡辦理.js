/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 會員辦理
 **/

let log = require('check_log');
let aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
let z5 = "#fEffect/CharacterEff/1112904/2/1#"; //五角花
let tz = "#fEffect/CharacterEff/1082565/2/0#"; //兔子藍
let eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //小紅心
let tz12 = "#fEffect/CharacterEff/1112924/0/0#"; //黃星
let tz13 = "#fEffect/CharacterEff/1112925/0/0#"; //藍星
let tz14 = "#fEffect/CharacterEff/1112926/0/0#"; //紅星
var kk60 = "#fMap/MapHelper/weather/guildBless/7#";
var a1 = "#fUI/CashShop/CSMVPPopup/main/gradeIcon/7#"
//會員盒子
// var { getEventValue, setEventValue } = require('common/zz_common.js');
const payUtils = require('constant/PayUtils');


let vipBox = Array(
    //盒子ID 天數 所需餘額 詞條 詳細介紹
    Array(3700664, 30, 98,  "[白銀月卡]", " #r 98 #k楓之幣 #r30#k天 #v3700664:i# "),
    Array(3700662, 30, 198, "[黃金月卡]", " #r 198#k楓之幣 #r30#k天 #v3700662:i# "),
    Array(3700661, 30, 368, "[鑽石月卡]", " #r 368#k楓之幣 #r30#k天 #v3700661:i# ")
);

let payTimes = ["", "", ""];

const 覺醒的輪迴星火 = 2048761;
const 恢復附加方塊 = 5062031;
const 新對等方塊 = 5062021;
const 閃耀鏡射方塊 = 5062026;
const 楓點500 = 5680865;
const 太陽方塊 = 5062013;
const 絕對附加方塊 = 5062512;
const 驚奇方塊 = 5062005;
const 畫框 = 5060086;
const 錦囊 = 5060087;
const 蘋果 = 5060048;
const 豎琴 = 5060025;
// 一次性獎勵
let listA = Array(
    [// 白銀月卡
        [覺醒的輪迴星火, 5], // 覺醒火焰
		[錦囊, 10],
        [楓點500, 20], // 點券
	
    ],
    [// 黃金月卡
        [覺醒的輪迴星火, 10], // 覺醒火焰
		[錦囊, 20],
        [楓點500, 40], // 點券
		
    ],
    [// 鑽石月卡
        [覺醒的輪迴星火, 20], // 覺醒火焰
		[錦囊, 30],
        [楓點500, 80], // 點券
    ],
);
let listB = [
    [// 小月卡
        [恢復附加方塊, 10],
        [新對等方塊, 10],
        [閃耀鏡射方塊, 10],
		[太陽方塊, 2],
		[驚奇方塊, 2],
		[畫框, 5],
		[錦囊, 5],
		[蘋果, 5],
		[豎琴, 5],
		[絕對附加方塊, 2],
    ],
    [// 中月卡
        [恢復附加方塊, 20],
        [新對等方塊, 20],
        [閃耀鏡射方塊, 20],
		[太陽方塊, 3],
		[驚奇方塊, 3],
		[畫框, 10],
		[錦囊, 10],
		[蘋果, 10],
		[豎琴, 10],
		[絕對附加方塊, 3],
    ],
    [// 大月卡
        [恢復附加方塊, 40],
        [新對等方塊, 40],
        [閃耀鏡射方塊, 40],
		[太陽方塊, 5],
		[驚奇方塊, 5],
		[畫框, 15],
		[錦囊, 15],
		[蘋果, 15],
		[豎琴, 15],
		[絕對附加方塊, 5],
    ],
];


// 每日楓點獎勵
let listC = [
    588,
    988,
    1588
];
// 稱號
let listD = [
    3700664,
    3700662,
    3700661,
];


start();

function start() {
    // for (let i in payTimes) {
    //     if (player.getEventValue("永久" + vipBox[i][3]) == 1) {
    //         payTimes[i] = "#g[已擁有]#k"
    //     } else if (getEventValue("購買" + vipBox[i][3], true, player) < 3) {
    //         payTimes[i] = `#r[${getEventValue("購買" + vipBox[i][3], true, player)}/3]#k`
    //     } else {
    //         payTimes[i] = "#b[轉換永久]#k"
    //     }
    // }
    let str = ``;
    str += `親愛的 #r${stage.getCharacterName()}#k 您好，想選擇什麼樣的月卡：\r\n`;
    str += `1: 3種月卡不能同時存在，購買會覆蓋\r\n`;
    str += `2: 綁定卡帳戶內角色共享\r\n`;
    str += `3: 辦理月卡不計算累計贊助額度，請想好再辦理! ~\r\n`;

    str += `\r\n`;
    str += `#r#L0#辦理白銀月卡 (98  楓之幣/30天) #b→ 瞭解白銀月卡#l\r\n`;
    str += `#r#L1#辦理黃金月卡 (198 楓之幣/30天) #b→ 瞭解黃金月卡#l\r\n`;
    str += `#r#L2#辦理鑽石月卡 (368 楓之幣/30天) #b→ 瞭解鑽石月卡#l\r\n`;
    let sel = npc.askMenu(str);

    str = `購買後獲得以下獎勵\r\n`;
    str += `1、賬號存入 ${listA[sel][0][1] * 500} 楓點\r\n`;
    str += `2、揹包獲取 #v${listA[sel][1][0]}:i##z${listA[sel][1][0]}:i# x ${listA[sel][1][1]}\r\n`;
    str += `3、辦理贈送 #v${listD[sel]}:i##z${listD[sel]}:i#\r\n`;
    str += `   接下來30天內每天領取 ${listC[sel]} 楓點\r\n`;
    str += `   #v${恢復附加方塊}:i##v${新對等方塊}:i##v${閃耀鏡射方塊}:i##v${畫框}:i##v${蘋果}:i##v${豎琴}:i##v${錦囊}:i##v${太陽方塊}:i##v${絕對附加方塊}:i##v${驚奇方塊}:i#若干個\r\n`;
    str += `4、一次性獲得：\r\n`;
    str += `#v${listD[sel]}:i# x 1 #v${listA[sel][1][0]}:i# x ${listA[sel][1][1]} #v${listA[sel][0][0]}:i# x ${listA[sel][0][1]}#v${listA[sel][2][0]}:i# x ${listA[sel][2][1]}\r\n`;
    if (npc.askYesNo(str) == 1) {
        let myRmb = payUtils.getPay(1, db, stage);
        str = `月卡購買確認\r\n`;
        str += `確認要辦理${vipBox[sel][3]}30天服務嗎？\r\n`;
        str += `需要星語幣: ${vipBox[sel][2]}\r\n`;
        str += `當前星語幣: ${myRmb}\r\n`;
        if (myRmb < vipBox[sel][2]) {
            str += `購買條件不滿足\r\n`;
            npc.say(str);
        } else {
            if (npc.askYesNo(str + '是否辦理') == 1) {
                payUtils.gainPay(1, -vipBox[sel][2], stage, db, '', '');
				payUtils.gainPay(3, vipBox[sel][2], stage, db, '', '');
                // 稱號
                stage.gainItem(vipBox[sel][0], 1, vipBox[sel][1] *  24 * 60);
                for (let i in listA[sel]) {
                    stage.gainItem(listA[sel][i][0], listA[sel][i][1])
                }
                log.resetEventValue(stage, db, `月卡`);
                log.addEventValue(stage, db, `月卡`, vipBox[sel][2], vipBox[sel][1]);
                log.addEventValue(stage, db, `${vipBox[sel][3]}每日福利`, 30, -1);
                npc.say(`購買成功`);
            }
        }
    }
}

