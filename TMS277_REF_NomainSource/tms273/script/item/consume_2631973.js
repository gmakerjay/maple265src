const girlList = [
    ["物理系寵物裝備", [88, 88, 60034, 60034, 60034, 40057, 40057, 40057]],
    ["魔法系寵物裝備", [88, 88, 60035, 60035, 60035, 40057, 40057, 40057]]
];

const itemIds = [1803085, 1803086, 1803087];

function start() {
    let msg = `打開可以獲得三件寵物裝備，請選擇想要的屬性：\r\n`;
    msg += `#r領取后無法更換，請注意！！！#k\r\n`;
    for (let i = 0; i < girlList.length; i++) {
        msg += `#L${i}#領取 #b#e${girlList[i][0]}#n#k\r\n`;
    }

    const sel = npc.askMenu(msg);
    const attr = girlList[sel][1];

    const makeEquip = (itemId) => {
        const equip = util.makeItem(itemId, 1);
        equip.setBaseStr(attr[0]);
        equip.setBaseDex(attr[0]);
        equip.setBaseInt(attr[0]);
        equip.setBaseLuk(attr[0]);
        equip.setPad(attr[1]);
        equip.setMad(attr[1]);

        let hasPotential = false;
        for (let i = 0; i < 6; i++) {
            const opt = attr[2 + i];
            if (opt > 0) {
                if (!hasPotential) {
                    equip.setGrade(20);
                    hasPotential = true;
                }
                equip[`setOption${i + 1}`](opt);
            }
        }
        return equip;
    }

    for (itemId of itemIds) {
        stage.gainItem(makeEquip(itemId));
    }

    stage.loseItem(ctx.getDataId(), 1);
    util.broadcastNotice(`『寵物裝備』：恭喜玩家 ${stage.getCharacterName()} 領取了布丁月光寵物裝備贊助禮包!!`);
    npc.say("領取成功！請點開“裝扮欄”查看。")
}

start();
