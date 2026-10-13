start();

function start() {
    var marin = {
        /* 航海武器 */
        2: [[1404017, 1212115, 1213017, 1214017, 1222109, 1232109, 1242116, 1252093, 1262017, 1272016, 1292017, 1302333, 1312199, 1332274, 1362135, 1372222, 1382259, 1402251, 1403017, 1412177, 1422184, 1432214, 1442268, 1452252, 1462239, 1472261, 1482216, 1492231, 1522138, 1532144, 1542108, 1552110, 1582017, 1592019]],

        /* 神秘武器 */
        10: [[1212120, 1213018, 1214018, 1222113, 1232113, 1242121, 1242122, 1252098, 1262039, 1272017, 1282017, 1292018, 1302343, 1312203, 1322255, 1332279, 1342104, 1362140, 1372228, 1382265, 1402259, 1403018, 1412181, 1422189, 1432218,
            1442274, 1452257, 1462243, 1472265, 1482221, 1492235, 1522143, 1532150, 1542117, 1552119, 1582023, 1592020]]
    }
    var bute = [1005823, 1005952, 1006014, 1006025, 1006026, 1073554, 1073616, 1073651, 1073652, 1073653, 1082754, 1082759, 1082766, 1082767, 1082768, 1103352, 1103418, 1103465, 1103466, 1103467, 1152209, 1152211, 1152217, 1152218, 1152219]
    var Equip = stage.getItemBySlot(1, 1);
    if (Equip == null) {
        npc.meFlip().say("抱歉..[1]位置不能留空");
        return;
    }
    if (bute.indexOf(Equip['itemId']) > -1) {
        npc.meFlip().say("抱歉.該類型航海禁止轉換 ");
        return;
    }
    var result = getEquipCareer(Equip['itemId'], marin);
    if (result) {
        var equipList = result.equipList;
        txt = "\r\n";
        txt += "當前待變更物品:#i" + Equip['itemId'] + "# #z" + Equip['itemId'] + "#\r\n\r\n";
        for (var i in equipList) {
            if (getItemType(Equip['itemId']) != getItemType(equipList[i])) continue;
            if (Equip['itemId'] == equipList[i]) continue;
            txt += "#L" + i + "##i" + equipList[i] + "# #z" + equipList[i] + "##l\r\n";
        }
        sel = npc.meFlip().askMenu(txt);

        if (npc.meFlip().askYesNo("確認變更當前物品嗎") != 1) return;
        if (!stage.hasMesos(10000000000) || !stage.hasItem(4031900, 1)) {
            npc.me().say("道具不足 #i4031900#");
            return;
        }
        marinchange(1, Equip, equipList[sel], false);
        stage.loseItem(ctx.getDataId(), 1);
        stage.loseItem(4031900, 1);
        stage.loseMeso(10000000000)
        npc.meFlip().say("變更成功");
    } else {
        npc.meFlip().say("抱歉..[ 1 ]的物品不可以進行變更");
    }
}

function getEquipCareer(equipId, marin) {
    for (var careerId in marin) {
        var careerEquipLists = marin[careerId];
        for (var equipList of careerEquipLists) {
            if (equipList.includes(equipId)) {
                return {careerId: careerId, equipList: equipList};
            }
        }
    }
    return null;
}

function getItemType(itemid) {
    var type = Math.floor(itemid / 10000);
    switch (type) {
        case 100:
            return 0; //帽子
        case 104:
            return 1; //上衣
        case 105:
            return 2; //套裝
        case 106:
            return 3; //褲裙
        case 107:
            return 4; //鞋子
        case 108:
            return 5; //手套
        case 110:
            return 6; //披風
        case 115:
            return 8; //護肩
        case 111:
            return 9; //ring
        case 113:
            return 10; //腰帶
        case 116:
            return 11;//口袋物品
        default:
            if (type == 120) return -1; //銀河
            if (type == 135) return -1; //副手
            var type = Math.floor(type / 10);
            if (type == 12 || type == 13 || type == 14 || type == 15 || type == 17) {
                return 7; //武器
            }
            return -1;
    }
}

function marinchange(types, GEquip, CEquip, judge) {
    switch (types) {
        case 1:
            var DEquip = util.makeItem(GEquip['itemId'], 1);
            var EquipStat = [];
            EquipStat[0] = GEquip['expireDate']
            EquipStat[1] = GEquip['title']
            EquipStat[2] = GEquip['ruc']//可使用卷轴
            EquipStat[3] = GEquip['cuc']//已使用卷轴
            EquipStat[4] = (GEquip['baseStr'] - DEquip['baseStr'] <= 0 ? 0 : GEquip['baseStr'] - DEquip['baseStr']);
            EquipStat[5] = (GEquip['baseDex'] - DEquip['baseDex'] <= 0 ? 0 : GEquip['baseDex'] - DEquip['baseDex']);
            EquipStat[6] = (GEquip['baseInt'] - DEquip['baseInt'] <= 0 ? 0 : GEquip['baseInt'] - DEquip['baseInt']);
            EquipStat[7] = (GEquip['baseLuk'] - DEquip['baseLuk'] <= 0 ? 0 : GEquip['baseLuk'] - DEquip['baseLuk']);
            EquipStat[8] = (GEquip['maxHp'] - DEquip['maxHp'] <= 0 ? 0 : GEquip['maxHp'] - DEquip['maxHp']);
            EquipStat[9] = (GEquip['maxMp'] - DEquip['maxMp'] <= 0 ? 0 : GEquip['maxMp'] - DEquip['maxMp']);
            EquipStat[10] = (GEquip['pad'] - DEquip['pad'] <= 0 ? 0 : GEquip['pad'] - DEquip['pad']);
            EquipStat[11] = (GEquip['mad'] - DEquip['mad'] <= 0 ? 0 : GEquip['mad'] - DEquip['mad']);
            EquipStat[12] = (GEquip['pdd'] - DEquip['pdd'] <= 0 ? 0 : GEquip['pdd'] - DEquip['pdd']);
            EquipStat[13] = GEquip['craft']
            EquipStat[14] = (GEquip['speed'] - DEquip['speed'] <= 0 ? 0 : GEquip['speed'] - DEquip['speed']);
            EquipStat[15] = (GEquip['jump'] - DEquip['jump'] <= 0 ? 0 : GEquip['jump'] - DEquip['jump']);
            EquipStat[16] = GEquip['attribute']
            EquipStat[17] = GEquip['levelUpType']
            EquipStat[18] = GEquip['incSkill']
            EquipStat[19] = GEquip['level']
            EquipStat[20] = GEquip['exp']
            EquipStat[21] = GEquip['durability']
            EquipStat[22] = GEquip['iuc']
            EquipStat[23] = GEquip['puc']
            EquipStat[24] = GEquip['pvpDamage']
            EquipStat[25] = GEquip['reduceReq']
            EquipStat[26] = GEquip['specialAttribute']
            EquipStat[27] = GEquip['durabilityMax']
            EquipStat[28] = GEquip['incReq']
            EquipStat[29] = GEquip['growthEnchant']
            EquipStat[30] = (GEquip['bossDamageR'] - DEquip['bossDamageR'] <= 0 ? 0 : GEquip['bossDamageR'] - DEquip['bossDamageR']);
            EquipStat[31] = (GEquip['ignorePdr'] - DEquip['ignorePdr'] <= 0 ? 0 : GEquip['ignorePdr'] - DEquip['ignorePdr']);
            EquipStat[32] = (GEquip['damageR'] - DEquip['damageR'] <= 0 ? 0 : GEquip['damageR'] - DEquip['damageR']);
            EquipStat[33] = (GEquip['statRate'] - DEquip['statRate'] <= 0 ? 0 : GEquip['statRate'] - DEquip['statRate']);
            EquipStat[34] = GEquip['cuttable']
            EquipStat[35] = GEquip['exGradeOption']
            EquipStat[36] = GEquip['itemState']
            EquipStat[37] = GEquip['grade']
            EquipStat[38] = GEquip['chuc']
            EquipStat[39] = GEquip['soulOption']
            EquipStat[40] = GEquip['soulSocket']
            EquipStat[41] = GEquip['soulOptionId']
            EquipStat[42] = GEquip['arc']
            EquipStat[43] = GEquip['arcExp']
            EquipStat[44] = GEquip['arcLevel']
            EquipStat[45] = GEquip['aut']
            EquipStat[46] = GEquip['autExp']
            EquipStat[47] = GEquip['autLevel']
            EquipStat[48] = GEquip['option1']
            EquipStat[49] = GEquip['option2']
            EquipStat[50] = GEquip['option3']
            EquipStat[51] = GEquip['option4']
            EquipStat[52] = GEquip['option5']
            EquipStat[53] = GEquip['option6']
            EquipStat[54] = GEquip['socket1']
            EquipStat[55] = GEquip['socket2']
            EquipStat[56] = GEquip['socket3']
            var alternate = util.makeItem(CEquip, 1);
            alternate['expireDate'] = EquipStat[0];
            alternate['title'] = EquipStat[1];
            alternate['ruc'] = EquipStat[2];
            alternate['cuc'] = EquipStat[3];
            alternate['baseStr'] += EquipStat[4];
            alternate['baseDex'] += EquipStat[5];
            alternate['baseInt'] += EquipStat[6];
            alternate['baseLuk'] += EquipStat[7];
            alternate['maxHp'] += EquipStat[8];
            alternate['maxMp'] += EquipStat[9];
            alternate['pad'] += EquipStat[10];
            alternate['mad'] += EquipStat[11];
            alternate['pdd'] += EquipStat[12];
            alternate['craft'] += EquipStat[13];
            alternate['speed'] += EquipStat[14];
            alternate['jump'] = EquipStat[15];
            alternate['attribute'] = EquipStat[16];
            alternate['levelUpType'] = EquipStat[17];
            alternate['incSkill'] = EquipStat[18];
            alternate['level'] = EquipStat[19];
            alternate['exp'] = EquipStat[20];
            alternate['durability'] = EquipStat[21];
            alternate['iuc'] = EquipStat[22];
            alternate['puc'] = EquipStat[23];
            alternate['pvpDamage'] = EquipStat[24];
            alternate['reduceReq'] = EquipStat[25];
            alternate['specialAttribute'] = EquipStat[26];
            alternate['durabilityMax'] = EquipStat[27];
            alternate['incReq'] = EquipStat[28];
            alternate['growthEnchant'] = EquipStat[29];
            alternate['bossDamageR'] += EquipStat[30];
            alternate['ignorePdr'] += EquipStat[31];
            alternate['damageR'] += EquipStat[32];
            alternate['statRate'] += EquipStat[33];
            alternate['cuttable'] = EquipStat[34];
            alternate['exGradeOption'] = EquipStat[35];
            alternate['itemState'] = EquipStat[36];
            alternate['grade'] = EquipStat[37];
            alternate['chuc'] = EquipStat[38];
            alternate['soulOption'] = EquipStat[39];
            alternate['soulSocket'] = EquipStat[40];
            alternate['soulOptionId'] = EquipStat[41];
            alternate['arc'] = EquipStat[42];
            alternate['arcExp'] = EquipStat[43];
            alternate['arcLevel'] = EquipStat[44];
            alternate['aut'] = EquipStat[45];
            alternate['autExp'] = EquipStat[46];
            alternate['autLevel'] = EquipStat[47];
            alternate['option1'] = EquipStat[48];
            alternate['option2'] = EquipStat[49];
            alternate['option3'] = EquipStat[50];
            alternate['option4'] = EquipStat[51];
            alternate['option5'] = EquipStat[52];
            alternate['option6'] = EquipStat[53];
            alternate['socket1'] = EquipStat[54];
            alternate['socket2'] = EquipStat[55];
            alternate['socket3'] = EquipStat[56];
            stage.gainItem(alternate);
            stage.removeItemBySlot(1, 1);
            break;
    }
}