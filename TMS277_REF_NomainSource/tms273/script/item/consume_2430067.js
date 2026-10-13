marinStart();

function marinStart() {
    if (stage.getFreeSlot(1) >= 5 && stage.getFreeSlot(2) >= 4 && player.getLevel() >= 10) {
        stage.loseItem(ctx.getDataId(), 1);
        Gift(stage.getJob());
        stage.dropMessage(-1, "送給你的道具，請你好好保存。");
        stage.dropAlertNotice("送給你的道具，請你好好保存。" );
    } else {
        stage.dropMessage(-1, "請让你的背包都充裕,等級达到10級后使用。");
        npc.meFlip().say("請保證背包空間充足；10級、30級、70級、100級時可以獲得不同的武器。");
    }
}


function Gift(job) {
    switch (job) {
        case 15500:
            //亞克
            player.gainItem(1482066, 1);
            player.gainItem(1353600, 1);
            break;
        case 15510:
            //亞克
            player.gainItem(1482004, 1);
            player.gainItem(1353601, 1);
            break;
        case 15511:
            //亞克
            player.gainItem(1353602, 1);
            player.gainItem(1353601, 1);
            break;
        case 15512:
            //亞克
            player.gainItem(1482078, 1);
            player.gainItem(1353603, 1);
            break;

        case 15200:
            //伊利恩
            player.gainItem(1282000, 1); //10級
            player.gainItem(1353500, 1); //副武器
            break;
        case 15210:
            //伊利恩
            player.gainItem(1282001, 1); //30級
            player.gainItem(1353501, 1); //副武器
            break;
        case 15211:
            //伊利恩
            player.gainItem(1282003, 1); //60級
            player.gainItem(1353502, 1); //副武器
            break;
        case 15212:
            //伊利恩
            player.gainItem(1282007, 1); //100級
            player.gainItem(1353503, 1); //副武器
            break;

        case 6400:
            //卡蒂娜
            player.gainItem(1272000, 1); //10級
            player.gainItem(1353300, 1); //副武器
            break;
        case 6410:
            //卡蒂娜
            player.gainItem(1272001, 1); //30級
            player.gainItem(1353301, 1); //副武器
            break;
        case 6411:
            //卡蒂娜
            player.gainItem(1272003, 1); //60級
            player.gainItem(1353302, 1); //副武器
            break;
        case 6412:
            //卡蒂娜
            player.gainItem(1272019, 1); //100級
            player.gainItem(1353303, 1); //副武器
            break;

        case 15100:
            //阿黛爾
            player.gainItem(1213000, 1); //10級
            player.gainItem(1354000, 1); //副武器
            break;
        case 15110:
            //阿黛爾
            player.gainItem(1213001, 1); //30級
            player.gainItem(1354001, 1); //副武器
            break;
        case 15111:
            //阿黛爾
            player.gainItem(1213003, 1); //60級
            player.gainItem(1354002, 1); //副武器
            break;
        case 15112:
            //阿黛爾
            player.gainItem(1213007, 1); //100級
            player.gainItem(1354006, 1); //副武器
            break;

        case 16200:
            //菈菈
            player.gainItem(1372060, 1); //
            player.gainItem(1354020, 1); //
            break;
        case 16210:
            //菈菈
            player.gainItem(1372111, 1); //
            player.gainItem(1354021, 1); //
            break;
        case 16211:
            //菈菈
            player.gainItem(1372081, 1); //
            player.gainItem(1354022, 1); //
            break;
        case 16212:
            //菈菈
            player.gainItem(1372095, 1); //
            player.gainItem(1354023, 1); //
            break;

        case 6300:
            //凱殷
            player.gainItem(1214000, 1); //
            player.gainItem(1354010, 1); //
            break;


        case 6310:
            //凱殷
            player.gainItem(1214001, 1); //
            player.gainItem(1354011, 1); //
            break;
        case 6311:
            //凱殷
            player.gainItem(1214003, 1); //
            player.gainItem(1354012, 1); //
            break;
        case 6312:
            //凱殷
            player.gainItem(1214007, 1); //	
            player.gainItem(1354013, 1); //	
            break;

        case 100:
            //战士
            player.gainItem(1302135, 1); //挑战之单手剑 - 10級

            player.gainItem(1312049, 1) //挑战之单手斧 - 10級
            player.gainItem(1322077, 1); //挑战之单手钝器 - 10級
            break;
        case 1100:
            //魂骑士
            player.gainItem(1302036, 1); //枫叶旗 单手剑
            player.gainItem(1352970, 1);
            break;
        case 5100:
            //米哈尔
            player.gainItem(1302036, 1); //枫叶旗 单手剑
            player.gainItem(1098000, 1);
            break;
        case 5110:
            player.gainItem(1302075, 1); //新加坡旗30 单手剑
            player.gainItem(1098001, 1);
            break;
        case 5111:
            player.gainItem(1302209, 1); //枫叶突击剑60 单手剑
            player.gainItem(1098002, 1);
            break;
        case 5112:
            player.gainItem(1302237, 1); //紫爆炎剑100 单手剑
            player.gainItem(1098003, 1);
            break;

        case 110:
        case 1110:
            player.gainItem(1302036, 1); //枫叶旗 单手剑
            player.gainItem(1352971, 1);
            break;

        case 1111:
            player.gainItem(1352972, 1);
            break;

        case 111:

        case 112:
        case 1112:
            player.gainItem(1352972, 1);
            break;


        case 1200:
            player.gainItem(1352970, 1);
            break;
        case 200:
            player.gainItem(1372043, 1);
            break;
        case 1210:
            player.gainItem(1352971, 1);
            break;

        case 1211:
            player.gainItem(1352972, 1);
            break;


        case 1212:

            player.gainItem(1352973, 1);
            break;

        case 220:


        case 221:

        case 222:

        case 230:

        case 231:

        case 232:

        case 1300:
            player.gainItem(1352970, 1);
            break;
        case 3300:
        case 300:
            player.gainItem(1452093, 1);
            player.gainItem(1462078, 1);
            player.gainItem(2060000, 2000); //弓矢
            player.gainItem(2061000, 2000); //弩矢
            break;
        case 301:
            //古跡獵人
            player.gainItem(1592000, 1); //远古弓
            player.gainItem(1353700, 1); //潜力遗物
            break;
        case 1310:
            player.gainItem(1352971, 1);
            break;
        case 310:

        case 1311:
            player.gainItem(1352972, 1);
            break;
        case 311:

        case 1312:
            player.gainItem(1352973, 1);
            break;
        case 312:


        case 320:

        case 330:
            //古跡獵人
            player.gainItem(1592001, 1); //远古弓
            player.gainItem(1353701, 1); //遗物
        case 331:
            //古跡獵人
            player.gainItem(1592002, 1); //
            player.gainItem(1353702, 1); //
            break;
        case 332:
            //古跡獵人
            player.gainItem(1592003, 1); //
            player.gainItem(1353703, 1); //
            break;

        case 321:


        case 322:


        case 1410:
        case 410:
            //刺客
            player.gainItem(1472008, 1);
            player.gainItem(1352290, 1);
            break;
        case 1411:
        case 411:
            //無影人
            player.gainItem(1472037, 1);
            player.gainItem(1352291, 1);
            break;
        case 1412:
        case 412:
            //隱士
            player.gainItem(1472053, 1);
            player.gainItem(1352292, 1);
            break;
        case 420:
            //俠客
            player.gainItem(1332012, 1);
            player.gainItem(1352280, 1);
            break;
        case 421:
            //獨行客
            player.gainItem(1332036, 1);
            player.gainItem(1352281, 1);
            break;
        case 422:
            //俠盜
            player.gainItem(1332052, 1);
            player.gainItem(1352282, 1);
            break;
        case 430:
            //20
            player.gainItem(1342000, 1);
            player.gainItem(1332008, 1);
            break;
        case 431:
            //見習刀客
            player.gainItem(1332103, 1); //短刀
            player.gainItem(1342001, 1); //拳套
            break;
        case 432:
            //45
            player.gainItem(1342002, 1);
            player.gainItem(1332014, 1);
            break;
        case 433:
            //雙刀客
            player.gainItem(1332054, 1); //短刀
            player.gainItem(1342004, 1); //拳套
            break;
        case 434:
            //雙刀客
            player.gainItem(1332052, 1); //短刀
            player.gainItem(1342008, 1); //拳套
            break;
        case 1500:
            player.gainItem(1482066, 1);
            break;
        case 500:
            player.gainItem(1492066, 1);
            player.gainItem(1482066, 1);
            player.gainItem(2330000, 2000); //银子弹
            break;
        case 3500:
            //機械師
            player.gainItem(1492066, 1);
            player.gainItem(1352700, 1);
            break;



        case 15500:
            player.gainItem(1482066, 1);
            break;
        case 1510:
        case 510:
            player.gainItem(1482004, 1); //冲锋队长 全覆式拳甲 30級
            player.gainItem(1352900, 1);
            break;

        case 1511:
        case 511:
            player.gainItem(1482022, 1); //冲锋队长 4周年枫叶金爪 60級
            player.gainItem(1352901, 1);
            break;

        case 1512:
        case 512:
            player.gainItem(1482078, 1); //冲锋队长 最终不速之客指套 100級
            player.gainItem(1352902, 1);
            break;
        case 3510:
            player.gainItem(1492069, 1);
            player.gainItem(1352701, 1);
            break;
        case 520:
            //火槍手
            player.gainItem(1492069, 1);
            player.gainItem(1352910, 1);

            break;
        case 3511:
            player.gainItem(1492072, 1);
            player.gainItem(1352702, 1);
            break;
        case 521:
            //大副
            player.gainItem(1492072, 1);
            player.gainItem(1352911, 1);

            break;
        case 3512:
            //機械師
            player.gainItem(1492074, 1);
            player.gainItem(1352703, 1);
            break;
        case 522:
            //船長
            player.gainItem(1492074, 1);
            player.gainItem(1352912, 1);

            break; //冒险家、骑士团 机械师 豹弩游侠 部分完成
        case 508:
            //龙的传人
            player.gainItem(1492066, 1);
            player.gainItem(2330003, 2000); //银子弹
            break;
        case 570:
            player.gainItem(1492069, 1);
            break;
        case 571:
            player.gainItem(1492072, 1);
            break;
        case 572:
            //龙的传人结束
            player.gainItem(1492074, 1);
            break;
        case 2100:
            //戰神
            player.gainItem(1442096, 1);


            break;
        case 2110:
            player.gainItem(1442099, 1);
            player.gainItem(1352930, 1);
            break;
        case 2111:
            player.gainItem(1442102, 1);
            player.gainItem(1352931, 1);
            break;
        case 2112:
            player.gainItem(1442105, 1);
            player.gainItem(1352932, 1);
            break; //战神完成




        case 3600:
            //尖兵
            player.gainItem(1242001, 1);
            player.gainItem(1353001, 1);
            break;
        case 3610:
            player.gainItem(1242002, 1);
            player.gainItem(1353002, 1);
            break;
        case 3611:
            player.gainItem(1242004, 1);
            player.gainItem(1353003, 1);
            break;
        case 3612:
            player.gainItem(1242008, 1);
            player.gainItem(1353004, 1);
            break; //尖兵结束
        case 6100:
            //狂龙战士
            player.gainItem(1402177, 1);
            player.gainItem(1352500, 1);
            break;
        case 6500:
            //爆莉萌天使
            player.gainItem(1222001, 1);
            player.gainItem(1352601, 1);
            break;
        case 6510:
            //爆莉萌天使
            player.gainItem(1222002, 1);
            player.gainItem(1352602, 1);
            break;
        case 6511:
            //爆莉萌天使
            player.gainItem(1222004, 1);
            player.gainItem(1352603, 1);
            break;
        case 6512:
            //爆莉萌天使
            player.gainItem(1222008, 1);
            player.gainItem(1352604, 1);
            break;

        case 501:
            //火炮手
            player.gainItem(1532045, 1);
            player.gainItem(2330000, 9999);
            break;
        case 530:
            player.gainItem(1532049, 1);
            player.gainItem(1352920, 1);
            break;
        case 531:
            player.gainItem(1532053, 1);
            player.gainItem(1352921, 1);
            break;
        case 532:
            player.gainItem(1532057, 1);
            player.gainItem(1352922, 1);
            break;
        case 2500:
            //影月
            player.gainItem(1482066, 1);
            player.gainItem(1353100, 1);
            break;
        case 2510:
            player.gainItem(1482069, 1);
            player.gainItem(1353101, 1);
            break;
        case 2511:
            player.gainItem(1482072, 1);
            player.gainItem(1353102, 1);
            break;
        case 2512:
            player.gainItem(1482074, 1);
            player.gainItem(1353103, 1);
            break;

        case 3700:
            //爆破手
            player.gainItem(1582000, 1); //10級武器
            player.gainItem(1353400, 1); //10級副武器
            player.gainItem(2330000, 2000); //子弹
            break;
        case 3710:
            //爆破手
            player.gainItem(1582001, 1); //30級武器
            player.gainItem(2330000, 2000); //子弹
            player.gainItem(1353401, 1);
            break;
        case 3711:
            //爆破手
            player.gainItem(1582003, 1); //60級武器
            player.gainItem(1353402, 1);
            break;
        case 3712:
            //爆破手
            player.gainItem(1582008, 1); //110級武器
            player.gainItem(1353404, 1); //100級副武器
            player.gainItem(2330003, 10000); //银子弹
            break;


        case 14200:
            //超能力者
            player.gainItem(1353200, 1);
            break;
        case 14210:
            player.gainItem(1262001, 1);
            player.gainItem(1353201, 1);
            break;
        case 14211:
            player.gainItem(1262003, 1);
            player.gainItem(1353202, 1);
            break;
        case 14212:
            player.gainItem(1262007, 1);
            player.gainItem(1353203, 1);
            break;
        case 11212:
            //林之灵
            player.gainItem(1252053, 1); //60級
            break;
        case 15200:
            //圣晶使徒
            player.gainItem(1282000, 1); //10級
            player.gainItem(1353500, 1); //副武器
            break;
        case 15210:
            //圣晶使徒
            player.gainItem(1282001, 1); //30級
            player.gainItem(1353501, 1); //副武器
            break;
        case 15211:
            //圣晶使徒
            player.gainItem(1282003, 1); //60級
            player.gainItem(1353502, 1); //副武器
            break;
        case 15212:
            //圣晶使徒
            player.gainItem(1282007, 1); //100級
            player.gainItem(1353503, 1); //副武器
            break;
        case 16400:
            //虎影
            player.gainItem(1292000, 1); //10級
            player.gainItem(1353800, 1); //副武器
            break;
        case 16410:
            //虎影
            player.gainItem(1292001, 1); //30級
            player.gainItem(1353801, 1); //副武器
            break;
        case 16411:
            //虎影
            player.gainItem(1292003, 1); //60級
            player.gainItem(1353802, 1); //副武器
            break;
        case 16412:
            //虎影
            player.gainItem(1292007, 1); //100級
            player.gainItem(1353803, 1); //副武器
            break;

        case 15100:
            //御剑骑士
            player.gainItem(1213000, 1); //10級
            player.gainItem(1354000, 1); //副武器
            break;
        case 15110:
            //御剑骑士
            player.gainItem(1213001, 1); //30級
            player.gainItem(1354001, 1); //副武器
            break;
        case 15111:
            //御剑骑士
            player.gainItem(1213003, 1); //60級
            player.gainItem(1354002, 1); //副武器
            break;
        case 15112:
            //御剑骑士
            player.gainItem(1213007, 1); //100級
            player.gainItem(1354006, 1); //副武器
            break;
        case 17500:
            //墨玄
            player.gainItem(1403000, 1); //10級
            player.gainItem(1352860, 1); //副武器
            break;
        case 17510:
            //墨玄
            player.gainItem(1403001, 1); //30級
            player.gainItem(1352861, 1); //副武器
            break;
        case 17511:
            //墨玄
            player.gainItem(1403003, 1); //60級
            player.gainItem(1352862, 1); //副武器
            break;
        case 17512:
            //墨玄
            player.gainItem(1403007, 1); //100級
            player.gainItem(1352863, 1); //副武器
            break;
        default:
            stage.dropAlertNotice("抱歉..當前職業不存在 職業ID " + stage.getJob());
            break;


    }
}
