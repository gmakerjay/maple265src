let maps = {
    "卡　莉　　": [true, 993166800, 'enter_993166800', [150030079]],
    "皇家騎士團": [true, 993166400, 'enter_993166400', [10001244, 10001254]],
    "米哈逸　　": [true, 993201000, 'enter_993201000', []],
    "冒險家　　": [true, 993166000, 'enter_993166000', []],
    "影武者　　": [true, 993166000, 'enter_993166000', []],
    "重炮指揮官": [true, 993166000, 'enter_993166000', []],
    "拉　拉　　": [true, 993165501, 'enter_993165501', []],
    "凱　隱　　": [true, 993164001, 'enter_993164001', []],
    "阿黛爾　　": [true, 993162001, 'enter_993162001', [150026001]],
    "虎　影　　": [true, 993160100, 'enter_993160100', []],
    "開闊者　　": [true, 910090300, 'enter_910090300', []],
    "亞　克　　": [true, 402090000, 'enter_402090000', []],
    "伊利恩　　": [true, 940202001, 'enter_940202001', []],
    "卡蒂娜　　": [true, 940200500, 'enter_940200500', []],
    "狂狼勇士　": [false, 914000000, 'aranTutorAlone', []],
    "龍魔導師　": [false, 900010000, 'evanAlone', []],
    "精靈遊俠　": [false, 910150000, 'merTutorDrecotion00', []],
    "幻影俠盜　": [true, 915000000, 'PTtutor000', []],
    "夜　光　　": [true, 927020080, 'lightning_tuto_0_0', []],
    "隱　月　　": [true, 927030050, 'eunwol_tuto_illust', []],
    "末日反抗者": [false, 931000000, 'Resi_tutor10', [30001026, 30001061, 30001062]],
    "惡　魔　　": [true, 927000000, 'ds_tuto_0_0', [30010110, 30010185]],
    "傑　諾　　": [true, 931060089, 'xn_tuto_logo', []],
    "凱　撒　　": [true, 940001000, 'kaiser_tuto_0_0', []],
    "天使破壞者": [true, 993167300, 'angelic_tuto0', []],
    "凱內西斯　": [true, 331001110, 'enter_331001110', []],
    "神　之　子": [true, 321000001, 'zeroProl001', []],
    "劍　豪　　": [true, 807100010, 'kenjiTutoDirection', [40010000, 40010001, 40011288, 40010067]],
    "陰　陽　師": [true, 807100110, 'kannaTutoDirection', []],
    "墨　玄　　": [true, 875003000, 'enter_875003000', []],
    "琳　恩　　": [true, 875011000, 'enter_875011000', []]
    //"幻　獸　師": [true, 866100000, 'onUserEnter_866100000', [112100000, 112000000, 110001501, 110001502, 110001503, 110001504, 110001506, 110001510, 110001512]]
}
let bute = [
    [0, 500000],
    [1, 0],
    [2, 0],
    [3, 2022154, 100, null],
    [3, 2432022, 1, null],
    [3, 1703173, 1, null],
    [3, 1005431, 1, null],
    [3, 1053472, 1, null],
    [3, 1022048, 1, null],
    [3, 1012635, 1, null],
    [3, 1032024, 1, null],
    [3, 1082102, 1, null],
    [3, 1102039, 1, null],
    [3, 1072153, 1, null],
    [3, 3018621, 1, null],
    [3, 2450054, 4, 3],
    [3, 2000005, 9999, null],
    [3, 5044005, 1, 30 * 24],
    [3, 5510000, 100, null],
    [3, 5133000, 100, null],
    [3, 5190011, 3, null],
    [3, 5190001, 3, null],
    [3, 5190006, 3, null],
    [3, 5190000, 3, null],
    [3, 2120000, 9999, null],
    [4, 5002199, 1, 30, null],
    [4, 5002197, 1, 30, null],
    [4, 5002198, 1, 30, null],
    [3, 1142358, 1, 30, 100, 100, 100, 100, 100, 100, 9999, 9999]
]
execute();

function execute() {
    let txt = "\r\n";
    let play = stage.getIntQuestRecordEx(800000, "play");
    if (play == 0) {
        txt += "#L0#跳過劇情模式 ( 一鍵跳過劇情包含的技能#k )#l\r\n";
        //txt += "#L1#職業劇情模式#l\r\n";
        sel = npc.meFlip().noEsc().askMenu(txt);

        switch (sel) {
            case 0:
                let skills = null;
                for (let i in maps) {
                    if (maps[i][1] === map.getId() && maps[i][3].length > 0) {
                        skills = maps[i][3];
                        break;
                    }
                }

                if (skills != null) {
                    for (let i in skills) {
                        stage.changeSkillLevel(skills[i], 1);
                    }
                }
                switch (map.getId()) {
                    case 866100000:
                        stage.setJob(11212);
                        break;
                }
                stage.changeMap(993010000, 0);
                break;

            case 1:
                stage.increaseEquipInvSlot(128);
                stage.increaseConsumeInvSlot(128);
                stage.increaseInstallInvSlot(128);
                stage.increaseEtcInvSlot(128);
                stage.increaseTrunkCapacity(128);

                for (var i in bute) {
                    switch (bute[i][0]) {
                        case 0:
                            stage.gainMesos(bute[i][1])
                            break;
                        case 1:
                            stage.modifyCurrency(1, bute[i][1]);
                            break;
                        case 2:
                            stage.modifyCurrency(2, bute[i][1]);
                            break;
                        case 3:
                            if (bute[i][4] == null) {
                                if (bute[i][3] == null) {
                                    stage.gainItem(bute[i][1], bute[i][2]);
                                } else {
                                    var snum = bute[i][2];
                                    for (var n = 1; n <= snum; n++) {
                                        marinperiod(bute[i][1], bute[i][3]);
                                    }
                                }
                            } else {
                                var Equip = util.makeItem(bute[i][1], 1);
                                Equip.setBaseStr(bute[i][4])
                                Equip.setBaseDex(bute[i][5])
                                Equip.setBaseInt(bute[i][6])
                                Equip.setBaseLuk(bute[i][7])

                                Equip.setPad(bute[i][8])
                                Equip.setMad(bute[i][9])
                                Equip.setMaxHp(bute[i][10])
                                Equip.setMaxMp(bute[i][11])
                                var timestamp = (new Date()).getTime();
                                Equip.setExpireDate(timestamp + bute[i][3] * 24 * 60 * 60 * 1000);
                                stage.gainItem(Equip);
                            }
                            break;
                        case 4:
                            stage.gainItem(bute[i][1], 1);
                            break;
                    }
                }
                stage.updateQuestRecordEx(800000, "play", String(1));
                stage.changeMap(map.getId(), 0);
                break;
        }
    }
}

function marinperiod(item, date) {
    var timestamp = (new Date()).getTime();
    var Equip = util.makeItem(item, 1);
    Equip['expireDate'] = timestamp + date * 60 * 60 * 1000;
    stage.gainItem(Equip);
}