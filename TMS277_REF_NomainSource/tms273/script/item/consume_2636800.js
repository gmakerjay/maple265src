/**
 * 世界第一第二賽季
 */
const info = require('constant\/裝備製作/纍充特效');


const boxId = ctx.getDataId();//箱子ID

function start() {
    let str = "請選擇您喜歡的特效\r\n";
    for (let i in info['世界第一第二賽季']) {
        str += `#L${i}##v${info['世界第一第二賽季'][i]}:i##z${info['世界第一第二賽季'][i]}:i##l\r\n`;
    }
    let sel = npc.askMenu(str);
    if (npc.askYesNo(`是否要領取本特效\r\n#v${info['世界第一第二賽季'][sel]}:i##z${info['世界第一第二賽季'][sel]}:i#\r\n`) == 1) {
        if (stage.getFreeSlot(4) > 1) {
            stage.loseItem(boxId, 1);
            stage.gainItem(info['世界第一第二賽季'][sel], 1);
            npc.say('恭喜您領取成功');
        } else {
            npc.say('背包空間不足');
            return;
        }
    }
}

start();

