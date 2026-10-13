/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let icon = require('icon');
let menu = [
    ['每日符文', 0],
    ['月卡尋寶', 1],
    ['野外懸賞', 2],
    ['膜拜大佬', 3],
]

execute();

function execute() {
    let txt = '#r#fn微軟雅黑##fs14##e#b[每日任務]#r#k#fs12##l\r\n';
    for (let i in menu) {
        txt += "#L" + i + "#" + menu[i][0] + "#l";
        if (i % 4 === 3) txt += "\r\n\r\n";
    }
    txt += "\t\t\t\t\t\t\t\t#fs14##L999#" + icon.entry[1][1] + " 返回主菜單#l\r\n";
    let sel = npc.meFlip().askMenu(txt);
    switch (sel) {
        case 999:
            stage.runScript('expand/menu');
            break;
        case 0:
            stage.runScript('expand/menu/跑環');
            break;
        case 1:
            stage.runScript('expand/menu/尋寶');
            break;
        case 2:
            stage.runScript('expand/menu/收集');
            break;
        case 3:
            if (map['id'] === 993176501) {
                npc.meFlip().say("你正在榮譽殿堂!");
                return;
            }
            dir.setInGameCurNodeEventEnd(true);
            dir.lockUI().setInGameDirectionMode();
            usr.text("#e#fs20##fn微軟雅黑#正在前往 #g" + util.getMapName(993176501)).speed(100).time(1000).local(4).align(1).lineSpace(6).enter(0).showTextEffect();
            dir.setDelay(2500);
            dir.block().setInGameDirectionMode();
            stage.changeMap(993176501, 0);
            break;
    }
}