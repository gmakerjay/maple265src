const BlackList = [1802655, 1802656, 1802657, 1802715, 1802715, 1802716, 1802771, 1802771, 1802772, 1802653, 1802653, 1802653, 1802653, 1802653, 1802653, 1802653
    , 1802100];

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

var first = firstStep();
if (first == 0) {
    //第二步選擇外形裝備
    var second = secondStep();
    if (second != 0) {
        //第三步 選擇副裝備
        var three = threeStep(second);
        if (three != 0) {
            var four = fourStep();
            if (four != 0) {
                var six = fiveStep(four);

            }
        }
    }
} else if (first == 1) {
    npc.say("請選擇外形道具.ps:第一個框。");
} else if (first == 999) {
    npc.say("無法進行這個操作,請設置第一框,第二個框后才能使用。");
}

function firstStep() {
    var sb = "";

    sb += ("#b┏　　　　　　　　" + Icon[17][1] + "  #r#e時裝鐵砧#b#n  " + Icon[17][1] + "　　　　　　　　┓#k\r\n\r\n");
    sb += ("　　　　#L" + 0 + "#" + Icon[1][1] + "#l外形  ");
    sb += ("#r#e<<<<<<#n#d");
    // sb+=(Icon[14][1] + Icon[14][1] + Icon[14][1] + Icon[14][1]);
    sb += ("#L" + 1 + "#" + Icon[1][1] + "#l屬性");
    sb += ("\r\n\r\n");
    sb += ("#b┗　　　　　　　　　　　　　　　　　　　　　　　　　┛#k\r\n\r\n");
    sb += (Icon[15][1] + " #d所需的基礎費用:抵用券 x 1000\r\n");
    sb += (Icon[15][1] + " #d第一個欄放入#r 外觀道具 #d，第二欄放入#b 屬性道具 #k\r\n");
    sb += (Icon[15][1] + " #d道具傳承后，#b 屬性道具 #k不會消失 屬性會轉移到到#r 外觀道具 #d中#k\r\n\r\n");
    //显示確定按鈕
    var lastBtn = Icon[13][1];
    sb += ("　　　　　　　　#L999#" + lastBtn + "#l\r\n\r\n\r\n");
    return npc.askMenu(sb.toString());
}

function secondStep() {
    //選擇裝備過程
    selectedPosition = 0;
    var sb = "";

    sb += ("#e#d請選擇需要外形的裝備：#n\r\n#g#e這不會消失哦！\r\n\r\n#b");

    newItemList = Array();
    for (var i = 1; i < 129; i++) {
        var item = stage.getItemBySlot(6, i);

        if (item == null) {
            continue;
        }
        if (item.getExpireDate() != 3439728000000) {
            continue;
        }
        //不是裝備過濾
        if (BlackList.includes(item.getItemId())) {
            continue;
        }
        if (item.getCuc() > 0) {
            continue;
        }
        //過濾已選裝備
        var flag = 0;
        for (var key in selectedList) {
            if (i == selectedList[key][0]) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            continue;
        }
        newItemList[i] = item.getItemId();
    }

    var xx = 0;
    var indexof = 0;
    for (var key in newItemList) {
        xx++;
        sb += ("#L" + key + "##v" + newItemList[key] + "#");
        if (indexof > 1 && indexof % 5 == 0) {
            sb += ("\r\n");
        }
        indexof++;
    }
    if (xx <= 0) {
        sb += ("#r沒有可以進行合成的裝備。#k");
    }
    return npc.askMenu(sb.toString());
}


//第三步選擇 副裝備
function threeStep(sel) {
    oneEquip = newItemList[sel];
    onePosition = sel;//主裝備的位置
    var sb = "";

    sb += ("#b┏　　　　　　　　" + Icon[17][1] + "  #r#e屬性傳承#b#n  " + Icon[17][1] + "　　　　　　　　┓#k\r\n\r\n");
    sb += ("　　　　　　#L" + 0 + "##v" + newItemList[sel] + "##l  ");
    // sb+=(Icon[14][1] + Icon[14][1] + Icon[14][1] + Icon[14][1]);
    sb += ("#r#e<<<<<<#n#d");
    sb += ("#L" + 1 + "#" + Icon[1][1] + "#l");
    sb += ("\r\n\r\n");
    sb += ("#b┗　　　　　　　　　　　　　　　　　　　　　　　　　┛#k\r\n\r\n");


    sb += (Icon[15][1] + " #d所需的基礎費用:抵用券 x 1000\r\n");
    sb += (Icon[15][1] + " #d第一個欄放入#r 外觀道具 #d，第二欄放入#b 屬性道具 #k\r\n");
    sb += (Icon[15][1] + " #d道具傳承后，#b 屬性道具 #k不會消失 屬性會轉移到到#r 外觀道具 #d中#k\r\n\r\n");
    //显示確定按鈕
    var lastBtn = Icon[13][1];
    return npc.askMenu(sb.toString());
}


function fourStep() {
    //選擇裝備過程
    selectedPosition = 0;
    var sb = "";

    sb += ("#e#d請選擇需要 屬性 的裝備：#n\r\n#g#e這個會消失哦！\r\n\r\n#b");

    selectedList = Array();
    for (var i = 1; i < 129; i++) {
        var item = stage.getItemBySlot(6, i);

        if (item == null) {
            continue;
        }
        if (onePosition == i) {
            continue;//說明是第一件裝備
        }
        if (item.getExpireDate() != 3439728000000) {
            continue;
        }
        //過濾時裝裝備
        if (BlackList.includes(item.getItemId())) {
            continue;
        }
        if (item.getCuc() > 0) {
            continue;
        }
        //2種裝備類型不同
        if (getItemType(item.getItemId()) != getItemType(newItemList[onePosition])) {
            continue;
        }//副裝備過濾過程
        if (selectedPosition != 0) {
            //過濾類型
            var getMasterItemType = getItemType(selectedList[0][1]);
            var getViceItemType = getItemType(item.getItemId());
            //如果屬於上衣\褲子\套裝
            if (getMasterItemType != getViceItemType) {
                continue;
            }
        }
        //過濾已選裝備
        var flag = 0;
        for (var key in selectedList) {
            if (i == selectedList[key][0]) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            continue;
        }
        selectedList[i] = item.getItemId();
    }

    var xx = 0;
    var indexof = 0;
    for (var key in selectedList) {
        xx++;
        sb += ("#L" + key + "##v" + selectedList[key] + "#");
        if (indexof > 1 && indexof % 5 == 0) {
            sb += ("\r\n");
        }
        indexof++;
    }
    if (xx <= 0) {
        sb += ("#r沒有可以進行合成的裝備。#k");
    }
    return npc.askMenu(sb.toString());

}


function fiveStep(sel) {
    var sb = "";

    sb += ("#b┏　　　　　　　　" + Icon[17][1] + "  #r#e屬性傳承#b#n  " + Icon[17][1] + "　　　　　　　　┓#k\r\n\r\n");
    sb += ("　　　　　　#L" + 0 + "##v" + newItemList[onePosition] + "##l  ");
    // sb+=(Icon[14][1] + Icon[14][1] + Icon[14][1] + Icon[14][1]);
    sb += ("#r#e<<<<<<#n#d");
    sb += ("#L" + 1 + "##v" + selectedList[sel] + "##l");
    sb += ("\r\n\r\n");
    sb += ("#b┗　　　　　　　　　　　　　　　　　　　　　　　　　┛#k\r\n\r\n");


    sb += (Icon[15][1] + " #d所需的基礎費用:抵用券 x 1000\r\n");
    sb += (Icon[15][1] + " #d第一個欄放入#r 外觀道具 #d，第二欄放入#b 屬性道具 #k\r\n");
    sb += (Icon[15][1] + " #d道具傳承后，#b 屬性道具 #k不會消失 屬性會轉移到到#r 外觀道具 #d中#k\r\n\r\n");
    //显示確定按鈕
    var lastBtn = Icon[16][1];
    sb += ("　　　　　　　　#L999#" + lastBtn + "#l\r\n\r\n\r\n");
    var six = npc.askMenu(sb.toString());

    if (six == 999) {
        //屬性
        var viceItemId = selectedList[sel];
        var viceItemPosition = sel;
        var masterItem = stage.getItemBySlot(6, viceItemPosition);
        //外形
        var masterItemId = newItemList[onePosition];
        var masterItemPosition = onePosition;
        var equipItem = stage.getItemBySlot(6, onePosition);

        var yes = npc.askYesNo("此操作會轉移屬性,您確定要這樣操作嗎？");
        if (yes == 1) {
            //
            var type = Math.floor(masterItemId / 10000);
            var itemFilter = Array(
                1112002,//純愛戀人戒指
                1112003,//丘比特戒指
                1112015,//白金戒指
                1112005,//維納斯戒指
                1112006,//聖十字架戒指
                1112013,//愛情紅線戒指
                1112812,//我的麻吉好友
                1112810,//聖誕夜響叮噹
                1112811,//聖誕華麗派對
                1112816,//雪晶球戒指
                1112014,//熱吻情侶戒指
                1112822,//夢幻懸浮戒指
                1112802	//閃星摯友戒指
            )
            for (var i = 0; i < itemFilter.length; i++) {
                if (masterItemId == itemFilter[i]) {
                    npc.say("無法幻化基友，情侶戒指！");
                    return;
                }
            }
            if (stage.getCurrency(2) >= 1000) {
                stage.modifyCurrency(2, -1000);
                let mock = util.makeItem(equipItem.getItemId(), 1);
                let mock2 = util.makeItem(masterItem.getItemId(), 1);
                equipItem.setBaseStr(mock.getBaseStr() + masterItem.getBaseStr() - mock2.getBaseStr());
                equipItem.setBaseDex(mock.getBaseDex() + masterItem.getBaseDex() - mock2.getBaseDex());
                equipItem.setBaseInt(mock.getBaseInt() + masterItem.getBaseInt() - mock2.getBaseInt());
                equipItem.setBaseLuk(mock.getBaseLuk() + masterItem.getBaseLuk() - mock2.getBaseLuk());
                equipItem.setPad(mock.getPad() + masterItem.getPad() - mock2.getPad());
                equipItem.setMad(mock.getMad() + masterItem.getMad() - mock2.getMad());
                stage.updateItemBySlot(6, onePosition);
                masterItem.setBaseStr(mock2.getBaseStr());
                masterItem.setBaseDex(mock2.getBaseDex());
                masterItem.setBaseInt(mock2.getBaseInt());
                masterItem.setBaseLuk(mock2.getBaseLuk());
                masterItem.setPad(mock2.getPad());
                masterItem.setMad(mock2.getMad());
                stage.updateItemBySlot(6, viceItemPosition);
                util.broadcastChatMsg(8, "[暖暖中心] : 恭喜 " + stage.getCharacterName() + " 進行了屬性轉移 進行了時裝屬性轉換!!!!!");
                var txt = "傳承成功！\r\n"; //em.broadcastWeatherEffectNotice
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