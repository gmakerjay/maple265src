/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var vvv4 = "#fEffect/CharacterEff/1112926/0/0#"; //紅星


var text = "\t\t\t\t#e#r星語谷造型中心#k\r\n";
text += `\r\n#L0#人物髮型#k#l`;
text += `\r\n#L1#人物臉型#k#l`;
text += `\r\n#L2#機器人造型#k#l`;
text += `\r\n#L3#髮型拯救#k#l`;
text += `\r\n#L4#臉型拯救#k#l`;
text += `\r\n#L5#美容美髮商店#k#l`;
text += `\r\n#L6#變更膚色#l`;

let selection = npc.askMenu(text);
switch (selection) {
    case 0:
        stage.runScript("expand/menu/美容美髮/代碼髮型");
        break;
    case 1:
        stage.runScript("expand/menu/美容美髮/代碼臉型");
        break;
    case 2:
        stage.runScript("expand/menu/美容美髮/機器人整形");
        break;
    case 3:
        stage.runScript("expand/menu/美容美髮/髮型拯救");
        break;
    case 4:
        stage.runScript("expand/menu/美容美髮/臉型拯救");
        break;
    case 5:
        stage.runScript("expand/menu/美容美髮/美容美髮商店");
        break;
    case 6:
        let skin = [1, 0, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        res = npc.showType(0).styles(skin).cardId(0).askAvatar("我能把你現在的膚色變更。你對現在的膚色不厭倦嗎?,我幫你換膚色。慢慢挑選你想要的膚色吧~");
        res = res[0];
        stage.setSkin(skin[res]);
        stage.addPopupSay(1530607, 1300, "恭喜 ~ 造型改變完成 !", "", false);
        break;

}