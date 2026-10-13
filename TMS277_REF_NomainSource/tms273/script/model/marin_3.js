/* marin 脚本订制 技术顾问 50009219 */
let marin = exports;

var a = "#fUI/UIWindow7/ATGaugeUI/element3#";
var b = "#fUI/UIWindow7/ATGaugeUI/element2#";
var c = "#fUI/UIWindowEvent/MutoDiary/Muto_partner/partner/2/3#";
var d = "#fUI/UIWindowEvent/MutoDiary/Muto_partner/partner/1/0#";
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var 星星 = "#fUI/UIWindow4/pointShop/100658/iconShop#";
var 球 = "#fUI/UIWindow4/flagRanking/button:Backward/mouseOver/0#";
var 紫 = "#fUI/UIWindow7/ATGaugeUI/element3#";
var 黃 = "#fUI/UIWindow7/ATGaugeUI/element2#";
var 青 = "#fUI/UIWindow7/ATGaugeUI/element1#";
var 一 = "#fUI/UIWindow8/balanceAndAvoid/gaugeBar/number/1#";
var 二 = "#fUI/UIWindow8/balanceAndAvoid/gaugeBar/number/2#";
var 三 = "#fUI/UIWindow8/balanceAndAvoid/gaugeBar/number/3#";
var 四 = "#fUI/UIWindow8/balanceAndAvoid/gaugeBar/number/4#";
var 五 = "#fUI/UIWindow8/balanceAndAvoid/gaugeBar/number/5#";
var 六 = "#fUI/UIWindow8/balanceAndAvoid/gaugeBar/number/6#";
var 七 = "#fUI/UIWindow8/HundredShooting/number/1#";
var 八 = "#fUI/UIWindow8/HundredShooting/number/2#";
var 九 = "#fUI/UIWindow8/HundredShooting/number/3#";
var 六月 = "#fUI/UIWindowTW.img/HappyDay/month/6#";
var 七月 = "#fUI/UIWindowTW.img/HappyDay/month/7#";
var N = "#fItem/Install/03018.img/03018345/info/icon#";
var D = "#fUI/UIWindowPL.img/ELUNA_Info/AchieveGrade/images/D#";
var C = "#fUI/UIWindowPL.img/ELUNA_Info/AchieveGrade/images/C#";
var B = "#fUI/UIWindowPL.img/ELUNA_Info/AchieveGrade/images/B#";
var A = "#fUI/UIWindowPL.img/ELUNA_Info/AchieveGrade/images/A#";
var S = "#fUI/UIWindowPL.img/ELUNA_Info/AchieveGrade/images/S#";
var F = "#fUI/UIWindow2.img/MobGage/Mob/8860000#";
var f = "#fUI/UIWindow2.img/MobGage/Mob/8800000#";
var g = "#fUI/UIWindow2.img/MobGage/Mob/8810018#";
var h = "#fUI/UIWindow2.img/MobGage/Mob/8840000#";
var H = "#fUI/UIWindow2.img/MobGage/Mob/8870000#";
var j = "#fUI/UIWindow2.img/MobGage/Mob/9410248#";
var k = "#fUI/UIWindow2.img/MobGage/Mob/8645285#";
var l = "#fUI/UIWindow2.img/MobGage/Mob/8820001#";
var z = "#fUI/UIWindow2.img/MobGage/Mob/9450022#";
var x = "#fUI/UIWindow2.img/MobGage/Mob/9390600#";
var e = "#fUI/UIWindow2.img/MobGage/Mob/8240098#";
var r = "#fUI/UIWindow2.img/MobGage/Mob/8880100#";
var t = "#fUI/UIWindow2.img/MobGage/Mob/8880140#";
var y = "#fUI/UIWindow2.img/MobGage/Mob/2600800#";
var u = "#fUI/UIWindow2.img/MobGage/Mob/8644655#";
var i = "#fUI/UIWindow2.img/MobGage/Mob/8645009#";
var tt = "#fUI/UIWindow2.img/MobGage/Mob/8880405#";
var ttt = "#fUI/UIWindow2.img/MobGage/Mob/8880502#";
var ttr = "#fUI/UIWindow2.img/MobGage/Mob/8880600#";
var ttb = "#fUI/UIWindow2.img/MobGage/Mob/8880800#";
var ttx = "#fUI/UIWindow2.img/MobGage/Mob/8880200#";
var ttc = "#fUI/UIWindow2.img/MobGage/Mob/8880000#";
var ttv = "#fUI/UIWindow2.img/MobGage/Mob/8500001#";
var ttf = "#fUI/UIWindow2.img/MobGage/Mob/8880837#";


var monstermaps = Array(
    Array(101030000, 0, " 巨大的樹木 #r(適合等級 10~45)#b", 10, 45),
    Array(105010000, 0, " 寧靜的沼澤 #r(適合等級46~82）#b", 46, 82),
    Array(240010000, 0, " 神木村西邊森林 #r(適合等級 83~115)#b", 83, 115),
    Array(250020300, 0, " 上級修煉場 #r(適合等級 116~150)#b", 116, 150),
    Array(103041119, 0, " 2樓咖啡廳 #r(適合等級 151~170)#b", 151, 170),
    Array(271030600, 0, " 榮譽殿堂 #r(適合等級 171~190)#b", 171, 190),
    Array(273040100, 0, " 被遺棄的挖掘地區2 #r(適合等級 191~200)#b", 191, 200),
    Array(450001210, 0, " 三岔路1 #r(適合等級 201~210)#b", 201, 210),
    Array(450014300, 0, " 隱藏研究列車 #r(適合等級 205~210)#b", 205, 210),
    Array(450002010, 0, " 啾樂森林深處 #r(適合等級 211~220)#b", 211, 220),
    Array(450015290, 0, " 隱藏伊利亞特平原 #r(適合等級 215~225)#b", 215, 225),
    Array(450003440, 0, " 顯露本色之處3 #r(適合等級 221~230)#b", 221, 230),
    Array(450005430, 0, " 洞穴的下路 #r(適合等級 225~235)#b", 225, 235),
    Array(450006210, 0, " 影子跳舞處2 #r(適合等級 231~240)#b", 231, 240),
    Array(450007120, 0, " 鏡光大海3 #r(適合等級 235~245)#b", 235, 245),
    Array(450016260, 0, " 星星被吞噬的深海6 #r(適合等級 241~250)#b", 241, 250),
    Array(450009360, 0, " 虛空海浪6 #r(適合等級 251~255)#b", 251, 255),
    Array(450011640, 0, " 苦痛迷宮最深處5 #r(適合等級 256~260)#b", 256, 260),
    Array(450012440, 0, " 世界終結之處2-5 #r(適合等級 261~265)#b", 261, 265),
    Array(410000880, 0, " 燃燒的王立圖書館第5區域 #r(適合等級 266~270)#b", 266, 270),
    Array(410007002, 0, " 通往城門的路 1 #r(適合等級 271~300)#b", 271, 300),
    Array(410007006, 0, " 被佔領的巷道 1 #r(適合等級 271~300)#b", 276, 300),
    Array(410007015, 0, " 大門深鎖的實驗室 1 #r(適合等級 276~300)#b", 271, 300)
);

var townmaps = Array(
    Array(450001016, 0, " 『 消失的旅途（#r全區域掉落#b)·#i" + 1712001 + "# 』"),
    Array(450002016, 0, " 『 啾啾艾爾蘭（#r全區域掉落#b) ·#i" + 1712002 + "#』"),
    Array(450003400, 0, " 『 拉契爾恩（#r全區域掉落#b) ·#i" + 1712003 + "#』"),
    Array(450005500, 0, " 『 阿爾卡娜（#r全區域掉落#b) ·#i" + 1712004 + "#』"),
    Array(450006430, 0, " 『 魔拉斯（#r全區域掉落#b) ·#i" + 1712005 + "#』"),
    Array(450007230, 0, " 『 艾斯佩拉（#r全區域掉落#b) ·#i" + 1712006 + "#』"),
    Array(410000610, 0, " 『 原初之力Ⅰ ·#i" + 1713000 + "#』"),
    Array(410003070, 0, " 『 原初之力Ⅱ ·#i" + 1713001 + "#』"),
    Array(450001016, 0, " 『 原初之力Ⅲ ·#i" + 1713002 + "#』")
);

var bossmap = Array(
    Array(272020110, 0, " " + F + "#d『 阿卡伊農-阿卡伊勒祭壇前面 』"),
    Array(211042300, 0, " " + f + "『 殘暴炎魔-通往殘暴炎暴炎魔之門』"),
    Array(240050400, 0, " " + g + "『 暗黑龍王-暗黑龍王洞穴入口』"),
    Array(211070000, 0, " " + h + "『 凡雷恩-接見室走廊』"),
    Array(262030000, 0, " " + H + "『 希拉-希拉之塔入口』"),
    Array(807300100, 0, " " + j + "『 森蘭丸-通向秘密祭壇的路』"),
    Array(271040000, 0, " " + k + "『 西格諾斯-希納斯的庭院』"),
    Array(270050000, 0, " " + l + "『 皮卡啾-忘卻的黃昏』"),
    Array(221030900, 0, " " + ttx + "『 卡翁-UFO內部操縱室』"),
    Array(220080000, 0, " " + ttv + "『 鬧鐘-時間塔的隱秘場所』"),
    Array(401060000, 0, " " + ttc + "『 暴君-赫里希安最上層人口』"),
    Array(811000999, 0, " " + z + "『 濃姬-比叡山本堂前』"),
    Array(863000100, 0, " " + x + "『 培儸德-愛心樹的記憶』"),
    Array(350060300, 0, " " + e + "『 斯烏-核心入口』"),
    Array(105300303, 0, " " + r + "『 戴米安-頂端的通路』"),
    Array(450004000, 0, " " + t + "『 露西妲-惡魔時間塔』"),
    Array(450007240, 0, " " + y + "『 威爾-鏡光神座』"),
    Array(450009301, 0, " " + u + "『 大眼-虛空之眼的前方』"),
    Array(450012200, 0, " " + i + "『 親衛隊長-靠近盡頭之處前方』"),
    Array(450011990, 0, " " + tt + "『 真·希拉-欲望祭壇入口』"),
    Array(450012500, 0, " " + ttt + "『 黑魔法師-巨人的心臟』"),
    Array(410000670, 0, " " + ttr + "『 賽蓮-王宮大殿』"),
    Array(410005005, 0, " " + ttb + "『 監視者卡洛斯-卡羅泰摩天塔』"),
    Array(410007025, 0, " " + ttf + "『 咖凌-桃源境』")
);
marin.askMaps = function (npc, stage) {
    var txt = "\r\n";
    txt += "#e#d#L0#練級地圖#l\r\n";
    txt += "#e#d#L3#首領地圖#l\r\n";
    txt += "#e#d#L4#副本地圖#l\r\n";
    txt += "#e#d#L1#遊戲地圖#l\r\n";
    txt += "#e#d#L5#結婚地圖#l\r\n";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            var txt = "#d你當前等級 #r" + stage.getLevel() + " 級#d 根據您的等級推薦以下圖\r\n";
            var lv = stage.getLevel();
            for (var i in monstermaps) {
                switch (true) {
                    case lv >= monstermaps[i][3] && lv <= monstermaps[i][4]:
                        txt += "#b#L" + i + "#" + monstermaps[i][2] + "#l\r\n";
                        break;
                }
            }
            txt += "\r\n#d以下地圖您可以進入\r\n\r\n";
            for (var i in monstermaps) {
                switch (true) {
                    case lv >= monstermaps[i][3] && lv <= monstermaps[i][4]:
                        break;
                    default:
                        txt += "#b#L" + i + "#" + monstermaps[i][2] + "#l\r\n";
                        break;
                }
            }
            url = npc.meFlip().askMenu(txt);
            break;
        case 1:
            stage.runScript("expand/test_game");
            break;
        case 3:
            var selStr = "\r\n";
            for (var i in bossmap) {
                selStr += "#L" + i + "#" + bossmap[i][2] + "#l\r\n";
            }
            url = npc.meFlip().askMenu(selStr);
            break;
        case 4:
            var txt = "請選擇要前往的副本：\r\n";
            txt += "\r\n";
            txt += "#d#e#L6#世界戰狼#l\r\n";
            txt += "#d#e#L5#怪物公園#l\r\n";
            txt += "#d#e#L4#地下水道#l\r\n";
            txt += "#d#e#L0#武陵道館#l\r\n";
            //txt += "#d#e#L1#緣野仙蹤#l\r\n";
            //txt += "#d#e#L2#沙漠貿易#l\r\n";
            //txt += "#d#e#L3#控制之冠#l\r\n";
            url = npc.meFlip().askMenu(txt);

            switch (url) {
                case 0:
                    stage.changeMap(925020001, 0);
                    break;
                case 1:
                    stage.changeMap(992000000, 0);
                    break;
                case 2:
                    return;
                    if (party != null) {
                        npc.meFlip().say("沙漠貿易只能一個人進行參與 請退出組隊");
                        return;
                    }
                    if (npc.meFlip().askYesNo("是否立即開始沙漠貿易?") == 1) {
                        if (npc.makeEvent("tradeking", false, player) == null) {
                            npc.meFlip().say("发生未知错误！");
                        }
                    }
                    break;
                case 3:
                    stage.changeMap(993001000, 0);
                    break;
                case 4:
                    stage.changeMap(941000000, 0);
                    break;
                case 5:
                    stage.changeMap(951000000, 0);
                    break;
                case 6:
                    //stage.changeMap(450006130, 0);
                    stage.runScript("expand/warwoif")
                    break;
            }
            return;
        case 5:
            stage.changeMap(680000000, 0);
            break;
    }

    switch (sel) {
        case 0:
            var yeno = npc.meFlip().askYesNo("看來這裡的事情都已經處理完了啊。您真的要移動嗎？");
            break;

        case 2:
            var yeno = npc.meFlip().askYesNo("看來這裡的事情都已經處理完了啊。您真的要移動嗎？");
            break;
        case 3:
            var yeno = npc.meFlip().askYesNo("看來這裡的事情都已經處理完了啊。您真的要移動嗎？");
            break;
    }
    if (yeno != 1) return;
    switch (sel) {
        case 0:
            stage.changeMap(monstermaps[url][0], 0);
            break;
        case 2:
            stage.changeMap(townmaps[url][0], 0);
            break;
        case 3:
            stage.changeMap(bossmap[url][0], 0);
            break;
    }
}