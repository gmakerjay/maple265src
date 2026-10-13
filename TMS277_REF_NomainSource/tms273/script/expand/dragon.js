/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
player = require('check_log');
money = require("marin_7");
execute();

function execute() {
    let txt = "#fc0xFFFF6A6A##e龍年大吉#k#n\r\n\r\n";
    txt += "#fc0xFFCDAA7D#在這裡祝福五湖四海的各位玩家 #fc0xFFFF8C00#逢吉迎年 龍年快樂\r\n\r\n";
    txt += "#L0##fc0xFFEE2C2C#新年快樂#l\t\t\t#L1##fc0xFFFF1493#新年禮包#l\r\n";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            let group = [
                [2002096, 6],
                [2002095, 6],
                [2023305, 6],
                [2024086, 3],
                [5390003, 10],
                [2024197, 6],
                [5390004, 10],
                [2636370, 666],
                [5002561, 1],
                [5002562, 1],
                [5002563, 1],
                [2636688, 6],
                [4009548, 66]
            ]
            if (player.getEventValue(stage, db, "龍_新年福利") > 0) {
                npc.meFlip().say("新年福利只能領一回!");
                return;
            }
            txt = "恭喜領到了下列福利\r\n";
            player.addEventValue(stage, db, "龍_新年福利", 1, -1);
            for (let i in group) {
                txt += "#i" + group[i][0] + "# #z" + group[i][0] + "# x " + group[i][1] + "\r\n";
                stage.gainItem(group[i][0], group[i][1]);
            }
            npc.meFlip().say(txt);
            break;

        case 1:
            let bute = {
                99: {
                    name: "六轉禮包",
                    title: "",
                    value: [
                        [2636688, 18],
                        [4009548, 188],
                        [2633616, 88]
                    ]
                },
                238: {
                    name: "塔戒 ( 隨機開出4級技能戒指 )",
                    title: "",
                    value: [
                        [2433841, 1]
                    ]
                },
                488: {
                    name: "輪迴禮包",
                    title: "",
                    value: [
                        [1202193, 1],
                        [1114400, 1],
                        [2433972, 10],
                        [2633912, 1],
                        [2049323, 88],
                        [2616072, 88]
                    ]
                },
                688: {
                    name: "裝備打造禮包",
                    title: "",
                    value: [
                        [2644064, 10],
                        [2430755, 10],
                        [2048761, 10]
                    ]
                },
                888: {
                    name: "漆黑禮包",
                    title: "",
                    value: [
                        [2433972, 48],
                        [2048761, 28],
                        [2616216, 18],
                        [2430209, 1]
                    ]
                },
                1888: {
                    name: "凝聚戒指禮包",
                    title: "",
                    value: [
                        [1114403, 5]
                    ]
                }
            }
            txt = "#r龍年限定禮包 #b祝玩家們新年快樂 ~\r\n\r\n";
            for (let key in bute) {
                txt += "#L" + key + "##fc0xFF548B54#龍年 [ " + marinString(" ", 5, key.toString()) + " ] 星語幣 #fc0xFF6A5ACD#" + bute[key].name + "#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            txt = "#fc0xFF548B54#龍年 [ " + url + " ] 星語幣 #fc0xFF6A5ACD#" + bute[url].name + "\r\n";
            txt += "#b當前擁有星語幣 #r" + money.get(stage, db) + "#d\r\n\r\n";
            for (let i in bute[url].value) {
                txt += "#i" + bute[url].value[i][0] + "# #z" + bute[url].value[i][0] + "# x " + bute[url].value[i][1] + "\r\n";
            }
            if (npc.meFlip().askYesNo(txt) != 1) return;

            if (money.get(stage, db) < url) {
                npc.meFlip().say("真可惜..你沒有那麼多星語幣");
                return;
            }
            money.add(stage, db, -url);
            for (let i in bute[url].value) {
                stage.gainItem(bute[url].value[i][0], bute[url].value[i][1]);
            }
            npc.meFlip().say("恭喜!!購買成功!");
            execute();
            break;
    }
}


function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}