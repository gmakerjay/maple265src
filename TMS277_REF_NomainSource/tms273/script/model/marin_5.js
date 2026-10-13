let players = require("check_log");
let marin_date = exports;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ttt7 = "#fMap/MapHelper.img/weather/2011Xmas/6#";//
var bzd1 = "#fEffect/CharacterEff.img/1032063/0/0#"; //

const marin = [
    '等級獎勵',
    '在線獎勵',
    '主號限定',
    '新手福利',
    '聯盟獎勵',
    '週末福利',
    '購買等級',
    '每日福利',
    "補領中心"
]

const marin_lv = [30, 150, 200, 210, 220, 230, 240, 250, 260, 275];

const lv_bute = [
    [0, 1022233, 1, null],
    [0, 1032242, 1, null],
    [0, 1112018, 1, null],
    [0, 1122285, 1, null],
    [0, 1142747, 1, null],

    [1, 2430686, 1, null],

    [2, 1003893, 1, null],
    [2, 1032191, 1, null],
    [2, 1113038, 1, null],
    [2, 1122256, 1, null],
    [2, 1132230, 1, null],
    [2, 1112586, 1, null],
    [2, 2430402, 10, null],
    [2, 2435902, 200, null],
    [2, 2437032, 1, null],
    [2, 2049372, 4, null],
    [2, 1122265, 1, null],
    [2, 1132244, 1, null],
    [2, 1032221, 1, null],
    [2, 1113073, 1, null],

    [3, 2432069, 1, null],
    [3, 2437032, 1, null],

    [4, 2432069, 1, null],
    [4, 2437032, 1, null],

    [5, 2432069, 1, null],
    [5, 2437032, 1, null],

    [6, 2432069, 1, null],
    [6, 2437032, 1, null],

    [7, 1162024, 1, null],
    [7, 1142788, 1, null],

    [8, 4009548, 100],
    [8, 2636688, 5],
    [8, 2633616, 10],

    [9, 1202189, 1, null],
    [9, 1202188, 1, null],
    [9, 1202187, 1, null]


]

const host_lv = [10];
const host_bute = [
    [0, 1202193, 1, 15]
]

let ExpGroup = {
    0: 0,
    1: 15,
    2: 34,
    3: 57,
    4: 92,
    5: 135,
    6: 372,
    7: 560,
    8: 840,
    9: 1242,
    10: 1242,
    11: 1242,
    12: 1242,
    13: 1242,
    14: 1242,
    15: 1490,
    16: 1788,
    17: 2145,
    18: 2574,
    19: 3088,
    20: 3705,
    21: 4446,
    22: 5335,
    23: 6402,
    24: 7682,
    25: 9218,
    26: 11061,
    27: 13273,
    28: 15927,
    29: 19112,
    30: 19112,
    31: 19112,
    32: 19112,
    33: 19112,
    34: 19112,
    35: 22934,
    36: 27520,
    37: 33024,
    38: 39628,
    39: 47553,
    40: 51357,
    41: 55465,
    42: 59902,
    43: 64694,
    44: 69869,
    45: 75458,
    46: 81494,
    47: 88013,
    48: 95054,
    49: 102658,
    50: 110875,
    51: 119739,
    52: 129318,
    53: 139663,
    54: 150836,
    55: 162902,
    56: 175934,
    57: 190008,
    58: 205208,
    59: 221624,
    60: 221624,
    61: 221624,
    62: 221624,
    63: 221624,
    64: 221624,
    65: 238245,
    66: 256113,
    67: 275321,
    68: 295970,
    69: 318167,
    70: 342029,
    71: 367681,
    72: 395257,
    73: 424901,
    74: 456768,
    75: 488741,
    76: 522952,
    77: 559558,
    78: 598727,
    79: 640637,
    80: 685481,
    81: 733464,
    82: 784806,
    83: 839742,
    84: 898523,
    85: 961419,
    86: 1028718,
    87: 1100728,
    88: 1177778,
    89: 1260222,
    90: 1342136,
    91: 1429374,
    92: 1522283,
    93: 1621231,
    94: 1726611,
    95: 1838840,
    96: 1958364,
    97: 2085657,
    98: 2221224,
    99: 2365603,
    100: 2365603,
    101: 2365603,
    102: 2365603,
    103: 2365603,
    104: 2365603,
    105: 2519367,
    106: 2683125,
    107: 2857528,
    108: 3043267,
    109: 3241079,
    110: 3451749,
    111: 3676112,
    112: 3915059,
    113: 4169537,
    114: 4440556,
    115: 4729192,
    116: 5036589,
    117: 5363967,
    118: 5712624,
    119: 6083944,
    120: 6479400,
    121: 6900561,
    122: 7349097,
    123: 7826788,
    124: 8335529,
    125: 8877338,
    126: 9454364,
    127: 10068897,
    128: 10723375,
    129: 11420394,
    130: 12162719,
    131: 12953295,
    132: 13795259,
    133: 14691950,
    134: 15646926,
    135: 16663976,
    136: 17747134,
    137: 18900697,
    138: 20129242,
    139: 21437642,
    140: 22777494,
    141: 24201087,
    142: 25713654,
    143: 27320757,
    144: 29028304,
    145: 30842573,
    146: 32770223,
    147: 34818372,
    148: 36994520,
    149: 39306677,
    150: 41763344,
    151: 44373553,
    152: 47146900,
    153: 50093581,
    154: 53224429,
    155: 56550955,
    156: 60085389,
    157: 63840725,
    158: 67830770,
    159: 72070193,
    160: 76574580,
    161: 81360491,
    162: 86445521,
    163: 91848366,
    164: 97588888,
    165: 103688193,
    166: 110168705,
    167: 117054249,
    168: 124370139,
    169: 132143272,
    170: 140402226,
    171: 149177365,
    172: 158500950,
    173: 168407259,
    174: 178932712,
    175: 190116006,
    176: 201998256,
    177: 214623147,
    178: 228037093,
    179: 242289411,
    180: 256826775,
    181: 272236381,
    182: 288570563,
    183: 305884796,
    184: 324237883,
    185: 343692155,
    186: 364313684,
    187: 386172505,
    188: 409342855,
    189: 433903426,
    190: 459937631,
    191: 487533888,
    192: 516785921,
    193: 547793076,
    194: 580660660,
    195: 615500299,
    196: 652430316,
    197: 691576134,
    198: 733070702,
    199: 777054944,
    200: 2207026470,
    201: 2471869646,
    202: 2768494003,
    203: 3100713283,
    204: 3472798876,
    205: 3889534741,
    206: 4356278909,
    207: 4879032378,
    208: 5464516263,
    209: 6120258214,
    210: 16830710088,
    211: 18177166895,
    212: 19631340246,
    213: 21201847465,
    214: 22897995262,
    215: 24729834882,
    216: 26708221672,
    217: 28844879405,
    218: 31152469757,
    219: 33644667337,
    220: 84838062013,
    221: 88231584493,
    222: 91760847872,
    223: 95431281786,
    224: 99248533057,
    225: 1218474379,
    226: 107347213354,
    227: 111641101888,
    228: 116106745963,
    229: 120751015801,
    230: 246332072234,
    231: 251258713678,
    232: 256283887951,
    233: 261409565710,
    234: 266637757024,
    235: 271970512164,
    236: 277409922407,
    237: 282958120855,
    238: 288617283272,
    239: 294389628937,
    240: 594667050452,
    241: 600613720956,
    242: 606619858165,
    243: 612686056746,
    244: 618812917313,
    245: 625001046486,
    246: 631251056950,
    247: 637563567519,
    248: 643939203194,
    249: 650378595225,
    250: 1313764762354
}
let date_marin = {
    60: [
        [0, 2432297, 1],
        [2, 100],
    ],
    120: [
        [0, 2432297, 1],
        [2, 200],
    ],
    180: [
        [0, 2432297, 1],
        [2, 300],
    ],
    240: [
        [0, 2432297, 1],
        [2, 400],
    ],
    300: [
        [0, 2432297, 1],
        [2, 500],
    ],
    360: [
        [0, 2432297, 1],
        [1, 350],
    ],
    420: [
        [0, 2433699, 1],
        [2, 500],
    ],
    480: [
        [0, 2432358, 1],
        [2, 1000],
    ]
}
marin_date.askDate = function (npc, stage, db, util, ctx) {
    var txt = "\r\n\r\n";
    txt += "#r " + bzd1 + "" + ttt7 + "" + bzd1 + "福利中心" + bzd1 + "" + ttt7 + "" + bzd1 + "\r\n";
    for (var i in marin) {
        if (i % 3 == 0) txt += "\r\n\r\n";
        txt += "　#L" + i + "#" + eff + " " + marin[i] + "#l　"
    }
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            txt = "等級獎勵\r\n";
            for (var i in marin_lv) {
                txt += "#L" + i + "##d領#r " + marinString(" ", 3, marin_lv[i].toString()) + " #d級別獎品 < " + (players.getPQLog(stage, db, "等級獎品_" + i) > 0 ? "#r已領" : "#b未領") + "#d >#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            txt = marin_lv[url] + " 等級獎品如下列所示\r\n\r\n";
            for (var i in lv_bute) {
                if (lv_bute[i][0] != url) continue;
                txt += "#i" + lv_bute[i][1] + "##z" + lv_bute[i][1] + "# x " + lv_bute[i][2] + " 個\r\n";
            }
            npc.meFlip().next().say(txt);

            if (players.getPQLog(stage, db, "等級獎品_" + url) >= 1) {
                npc.meFlip().say("抱歉...該等級獎品已領過了");
                return;
            }
            if (stage.getLevel() < marin_lv[url]) {
                npc.meFlip().say("抱歉..你的等級冇有達到 " + marin_lv[url]);
                return;
            }
            players.addPQLog(stage, db, "等級獎品_" + url, 1, -1);
            for (var i in lv_bute) {
                if (lv_bute[i][0] != url) continue;
                stage.gainItem(lv_bute[i][1], lv_bute[i][2]);
            }
            npc.meFlip().say("恭喜..領取成功");
            break;

        case 1:
            while (true) {
                var txt = "#e#d您今天在測試谷世界時長：#r" + stage.getOnlineTime() + " #d分鐘\r\n";
                txt += "提示：#r23:50 至 00:00 時無法領取在線獎勵。\r\n";
                txt += "#n請在 23:50 分鐘前領當天未領取的獎勵，以免造成損失。\r\n\r\n";
                for (let i in date_marin) {
                    players.getEventValue(stage, db, "在線禮包_" + i, false)
                    txt += "#L" + i + "##b領取在線 #r" + i + "#b 分鐘在線獎勵 " + (players.getEventValue(stage, db, "在線禮包_" + i, false) > 0 ? "#r已領取" : "") + " #l\r\n";
                }
                url = npc.meFlip().askMenu(txt);

                var txt = "#b當前 #r" + url + " #b分鐘獎勵\r\n\r\n";
                var bute = date_marin[url];
                for (var i in bute) {
                    switch (bute[i][0]) {
                        case 0:
                            txt += "#b#i" + bute[i][1] + "##z" + bute[i][1] + "# x #r" + bute[i][2] + "\r\n\r\n";
                            break;
                        case 1:
                            txt += "#b樂豆：#r" + bute[i][1] + "\r\n";
                            break;
                        case 2:
                            txt += "#b楓點：#r" + bute[i][1] + "\r\n";
                            break;
                    }
                }
                txt += "\t\t#r#e是否立即領當前獎勵？\r\n";
                if (npc.meFlip().askYesNo(txt) != 1) return;

                if (stage.getOnlineTime() < url) {
                    npc.meFlip().say("抱歉..你的在線時間沒有達到 " + url + " 分鐘");
                    return;
                }
                if (players.getEventValue(stage, db, "在線禮包_" + url, false) > 0) {
                    npc.meFlip().say("該禮包領過了");
                    return;
                }
                players.addEventValue(stage, db, "在線禮包_" + url);
                for (let i in bute) {
                    switch (bute[i][0]) {
                        case 0:
                            stage.gainItem(bute[i][1], bute[i][2]);
                            break;
                        case 1:
                            stage.modifyCurrency(1, bute[i][1]);
                            break;
                        case 2:
                            stage.modifyCurrency(2, bute[i][1]);
                            break;
                    }
                }
                npc.meFlip().next().say("在線" + url + "分鐘獎勵 領取成功。");
            }
            break;

        case 2:
            txt = "領取主號限定獎勵\r\n";
            for (var i in host_lv) {
                txt += "#L" + i + "##d領#r " + marinString(" ", 7, host_lv[i].toString()) + " #d級別獎品 < " + (players.getEventValue(stage, db, "S主_lv獎品_" + i, false) > 0 ? "#r已領" : "#b未領") + "#d >#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            txt = host_lv[url] + " 等級獎品如下列所示\r\n\r\n";
            for (var i in host_bute) {
                if (host_bute[i][0] != url) continue;
                txt += "#i" + host_bute[i][1] + "# x " + host_bute[i][2] + " " + (host_bute[i][3] != null ? "#e< #r限時 " + host_bute[i][3] + " 天 #k>" : "") + " 個\r\n";
            }
            npc.meFlip().next().say(txt);

            if (players.getEventValue(stage, db, "S主_lv獎品_" + url, false) > 0) {
                npc.meFlip().say("抱歉...該等級獎品已領過了");
                return;
            }
            if (stage.getLevel() < host_lv[url]) {
                npc.meFlip().say("抱歉..你的等級冇有達到 " + host_lv[url]);
                return;
            }
            players.addEventValue(stage, db, "S主_lv獎品_" + url, 1, 3650);
            for (var i in host_bute) {
                if (host_bute[i][0] != url) continue;
                if (host_bute[i][3] != null) {
                    marinperiod(stage, util, host_bute[i][1], host_bute[i][3], true);
                } else {
                    stage.gainItem(host_bute[i][1], host_bute[i][2]);
                }
            }
            npc.meFlip().say("恭喜..領取成功");
            break;

        case 3:
            var host_day = [
                [2433972, 1, null],
                [5062020, 30, null],
                [5062019, 30, null],
                [5062507, 30, null],
                [2431195, 20, null],
                [4001714, 20, null]
            ]
            parseInt(players.getEventValue(stage, db, "新手福利天效驗"))
            var marin_day = parseInt(players.getEventValue(stage, db, "新手福利天效驗"));
            if (marin_day >= 61) {
                npc.meFlip().say("抱歉..隻允許領取61天");
                return;
            }
            var x = marin_day > 30 ? marin_day - 30 * 2 + 30 : marin_day;
            var maxlevel = 200 + x;
            var txt = "#d領取條件如下：\r\n";
            txt += "#d需要在線時間大於 #r" + stage.getOnlineTime() + "#d/#b180 分鐘\r\n";
            txt += "當前等級大於 #r" + stage.getLevel() + "/#d" + maxlevel + "\r\n";
            txt += "60日福利如下：< 剩餘：" + parseInt(61 - marin_day) + "次 >\r\n";
            txt += "\r\n";
            for (var i in host_day) {
                txt += "#i" + host_day[i][0] + "# #z" + host_day[i][0] + "# x " + host_day[i][1] + "\r\n";
            }
            if (npc.meFlip().askYesNo(txt) != 1) return;

            if (players.getEventValue(stage, db, "新手_天_效驗") > 0) {
                npc.meFlip().say("抱歉..今日領過了");
                return;
            }
            if (stage.getLevel() < maxlevel) {
                npc.meFlip().say("抱歉..必須大於 " + maxlevel + " 級才允許領");
                return;
            }
            if (stage.getOnlineTime() < 180) {
                npc.meFlip().say("抱歉..必須在線時間達到 180 分鐘");
                return;
            }
            for (var i in host_day) {
                stage.gainItem(host_day[i][0], (marin_day == 0 ? host_day[i][1] * 2 : host_day[i][1]));
            }
            players.addEventValue(stage, db, "新手福利天效驗", 1, 3650);
            players.addEventValue(stage, db, "新手_天_效驗");
            util.broadcastWorldChatMsg(52, "" + stage.getCharacterName() + " 領取 " + marin_day + " 次新手福利啦！ 距離變成大佬更進了一步了！！")
            npc.meFlip().say("恭喜..領取成功");
            break;

        case 4:
            var Sday = calculateDaysSinceRegistration(stage, db);
            var union = stage.getMapleUnionInfo();
            var sumlevel = union[1];
            var txt = "聯盟系統\r\n\r\n"
            txt += "#d當前聯盟級別：" + sumlevel + "\r\n";
            txt += "#d#L0#領 8000  聯盟獎勵#l\r\n";
            txt += "#d#L1#領 10000 聯盟獎勵#l\r\n\r\n\r\n";
            url = npc.meFlip().askMenu(txt);

            switch (url) {
                case 0:
                    var bute = [
                        [3700511, 1]

                    ]
                    txt = "";
                    for (var i in bute) {
                        txt += "#i" + bute[i][0] + "##z" + bute[i][0] + "# x " + bute[i][1] + "\r\n";
                    }
                    txt += "是否領當前獎勵呢？\r\n";
                    yeno = npc.meFlip().askYesNo(txt);
                    if (yeno != 1) return;
                    if (parseInt(sumlevel) < 8000) {
                        npc.meFlip().say("抱歉...你聯盟等級沒有達到 8000");
                        return;
                    }
                    txt = "聯盟 8000 獎勵\r\n\r\n";
                    if (players.getEventValue(stage, db, "聯盟_key_8000") > 0) {
                        npc.meFlip().say("抱歉..你領過了當前獎勵");
                        return;
                    }
                    players.addEventValue(stage, db, "聯盟_key_8000", 1, 3650);
                    for (var i in bute) {
                        stage.gainItem(bute[i][0], bute[i][1]);
                    }
                    txt += "恭喜..領到了基礎獎勵\r\n";
                    npc.meFlip().say(txt);
                    break;

                case 1:
                    var bute = [
                        [3700513, 1]

                    ]
                    txt = "";
                    for (var i in bute) {
                        txt += "#i" + bute[i][0] + "##z" + bute[i][0] + "# x " + bute[i][1] + "\r\n";
                    }
                    txt += "是否領當前獎勵呢？\r\n";
                    yeno = npc.meFlip().askYesNo(txt);
                    if (yeno != 1) return;
                    if (parseInt(sumlevel) < 10000) {
                        npc.meFlip().say("抱歉...你聯盟等級沒有達到 10000");
                        return;
                    }
                    if (players.getEventValue(stage, db, "聯盟_key_10000") > 0) {
                        npc.meFlip().say("抱歉...你領過了已經");
                        return;
                    }
                    players.addEventValue(stage, db, "聯盟_key_10000", 1, 3650);
                    for (var i in bute) {
                        stage.gainItem(bute[i][0], bute[i][1]);
                    }
                    npc.meFlip().say("聯盟10000獎勵領取成功")
                    break;

                case 2:
                    yeno = npc.meFlip().askYesNo("是否領顯示 300 星語幣");
                    if (yeno != 1) return;
                    if (sumlevel < 8000) {
                        npc.meFlip().say("抱歉...你聯盟等級沒有達到 8000");
                        return;
                    }
                    var Sday = calculateDaysSinceRegistration(stage, db);
                    if (Sday > 3) {
                        npc.meFlip().say("抱歉..你超時了..領不了了");
                        return;
                    }
                    if (players.getEventValue(stage, db, "聯盟_key_3") > 0) {
                        npc.meFlip().say("抱歉..你領過了");
                        return;
                    }
                    players.addEventValue(stage, db, "聯盟_key_3", 1, 3650);
                    addRMB(300);
                    txt = "恭喜..三天內完成額外領到 300 星語幣\r\n";
                    npc.meFlip().say(txt);
                    break;

                case 3:
                    yeno = npc.meFlip().askYesNo("是否領顯示 200 星語幣");
                    if (yeno != 1) return;
                    if (sumlevel < 8000) {
                        npc.meFlip().say("抱歉...你聯盟等級沒有達到 8000");
                        return;
                    }
                    var Sday = calculateDaysSinceRegistration(stage, db);
                    if (Sday > 7) {
                        npc.meFlip().say("抱歉..你超時了..領不了了");
                        return;
                    }
                    if (players.getEventValue(stage, db, "聯盟_key_7") > 0) {
                        npc.meFlip().say("抱歉..你領過了");
                        return;
                    }
                    players.addEventValue(stage, db, "聯盟_key_7", 1, 3650);
                    addRMB(200);
                    txt = "恭喜..三天內完成額外領到 200 星語幣\r\n";
                    npc.meFlip().say(txt);
                    break;
            }
            break;

        case 5:
            var date = new Date();
            var dayOfWeek = date.getDay();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (dayOfWeek == 0 || dayOfWeek == 6) {
                if (hours < 21 || hours > 23) {
                    npc.meFlip().say("抱歉。。只有在21點才可以領 你已經超過時間或者未到時間");
                    return;
                }
                var bute = [
                    [2433972, 1],
                    [2472001, 10],
                    [2023632, 5],
                    [5062019, 20],
                    [5062020, 20],
                    [5062021, 10],
                    [5062026, 10],
                    [5062507, 20],
                    [5062031, 20]

                ]
                if (players.getEventValue(stage, db, "整點獎勵") > 0) {
                    npc.meFlip().say("抱歉..你領過了當前整點獎勵");
                    return;
                }
                players.addEventValue(stage, db, "整點獎勵");
                txt = "整點獎勵\r\n\r\n"
                for (var i in bute) {
                    stage.gainItem(bute[i][0], bute[i][1]);
                    txt += "#i" + bute[i][0] + "##z" + bute[i][0] + "# x " + bute[i][1] + "\r\n";
                }
                npc.meFlip().say(txt);
            } else {
                npc.meFlip().say("抱歉..只有週六跟週日才可以領獎勵");
            }
            break;

        case 6:
            txt = "";
            txt += "#b當前級別：#r" + stage.getLevel() + "\r\n";
            txt += "#b目標級別：#r250\r\n";
            txt += "#b經驗值收取費用：每 #r130#b 億 需 #r1 #樂豆 不夠130億按照130億算\r\n";
            var num = 0;
            for (var i = stage.getLevel(); i < 250; i++) {
                num += ExpGroup[i];
            }
            var max = (parseInt(num / 1E8) / 130);
            txt += "#b當前等級升至#r250#b級需要經驗值#r" + parseInt(num / 1E8) + "#b億,需樂豆#r " + (max).toFixed(2) + " #樂豆\r\n";
            txt += "#b是否立即升級？(#r連續升級可有卡頓請注意!#k)\r\n";
            yeno = npc.meFlip().askYesNo(txt);
            if (yeno != 1) return;
            if (stage.getLevel() >= 250) {
                npc.meFlip().say("抱歉..超過 250 禁止使用")
                return;
            }
            if (stage.getCurrency(1) < parseInt(max)) {
                npc.meFlip().say("抱歉..你沒有 " + max.toFixed(2) + " 樂豆");
                return;
            }
            stage.modifyCurrency(1, -parseInt(max));
            var levelmin = (250 - stage.getLevel());
            stage.setLevel(250);
            stage.modifyAp(levelmin * 5);
            npc.meFlip().say("恭喜 提升成功");
            break;

        case 7:
            var txt = "\r\n";
            txt += "#L0#紅色方塊#l\t#L1#每日核心#l\r\n";
            url = npc.meFlip().askMenu(txt);
            switch (url) {
                case 0:
                    var count = players.getEventValue(stage, db, "紅色方塊");
                    count += 1;
                    if (npc.meFlip().askYesNo("是否今日第 #r" + count + " #k購買#i5062009# x 10 消耗 " + 1E8 * count + " 楓幣嗎?") === 1) {
                        if (!stage.hasMesos(1E7 * count)) {
                            npc.meFlip().say("抱歉..你沒有 " + 1E7 * count + " 楓幣");
                            return;
                        }
                        players.addEventValue(stage, db, "紅色方塊");
                        stage.loseMesos(1E7 * count);
                        stage.gainItem(5062009, 10);
                        npc.meFlip().say("購買成功");
                    }
                    break;
                case 1:
                    var count = players.getEventValue(stage, db, "每日核心");
                    if (count > 0) {
                        npc.meFlip().say("今日領過了!!明日再光臨吧~");
                        return;
                    }
                    stage.gainItem(2630402, 10);
                    players.addEventValue(stage, db, "每日核心");
                    npc.meFlip().say("恭喜~今日核心已領！");
                    break;
            }
            break;
        /*
                case 7:
                    group = [
                        [4009548, 100],
                        [2636688, 5],
                        [2633616, 10],
                    ]
                    txt = "\r\n";
                    for (let i in group) {
                        txt += "#i" + group[i][0] + "##z" + group[i][0] + "# * " + group[i][1] + "\r\n"
                    }
                    if (npc.meFlip().askYesNo(txt) != 1) return;

                    if (!stage.isQuestCompleted(1488)) {
                        npc.meFlip().say("必須完成6轉才可以領!");
                        return;
                    }
                    if (players.getEventValue(stage, db, "六轉") > 0) {
                        npc.meFlip().say("抱歉..你領過了");
                        return;
                    }
                    players.addEventValue(stage, db, "六轉", 1, 3650);
                    for (let i in group) {
                        stage.gainItem(group[i][0], group[i][1]);
                    }
                    npc.meFlip().say("恭喜..領取成功");
                    break;
        */
        case 8:
            var bute = [
                [2433972, 2],
                [2472001, 10],
                [2023632, 5],
                [5062019, 20],
                [5062020, 20],
                [5062021, 10],
                [5062026, 10],
                [5062507, 20],
                [5062031, 20],
                [3010225, 1],
                [3018911, 1]

            ]
            var now = new Date();
            var currentDay = now.getDate();
            //stage.dropMessage(0x15, currentDay);
            if (currentDay != 5) {
                npc.meFlip().say("已過補領時間了!")
                return;
            }
            txt = "確定領當前補償獎勵嗎? (#r僅限當日有效#k)\r\n";
            for (let i in bute) {
                txt += "#i" + bute[i][0] + "# x " + bute[i][1] + " ";
            }
            txt += "\r\n";
            if (npc.meFlip().askYesNo(txt) == 1) {
                if (players.getEventValue(stage, db, "補領獎勵_5_1") > 0) {
                    npc.meFlip().say("抱歉..領過了");
                    return;
                }
                players.addEventValue(stage, db, "補領獎勵_5_1", 1, -1);
                for (let i in bute) {
                    stage.gainItem(bute[i][0], bute[i][1]);
                }
                npc.meFlip().say("領取成功~");
            }
            break;
    }
}

function isInputNaN(value) {
    return isNaN(value);
}

function convertToStandardDateFormat(dateStr) {
    // 移除末尾的 ".0"
    dateStr = dateStr.replace(".0", "");
    // 将空格替换为 "T"
    dateStr = dateStr.replace(" ", "T");
    return dateStr;
}

function calculateDaysSinceRegistration(stage, db) {
    var ret = db.select("SELECT `create_date` FROM `account` WHERE `id` = '" + stage.getAccountId() + "' LIMIT 0,1;");
    const registrationDateStr = convertToStandardDateFormat(String(ret[0].get("create_date")));
    const registrationDate = new Date(registrationDateStr);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - registrationDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}


function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}

function marinperiod(stage, util, item, date, use) {
    var timestamp = (new Date()).getTime();
    var toDrop = util.makeItem(item, 1);
    if (date <= 365) {
        toDrop.setExpireDate(timestamp + date * 24 * 60 * 60 * 1000);
    } else {
        toDrop.setExpireDate(timestamp + date);
    }
    if (use) {
        toDrop.setAttribute(8);
    }
    stage.gainItem(toDrop);
}