/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


var cost = 0;
//裝備槽順序
var selectedPosition = 0;
//被選擇的裝備列表
var selectedList = Array();
var Icon = Array(
    Array("方框", "#fUI/UIWindow.img/Item/New/inventory/0#"),
    Array("方框", "#fUI/UIWindow.img/Item/activeExpChairIcon#"),
    Array("鎚子", "#fUI/Basic.img/Cursor/32/0#"),
    Array("數值", "#fUI/Basic.img/LevelNo/0#"),
    Array("數值", "#fUI/Basic.img/LevelNo/1#"),
    Array("數值", "#fUI/Basic.img/LevelNo/2#"),
    Array("數值", "#fUI/Basic.img/LevelNo/3#"),
    Array("數值", "#fUI/Basic.img/LevelNo/4#"),
    Array("數值", "#fUI/Basic.img/LevelNo/5#"),
    Array("數值", "#fUI/Basic.img/LevelNo/6#"),
    Array("數值", "#fUI/Basic.img/LevelNo/7#"),
    Array("數值", "#fUI/Basic.img/LevelNo/8#"),
    Array("數值", "#fUI/Basic.img/LevelNo/9#"),
    Array("確認", "#fUI/CashShop.img/CSCoupon/BtOK/disabled/0#"),
    Array("箭頭", "#fUI/Basic.img/icon/arrow#"),
    Array("箭頭", "#fUI/UIWindow.img/Quest/icon2/0#"),
    Array("確認", "#fUI/CashShop.img/CSCoupon/BtOK/normal/0#"),
    Array("王冠", "#fUI/GuildMark/Mark/Etc/00009023/11#"),
    Array("王冠", "#fUI/GuildMark/Mark/Etc/00009023/10#")
);
fiveStep()

function fiveStep() {
    var sb = "";

    sb += ("#b┏　　　　　　　　" + Icon[17][1] + "  #r#e時裝鐵砧#b#n  " + Icon[17][1] + "　　　　　　　　┓#k\r\n\r\n");

    sb += (Icon[15][1] + " #d所需的基礎費用:抵用券 x 1000\r\n");
    sb += (Icon[15][1] + " #d第一個欄放入#r主道具 #d，第二欄放入#b 外觀道具 #k\r\n");
    sb += (Icon[15][1] + " #d道具傳承后，#b 道具 #k不會消失 外觀會複製到到#r 主道具 #d中#k\r\n\r\n一定要用種類位置道具");
    //显示確定按鈕
    var lastBtn = Icon[16][1];
    sb += ("　　　　　　　　#L999#" + lastBtn + "#l\r\n\r\n\r\n");
    var six = npc.askMenu(sb.toString());

    if (six == 999) {

        var yes = npc.askYesNo("您確定要這樣操作嗎？");
        if (yes == 1) {
            //

            if (stage.getCurrency(2) >= 1000) {
                stage.modifyCurrency(2, -1000);
                let mock = stage.getFreeSlot(6, 1);
                let mock2 = stage.getFreeSlot(6, 2);
                if (mock == null || mock2 == null) {
                    npc.say(" #d第一個欄放入#r主道具 #d，第二欄放入#b 外觀道具 #k\r\n");
                    return;
                }
                if (getItemType(mock.getItemId()) != getItemType(mock2.getItemId())) {
                    npc.say("#r兩件裝備類型不同，請重新確認裝備欄第一格和第二格裝備！#k\r\n#b(栗如：披風只能和披風之間進行幻化)#k");
                    return;
                }
                //修改外形裝
                mock['skin'] = mock2['itemId'].toString().slice(-4);

// player.updateItem(toDrop);
                stage.updateItemBySlot(6, 1);
                // player.showSystemMessage(mock.getItemSkin());
                // player.showSystemMessage(mock2.getItemSkin());
                var txt = "鐵砧成功！\r\n"; //em.broadcastWeatherEffectNotice
                // map.blowWeatherEffectNotice("[時裝鐵砧] : 恭喜 " + player.getName() + " 進行了時裝鐵砧 進行了時裝屬性轉換!!!!!", 133, 60000);
                npc.say(txt);
            } else {
                npc.say("您需要1000抵用券");
            }
        }


    } else {
        npc.say("選擇后無法更換,如需更換請重新打開此功能!");
    }

}


//獲取裝備類型
function getItemType(itemid) {
    var type = Math.floor(itemid / 10000);
    switch (type) {
        case 100:
            return 0; //帽子
        case 104:
            return 1; //上衣
        case 105:
            return 2; //套裝
        case 106:
            return 3; //褲裙
        case 107:
            return 4; //鞋子
        case 108:
            return 5; //手套
        case 110:
            return 6; //披風
        case 115:
            return 13; //護肩
        case 111:
            return 9; //ring
        case 112:
            return 10; //戒指
        case 113:
            return 11;//腰帶
        case 103:
            return 12; //耳環
        case 101:
            return 14;
        case 102:
            return 16;

        default:
            if (type == 120) return -1; //圖騰
            if (type == 119) return -1; //徽章
            if (type == 135) return -1; //副手
            if (type == 171) return -1; //神秘
            if (type == 116) return -1; //口袋
            if (type == 114) return -1; //稱號
            if (type == 167) return -1; //心臟
            var type = Math.floor(type / 10);
            if (type == 12 || type == 13 || type == 14 || type == 15 || type == 17) {
                return 7; //武器
            }
            return -1;
    }
}
