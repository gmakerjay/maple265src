/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

//猜拳

let log = require('check_log');
var uiFRock = "#fUI/UIWindow.img/RpsGame/Frock#";
var uiFScissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var uiFPaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";


const BLACK_LIST = [
    11111
];


var needItemA = 4001551;//需要的物品
var needItemANum = 1;//數量
var needItemB = 4001551;//需要的物品
var needItemBNum = 1;//數量

var str = uiFRock + " " + uiFScissor + " " + uiFPaper + " \r\n"
str += "Hi~你要和我一起玩遊戲嘛，很簡單哦，和現實一樣哦"
// str += "贏1次可以獲得10個#v4001785#      		#L5##n#r遊戲說明[新人必看]#l\r\n"
str += "#r#k參与遊戲需要#v" + needItemA + "# x " + needItemANum + "\r\n";
//  + "和#v" + needItemB + "# x " + needItemBNum + "\r\n"
str += "勝利者可獲得：\r\n"
str += "贏1次可以獲得10個#v4001785#\r\n"
str += "#L1##e#r我要玩石頭，剪子,布！#l\r\n"
str += "#L2##n#r領取連勝獎勵#l"
// str += "#L4##b#n玩家對戰！#l"
// str += "#L3##e使用#v4031332#兌換物品#l\r\n"
function start() {
    if (stage.getChannelId() != 1) {
        npc.say("猜拳為1頻道限定玩法");
        return;
    }
    同步連勝();
    var selected = npc.askMenu(str);

    switch (selected) {
        case 1:

            var wt = true;
            while (wt) {
                if (!stage.hasItem(needItemA, needItemANum)) {
                    wt = false;
                    npc.say("你沒有#v" + needItemA + "# x " + needItemANum)
                    // } else if (!player.hasItem(needItemB, needItemBNum)) {
                    //     wt = false;
                    //     npc.say("\r\n寧現在還不能參加遊戲哦，原因:\r\n你沒有#v" + needItemB + "# x " + needItemBNum)
                } else {
                    str = "請選擇你出什麼：\r\n"
                    str += "目前連勝<" + log.getEventValue(stage, db, "猜拳贏了") + ">次\r\n"
                    str += "最高連勝<" + log.getEventValue(stage, db, "猜拳連勝") + ">次\r\n"
                    str += "#L3#" + uiFRock + "#l"
                    str += "#L2#" + uiFScissor + "#l"
                    str += "#L1#" + uiFPaper + "#l\r\n"
                    var sel = npc.askMenu(str);


                    stage.loseItem(needItemA, needItemANum)
                    // player.loseItem(needItemB, needItemBNum)

                    var rand = Math.floor(Math.random() * 3) + 1;
                    var ss = ""
                    if (BLACK_LIST.includes(stage.getAccountId()) && Math.random() < 0.6) {
                        while ((rand == 2 && sel == 3) || (rand == 1 && sel == 2) || (rand == 3 && sel == 1)) {
                            rand = Math.floor(Math.random() * 3) + 1;
                        }
                    }
                    if (rand == 1) ss = "布"
                    if (rand == 2) ss = "剪刀"
                    if (rand == 3) ss = "石頭"
                    if (sel == rand) {
                        log.resetEventValue(stage, db, "猜拳贏了")
                        npc.say("真遺憾，雖然平局. 但還是我贏了，因為公主說了算\r\n#r我出的是" + ss);
                    } else if (((rand == 3 && sel == 2) || (rand == 2 && sel == 1) || (rand == 1 && sel == 3))) {
                        log.resetEventValue(stage, db, "猜拳贏了")
                        npc.say("真遺憾. 你輸了\r\n#r我出的是 " + ss);
                    } else {
                        //獎勵放這裏
                        stage.gainItem(4001785, 10);
                        log.addEventValue(stage, db, "猜拳贏了", 1, 1); 
                        
                        同步連勝();
                        npc.say("恭喜你，你贏了\r\n#r我出的是 " + ss);
                    }

                }
            }
            break;
        case 2:
            stage.runScript("expand/menu/猜拳連勝獎勵");
            break;
        case 3:
            stage.runScript("expand/menu/猜拳獎勵商店");
            break;
        case 4:
            stage.runScript("expand/menu/石頭剪刀布");
            break;
        case 5:
            npc.say("1、每次挑戰需要6張#v4009229#,擊殺任意怪物均有機會掉落！\r\n2、如果猜拳獲勝，可以獲得#v4031332#,可以兌換相應獎勵！\r\n\r\n3、每天最多參与#b30#d次");
            break;
    }

}


function 同步連勝 () {
    let 當前連勝 = log.getEventValue(stage, db, "猜拳贏了")  
    if (Number(當前連勝) > Number(log.getEventValue(stage, db, "猜拳連勝"))) { 
        log.resetEventValue(stage, db, "猜拳連勝");
        log.addEventValue(stage, db, "猜拳連勝", 當前連勝, -1);
        stage.showSystemMessage(`連勝記錄刷新: ${當前連勝}`)
    }
}


start();
