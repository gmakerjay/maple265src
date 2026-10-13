/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let menus = [
    ["神秘河水滴石", "幻影幣",
        [
            [4001878, 9]//神秘河水滴石
            , [4001879, 1]//蝶翅水滴石
        ]
        , [4310218, 1, 2]
    ],
    ["太初水滴石", "阿拉克諾幣",
        [
            [4001889, 9]//太初水滴石
            , [4001890, 1]//蛛網水滴石
        ]
        , [4310249, 1, 2]
    ],
    // ["埃蘇萊布斯幣","能量核心",
    //     [
    //         [4001842,50]//補給型能量核心（A級）
    //         ,[4001843,1]//特殊型能量核心（S級）
    //     ]
    //     ,[4310156,1,2]
    // ]
]
let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";


execute();

function execute() {
    var sb = "#d\t\t\t\t" + xiaoxingxing + "交換硬幣" + xiaoxingxing + "#l\r\n\r\n";

    for (var i = 0; i < menus.length; i++) {
        sb += "#L" + i + "##v" + menus[i][2][0][0] + "#" + util.getItemName(menus[i][2][0][0]) + " 兌換 #v" + menus[i][3] + "##l\r\n";
    }
    let menu_index = npc.askMenu(sb);
    var sb = "你手上有我需要的物品嗎?聽說有些怪物身上有.極其稀有.\r\n"
    sb += "如果你能拿來:\r\n\r\n"
    for (var i = 0; i < menus[menu_index][2].length; i++) {
        sb += "" + menus[menu_index][2][i][1] + "個#v" + menus[menu_index][2][i][0] + ":i##b#t" + menus[menu_index][2][i][0] + "##k"
        if (i + 1 != menus[menu_index][2].length) {
            sb += "和"
        }
    }
    sb += "，一定會對調查大有幫助!\r\n\r\n我會送你我手上的#b#v" + menus[menu_index][3][0] + ":i#隨機獲得:" + menus[menu_index][3][1] + "~" + menus[menu_index][3][2] + "個"
    var yes = npc.askYesNo(sb);
    if (yes == 1) {
        var sb = "您缺少道具:\r\n"
        var flag = true;
        for (var i = 0; i < menus[menu_index][2].length; i++) {
            if (!stage.hasItem(menus[menu_index][2][i][0], menus[menu_index][2][i][1])) {
                flag = false;
                sb += "    #v" + menus[menu_index][2][i][0] + "##t" + menus[menu_index][2][i][0] + "#x" + menus[menu_index][2][i][1] + " 持有:" + stage.getItemQuantity(menus[menu_index][2][i][0]) + "\r\n"
            }
        }
        if (flag) {
            for (var i = 0; i < menus[menu_index][2].length; i++) {
                stage.loseItem(menus[menu_index][2][i][0], menus[menu_index][2][i][1]);
            }
            var number = marinrandom(menus[menu_index][3][1], menus[menu_index][3][2]);
            stage.gainItem(menus[menu_index][3][0], number);

            util.broadcastGachaponMsg("交換硬幣 恭喜玩家[" + stage.getCharacterName() + "]使用材料兌換獲得：" + number + "個！{}", util.makeItem(menus[menu_index][3][0], 1));
            npc.say("獲得極品道具#b#v" + menus[menu_index][3][0] + "##t" + menus[menu_index][3][0] + "##kx" + number);
            execute();
        } else {
            npc.say("準備好這些物品后在來找我吧！\r\n" + sb);
        }
    }
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}