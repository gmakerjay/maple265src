/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 材料兌換-新端腳本 CC jili
 **/

var items = Array(
    /*格式說明
    Array(
        得到的物品ID,
        Array(
            Array(
                需要的第一個物品ID,需要的第一個物品數量
            ),
            Array(
                需要的第二個物品ID,需要的第二個物品數量
            ),
            Array(
                需要的第三個物品ID,需要的第三個物品數量
            )
            這裡可以繼續寫很多個。。。。有多少個需要的物品就寫多少個。。。
        ),
        需要的金錢數量
    ),

    */
    Array(
        [2636606, 1],
        Array(
            Array(
                4310315, 250 
            )
        ),
        0
    ),
     Array(
        [4001870, 1],
        Array(
            Array(
                4001886, 1 
            )
        ),
        0
    ),
	Array(
        [5062031, 1],
        Array(
            Array(
                5062503, 1
            )
        ),
        0
    ),
	Array(
        [5062031, 1],
        Array(
            Array(
                2636208, 10
            )
        ),
        0
    ),
	Array(
        [2539001, 1],
        Array(
            Array(
                2432468, 3
            )
        ),
        0
    ),
	Array(
        [2028273, 1],
        Array(
            Array(
                2432468, 10
            )
        ),
        0
    ),
    Array(
        [2637496, 1],
        Array(
            Array(
                2637494, 1
            )
        ),
        0
    ),
    Array(
        [2434322, 1],
        Array(
            Array(
                2434321, 1
            )
        ),
        0
    ),
    Array(
        [1302021, 1],
        Array(
            Array(
                2437016, 1
            )
        ),
        0
    ),
    Array(
        [5062500, 1],
        Array(
            Array(
                2430915, 10
            )
        ),
        0
    ),
	Array(
        [5062010, 1],
        Array(
            Array(
                2431894, 10
            )
        ),
        0
    ),
	Array(
        [5060025, 1],
        Array(
            Array(
                2432488, 10
            )
        ),
        0
    ),
	Array(
        [5060086, 1],
        Array(
            Array(
                2634934, 10
            )
        ),
        0
    ),
	Array(
        [5060048, 1],
        Array(
            Array(
                2630612, 10
            )
        ),
        0
    ),
);
execute();

function execute() {

//邏輯開始
    let selStr = "\r\n"
    for (var i = 0; i < items.length; i++) {
        selStr += "#b兌換 #v" + items[i][0][0] + `#x${items[i][0][1]} 需要材料:`
        for (var j = 0; j < items[i][1].length; j++) {
            selStr += "#b#v" + items[i][1][j][0] + "# x #r" + items[i][1][j][1] + ""
        }
        if (items[i][2] > 0) selStr += ",#b金幣 #r" + items[i][2];
        selStr += "#r#L" + i + "#點我兌換#l\r\n\r\n"
    }
    let selected = npc.askMenu(selStr);
    selStr = "請輸入兌換 #v" + items[selected][0][0] + '#x' + items[selected][0][1] + "的數量：\r\n"
    let number = npc.defNum(1).minNum(1).maxNum(9999).askNumber(selStr);

//判斷材料是否足夠
    stage.dropMessage(1, items[selected][0])
    if (!stage.hasMesos(items[selected][2] * number)) {
        npc.say("金幣不足,需要" + items[selected][2] * number);
    } else {
        var cailiaoTag = 0;
        for (var j = 0; j < items[selected][1].length; j++) {
            if (!stage.hasItem(items[selected][1][j][0], items[selected][1][j][1] * number)) {
                cailiaoTag++;
                break;
            }
        }
        if (cailiaoTag > 0) {
            npc.say("材料不足");
        } else {
            if (stage.canHold(items[selected][0][0], number * items[selected][0][1])) {
                for (var j = 0; j < items[selected][1].length; j++) {
                    //stage.loseItem(items[selected][1][j][0], Math.max(items[selected][1][j][1]*number, 0));
                    var quantityToRemove = Math.max(items[selected][1][j][1] * number, 0); // 確保計算結果不為負數
                    stage.loseItem(items[selected][1][j][0], quantityToRemove);
                }
                stage.gainItem(items[selected][0][0], number * items[selected][0][1]);
                npc.say("兌換成功！");
                execute();
            } else {
                npc.say("可惡,看看你的揹包")
            }
        }
    }


}