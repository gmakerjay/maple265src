var icon1 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon2 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon3 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon4 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon5 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon6 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon7 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon8 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon9 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon10 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon11 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon12 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon13 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon14 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon15 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon16 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon17 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var icon18 = "#fUI/ChatEmoticon.img/1029/10290001/effect/" + rand(0, 18) + "#"
var p3 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var p4 = "#fUI/UIPVP.img/MiniMapIcon/star#"; //黃星星
var p1 = "#fUI/SoulUI.img/DungeonMap/icon/soulTrap/0#"
var p = "#fUI/StarCityUI.img/GradeInfo/icon_ss/2#"
var q6 = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/2#"
var p2 = "#fUI/SoulUI.img/DungeonMap/icon/dungeonItem/0#"
var e2 = "#fUI/Basic.img/HScr7/enabled/base#"
var e1 = "#fUI/Basic.img/HScr7/enabled/next0#"
var e3 = "#fUI/Basic.img/HScr7/enabled/prev0#"

var c991 = "#fUI/ChatEmoticon.img/1033/10330002/effect/1#"//永恆楓之谷new

var c992 = "#fUI/ChatEmoticon.img/1023/10230001/effect/6#"//家人星星
var Prize2 = [
    [9062539, 60],
    [9062536, 60],
    [9062537, 60],
    [9062542, 60],
    [9062543, 60],
    [9062540, 60],
    [9062544, 60],
    [9062506, 60],
    [9062508, 60],

    [9062523, 60],
    [9062513, 60],
    [9062516, 60],
    [9062786, 60],


];

function getNpcId() {
    let NpcId = 0;
    let t = -1, r = 0;
    for (let i = 0; i < Prize2.length; i++) {
        let weight = Prize2[i][1];
        let k = Math.log(Math.random()) / weight;
        if (k > t) {
            t = k;
            r = i;
        }
    }
    NpcId = Prize2[r][0];
    weight = Prize2[r][1];
    return NpcId;
}

var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黃星
var 品 = "#fItem/Install/0380.img/0380131" + rand(2, 7) + "/info/icon#"
let selStr = "\t\t\t\t  #e星語谷 技能中心#n#k\r\n";
selStr += "個別職業因跳過劇情等原因導致技能點/0轉技能不完整\r\n";
selStr += "使用本功能可以獲得缺失的技能點/技能\r\n";
selStr += "#L1#" + 品 + "1轉技能點#l";
selStr += "  #L2#" + 品 + "2轉技能點#l";
selStr += "  #L3#" + 品 + "3轉技能點#k#l";
selStr += "  #L4#" + 品 + "4轉技能點#k#l\r\n\r\n";
selStr += "#L5#" + 品 + "影武者技能點#l";
selStr += "  #L6#" + 品 + "0轉技能缺失(個別職業無效請聯繫GM添加)#l\r\n\r\n";
selStr += "#L7#" + 品 + "神之子技能#l";
//selStr += "#L9923#" + 品 + "#r重置解封#k#l\r\n";
selStr += "\r\n\r\n" + icon1 + icon2 + icon3 + icon4 + icon5 + icon6 + icon7 + icon8 + icon9 + icon10 + icon11 + icon12 + icon13 + icon14 + icon15 + icon16 + icon17 + icon10 + icon11 + icon12 + icon13 + icon14 + icon15 + icon16 + icon17 + icon18 + "\r\n";
//selStr +="#L225##l#k\r\n";
let selection = npc.uiMax().id(getNpcId()).askMenu(selStr);
switch (selection) {
    case 1:
        stage.modifySp(1, 100)
        npc.say("已獲得1轉技能點\r\n如果依舊不夠,請繼續點擊獲得")
        break;
    case 2:
        stage.modifySp(2, 200)
        npc.say("已獲得2轉技能點\r\n如果依舊不夠,請繼續點擊獲得")
        break;
    case 3:
        stage.modifySp(3, 200)
        npc.say("已獲得3轉技能點\r\n如果依舊不夠,請繼續點擊獲得")
        break;
    case 4:
        stage.modifySp(4, 200)
        npc.say("已獲得4轉技能點\r\n如果依舊不夠,請繼續點擊獲得")
        break;
    case 5:
        if (stage.getJob() == 434 || stage.getJob() == 432 || stage.getJob() == 431 || stage.getJob() == 433 || stage.getJob() == 400) {
            stage.modifySp(4, 80)
            stage.modifySp(5, 80)
            stage.modifySp(6, 80)
            npc.say("已獲得技能點\r\n如果依舊不夠,請繼續點擊獲得")
        } else {
            npc.say("你的職業不是影武者！")
        }
        break;
    case 6:

        stage.changeSkillLevel(170001005, 1);
        stage.changeSkillLevel(50001005, 1);
        stage.changeSkillLevel(10001005, 1);
        stage.changeSkillLevel(10001215, 1);
        stage.changeSkillLevel(40001005, 1);
        stage.changeSkillLevel(20001005, 1);
        stage.changeSkillLevel(30001005, 1);
        //stage.changeSkillLevel(500001000, 1);
        //stage.changeSkillLevel(500001002, 1);400001008
        //stage.changeSkillLevel(500001003, 1);
        //stage.changeSkillLevel(500001004, 1);
        stage.changeSkillLevel(1005, 1);
        if (stage.getJob() == 2700 || stage.getJob() == 2710 || stage.getJob() == 2711 || stage.getJob() == 2712 | stage.getJob() == 2004) {//亞克
            stage.changeSkillLevel(20041222, 1);
            stage.changeSkillLevel(20041005, 1);

            stage.changeSkillLevel(20040216, 1);
            stage.changeSkillLevel(20040217, 1);
            stage.changeSkillLevel(20040218, 2);
            stage.changeSkillLevel(20040219, 1);
            stage.changeSkillLevel(20040221, 1);
            stage.changeSkillLevel(20041239, 1);
            stage.changeSkillLevel(20040190, 1);

            npc.say("獲得技能#s20041222# #s20041005# #s20040216# #s20040217# #s20040218# #s20040219# #s20040221# #s20041239# #s20040190#")
        }

        if (stage.getJob() == 15500 || stage.getJob() == 15510 || stage.getJob() == 15511 || stage.getJob() == 15512) {//亞克
            stage.changeSkillLevel(150010079, 1);
            stage.changeSkillLevel(150011074, 1);
            npc.say("獲得技能#s150010079# #s150011074#")
        }

        if (stage.getJob() == 6400 || stage.getJob() == 6411 || stage.getJob() == 6412 || stage.getJob() == 6002) {//鎖鏈
            stage.changeSkillLevel(60021217, 1);
            stage.changeSkillLevel(60021005, 1);

            stage.changeSkillLevel(60020216, 1);
            stage.changeSkillLevel(60021068, 1);
            npc.say("獲得技能#s60021217# #s60021005# #s60020216# #s60021068#")
        }
		if (stage.getJob() == 15200 || stage.getJob() == 15210 || stage.getJob() == 15211 || stage.getJob() == 15212) {//雅克
            stage.changeSkillLevel(150000079, 1);
            stage.changeSkillLevel(150001005, 1);

            stage.changeSkillLevel(150001016, 1);
     
            npc.say("獲得技能#s150001016# #s150001005# #s150000079# ")
        }

        if (stage.getJob() == 1112 || stage.getJob() == 1111 || stage.getJob() == 1110 || stage.getJob() == 1110) {//魂騎士
            stage.changeSkillLevel(10000246, 1);
            stage.changeSkillLevel(10000250, 1);
            npc.say("獲得技能#s10000250# #s10000246#")
        }
        if (stage.getJob() == 6500 || stage.getJob() == 6510 || stage.getJob() == 6511 || stage.getJob() == 6512) {//天使破
            stage.changeSkillLevel(60011222, 1);
            stage.changeSkillLevel(60011216, 1);
            stage.changeSkillLevel(60010217, 1);
            stage.changeSkillLevel(60011218, 1);
            stage.changeSkillLevel(60011005, 1);

            npc.say("獲得技能#s60011222# #s60011216# #s60010217# #s60011005# #s60011218#")
        }
        if (stage.getJob() == 15400 || stage.getJob() == 15410 || stage.getJob() == 15411 || stage.getJob() == 15412) {//卡莉
            stage.changeSkillLevel(150030079, 1);
            stage.changeSkillLevel(150030241, 2);
            stage.changeSkillLevel(150031005, 1);

            npc.say("獲得技能#s150030079# #s150030241# #s150031005#")
        }
        if (stage.getJob() == 1400 || stage.getJob() == 1410 || stage.getJob() == 1411 || stage.getJob() == 1412) {//夜行者
            stage.changeSkillLevel(10000249, 1);
            stage.changeSkillLevel(10000250, 1);

            stage.changeSkillLevel(50000202, 6);
            stage.changeSkillLevel(10000202, 6);
            stage.changeSkillLevel(10001253, 1);
            stage.changeSkillLevel(10001254, 1);

            stage.changeSkillLevel(10000258, 10);

            npc.say("獲得技能#s10000249# #s10000250# #s10000258#")
        }
        if (stage.getJob() == 17500 || stage.getJob() == 17510 || stage.getJob() == 17511 || stage.getJob() == 17512) {//墨玄

            stage.changeSkillLevel(175000006, 1);
            stage.changeSkillLevel(175001003, 20);

            npc.say("獲得技能#s175000006# #s175001003#")
        }
        if (stage.getJob() == 1310 || stage.getJob() == 1311 || stage.getJob() == 1312 || stage.getJob() == 1300) {//破風使者
            stage.changeSkillLevel(10000250, 1);
            stage.changeSkillLevel(10000247, 1);
            stage.changeSkillLevel(10001244, 1);
            stage.changeSkillLevel(10001245, 1);
            npc.say("獲得技能#s10000250# #s10000247# #s10001244# #s10001245#")
        }

        if (stage.getJob() == 16200 || stage.getJob() == 16210 || stage.getJob() == 16211 || stage.getJob() == 16212) {//拉拉
            stage.changeSkillLevel(160010000, 1);
            stage.changeSkillLevel(160011074, 1);
            stage.changeSkillLevel(160011005, 1);
            stage.changeSkillLevel(160011075, 1);
            npc.say("獲得技能#s160010000# #s160011074# #s160011005# #s160011075#")
        }
        if (stage.getJob() == 4200 || stage.getJob() == 4210 || stage.getJob() == 4211 || stage.getJob() == 4212) {//YYS
            stage.changeSkillLevel(40020000, 1);
            stage.changeSkillLevel(40021227, 1);
            stage.changeSkillLevel(40020001, 1);
            stage.changeSkillLevel(40020109, 1);
            stage.changeSkillLevel(40021109, 1);
            npc.say("獲得技能#s40020000# #s40021227# #s40020001# #s40020109# #s40021109#")
        }
        if (stage.getJob() == 2100 || stage.getJob() == 2110 || stage.getJob() == 2111 || stage.getJob() == 2112) {//狂狼
            stage.changeSkillLevel(20001295, 1);//
            stage.changeSkillLevel(20000194, 1);//
            stage.changeSkillLevel(20000297, 2);//


            npc.say("獲得技能#s20001295# #s20000194# #s20000297#")
        }
        if (stage.getJob() == 2300 || stage.getJob() == 2310 || stage.getJob() == 2311 || stage.getJob() == 2312) {//精靈
            stage.changeSkillLevel(20020112, 1);//
            stage.changeSkillLevel(20020109, 1);//
            stage.changeSkillLevel(20020111, 1);//

            npc.say("獲得技能#s20020112# #s20020109# #s20020111#")

        }
        if (stage.getJob() == 3110 || stage.getJob() == 3111 || stage.getJob() == 3112 || stage.getJob() == 3100) {//惡魔
            // stage.changeSkillLevel(25100107, 10);
            stage.changeSkillLevel(30010110, 1);
            stage.changeSkillLevel(31000004, 1);

            stage.changeSkillLevel(400001013, 1);
            stage.changeSkillLevel(31001000, 15);

            stage.changeSkillLevel(30010185, 1);
            stage.changeSkillLevel(30010111, 1);
            stage.changeSkillLevel(30010112, 1);
            stage.changeSkillLevel(31000002, 10);
            stage.changeSkillLevel(31000003, 10);

            stage.changeSkillLevel(31000009, 20);
            stage.changeSkillLevel(30011109, 1);
            npc.say("獲得技能")
        }
        if (stage.getJob() == 6000 || stage.getJob() == 6100 || stage.getJob() == 6110 || stage.getJob() == 6111 || stage.getJob() == 6112) {//凱撒
            stage.changeSkillLevel(60001216, 1);//
            stage.changeSkillLevel(60001217, 1);//
            stage.changeSkillLevel(60001218, 1);//
            stage.changeSkillLevel(60001219, 1);//
            stage.changeSkillLevel(60000219, 1);//
            stage.changeSkillLevel(60001005, 1);//


            npc.say("獲得技能#s60001216# #s60001217# #s60001218# #s60001219# #s60000219# #s60001005#")
        }
        if (stage.getJob() == 4001 || stage.getJob() == 4100 || stage.getJob() == 4110 || stage.getJob() == 4111 || stage.getJob() == 4112) {//劍豪缺少的0轉技能，在1轉的時候判定給他這2個技能
            stage.changeSkillLevel(40011289, 1);//疾風五月雨刃
            stage.changeSkillLevel(40011288, 1);//拔刀姿勢
            stage.changeSkillLevel(40011290, 1);//百人一閃
            stage.changeSkillLevel(40010000, 1);//
            stage.changeSkillLevel(40010067, 1);//
            npc.say("獲得技能#s40011288# #s40011289# #s40011290# #s40010000# #s40010067#")
        }
        if (stage.getJob() == 3101 || stage.getJob() == 3120 || stage.getJob() == 3121 || stage.getJob() == 3122) {//惡魔
            // stage.changeSkillLevel(25100107, 10);
            stage.changeSkillLevel(30010110, 1);
            stage.changeSkillLevel(30010185, 1);

            stage.changeSkillLevel(30010230, 1);
            stage.changeSkillLevel(30010242, 1);

            stage.changeSkillLevel(30010232, 1);
            stage.changeSkillLevel(30010231, 1);

            npc.say("獲得技能#s30010110# #s30010230# #s30010242# #s30010232# #s30010231# #s30010185#")
        }
        if (stage.getJob() == 15002 || stage.getJob() == 15100 || stage.getJob() == 15110 || stage.getJob() == 15111 || stage.getJob() == 15112) {//阿黛爾
            // stage.changeSkillLevel(25100107, 10);
            stage.changeSkillLevel(150020006, 10);
            stage.changeSkillLevel(151001004, 1);
            stage.changeSkillLevel(150021005, 1);

            npc.say("獲得技能#s150020006# #s151001004#")
        }
        if (stage.getJob() == 3512 || stage.getJob() == 3511 || stage.getJob() == 3510 || stage.getJob() == 3500) {//機甲戰神
            // stage.changeSkillLevel(25100107, 10);
            stage.changeSkillLevel(30001068, 1);
            stage.changeSkillLevel(30000227, 1);
            stage.changeSkillLevel(30001281, 1);
            stage.changeSkillLevel(30001078, 1);
            stage.changeSkillLevel(30001079, 1);
            stage.changeSkillLevel(30001080, 1);
            npc.say("獲得技能#s30001068# #s30001281# #s30000227# #s30001078# #s30001079# #s30001080#")
        }
        if (stage.getJob() == 2500 || stage.getJob() == 2510 || stage.getJob() == 2511 || stage.getJob() == 2512 || stage.getJob() == 2005) {//隱約
            // stage.changeSkillLevel(25100107, 10);
            stage.changeSkillLevel(20051284, 1);
            stage.changeSkillLevel(20050074, 1);
            stage.changeSkillLevel(20050285, 1);

            stage.changeSkillLevel(25001000, 25);
            stage.changeSkillLevel(25001002, 25);
            stage.changeSkillLevel(25001006, 20);

            npc.say("獲得技能#s20051284# #s20050074# #s20050285# #s25001000# #s25001002# #s25001006#")
        }
        if (stage.getJob() == 15500 || stage.getJob() == 15500 || stage.getJob() == 15510 || stage.getJob() == 15511 || stage.getJob() == 15512) {
            stage.changeSkillLevel(155101006, 1);//侵蝕控制
            npc.say("獲得技能#s155101006#")
        }
        if (stage.getJob() == 3000 || stage.getJob() == 3300 || stage.getJob() == 3310 || stage.getJob() == 3311 || stage.getJob() == 3312) {
            stage.changeSkillLevel(30001061, 1);//補貨
            stage.changeSkillLevel(30001062, 1);//補貨
            npc.say("獲得技能#s150001061# #s30001062#")
        }
        if (stage.getJob() == 3600 || stage.getJob() == 3002 || stage.getJob() == 3600 || stage.getJob() == 3610 || stage.getJob() == 3612) {//捷諾多功能模式，在2轉的時候判定給他這技能
            stage.changeSkillLevel(30021236, 1);
            stage.changeSkillLevel(30021235, 1);
            stage.changeSkillLevel(30021236, 1);
            stage.changeSkillLevel(30021237, 1);
            stage.changeSkillLevel(30020240, 1);
            stage.changeSkillLevel(30020232, 1);
            stage.changeSkillLevel(30020234, 1);
            npc.say("獲得技能#s30021236# #s30021235# #s30021236# #s30021237# #s30020240# #s30020232# #s30020234#")
        }
        if (stage.getJob() == 17001 || stage.getJob() == 17200 || stage.getJob() == 17210 || stage.getJob() == 17211 || stage.getJob() == 17212) {//琳恩0轉
            stage.changeSkillLevel(170011000, 1);
            stage.changeSkillLevel(170011001, 1);
            stage.changeSkillLevel(170011002, 1);
            stage.changeSkillLevel(170011005, 1);
            stage.changeSkillLevel(170010241, 1);

            npc.say("獲得技能#s170011000# #s170011001# #s170011002# #s170010241# #s170011005#")
        }
        if (stage.getJob() == 16400 || stage.getJob() == 16410 || stage.getJob() == 16411 || stage.getJob() == 16412 || stage.getJob() == 16000) {//狐影
            stage.changeSkillLevel(160000076, 10);
            stage.changeSkillLevel(160001075, 1);
            stage.changeSkillLevel(160001005, 1);
            stage.changeSkillLevel(164001004, 1);
            stage.changeSkillLevel(160000000, 1);
            npc.say("獲得技能#s160000076# #s160001075# #s160001005# #s164001004# #s160000000#")
        }

        if (stage.getJob() == 2400 || stage.getJob() == 2003 || stage.getJob() == 2410 || stage.getJob() == 2411 || stage.getJob() == 2412) {//幻影
            stage.changeSkillLevel(20031260, 1);
            stage.changeSkillLevel(20031209, 1);
            stage.changeSkillLevel(20031210, 1);

            stage.changeSkillLevel(20031203, 1);
            stage.changeSkillLevel(20031205, 1);
            stage.changeSkillLevel(20031207, 1);
            stage.changeSkillLevel(20031208, 1);
            stage.changeSkillLevel(20030206, 1);

            npc.say("獲得技能#s20031210# #s20031209# #s20031260# #s20031203# #s20031205# #s20031207# #s20031208# #s20030206#")
        }
        break;
    case 7:
        if (stage.getJob() == 10112) {
            stage.modifySp(1, 100)
            stage.modifySp(2, 100)
            stage.changeSkillLevel(100000271, 5);//
            stage.changeSkillLevel(80000110, 5);//
            stage.changeSkillLevel(100001262, 1);//重归神殿
            stage.changeSkillLevel(100000282, 1);//雙重打擊
            stage.changeSkillLevel(100001263, 1);//聖靈之光
            stage.changeSkillLevel(100001265, 1);//爆裂跳躍
            stage.changeSkillLevel(100001266, 1);//爆裂衝刺
            stage.changeSkillLevel(100001268, 1);//時之庇護

            stage.changeSkillLevel(100000279, 5);//决意时刻

            stage.changeSkillLevel(100001284, 1);//超越者的意志
            stage.changeSkillLevel(100000267, 1);//時間凝結
            stage.changeSkillLevel(100001261, 1);//時間扭曲
            stage.changeSkillLevel(100001274, 1);//掌握時間
            stage.changeSkillLevel(100001272, 1);//時間倒轉

            stage.changeSkillLevel(100001283, 1);//暗影之雨
            stage.changeSkillLevel(100001005, 1);//集中時間
            npc.say("已獲得技能點\r\n獲得技能:#s100001262# #s100000282# #s100001263# #s100001265# #s100001266# #s100001266# #s100001268# #s100000279# #s100001284# #s100000267# #s100000261# #s100000274# #s100000272# #s100001283# #s100001005#\r\n如果依舊不夠,請繼續點擊獲得")
        } else {
            npc.say("你的職業不是神之子！")
        }
        break;
}

function rand(a, b) {
    return ~~(Math.random() * (b - a)) + a;
}

/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

