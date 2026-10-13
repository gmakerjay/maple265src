/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 */


execute();

function execute() {
    let jon = [
        [6000, 6100, 6110, 6111, 6112],
        [6001, 6500, 6510, 6511, 6512]
    ];
    let txt = "如果使用強制更換功能,請先卸下你的副手!\r\n";
    txt += "可以使用卸下副手的功能取下副手!(取下後的副手位置會被木盾替代)\r\n";
    txt += "需要強制裝的副手請放置 請放到 [ 1 ] 位置\r\n";
    txt += "\r\n";
    txt += "#L0#強制上副手#l\t\t#L1#卸下副手#l\r\n";
    url_6 = npc.meFlip().askMenu(txt);

    switch (url_6) {
        case 0:
            let judge = false;
            let num = null;
            for (let i in jon) {
                if (jon[i].indexOf(stage.getJob()) > -1) {
                    judge = true;
                    num = i;
                }
            }
            if (!judge) {
                npc.meFlip().say("抱歉..你不是狂龍戰士或天使職業");
                return;
            }
            if (stage.getLevel() < 10) {
                npc.meFlip().say("抱歉。。等級必須大於10");
                return;
            }
            let equip = stage.getItemBySlot(-1, -10);
            if (equip != null) {
                npc.meFlip().say("抱歉..你現在擁有副手不可以強制佩戴");
                return;
            }
            stage.equipped(-10, (num === 0 ? 1352500 : 1352600));
            npc.meFlip().say("佩戴成功");
            break;

        case 1:
            stage.equipped(-10, 1092003);
            break;
    }
}

function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

