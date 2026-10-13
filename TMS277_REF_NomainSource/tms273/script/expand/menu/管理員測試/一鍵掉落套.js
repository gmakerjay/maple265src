const list = [
    1012632, // 150扎昆頭
	1022278, //170滅龍
	1032316, //150鞋子


];

function start() {
    let str = `             #素材套裝#k\r\n\r\n`;
    let sel = 1;
    if (stage.getFreeSlot(1) > 12) {

        for (let i in list) {
                let newItem = util.makeItem(list[i], 1);
                if (sel == 1) {
                    newItem.setChuc(15);
                    newItem.setPad(999);
                    newItem.setMad(999);
					newItem.setBaseStr(999);
                    newItem.setBaseDex(999);
                    newItem.setBaseInt(999);
                    newItem.setBaseLuk(999);
                    newItem.setMaxHp(3333);
                    newItem.setMaxMp(3333);					
                    newItem.setOption1(40656);
                    newItem.setOption2(40656);
                    newItem.setOption3(40656);
					newItem.setOption4(40656);
                    newItem.setOption5(40656);
                    newItem.setOption6(40656);
                   // newItem.setExpireDate(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
                    newItem.setGrade(20);
                    newItem.setAttribute(8)
                }
                stage.gainItem(newItem);
            }
            npc.say("領取成功,一路暢通");
        } else {
            npc.say("請清理揹包");
    }
}


start();