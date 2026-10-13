/*@Ruin 50009219
 * */

let TIME = [];
let Cn = java.util.Calendar.getInstance();
TIME[0] = Cn.get(java.util.Calendar.HOUR_OF_DAY);/* 小時 */
TIME[1] = Cn.get(java.util.Calendar.MINUTE);/* 分鐘 */
TIME[2] = Cn.get(java.util.Calendar.SECOND);/* 秒 */
TIME[3] = Cn.get(java.util.Calendar.WEEK_OF_YEAR);/* 年周 */
TIME[4] = Cn.get(java.util.Calendar.DAY_OF_WEEK);/* 當前周 */


let Icon = [
    ["三角", "#fUI/StatusBar.img/base/iconMemo#"],
    ["獎盃", "#fUI/UIAchievement.img/achievement/pages/main/achievementForm/basic/difficultyIcon/unique#"],
    ["王冠", "#fUI/GuildMark/Mark/Etc/00009023/11#"],
    ["大錘", "#fEffect/CharacterEff.img/MeisterEff/Equipment/10#"],
    ["翅膀", "#fEffect/ItemEff.img/1102982/effect/proneStab/1#"],
    ["奔跑", "#fEffect/ItemEff.img/1103020/effect/move/1#"],
    ["翅膀", "#fEffect/ItemEff.img/1102982/effect/default/4#"]
]


RuinStrat();

function RuinStrat() {
    if (!player.isGm()) {
        stage.dropAlertNotice("抱歉...不是管理員不能使用");
        return;
    }
    txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
    txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
    txt += "#L0#" + Series(0, 1) + " #b[　#r物品類型#b　]　#d只發送正在遊戲內的玩家#l\r\n";
    txt += "#L1#" + Series(0, 2) + " #b[　#r抵用類型#b　]　#d只發送正在遊戲內的玩家#l\r\n";
    txt += "#L2#" + Series(0, 3) + " #b[　#r金幣類型#b　]　#d只發送正在遊戲內的玩家#l\r\n";
    txt += "#L3#" + Series(0, 4) + " #b[　#r經驗類型#b　]　#d只發送正在遊戲內的玩家#l\r\n";
    let sel = npc.meFlip().askMenu(txt);


    switch (sel) {
        case 0:
            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b[　#r物品類型#b　]　#d請輸入你想發送的物品ID\r\n ";
            A = npc.askText(txt, "", 1, 10);
            if (GetItemName(A) == null) {
                stage.dropAlertNotice("抱歉..輸入的ID不正確");
                return;
            }
            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送物品 : #r#z" + A + "#\r\n";
            txt += "　" + Series(0, 2) + " #b[　#r物品數量#b　]　#d請輸入發送的數量\r\n ";
            B = npc.askText(txt, "", 1, 10);

            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送物品 : #r#z" + A + "#\r\n";
            txt += "　" + Series(0, 2) + " #b發送數量 : #r" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b[　#r發送標題#b　]　#d請輸入發送的標題\r\n ";
            C = npc.askText(txt, "", 1, 99);

            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送物品 : #r#z" + A + "#\r\n";
            txt += "　" + Series(0, 2) + " #b發送數量 : #r" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b發送標題 : #d" + C + "\r\n";
            txt += "　" + Series(0, 4) + " #b[　#r保存時間#b　]　#d請輸入保存時間 單位 ( #r天#d )\r\n ";
            D = npc.askText(txt, "", 1, 10);

            txt = "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送物品 : #r#z" + A + "#\r\n";
            txt += "　" + Series(0, 2) + " #b發送數量 : #r" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b發送標題 : #d" + C + "\r\n";
            txt += "　" + Series(0, 4) + " #b保存時間 : #d" + D + "\r\n";
            txt += "\r\n";
            txt += "\t\t\t\t#r確認發送了嗎?\r\n ";
            npc.meFlip().sayNext(txt);

            npc.addItemReward(A, B, C, D);
            stage.dropAlertNotice("發送結束");
            break;


        case 1:
            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b[　#r抵用類型#b　]　#d請輸入你想發送的數量\r\n ";
            A = npc.askText(txt, "", 1, 10);


            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 3) + " #b[　#r發送標題#b　]　#d請輸入發送的標題\r\n ";
            B = npc.askText(txt, "", 1, 99);

            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 3) + " #b發送標題 : #d" + B + "\r\n";
            txt += "　" + Series(0, 4) + " #b[　#r保存時間#b　]　#d請輸入保存時間 單位 ( #r天#d )\r\n ";
            C = npc.askText(txt, "", 1, 10);

            txt = "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 3) + " #b發送標題 : #d" + B + "\r\n";
            txt += "　" + Series(0, 4) + " #b保存時間 : #d" + C + "\r\n";
            txt += "\r\n";
            txt += "\t\t\t\t#r確認發送了嗎?\r\n ";
            npc.meFlip().sayNext(txt);

            npc.addCSPointReward(A, B, C);
            stage.dropAlertNotice("發送結束");
            break;

        case 2:
            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b[　#r金幣類型#b　]　#d請輸入你想發送的數量\r\n ";
            A = npc.askText(txt, "", 1, 10);


            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 2) + " #b[　#r發送標題#b　]　#d請輸入發送的標題\r\n ";
            B = npc.askText(txt, "", 1, 99);

            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 2) + " #b發送標題 : #d" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b[　#r保存時間#b　]　#d請輸入保存時間 單位 ( #r天#d )\r\n ";
            C = npc.askText(txt, "", 1, 10);

            txt = "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 2) + " #b發送標題 : #d" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b保存時間 : #d" + C + "\r\n";
            txt += "\r\n";
            txt += "\t\t\t\t#r確認發送了嗎?\r\n ";
            npc.meFlip().sayNext(txt);

            npc.addMesosReward(A, B, C);
            stage.dropAlertNotice("發送結束");
            break;

        case 3:
            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b[　#r經驗類型#b　]　#d請輸入你想發送的數量\r\n ";
            A = npc.askText(txt, "", 1, 10);


            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 2) + " #b[　#r發送標題#b　]　#d請輸入發送的標題\r\n ";
            B = npc.askText(txt, "", 1, 99);

            txt = "\t\t\t\t" + Icon[3][1] + "\r\n";
            txt += "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 2) + " #b發送標題 : #d" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b[　#r保存時間#b　]　#d請輸入保存時間 單位 ( #r天#d )\r\n ";
            C = npc.askText(txt, "", 1, 10);

            txt = "\t\t\t\t\t#r管理員設置中心#k\r\n\r\n";
            txt += "　" + Series(0, 1) + " #b發送數量 : #r" + A + "\r\n";
            txt += "　" + Series(0, 2) + " #b發送標題 : #d" + B + "\r\n";
            txt += "　" + Series(0, 3) + " #b保存時間 : #d" + C + "\r\n";
            txt += "\r\n";
            txt += "\t\t\t\t#r確認發送了嗎?\r\n ";
            npc.meFlip().sayNext(txt);

            npc.addExpReward(A, B, C);
            stage.dropAlertNotice("發送結束");
            break;
    }
}

function Series(type, int) {
    switch (type) {
        case 0:
            return "#fUI/Basic/LevelNo/" + int + "#";

        case 1:
            return "#fEffect/BasicEff/scout/num/count/" + int + "#";

        case 2:
            return "#fEffect/BasicEff/NoNewPlus/" + int + "#";

        case 3:
            return "#fUI/Login/RaceSelect_new/deny_login/number/" + int + "#";

        case 4:
            return "#fUI/UIWindow6/attackerSetting/NumberSources/Minus/" + int + "#";
    }
}

function GetItemName(id) {
    Eq = util.makeItem(id);
    if (Eq == null) {
        return null
    } else {
        return Eq['itemName'];
    }
}