/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let log = require('check_log');
if (stage.getFreeSlot(1) >= 7 && stage.getFreeSlot(2) >= 4 && stage.getLevel() >= 10) {
    // stage.loseItem(2431305, 1);
    if (log.getPQLog(stage, db, "萌新武器") >= 2) {
        npc.say("你都領5次了");
    } else {
        log.addPQLog(stage, db, "萌新武器", 1, -1);
        Gift(stage.getJob());
        npc.say("送給你道具請注意查收");
    }
} else {
    npc.say("請您等級達到10級轉職後再使用，10級送10級的，30級以後送30級的，70級以後送70的，100級以後送100級的 ，請選擇等級後再使用.或者揹包空間不足.");
}

function Gift(job) {
    switch (job) {

        case 16200: //拉拉·一轉
            stage.gainItem(1354020, 1); //拉拉副手10級
            stage.gainItem(1372043, 1) //法師武器10級
            break;
        case 16210: //拉拉·二轉
            stage.gainItem(1354021, 1); //拉拉副手30級
            stage.gainItem(1372061, 1) //法師武器30級
            break;
        case 16211: //拉拉·三轉
            stage.gainItem(1354022, 1); //拉拉副手60級
            stage.gainItem(1372038, 1) //法師武器60級
            break;
        case 16212: //拉拉·四轉
            stage.gainItem(1354023, 1); //拉拉副手100級
            stage.gainItem(1372095, 1) //法師武器100級
            break;

        case 100: //戰士
            stage.gainItem(1302135, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1312049, 1) //挑戰之單手斧 - 10級
            stage.gainItem(1322077, 1); //挑戰之單手鈍器 - 10級
            break;
        case 1100: //魂榮耀
        case 5100: //米哈爾
            stage.gainItem(1302135, 1); //挑戰之單手劍 - 10級
            break;
        case 5110://米哈爾（二轉）
            stage.gainItem(1302138, 1); //挑戰之單手劍 - 25級
            break;
        case 5111://米哈爾（三轉）
            stage.gainItem(1302141, 1); //挑戰之單手劍 - 70級
            break;
        case 5112://米哈爾（四轉）
            stage.gainItem(1302078, 1); //挑戰之單手劍 - 100級
            break;

        case 110://劍客
        case 1110://魂榮耀（二轉）
        case 6110://狂龍戰士（二轉）
            stage.gainItem(1402081, 1); //挑戰之雙手劍 - 25級 (無描述)
            break;
        case 3700://爆破手
            stage.gainItem(1582000, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1353400, 1); //挑戰之單手劍 - 10級
            break;
        case 3710://爆破手
            stage.gainItem(1582001, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1353401, 1); //挑戰之單手劍 - 10級
            break;
        case 3711://爆破手
            stage.gainItem(1582004, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1353402, 1); //挑戰之單手劍 - 10級
            break;

        case 6300://煉獄黑客1轉
            stage.gainItem(1214000, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1354010, 1); //挑戰之單手劍 - 10級
            break;
        case 6310://煉獄黑客2轉
            stage.gainItem(1214001, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1354011, 1); //挑戰之單手劍 - 10級
            break;
        case 6311://煉獄黑客3轉
            stage.gainItem(1214003, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1354012, 1); //挑戰之單手劍 - 10級
            break;
        case 6312://煉獄黑客4轉
            stage.gainItem(1214007, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1354013, 1); //挑戰之單手劍 - 10級
            break;

        case 3712://爆破手
            stage.gainItem(1582007, 1); //挑戰之單手劍 - 10級
            stage.gainItem(1353403, 1); //挑戰之單手劍 - 10級
            break;
        case 1111://魂榮耀（二轉）
        case 111://勇士
        case 6111://狂龍戰士（三轉）
            stage.gainItem(1402084, 1); //挑戰之雙手劍 - 70級 (無描述)
            break;
        case 112://英雄
        case 1112://魂榮耀（四轉）
        case 6112://狂龍戰士（四轉）
            stage.gainItem(1402075, 1);
            break;
        case 120://準榮耀
            stage.gainItem(1402081, 1);
            stage.gainItem(1412051, 1);
            break;
        case 121://榮耀
            stage.gainItem(1402084, 1);
            stage.gainItem(1412054, 1);
            break;
        case 122://聖榮耀
            stage.gainItem(1422058, 1);
            break;
        case 130://槍戰士
            stage.gainItem(1432071, 1);
            stage.gainItem(1442099, 1);
            break;
        case 131://龍榮耀
            stage.gainItem(1432074, 1);
            break;
        case 132://黑榮耀
            stage.gainItem(1432076, 1);
            break;
        case 1200://炎術士（1轉）
        case 200://魔法師
            stage.gainItem(1372043, 1);
            break;
        case 1210://炎術士（2轉）
        case 210://火毒法師
            stage.gainItem(1382017, 1);
            break;
        case 1211://炎術士（3轉）
        case 211://火毒巫師
            stage.gainItem(1372069, 1);
            break;
        case 1212://炎術士（4轉）
        case 212://火毒魔導士
            stage.gainItem(1382094, 1);
            break;
        case 220://冰雷法師
            stage.gainItem(1382017, 1);
            break;
        case 221://冰雷巫師
            stage.gainItem(1372069, 1);
            break;
        case 222://冰雷魔導士
            stage.gainItem(1382094, 1);
            break;
        case 230://牧師
            stage.gainItem(1382017, 1);
            break;
        case 231://祭司
            stage.gainItem(1372069, 1);
            break;
        case 2210://龍神
            stage.gainItem(1382100, 1);
            stage.gainItem(1352940, 1);
            break;
        case 2212://龍神
            stage.gainItem(1382101, 1);
            break;
        case 2216://龍神
            stage.gainItem(1382110, 1);
            stage.gainItem(1352941, 1);
            break;
        case 2217://龍神
            stage.gainItem(1382119, 1);
            stage.gainItem(1352942, 1);
            break;
        case 232://主教
            stage.gainItem(1382094, 1);
            break;
        case 1300://風靈使者（一轉）
        case 3300://豹弩遊俠（一轉）
        case 300://弓箭手
            stage.gainItem(1452093, 1);
            stage.gainItem(1462078, 1);
            stage.gainItem(2060000, 1000); //弓矢
            stage.gainItem(2061000, 1000); //弩矢
            break;
        case 1310://風靈使者（2轉）
        case 310://獵人
            stage.gainItem(1452096, 1);
            break;
        case 1311://風靈使者（3轉）
        case 311://射手
            stage.gainItem(1452023, 1);
            break;
        case 1312://風靈使者（4轉）
        case 312://神射手
            stage.gainItem(1452101, 1);
            break;
        case 3310://豹弩遊俠（2轉）
        case 320://弩弓手
            stage.gainItem(1462000, 1);
            break;
        case 3311://豹弩遊俠（3轉）
        case 321://遊俠
            stage.gainItem(1462008, 1);
            break;
        case 3312://豹弩遊俠（4轉）
        case 322://箭神
            stage.gainItem(1462015, 1);
            break;
        case 301://古蹟獵人
            stage.gainItem(1592000, 1);//==>佩戴等級：10==>道具名稱：挑戰之弓 - 10級
            stage.gainItem(1353700, 1);//==>佩戴等級：10==>道具名稱：挑戰之弩 - 10級
            break;
        case 330://古蹟獵人
            stage.gainItem(1592001, 1);//==>佩戴等級：30==>道具名稱：微風羽毛F
            stage.gainItem(1353701, 1);//==>佩戴等級：25==>道具名稱：戰鬥弓
            break;
        case 331://古蹟獵人
            stage.gainItem(1592003, 1);//==>佩戴等級：60==>道具名稱：強風羽毛F
            stage.gainItem(1353702, 1);//==>佩戴等級：60==>道具名稱：黃神弓
            break;
        case 332://古蹟獵人
            stage.gainItem(1592007, 1);//==>佩戴等級：100==>道具名稱：暴風羽毛F
            stage.gainItem(1353703, 1);//==>佩戴等級：95==>道具名稱：混沌魔翼之弓
            break;
        case 1400://夜行者（一轉）
        case 400://飛俠
            stage.gainItem(1332063, 1); //短刀
            stage.gainItem(1472061, 1); //拳套
            break;
        case 1410://夜行者（2轉）
        case 410://刺客
            stage.gainItem(1472008, 1);
            break;
        case 1411://夜行者（3轉）
        case 411://無影人
            stage.gainItem(1472037, 1);
            break;
        case 1412://夜行者（4轉）
            stage.gainItem(1472112, 1);//挑戰之拳套 - 100級
            stage.gainItem(1352972, 1);//聖地之光
            break;
        case 412://隱士
            stage.gainItem(1472053, 1);
            break;
        case 420://俠客
            stage.gainItem(1332012, 1);
            break;
        case 421://獨行客
            stage.gainItem(1332036, 1);
            break;
        case 422://俠盜
            stage.gainItem(1332052, 1);
            break;
        case 430: //20見習刀客
            stage.gainItem(1342000, 1);
            stage.gainItem(1332008, 1)
            break;
        case 431: //30雙刀客
            stage.gainItem(1342001, 1);
            stage.gainItem(1332009, 1);
            break;
        case 432: //45雙刀俠
            stage.gainItem(1342002, 1);
            stage.gainItem(1332014, 1)
            break;
        case 433: //60血刀
            stage.gainItem(1342004, 1);
            stage.gainItem(1332015, 1);
            break;
        case 434: //100暗影雙刀
            stage.gainItem(1342008, 1);
            stage.gainItem(1332052, 1);
            break;
        case 1500://奇襲者（一轉）
            stage.gainItem(1482066, 1)
            break;
        case 500://海盜（一轉）
            stage.gainItem(1492066, 1);
            stage.gainItem(1482066, 1);
            stage.gainItem(2330000, 1000); //銀子彈
            break;
        case 3500://機械師（一轉）
            stage.gainItem(1492066, 1);
            break;
        case 1510://奇襲者（二轉）
            stage.gainItem(1482069, 1);
            break;
        case 510://海盜拳手（2轉）
            stage.gainItem(1482069, 1);
            break;
        case 1511://奇襲者（3轉）
            stage.gainItem(1482072, 1);
            break;
        case 511://海盜鬥士（3轉）
            stage.gainItem(1482072, 1);
            break;
        case 1512://奇襲者（4轉）
            stage.gainItem(1482074, 1);
            break;
        case 512://海盜衝鋒隊長（4轉）
            stage.gainItem(1482074, 1);
            break;
        case 3510://機械師（二轉）
            stage.gainItem(1492069, 1);
            break;
        case 520://火槍手
            stage.gainItem(1492069, 1);
            break;
        case 3511://機械師（3轉）
            stage.gainItem(1492072, 1);
            break;
        case 521://大副
            stage.gainItem(1492072, 1);
            break;
        case 3512://機械師（4轉）
            stage.gainItem(1492074, 1);
            break;
        case 522://船長
            stage.gainItem(1492074, 1)
            break; //冒險家、榮耀團 機械師 豹弩遊俠 部分完成
        case 508: //龍的傳人
            stage.gainItem(1492066, 1);
            stage.gainItem(2330000, 1000); //銀子彈
            stage.gainItem(2330000, 1000); //銀子彈
            stage.gainItem(2330000, 1000); //銀子彈
            stage.gainItem(2330000, 1000); //銀子彈
            break;
        case 570:
            stage.gainItem(1492069, 1);
            break;
        case 571:
            stage.gainItem(1492072, 1);
            break;
        case 572: //龍的傳人結束
            stage.gainItem(1492074, 1)
            break;
        case 2100://戰神職業
            stage.gainItem(1442096, 1);
            break;
        case 2110:
            stage.gainItem(1442099, 1);
            break;
        case 2111:
            stage.gainItem(1442102, 1);
            break;
        case 2112:
            stage.gainItem(1442105, 1);
            break; //戰神部分完成
        case 2300://雙弩職業
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
            break; //雙弩部分完成
        case 2400://幻影職業
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
        case 2700://夜光職業
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
            break; //TODO 夜光部分 自動穿戴寶珠

        case 3100: //惡魔獵手
            stage.gainItem(1322122, 1);
            stage.gainItem(1099000, 1);
            break;
        case 3110:
            stage.gainItem(1322124, 1);
            break;
        case 3111:
            stage.gainItem(1322126, 1);
            break;
        case 3112:
            stage.gainItem(1322127, 1);
            break;

        case 17000://玄墨 一轉
            stage.gainItem(1403000, 1);
            stage.gainItem(1352860, 1);
            break;
        case 17500://玄墨 二轉
            stage.gainItem(1403001, 1);
            stage.gainItem(1352861, 1);
            break;
        case 17510://玄墨 三轉
            stage.gainItem(1403002, 1);
            stage.gainItem(1352862, 1);
            break;
        case 17512://玄墨 4轉
            stage.gainItem(1403020, 1);
            stage.gainItem(1352864, 1);
            break;
        case 3200: //喚靈法師
            stage.gainItem(1382085, 1);
            break;
        case 3210:
            stage.gainItem(1382088, 1);
            break;
        case 3211:
            stage.gainItem(1382091, 1);
            break;
        case 3212:
            stage.gainItem(1382094, 1);
            break;
        case 3600: //尖兵
            stage.gainItem(1242001, 1);
            stage.gainItem(1353000, 1);//雙核控制器
            break;
        case 3610:
            stage.gainItem(1242002, 1);
            break;
        case 3611:
            stage.gainItem(1242004, 1);
            break;
        case 3612:
            stage.gainItem(1242008, 1);
            break; //尖兵結束
        case 6100: //狂龍戰士
            stage.gainItem(1402177, 1);
            stage.gainItem(1352500, 1);//諾巴精髓
            break;
        case 6500://爆莉萌天使
            stage.gainItem(1222001, 1);//紫色海伊茲
            stage.gainItem(1352600, 1);
            break;
        case 6510:
            stage.gainItem(1222002, 1);
            break;
        case 6511:
            stage.gainItem(1222004, 1);
            break;
        case 6512:
            stage.gainItem(1222008, 1);
            break;
        case 3101://惡魔復仇者
            stage.gainItem(1232001, 1);
            stage.gainItem(1099000, 1);
            break;
        case 3120:
            stage.gainItem(1232002, 1);
            break;
        case 3121:
            stage.gainItem(1232004, 1);
            break;
        case 3122:
            stage.gainItem(1232008, 1);
            break;
        case 501: //火炮手
            stage.gainItem(1532045, 1);
            stage.gainItem(1352920, 1);
            break;
        case 530:
            stage.gainItem(1532049, 1);
            break;
        case 531:
            stage.gainItem(1532053, 1);
            break;
        case 532:
            stage.gainItem(1532057, 1);
            break;
        case 2500://隱月
            stage.gainItem(1482066, 1);//1轉
            stage.gainItem(1353100, 1);
            break;
        case 2510:
            stage.gainItem(1482069, 1);//2轉
            stage.gainItem(1353101, 1);
            break;
        case 2511:
            stage.gainItem(1482072, 1);//3轉
            stage.gainItem(1353102, 1);
            break;
        case 2512:
            stage.gainItem(1482074, 1);//4轉
            stage.gainItem(1353103, 1);
            break;
        case 4100://劍豪
            stage.gainItem(1542000, 1);//1轉
            stage.gainItem(1352800, 1);//1轉
            break;
        case 4110:
            stage.gainItem(1542002, 1);//2轉
            break;
        case 4111:
            stage.gainItem(1542005, 1);//3轉
            break;
        case 4112:
            stage.gainItem(1542009, 1);//4轉
            break;
        case 4200://陰陽師
            stage.gainItem(1552000, 1);//1轉
            break;
        case 4210:
            stage.gainItem(1552002, 1);//2轉
            break;
        case 4211:
            stage.gainItem(1552005, 1);//3轉
            break;
        case 4212:
            stage.gainItem(1552009, 1);//4轉
            break;
        case 15500://異人
            stage.gainItem(1482066, 1);//1轉
            stage.gainItem(1353600, 1);//1轉
            break;
        case 15510:
            stage.gainItem(1482069, 1);//2轉
            stage.gainItem(1353601, 1);//2轉
            break;
        case 15511:
            stage.gainItem(1482072, 1);//3轉
            stage.gainItem(1353602, 1);//3轉
            break;
        case 15512:
            stage.gainItem(1482074, 1);//4轉
            stage.gainItem(1353603, 1);//4轉
            break;
        case 15200://超能力者 一轉
            stage.gainItem(1282000, 1);
            stage.gainItem(1353500, 1);
            break;
        case 15210://超能力者 二轉
            stage.gainItem(1282001, 1);
            stage.gainItem(1353501, 1);
            break;
        case 15211://超能力者 三轉
            stage.gainItem(1282003, 1);
            stage.gainItem(1353502, 1);
            break;
        case 15212://超能力者 4轉
            stage.gainItem(1282007, 1);
            stage.gainItem(1353503, 1);
            break;
        case 6400:
            stage.gainItem(1272000, 1);
            stage.gainItem(1353300, 1);
            break;
        case 6410:
            stage.gainItem(1272001, 1);
            stage.gainItem(1353301, 1);
            break;
        case 6411:
            stage.gainItem(1272003, 1);
            stage.gainItem(1353302, 1);
            break;
        case 6412:
            stage.gainItem(1272007, 1);
            stage.gainItem(1353303, 1);
            break;
        case 14200://超能力者
            stage.gainItem(1262000, 1);//1轉
            stage.gainItem(1353200, 1);
            break;
        case 14210:
            stage.gainItem(1262001, 1);//2轉
            stage.gainItem(1353201, 1);
            break;
        case 14211:
            stage.gainItem(1262003, 1);//3轉
            stage.gainItem(1353202, 1);
            break;
        case 14212:
            stage.gainItem(1262007, 1);//4轉
            stage.gainItem(1353203, 1);
            break;
        case 16400://影虎
            stage.gainItem(1292000, 1);//1轉
            stage.gainItem(1353800, 1);
            break;
        case 16410:
            stage.gainItem(1292001, 1);//2轉
            stage.gainItem(1353801, 1);
            break;
        case 16411:
            stage.gainItem(1292003, 1);//3轉
            stage.gainItem(1353802, 1);
            break;
        case 16412:
            stage.gainItem(1292007, 1);//4轉
            stage.gainItem(1353803, 1);
            break;
        case 15100://御劍騎士
            stage.gainItem(1213000, 1);//1轉-武器
            stage.gainItem(1354000, 1);//10級副手
            break;
        case 15110:
            stage.gainItem(1213001, 1);//2轉-武器
            stage.gainItem(1354001, 1);//30級副手
            break;
        case 15111:
            stage.gainItem(1213003, 1);//3轉-武器
            stage.gainItem(1354002, 1);//60級副手
            break;
        case 15112:
            stage.gainItem(1213007, 1);//4轉
            stage.gainItem(1354003, 1);//100級
            break;
        case 15400: //卡利一轉
            stage.gainItem(1404000, 1)
            stage.gainItem(1354030, 1)
            break;
        case 15410://卡利二轉
            stage.gainItem(1404001, 1)
            stage.gainItem(1354031, 1)
            break;
        case 15411://卡利三轉
            stage.gainItem(1404002, 1)
            stage.gainItem(1354032, 1)
            break;
        case 15412://卡利四轉
            stage.gainItem(1404007, 1)
            stage.gainItem(1354033, 1)
            break;


    }
}