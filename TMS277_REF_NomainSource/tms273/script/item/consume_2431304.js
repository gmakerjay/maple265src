marinStart();

function marinStart() {
    if (stage.getFreeSlot(1) >= 5 && stage.getFreeSlot(2) >= 4 && stage.getLevel() >= 10) {
        stage.loseItem(2431304, 1);
        Gift(stage.getJob());
        stage.dropMessage(-1, "送給你的道具，請你好好保存。");
        stage.dropAlertNotice("送給你的道具，請你好好保存。");
    } else {
        stage.dropMessage(-1, "請让你的背包都充裕,等級达到10級后使用。");
        npc.meFlip().say("請保證背包空間充足；10級、30級、70級、100級時可以獲得不同的武器。");
    }
}

function Gift(job) {
    switch (job) {
        case 15500:
            //亞克
            stage.gainItem(1482066, 1);
            stage.gainItem(1353600, 1);
            break;
        case 15510:
            //亞克
            stage.gainItem(1482004, 1);
            stage.gainItem(1353601, 1);
            break;
        case 15511:
            //亞克
            stage.gainItem(1353602, 1);
            stage.gainItem(1353601, 1);
            break;
        case 15512:
            //亞克
            stage.gainItem(1482078, 1);
            stage.gainItem(1353603, 1);
            break;
        case 15200:
            //伊利恩
            stage.gainItem(1282000, 1); //10級
            stage.gainItem(1353500, 1); //副武器
            break;
        case 15210:
            //伊利恩
            stage.gainItem(1282001, 1); //30級
            stage.gainItem(1353501, 1); //副武器
            break;
        case 15211:
            //伊利恩
            stage.gainItem(1282003, 1); //60級
            stage.gainItem(1353502, 1); //副武器
            break;
        case 15212:
            //伊利恩
            stage.gainItem(1282007, 1); //100級
            stage.gainItem(1353503, 1); //副武器
            break;
        case 6400:
            //卡蒂娜
            stage.gainItem(1272000, 1); //10級
            stage.gainItem(1353300, 1); //副武器
            break;
        case 6410:
            //卡蒂娜
            stage.gainItem(1272001, 1); //30級
            stage.gainItem(1353301, 1); //副武器
            break;
        case 6411:
            //卡蒂娜
            stage.gainItem(1272003, 1); //60級
            stage.gainItem(1353302, 1); //副武器
            break;
        case 6412:
            //卡蒂娜
            stage.gainItem(1272019, 1); //100級
            stage.gainItem(1353303, 1); //副武器
            break;
        case 15100:
            //阿黛爾
            stage.gainItem(1213000, 1); //10級
            stage.gainItem(1354000, 1); //副武器
            break;
        case 15110:
            //阿黛爾
            stage.gainItem(1213001, 1); //30級
            stage.gainItem(1354001, 1); //副武器
            break;
        case 15111:
            //阿黛爾
            stage.gainItem(1213003, 1); //60級
            stage.gainItem(1354002, 1); //副武器
            break;
        case 15112:
            //阿黛爾
            stage.gainItem(1213007, 1); //100級
            stage.gainItem(1354006, 1); //副武器
            break;
        case 16200:
            //菈菈
            stage.gainItem(1372060, 1); //
            stage.gainItem(1354020, 1); //
            break;
        case 16210:
            //菈菈
            stage.gainItem(1372111, 1); //
            stage.gainItem(1354021, 1); //
            break;
        case 16211:
            //菈菈
            stage.gainItem(1372081, 1); //
            stage.gainItem(1354022, 1); //
            break;
        case 16212:
            //菈菈
            stage.gainItem(1372095, 1); //
            stage.gainItem(1354023, 1); //
            break;
        case 6300:
            //凱殷
            stage.gainItem(1214000, 1); //
            stage.gainItem(1354010, 1); //
            break;
        case 6310:
            //凱殷
            stage.gainItem(1214001, 1); //
            stage.gainItem(1354011, 1); //
            break;
        case 6311:
            //凱殷
            stage.gainItem(1214003, 1); //
            stage.gainItem(1354012, 1); //
            break;
        case 6312:
            //凱殷
            stage.gainItem(1214007, 1); //
            stage.gainItem(1354013, 1); //
            break;
        case 100:
            //战士
            stage.gainItem(1422001, 1); //挑战之单手剑 - 10級
            stage.gainItem(1422000, 1);
            stage.gainItem(1432000, 1);
            break;
        case 1100:
            //魂骑士
            stage.gainItem(1302036, 1); //枫叶旗 单手剑            break;
        case 5100:
            //米哈尔
            stage.gainItem(1302036, 1); //枫叶旗 单手剑
            stage.gainItem(1098000, 1);
            break;
        case 5110:
            stage.gainItem(1302075, 1); //新加坡旗30 单手剑
            stage.gainItem(1098001, 1);
            break;
        case 5111:
            stage.gainItem(1302209, 1); //枫叶突击剑60 单手剑
            stage.gainItem(1098002, 1);
            break;
        case 5112:
            stage.gainItem(1302237, 1); //紫爆炎剑100 单手剑
            stage.gainItem(1098003, 1);
            break;
        case 110:
            stage.gainItem(1402002, 1);
            break;
        case 1110:
            stage.gainItem(1402002, 1); //枫叶旗 单手剑
            stage.gainItem(1352970, 1);
            break;
        case 1111:
            stage.gainItem(1352971, 1);
            stage.gainItem(1402011, 1);
            break;
        case 430:
            //20
            stage.gainItem(1342000, 1);
            stage.gainItem(1332008, 1);
            break;
        case 431:
            //見習刀客
            stage.gainItem(1332103, 1); //短刀
            stage.gainItem(1342001, 1); //拳套
            break;
        case 432:
            //45
            stage.gainItem(1342002, 1);
            stage.gainItem(1332014, 1);
            break;
        case 433:
            //雙刀客
            stage.gainItem(1332054, 1); //短刀
            stage.gainItem(1342004, 1); //拳套
            break;
        case 434:
            //雙刀客
            stage.gainItem(1332052, 1); //短刀
            stage.gainItem(1342008, 1); //拳套
            break;
        case 500:
            stage.gainItem(1492066, 1);
            stage.gainItem(1482066, 1);
            stage.gainItem(2330000, 2000); //银子弹
            break;
        case 3500:
            //機械師
            stage.gainItem(1492066, 1);
            stage.gainItem(1352700, 1);
            break;
        case 15500:
            stage.gainItem(1482066, 1);
            break;
        case 1510:
            stage.gainItem(1352970, 1);
            stage.gainItem(1482004, 1);
            break;
        case 510:
            stage.gainItem(1482004, 1); //冲锋队长 全覆式拳甲 30級
            stage.gainItem(1352900, 1);
            break;
        case 1511:
            stage.gainItem(1352971, 1);
            stage.gainItem(1482008, 1);
            break;
        case 511:
            stage.gainItem(1482022, 1); //冲锋队长 4周年枫叶金爪 60級
            stage.gainItem(1352901, 1);
            break;
        case 1512:
            stage.gainItem(1352972, 1);
            stage.gainItem(1482012, 1);
            break;
        case 512:
            stage.gainItem(1482078, 1); //冲锋队长 最终不速之客指套 100級
            stage.gainItem(1352902, 1);
            break;
        case 3510:
            stage.gainItem(1492069, 1);
            stage.gainItem(1352701, 1);
            break;
        case 100:
            //战士
            stage.gainItem(1302135, 1); //挑战之单手剑 - 10級
            stage.gainItem(1312049, 1); //挑战之单手斧 - 10級
            stage.gainItem(1322077, 1); //挑战之单手钝器 - 10級
            break;
        case 1100:
            stage.gainItem(1302036, 1);
            break;
        //魂骑士
        case 110:
            //劍客
            stage.gainItem(1422001, 1); //纯白之爱天使之光(双手钝器)
            stage.gainItem(1352200, 1);
            break;
        case 1110:
            stage.gainItem(1302036, 1); //枫叶旗 单手剑
            stage.gainItem(1352970, 1);
            break;
        case 6110:
            //狂龍
            stage.gainItem(1402044, 1); //南瓜灯 双手剑 - 30級
            break;
        case 1111:
            stage.gainItem(1352971, 1);
            stage.gainItem(1402011, 1);
            break;
        case 111:
            //勇士
            stage.gainItem(1402011, 1); //游泳圈
            break;
        case 6111:
            //狂龍
            stage.gainItem(1402013, 1); //白日剑 双手剑 - 50級
            break;
        case 112:
            //英雄
            stage.gainItem(1402016, 1); //100黑色锤子
            stage.gainItem(1352202, 1);
            break;
        case 1112:
            stage.gainItem(1352972, 1);
            stage.gainItem(1402035, 1);
            break;
        case 6112:
            //狂龍
            stage.gainItem(1402252, 1); //黑色双手剑 双手剑 - 100級
            break;
        case 120:
            //准騎士
            stage.gainItem(1422001, 1);
            break;
        case 121:
            //騎士
            stage.gainItem(1422001, 1);
            break;
        case 122:
            //聖騎士
            stage.gainItem(1422185, 1); //100黑色锤子
            stage.gainItem(1352212, 1);
            break;
        case 130:
            //槍戰士
            stage.gainItem(1432013, 1); //南瓜枪 30
            stage.gainItem(1352220, 1);
            break;
        case 131:
            //龍騎士
            stage.gainItem(1432022, 1); //银龙枪  60
            stage.gainItem(1352221, 1);
            break;
        case 132:
            //黑騎士
            stage.gainItem(1432105, 1); //传说红莲落神枪 100
            stage.gainItem(1352222, 1);
            break;
        case 1200:
            stage.gainItem(1382000, 1);
            break;
        case 200:
            stage.gainItem(1372043, 1);
            break;
        case 1210:
            stage.gainItem(1352970, 1);
            stage.gainItem(1382002, 1);
            break;
        case 210:
            //火毒法師
            stage.gainItem(1372046, 1); //圣诞六翼天使武器(短杖)
            stage.gainItem(1352230, 1);
            break;
        case 1211:
            stage.gainItem(1352971, 1);
            stage.gainItem(1382006, 1);
            break;
        case 211:
            //火毒巫師
            stage.gainItem(1372073, 1); //扎昆树枝 60級
            stage.gainItem(1352231, 1);
            break;
        case 1212:
            stage.gainItem(1382035, 1);
            stage.gainItem(1352972, 1);
            break;
        case 212:
            //火毒魔導師
            stage.gainItem(1372139, 1); //枫叶短仗 100
            stage.gainItem(1352232, 1);
            break;
        case 220:
            //冰雷法師
            stage.gainItem(1372046, 1); //圣诞六翼天使武器(短杖)
            stage.gainItem(1352240, 1);
            break;
        case 221:
            //冰雷巫師
            stage.gainItem(1372073, 1); //扎昆树枝 60級
            stage.gainItem(1352241, 1);
            break;
        case 222:
            //冰雷魔導師
            stage.gainItem(1372139, 1); //枫叶短仗 100
            stage.gainItem(1352242, 1);
            break;
        case 230:
            stage.gainItem(1372046, 1); //圣诞六翼天使武器(短杖)
            stage.gainItem(1352250, 1); //圣诞六翼天使武器(短杖)
            break;
        case 231:
            stage.gainItem(1372073, 1); //扎昆树枝 60級
            stage.gainItem(1352251, 1); //圣诞六翼天使武器(短杖)
            break;
        case 232:
            stage.gainItem(1372139, 1); //枫叶短仗 100
            stage.gainItem(1352252, 1); //圣诞六翼天使武器(短杖)
            break;
        case 1300:
        case 3300:
            //豹弩遊俠
            stage.gainItem(1452093, 1);//最终不速之客十字弓 100級
            stage.gainItem(2061000, 2000); //弩矢
            stage.gainItem(1462078, 1);
            stage.gainItem(1462078, 1);
            break;
        case 300:
            stage.gainItem(1452093, 1);
            stage.gainItem(1462078, 1);
            stage.gainItem(2060000, 2000); //弓矢
            stage.gainItem(2061000, 2000); //弩矢
            break;
        case 1310:
            stage.gainItem(1352970, 1);
            stage.gainItem(1452005, 1);
            break;
        case 310:
            //獵人
            stage.gainItem(1462004, 1); //鹰弩
            stage.gainItem(1352260, 1);
            break;
        case 1311:
            stage.gainItem(1352971, 1);
            stage.gainItem(1452004, 1);
            break;
        case 311:
            //射手
            stage.gainItem(1452023, 1);
            stage.gainItem(1352261, 1);
            break;
        case 1312:
            stage.gainItem(1352972, 1);
            stage.gainItem(1452021, 1);
            break;
        case 312:
            //神射手
            stage.gainItem(1452101, 1);
            stage.gainItem(1352262, 1);
            break;
        case 3310:
            //豹弩遊俠
            stage.gainItem(1462004, 1); //鹰弩
            stage.gainItem(1352960, 1);
            break;
        case 320:
            //弩弓手
            stage.gainItem(1462000, 1);
            stage.gainItem(1352270, 1); //鹰弩
            break;
        case 3311:
            //豹弩遊俠
            stage.gainItem(1462040, 1); //4周年枫叶击星弩 60級
            stage.gainItem(1352961, 1);
            break;
        case 321:
            //游俠
            stage.gainItem(1462040, 1); //4周年枫叶击星弩 60級
            stage.gainItem(1352271, 1);//鹰弩
            break;
        case 3312:
            //豹弩遊俠
            stage.gainItem(1462090, 1); //最终不速之客十字弓 100級
            stage.gainItem(1352962, 1);
            break;
        case 322:
            //箭神
            stage.gainItem(1462090, 1); //最终不速之客十字弓 100級
            stage.gainItem(1352272, 1);//鹰弩
            break;
        case 1400:
            stage.gainItem(1332063, 1); //短刀
            stage.gainItem(1472061, 1); //拳套
            stage.gainItem(2070011, 10000); //枫叶标
            break;
        case 400:
            stage.gainItem(1332063, 1); //短刀
            stage.gainItem(1472061, 1); //拳套
            stage.gainItem(2070011, 10000); //枫叶标
            break;
        case 1410:
            stage.gainItem(1352970, 1);
            stage.gainItem(1472008, 1);
            break;
        case 1411:
            stage.gainItem(1352971, 1);
            stage.gainItem(1472025, 1);
            break;
        case 411:
            stage.gainItem(1472037, 1);
            stage.gainItem(1352291, 1);
            break;
        case 1412:
            stage.gainItem(1352972, 1);
            stage.gainItem(1472053, 1);
            break;
        case 412:
            //隱士
            stage.gainItem(1472053, 1);
            stage.gainItem(1352292, 1);
            break;
        case 420:
            //俠客
            stage.gainItem(1332012, 1);
            stage.gainItem(1352280, 1);
            break;
        case 421:
            //獨行客
            stage.gainItem(1332036, 1);
            stage.gainItem(1352281, 1);
            break;
        case 422:
            //俠盜
            stage.gainItem(1332052, 1);
            stage.gainItem(1352282, 1);
            break;
        case 430:
            //20
            stage.gainItem(1342000, 1);
            stage.gainItem(1332008, 1);
            break;
        case 1500:
            stage.gainItem(1482066, 1);
            break;
        case 500:
            stage.gainItem(1492066, 1);
            stage.gainItem(1482066, 1);
            stage.gainItem(2330000, 2000); //银子弹
            break;
        case 15500:
            stage.gainItem(1482066, 1);
            break;
        case 3500:
            stage.gainItem(1492066, 1);
            break;
        case 1510:
            stage.gainItem(1352970, 1);
            stage.gainItem(1482004, 1);
            break;
        case 510:
            stage.gainItem(1482004, 1); //冲锋队长 全覆式拳甲 30級
            stage.gainItem(1352900, 1);
            break;
        case 1511:
            stage.gainItem(1352971, 1);
            stage.gainItem(1482008, 1);
            break;
        case 508:
            //龙的传人
            stage.gainItem(1492066, 1);
            stage.gainItem(2330003, 2000); //银子弹
            break;
        case 570:
            stage.gainItem(1492069, 1);
            break;
        case 571:
            stage.gainItem(1492072, 1);
            break;
        case 572:
            //龙的传人结束
            stage.gainItem(1492074, 1);
            break;
        case 2300:
            //雙弩
            stage.gainItem(1522000, 1);
            stage.gainItem(1352000, 1);
            break;
        case 2310:
            stage.gainItem(1522004, 1);
            stage.gainItem(1352001, 1);
            break;
        case 2311:
            stage.gainItem(1522008, 1);
            stage.gainItem(1352002, 1);
            break;
        case 2312:
            stage.gainItem(1522012, 1);
            stage.gainItem(1352003, 1);
            break; //双弩部分完成
        case 2400:
            //幻影
            stage.gainItem(1362000, 1);
            stage.gainItem(1352100, 1);
            break;
        case 2410:
            stage.gainItem(1362005, 1);
            stage.gainItem(1352101, 1);
            break;
        case 2411:
            stage.gainItem(1362009, 1);
            stage.gainItem(1352102, 1);
            break;
        case 2412:
            stage.gainItem(1362013, 1);
            stage.gainItem(1352103, 1);
            break; //幻影部分完成
        case 2700:
            //夜光
            stage.gainItem(1212001, 1);
            stage.gainItem(1352400, 1);
            break;
        case 2710:
            stage.gainItem(1212002, 1);
            stage.gainItem(1352401, 1);
            break;
        case 2711:
            stage.gainItem(1212004, 1);
            stage.gainItem(1352402, 1);
            break;
        case 2712:
            stage.gainItem(1212007, 1);
            stage.gainItem(1352403, 1);
            break; //TODO 夜光部分 自动穿戴宝珠
        case 3100:
            //恶魔猎手
            stage.gainItem(1322122, 1);
            stage.gainItem(1099000, 1);
            break;
        case 3110:
            stage.gainItem(1322124, 1);
            stage.gainItem(1099002, 1);
            break;
        case 3111:
            stage.gainItem(1322126, 1);
            stage.gainItem(1099003, 1);
            break;
        case 3112:
            stage.gainItem(1322127, 1);
            stage.gainItem(1099004, 1);
            break;
        case 3200:
            //唤灵法师
            stage.gainItem(1382085, 1);
            break;
        case 3210:
            stage.gainItem(1382088, 1);
            stage.gainItem(1352950, 1);
            break;
        case 3211:
            stage.gainItem(1382091, 1);
            stage.gainItem(1352951, 1);
            break;
        case 3212:
            stage.gainItem(1382094, 1);
            stage.gainItem(1352952, 1);
            break;
        case 3101:
            //惡魔復仇者
            stage.gainItem(1232001, 1);
            stage.gainItem(1099006, 1);
            break;
        case 3120:
            stage.gainItem(1232002, 1);
            stage.gainItem(1099007, 1);
            break;
        case 3121:
            stage.gainItem(1232004, 1);
            stage.gainItem(1099008, 1);
            break;
        case 3122:
            stage.gainItem(1232008, 1);
            stage.gainItem(1099009, 1);
            break;
        case 4100:
            //劍豪
            stage.gainItem(1542000, 1);
            stage.gainItem(1352800, 1);
            break;
        case 4110:
            stage.gainItem(1542002, 1);
            stage.gainItem(1352801, 1);
            break;
        case 4111:
            stage.gainItem(1542005, 1);
            stage.gainItem(1352802, 1);
            break;
        case 4112:
            stage.gainItem(1542009, 1);
            stage.gainItem(1352803, 1);
            break;
        case 4200:
            //陰陽師
            stage.gainItem(1552000, 1); // 铁扇            break;
        case 4210:
            stage.gainItem(1552002, 1);
            break;
        case 4211:
            stage.gainItem(1552005, 1);
            break;
        case 4212:
            stage.gainItem(1552009, 1);
            break;
        case 11212:
            //林之灵
            stage.gainItem(1252053, 1); //60級
            break;
        case 15200:
            //圣晶使徒
            stage.gainItem(1282000, 1); //10級
            stage.gainItem(1353500, 1); //副武器
            break;
        case 15210:
            //圣晶使徒
            stage.gainItem(1282001, 1); //30級
            stage.gainItem(1353501, 1); //副武器
            break;
        case 15211:
            //圣晶使徒
            stage.gainItem(1282003, 1); //60級
            stage.gainItem(1353502, 1); //副武器
            break;
        case 15212:
            //圣晶使徒
            stage.gainItem(1282007, 1); //100級
            stage.gainItem(1353503, 1); //副武器
            break;
        case 15501:
            stage.gainItem(1482066, 1);
            stage.gainItem(1353600, 1);
            break;
        case 15510:
            stage.gainItem(1482004, 1);
            stage.gainItem(1353601, 1);
            break;
        case 15511:
            stage.gainItem(1353602, 1);
            stage.gainItem(1353601, 1);
            break;
        case 15512:
            stage.gainItem(1482078, 1);
            stage.gainItem(1353603, 1);
            break;
        case 17500:
            //墨玄
            stage.gainItem(1403000, 1); //10級
            stage.gainItem(1352860, 1); //副武器
            break;
        case 17510:
            //墨玄
            stage.gainItem(1403001, 1); //30級
            stage.gainItem(1352861, 1); //副武器
            break;
        case 17511:
            //墨玄
            stage.gainItem(1403003, 1); //60級
            stage.gainItem(1352862, 1); //副武器
            break;
        case 17512:
            //墨玄
            stage.gainItem(1403007, 1); //100級
            stage.gainItem(1352863, 1); //副武器
            break;
        case 520:
            //火槍手
            stage.gainItem(1492069, 1);
            stage.gainItem(1352910, 1);
            break;
        case 3511:
            stage.gainItem(1492072, 1);
            stage.gainItem(1352702, 1);
            break;
        case 521:
            //大副
            stage.gainItem(1492072, 1);
            stage.gainItem(1352911, 1);
            break;
        case 3512:
            //機械師
            stage.gainItem(1492074, 1);
            stage.gainItem(1352703, 1);
            break;
        case 522:
            //船長
            stage.gainItem(1492074, 1);
            stage.gainItem(1352912, 1);
            break; //冒险家、骑士团 机械师 豹弩游侠 部分完成
        case 508:
            //龙的传人
            stage.gainItem(1492066, 1);
            stage.gainItem(2330003, 2000); //银子弹
            break;
        case 570:
            stage.gainItem(1492069, 1);
            break;
        case 571:
            stage.gainItem(1492072, 1);
            break;
        case 572:
            //龙的传人结束
            stage.gainItem(1492074, 1);
            break;
        case 2100:
            //戰神
            stage.gainItem(1442096, 1);
        case 111:
            //勇士
            stage.gainItem(1422025, 1); //游泳圈
            stage.gainItem(1352201, 1);
            break;
        case 112:
            //英雄
            stage.gainItem(1422027, 1); //100黑色锤子
            stage.gainItem(1352202, 1);
            break;
        case 1112:
            stage.gainItem(1352972, 1);
            stage.gainItem(1402035, 1);
            break;
        case 1200:
            stage.gainItem(1382000, 1);
            break;
        case 200:
            stage.gainItem(1372043, 1);
            break;
        case 1210:
            stage.gainItem(1352970, 1);
            stage.gainItem(1382002, 1);
            break;
        case 1211:
            stage.gainItem(1352971, 1);
            stage.gainItem(1382006, 1);
            break;
        case 1212:
            stage.gainItem(1382035, 1);
            stage.gainItem(1352972, 1);
            break;
        case 220:
            //冰雷法師
            stage.gainItem(1372046, 1); //圣诞六翼天使武器(短杖)
            stage.gainItem(1352240, 1);
            break;
        case 221:
            //冰雷巫師
            stage.gainItem(1372073, 1); //扎昆树枝 60級
            stage.gainItem(13352241, 1);
            break;
        case 222:
            //冰雷魔導師
            stage.gainItem(1372139, 1); //枫叶短仗 100
            stage.gainItem(1352242, 1);
            break;
        case 230:
            stage.gainItem(1372046, 1); //圣诞六翼天使武器(短杖)
            stage.gainItem(1352250, 1); //圣诞六翼天使武器(短杖)
            break;
        case 231:
            stage.gainItem(1372073, 1); //扎昆树枝 60級
            stage.gainItem(1352251, 1); //圣诞六翼天使武器(短杖)
            break;
        case 232:
            stage.gainItem(1372139, 1); //枫叶短仗 100
            stage.gainItem(1352252, 1); //圣诞六翼天使武器(短杖)
            break;
        case 1300:
            stage.gainItem(1452002, 1);
            break;
        case 3300:
        case 300:
            stage.gainItem(1452093, 1);
            stage.gainItem(1462078, 1);
            stage.gainItem(2060000, 2000); //弓矢
            stage.gainItem(2061000, 2000); //弩矢
            break;
        case 301:
            //古跡獵人
            stage.gainItem(1592000, 1); //远古弓
            stage.gainItem(1353700, 1); //潜力遗物
            break;
        case 1310:
            stage.gainItem(1352970, 1);
            stage.gainItem(1452005, 1);
            break;
        case 310:
            //獵人
            stage.gainItem(1462004, 1); //鹰弩
            stage.gainItem(1352260, 1);
            break;
        case 1311:
            stage.gainItem(1352971, 1);
            stage.gainItem(1452004, 1);
            break;
        case 311:
            //射手
            stage.gainItem(1452023, 1);
            stage.gainItem(1352261, 1);
            break;
        case 1312:
            stage.gainItem(1352972, 1);
            stage.gainItem(1452021, 1);
            break;
        case 312:
            //神射手
            stage.gainItem(1452101, 1);
            stage.gainItem(1352262, 1);
            break;
        case 320:
            //弩弓手
            stage.gainItem(1462000, 1);
            stage.gainItem(1352270, 1); //鹰弩
            break;
        case 330:
            //古跡獵人
            stage.gainItem(1592001, 1); //远古弓
            stage.gainItem(1353701, 1); //遗物
        case 331:
            //古跡獵人
            stage.gainItem(1592002, 1); //
            stage.gainItem(1353702, 1); //
            break;
        case 332:
            //古跡獵人
            stage.gainItem(1592003, 1); //
            stage.gainItem(1353703, 1); //
            break;
        case 321:
            //游俠
            stage.gainItem(1462040, 1); //4周年枫叶击星弩 60級
            stage.gainItem(1352271, 1);//鹰弩
            break;
        case 322:
            //箭神
            stage.gainItem(1462090, 1); //最终不速之客十字弓 100級
            stage.gainItem(1352272, 1);//鹰弩
            break;
        case 1410:
            stage.gainItem(1352970, 1);
            stage.gainItem(1472008, 1);
            break;
        case 410:
            //刺客
            stage.gainItem(1472008, 1);
            stage.gainItem(1352290, 1);
            break;
        case 1411:
            stage.gainItem(1352971, 1);
            stage.gainItem(1472025, 1);
            break;
        case 411:
            //無影人
            stage.gainItem(1472037, 1);
            stage.gainItem(1352291, 1);
            break;
        case 1412:
            stage.gainItem(1352972, 1);
            stage.gainItem(1472053, 1);
            break;
        case 412:
            //隱士
            stage.gainItem(1472053, 1);
            stage.gainItem(1352292, 1);
            break;
        case 420:
            //俠客
            stage.gainItem(1332012, 1);
            stage.gainItem(1352280, 1);
            break;
        case 421:
            //獨行客
            stage.gainItem(1332036, 1);
            stage.gainItem(1352281, 1);
            break;
        case 422:
            //俠盜
            stage.gainItem(1332052, 1);
            stage.gainItem(1352282, 1);
            break;
        case 430:
            //20
            stage.gainItem(1342000, 1);
            stage.gainItem(1332008, 1);
            break;
        case 431:
            //見習刀客
            stage.gainItem(1332103, 1); //短刀
            stage.gainItem(1342001, 1); //拳套
            break;
        case 432:
            //45
            stage.gainItem(1342002, 1);
            stage.gainItem(1332014, 1);
            break;
        case 433:
            //雙刀客
            stage.gainItem(1332054, 1); //短刀
            stage.gainItem(1342004, 1); //拳套
            break;
        case 434:
            //雙刀客
            stage.gainItem(1332052, 1); //短刀
            stage.gainItem(1342008, 1); //拳套
            break;
        case 500:
            stage.gainItem(1492066, 1);
            stage.gainItem(1482066, 1);
            stage.gainItem(2330000, 2000); //银子弹
            break;
        case 3500:
            //機械師
            stage.gainItem(1492066, 1);
            stage.gainItem(1352700, 1);
            break;
        case 15500:
            stage.gainItem(1482066, 1);
            break;
        case 1510:
            stage.gainItem(1352970, 1);
            stage.gainItem(1482004, 1);
            break;
        case 510:
            stage.gainItem(1482004, 1); //冲锋队长 全覆式拳甲 30級
            stage.gainItem(1352900, 1);
            break;
        case 1511:
            stage.gainItem(1352971, 1);
            stage.gainItem(1482008, 1);
            break;
        case 511:
            stage.gainItem(1482022, 1); //冲锋队长 4周年枫叶金爪 60級
            stage.gainItem(1352901, 1);
            break;
        case 1512:
            stage.gainItem(1352972, 1);
            stage.gainItem(1482012, 1);
            break;
        case 512:
            stage.gainItem(1482078, 1); //冲锋队长 最终不速之客指套 100級
            stage.gainItem(1352902, 1);
            break;
        case 3510:
            stage.gainItem(1492069, 1);
            stage.gainItem(1352701, 1);
            break;
        case 520:
            //火槍手
            stage.gainItem(1492069, 1);
            stage.gainItem(1352910, 1);
            break;
        case 3511:
            stage.gainItem(1492072, 1);
            stage.gainItem(1352702, 1);
            break;
        case 521:
            //大副
            stage.gainItem(1492072, 1);
            stage.gainItem(1352911, 1);
            break;
        case 3512:
            //機械師
            stage.gainItem(1492074, 1);
            stage.gainItem(1352703, 1);
            break;
        case 522:
            //船長
            stage.gainItem(1492074, 1);
            stage.gainItem(1352912, 1);
            break; //冒险家、骑士团 机械师 豹弩游侠 部分完成
        case 508:
            //龙的传人
            stage.gainItem(1492066, 1);
            stage.gainItem(2330003, 2000); //银子弹
            break;
        case 570:
            stage.gainItem(1492069, 1);
            stage.gainItem(1352820, 1);
            break;
        case 571:
            stage.gainItem(1492072, 1);
            stage.gainItem(1492069, 1);
            break;
        case 572:
            //龙的传人结束
            stage.gainItem(1492074, 1);
            stage.gainItem(1492069, 1);
            break;
        case 2100:
            //戰神
            stage.gainItem(1442096, 1);
            break;
        case 2110:
            stage.gainItem(1442099, 1);
            stage.gainItem(1352930, 1);
            break;
        case 2111:
            stage.gainItem(1442102, 1);
            stage.gainItem(1352931, 1);
            break;
        case 2112:
            stage.gainItem(1442105, 1);
            stage.gainItem(1352932, 1);
            break; //战神完成
        case 3600:
            //尖兵
            stage.gainItem(1242001, 1);
            break;
        case 3610:
            stage.gainItem(1242002, 1);
            break;
        case 3611:
            stage.gainItem(1242004, 1);
            break;
        case 3612:
            stage.gainItem(1242008, 1);
            break; //尖兵结束
        case 6100:
            //狂龙战士
            stage.gainItem(1402177, 1);
            stage.gainItem(1352500, 1);
            break;
        case 6500:
            //爆莉萌天使
            stage.gainItem(1222001, 1);
            break;
        case 6510:
            //爆莉萌天使
            stage.gainItem(1222002, 1);
            break;
        case 6511:
            //爆莉萌天使
            stage.gainItem(1222004, 1);
            break;
        case 6512:
            //爆莉萌天使
            stage.gainItem(1222008, 1);
            break;
        case 501:
            //火炮手
            stage.gainItem(1532045, 1);
            stage.gainItem(2330000, 9999);
            break;
        case 530:
            stage.gainItem(1532049, 1);
            stage.gainItem(1352920, 1);
            break;
        case 531:
            stage.gainItem(1532053, 1);
            stage.gainItem(1352921, 1);
            break;
        case 532:
            stage.gainItem(1532057, 1);
            stage.gainItem(1352922, 1);
            break;
        case 2500:
            //影月
            stage.gainItem(1482066, 1);
            stage.gainItem(1353100, 1);
            break;
        case 2510:
            stage.gainItem(1482069, 1);
            stage.gainItem(1353101, 1);
            break;
        case 2511:
            stage.gainItem(1482072, 1);
            stage.gainItem(1353102, 1);
            break;
        case 2512:
            stage.gainItem(1482074, 1);
            stage.gainItem(1353103, 1);
            break;
        case 3700:
            //爆破手
            stage.gainItem(1582000, 1); //10級武器
            stage.gainItem(1353400, 1); //10級副武器
            stage.gainItem(2330000, 2000); //子弹
            break;
        case 3710:
            //爆破手
            stage.gainItem(1582001, 1); //30級武器
            stage.gainItem(2330000, 2000); //子弹
            stage.gainItem(1353401, 1);
            break;
        case 3711:
            //爆破手
            stage.gainItem(1582003, 1); //60級武器
            stage.gainItem(1353402, 1);
            break;
        case 3712:
            //爆破手
            stage.gainItem(1582008, 1); //110級武器
            stage.gainItem(1353404, 1); //100級副武器
            stage.gainItem(2330003, 10000); //银子弹
            break;
        case 14200:
            //超能力者
            stage.gainItem(1353200, 1);
            break;
        case 14210:
            stage.gainItem(1262001, 1);
            stage.gainItem(1353201, 1);
            break;
        case 14211:
            stage.gainItem(1262003, 1);
            stage.gainItem(1353202, 1);
            break;
        case 14212:
            stage.gainItem(1262007, 1);
            stage.gainItem(1353203, 1);
            break;
        case 11212:
            //林之灵
            stage.gainItem(1252053, 1); //60級
            break;
        case 15200:
            //圣晶使徒
            stage.gainItem(1282000, 1); //10級
            stage.gainItem(1353500, 1); //副武器
            break;
        case 15210:
            //圣晶使徒
            stage.gainItem(1282001, 1); //30級
            stage.gainItem(1353501, 1); //副武器
            break;
        case 15211:
            //圣晶使徒
            stage.gainItem(1282003, 1); //60級
            stage.gainItem(1353502, 1); //副武器
            break;
        case 15212:
            //圣晶使徒
            stage.gainItem(1282007, 1); //100級
            stage.gainItem(1353503, 1); //副武器
            break;
        case 16400:
            //虎影
            stage.gainItem(1292000, 1); //10級
            stage.gainItem(1353800, 1); //副武器
            break;
        case 16410:
            //虎影
            stage.gainItem(1292001, 1); //30級
            stage.gainItem(1353801, 1); //副武器
            break;
        case 16411:
            //虎影
            stage.gainItem(1292003, 1); //60級
            stage.gainItem(1353802, 1); //副武器
            break;
        case 16412:
            //虎影
            stage.gainItem(1292007, 1); //100級
            stage.gainItem(1353803, 1); //副武器
            break;
        case 2700:
            //夜光
            stage.gainItem(1212001, 1);
            stage.gainItem(1352400, 1);
            break;
        case 2710:
            stage.gainItem(1212002, 1);
            stage.gainItem(1352401, 1);
            break;
        case 2711:
            stage.gainItem(1212004, 1);
            stage.gainItem(1352402, 1);
            break;
        case 2712:
            stage.gainItem(1212007, 1);
            stage.gainItem(1352403, 1);
            break;
        case 2200:
            //龙神
            stage.gainItem(1372005, 1); //10級
            break;
        case 2211:
            //龙神
            stage.gainItem(1372111, 1); //30級
            break;
        case 2214:
            //龙神
            stage.gainItem(1372114, 1); //60級
            break;
        case 2217:
            //龙神
            stage.gainItem(1372118, 1); //100級
            break;
        case 15100:
            //御剑骑士
            stage.gainItem(1213000, 1); //10級
            stage.gainItem(1354000, 1); //副武器
            break;
        case 15110:
            //御剑骑士
            stage.gainItem(1213001, 1); //30級
            stage.gainItem(1354001, 1); //副武器
            break;
        case 15111:
            //御剑骑士
            stage.gainItem(1213003, 1); //60級
            stage.gainItem(1354002, 1); //副武器
            break;
        case 15112:
            //御剑骑士
            stage.gainItem(1213007, 1); //100級
            stage.gainItem(1354006, 1); //副武器
            break;
        case 15400:
            //卡莉
            stage.gainItem(1404000, 1); //10級
            stage.gainItem(1354030, 1); //副武器
            break;
        case 15410:
            //卡莉
            stage.gainItem(1404001, 1); //30級
            stage.gainItem(1354031, 1); //副武器
            break;
        case 15411:
            //卡莉
            stage.gainItem(1404003, 1); //60級
            stage.gainItem(1354032, 1); //副武器
            break;
        case 15412:
            //卡莉
            stage.gainItem(1404007, 1); //100級
            stage.gainItem(1354033, 1); //副武器
            break;
        case 17500:
            //墨玄
            stage.gainItem(1403000, 1); //10級
            stage.gainItem(1352860, 1); //副武器
            break;
        case 17510:
            //墨玄
            stage.gainItem(1403001, 1); //30級
            stage.gainItem(1352861, 1); //副武器
            break;
        case 17511:
            //墨玄
            stage.gainItem(1403003, 1); //60級
            stage.gainItem(1352862, 1); //副武器
            break;
        case 17512:
            //墨玄
            stage.gainItem(1403007, 1); //100級
            stage.gainItem(1352863, 1); //副武器
            break;
        case 2210:
        case 2212:
        case 2216:
        case 2217:
            stage.gainItem(1382021, 1);
            break;
        default:
            stage.dropAlertNotice("抱歉..當前職業不存在 職業ID " + stage.getJob());
            break;
    }
}

