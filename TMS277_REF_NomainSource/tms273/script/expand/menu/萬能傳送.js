/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let icon = require('icon');
let norm = require('map');
let menu = [
    ["練級地圖", "練級地圖", 1],
    ["城鎮地圖", "城鎮地圖", 1],
    ["旅遊地圖", "旅遊地圖", 1],
    ["跳跳地圖", "跳跳地圖", 1],
    ["娛樂地圖", "娛樂地圖", 1],
    ["世界BOSS", "BOSS/世界BOSS", 2],
]

execute();

function execute() {
    let txt = "";
    txt += "#r#fn微軟雅黑##fs14##e#b[傳送中心]#r#k#fs14##l\r\n";
    for (let i in menu) {
        txt += "#L" + i + "#" + menu[i][0] + "#l\t";
        if (i % 3 === 2) txt += "\r\n\r\n";
    }
    txt += "\t\t\t\t\t\t\t\t#fs14##L999#" + icon.entry[1][1] + " 返回主菜單#l\r\n";
    let sel = npc.meFlip().askMenu(txt);
    switch (sel) {
        case 999:
            stage.runScript('expand/menu');
            break;

        default:
            switch (menu[sel][2]) {
                case 1:
                    txt = "#e#b" + menu[sel][1] + "#r#k#fs13#\r\n";
                    for (let i in norm.entry[menu[sel][0]]) {
                        if (norm.entry[menu[sel][0]][i][1] !== "") {
                            txt += "#L" + i + "##k[#r" + norm.entry[menu[sel][0]][i][1] + "#k]　#m" + norm.entry[menu[sel][0]][i][0] + "##l\r\n";
                        } else {
                            txt += "#L" + i + "##k#m" + norm.entry[menu[sel][0]][i][0] + "##l\r\n";
                        }
                    }
                    let sel_0 = npc.meFlip().askMenu(txt);

                    switch (sel) {
                        case 3:
                            if (sel_0 > 0) {
                                stage.changeMap(norm.entry[menu[sel][0]][sel_0][0], 0);
                            } else {
                                stage.runScript('expand/menu/' + norm.entry[menu[sel][0]][sel_0][2]);
                            }
                            break;

                        default:
                            dir.setInGameCurNodeEventEnd(true);
                            dir.lockUI().setInGameDirectionMode();
                            usr.text("#e#fs20##fn微軟雅黑#正在前往 #g" + util.getMapName(norm.entry[menu[sel][0]][sel_0][0])).speed(100).time(1000).local(4).align(1).lineSpace(6).enter(0).showTextEffect();
                            dir.setDelay(2500);
                            dir.block().setInGameDirectionMode();
                            stage.changeMap(norm.entry[menu[sel][0]][sel_0][0], 0);
                            break;
                    }
                    break;

                case 2:
                    stage.runScript('expand/menu/' + menu[sel][1]);
                    break;
            }
            break;
    }
}