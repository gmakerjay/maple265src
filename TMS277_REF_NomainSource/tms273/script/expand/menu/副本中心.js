/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


/ global stage /


const icon = require('constant/icon');
const list = [
    [0, '組隊大廳', '組隊任務1'],
    // [1, '楓之高校', '楓之高校'],
    [4, '捉鬼活動', '捉鬼1'],
    [2, '記憶試煉', '記憶試煉'],
    [3, '沙漠跑商', '沙漠跑商'],
    [44, '控制之神', '控制之神'],
    [5, '武陵道場', '武陵道場'],
    [6, '復古副本', '復古炎魔'],
    // [7, '起源之塔', '起源之塔'],
];

// let str = "---------------------副本中心---------------------\r\n#fs14##e";
// str = `${icon.任務相關.推薦內容}\r\n` ;;
let str = "" + "#r#fn微軟雅黑##fs14##e#b[副本中心]#r#k#fs14##l\r\n";


for (let i in list) {
    str += `#L${list[i][0]}##fMap/MapHelper.img/mark/${icon.quest.party[list[i][2]]}#${list[i][1]}#l`
    if ((parseInt(i) + 1) % 2 == 0) {
        str += `\r\n`
    } else {
        str += `\t`;
    }
}
str += `\r\n\t\t\t#fs14##L999#${icon.common.home}返回主菜單#l`;
// if (stage.isGm()) {
//     str += `\r\n#L8#無限火力入口#l`;
// }

let selection = npc.askMenu(str)
switch (selection) {
    case 0:
        // stage.changeMap(100030301);//高校

        stage.runScript('expand/menu/組隊任務');
        // stage.changeMap(100030301);//高校
        break;
    case 1:
        stage.changeMap(744000000, 0);//高校
        break;
    case 2:
        stage.runScript("expand/menu/記憶試煉入口");//記憶試煉
        break;
    case 3:
        if (stage.getChannelId() == 3) {
            stage.changeMap(993000837, 0);
        } else {
            npc.say("沙漠貿易跑商只能在固定線路參與\r\n#r請前往頻道[3]開啟您的貿易之旅")
        }
        break;
    case 4:
        stage.runScript("expand/ghost_hunting")//控制之神
        break;
    case 44:
        stage.runScript("expand/menu/控制之神獎勵")//控制之神
        break;
    case 5:
        stage.changeMap(925020001, 0);//武陵
        break;
    case 6:
        
        stage.changeMap(993225502, 0);//起源之塔
        // stage.runScript("expand/menu/zsf無限火力");//無限火力
        break;
    case 7:
        stage.changeMap(992000000, 0);//起源之塔
        break;
    case 8:
        stage.runScript("expand/menu/無限火力入口");//風雨森林
        break;
    case 9:
        stage.runScript("expand/menu/金幣入口");//金幣副本
        break;
    case 10:
        stage.runScript("expand/menu/突破副本入口");//金幣副本
        break;
    case 11:
        stage.runScript("expand/menu/經驗副本");//金幣副本
        break;
    case 999:
        stage.runScript("expand/menu");//金幣副本
        break;
}
