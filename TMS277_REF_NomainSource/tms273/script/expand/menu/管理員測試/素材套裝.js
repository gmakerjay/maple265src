const list = [
    1004637, // 150扎昆頭
	1052723, //170滅龍
	1073138, //150鞋子
	1082556, //160航海手套
	1132296, //扎昆腰帶你
	1152160, //航海護肩
	1113094, //暴擊戒指
	1113069, //暴擊戒指
	1113254, //戒指
	1113310, //戒指
	1032232, //海洋耳環
	1102887, //羈絆的翅膀
	1122296, //死神項鏈
	1122430, //漆黑項鏈
	1143012, //頂點王者
	1182285, //創世會長
	1190302, //水晶文章

];
stage.gainItem(2439305,1000)//神秘球
stage.gainItem(2436274,1)//直達260
stage.gainItem(5044010,1)//傳送
stage.gainItem(2000070,1)//無限藥水
stage.gainItem(2438871,1)//基本傷害皮膚
stage.gainItem(2439572,1)
stage.gainItem(2630380,1)
stage.gainItem(2631091,1)
stage.gainItem(2632123,1)
stage.gainItem(2632287,1)
stage.gainItem(5680862,1)
stage.gainItem(2634811,1)
stage.gainItem(1202193,1)//輪回
stage.gainItem(1712001,1)//秘法符文
stage.gainItem(1712002,1)
stage.gainItem(1712003,1)
stage.gainItem(1712004,1)
stage.gainItem(1712005,1)
stage.gainItem(1712006,1)
stage.gainItem(4001715,999)//1000E
function start() {
    let str = `             #素材套裝#k\r\n\r\n`;
    let sel = 1;
    if (stage.getFreeSlot(1) > 12) {

        for (let i in list) {
                let newItem = util.makeItem(list[i], 1);
                if (sel == 1) {
                    newItem.setChuc(15);
                    newItem.setPad(9999);
                    newItem.setMad(9999);
					newItem.setBaseStr(9999);
                    newItem.setBaseDex(9999);
                    newItem.setBaseInt(9999);
                    newItem.setBaseLuk(9999);
                    newItem.setMaxHp(3333);
                    newItem.setMaxMp(3333);					
                    newItem.setOption1(40051);
                    newItem.setOption2(40055);
                    newItem.setOption3(40056);
					newItem.setOption4(40292);
                    newItem.setOption5(40292);
                    newItem.setOption6(40056);
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