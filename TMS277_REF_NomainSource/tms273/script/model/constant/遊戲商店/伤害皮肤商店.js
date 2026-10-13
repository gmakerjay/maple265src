/**
 * 商城-新端脚本
 **/
let cat1 = "#fItem/Pet/5000000.img/alert/0#";
let cat2 = "#fItem/Pet/5000000.img/fly/0#";
let cat3 = "#fItem/Pet/5000000.img/cry/0#";
let tu1 = "#fItem/Cash/0501.img/05010045/effect/stand1/1#"
let tu2 = "#fItem/Cash/0501.img/05010002/effect/default/7#"
let tu3 = "#fUI/NameTag/medal/758/w#"
let tu4 = "#fEffect/SetEff.img/245/effect/28#"
let tu5 = "#fUI/NameTag/medal/758/e#"
let tu6 = "#fUI/NameTag/medal/758/c#"
let fy = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/1#";
let fy1 = "#fUI/RunnerGame.img/RunnerGameUI/UI/Point/2#";
let dz = "#fUI/GuildMark/Mark/Etc/00009020/1#";
let dz1 = "#fEffect/CharacterEff/1003393/1/0#";
let star = "#fEffect/CharacterEff/1051294/1/1#"
let eff2 = "#fEffect/CharacterEff/1112925/0/0#";
var eff1 = "#fEffect/CharacterEff/1112924/0/0#";

let type = 1;// 1=点券商城 2=抵用商城 3=金币商城 4=余额商城
let scriptName = "快捷商店"
let items = Array(
    //类别（展示出来的）
    Array("#r伤害皮肤自选",
    Array(2439897,10000),//情人节伤害皮肤
    Array(2439805,10000),//金色圣诞伤害皮肤
    Array(2439407,10000),//黑暗锁链伤害皮肤
    Array(2439381,10000),//大师斯泰拉伤害皮肤?
    Array(2435158,10000),//爆炸伤害皮肤?
    Array(2439373,10000),//宝宝脚印伤害皮肤
    Array(2439336,10000),//迷雾伤害皮肤
    Array(2436027,10000),//蓝色波浪伤害皮肤
    Array(2439212,10000),//外星人伤害皮肤
    Array(2434528,10000),//USA伤害皮肤
    Array(2439129,10000),//海洋小可爱伤害皮肤（保
    Array(2438880,10000),//怪物伤害皮肤
    Array(2438759,10000),//12周年伤害皮肤
    Array(2438676,10000),//足球服伤害皮肤
    Array(2438663,10000),//冒险岛字体(JP)伤害皮肤
    Array(2438592,10000),//摄影海报伤害皮肤
    Array(2438637,10000),//绘图日记伤害皮肤
    Array(2438596,10000),//蛋糕雕花伤害皮肤
    Array(2438529,10000),//十二生肖伤害皮肤
    Array(2438491,10000),//圆球巧克力伤害皮肤
    Array(2438378,10000),//汪汪伤害皮肤
    Array(2438313,10000),//松饼伤害皮肤
    Array(2438300,10000),//魔力星伤害皮肤
    Array(2438272,10000),//璀璨夺目伤害皮肤
    Array(2438265,10000),//光与暗伤害皮肤
    Array(2438263,10000),//星极光伤害皮肤 ?
    Array(2438252,10000),//黑桃伤害皮肤
    Array(2438233,10000),//愚人节伤害皮肤(彩色宫书
    Array(2433063,10000),//Star Planet伤害皮肤?
    Array(2435184,10000),//本性森林伤害皮肤?
    Array(2435141,10000),//结冰化冻伤害皮肤
    Array(2434710,10000),//MVP特别专用伤害皮肤
    Array(2435030,10000),//霓虹圣诞树伤害皮肤
    Array(2434574,10000),//满月伤害皮肤
    Array(2437488,10000),//蝴蝶结伤害皮肤
    Array(2437484,10000),//<平衡喵>伤害皮肤
    Array(2437270,10000),//史蒂奇伤害皮肤
    Array(2437274,10000),//掷骰大师伤害皮肤
    Array(2437190,10000),//怪物气球伤害皮肤
    Array(2434390,10000),//小熊伤害皮肤
    Array(2438143,10000),//时间超越者伤害皮肤
    Array(2438088,10000),//属狗伤害皮肤
    Array(2438089,10000),//桔子伤害皮肤?
    Array(2438087,10000),//复仇鬼年兽伤害皮肤 ?
    Array(2438086,10000),//年兽伤害皮肤
    Array(2438085,10000),//红包伤害皮肤
    Array(2437847,10000),//如风伤害皮肤
    Array(2437769,10000),//日月伤害皮肤
    Array(2437702,10000),//冬日之夜伤害皮肤
    Array(2437700,10000),//万花筒伤害皮肤
    Array(2437697,10000),//传说伤害皮肤
    Array(2437521,10000),//圣诞糖果伤害皮肤
    Array(2437166,10000),//笔记本伤害皮肤
    Array(2437051,10000),//夏威夷的晚霞伤害皮肤
    Array(2437049,10000),//夏季沙滩伤害皮肤
    Array(2439212,10000),//外星人伤害皮肤
    Array(2436830,10000),//<埃尔露娜气息>伤害皮肤
    Array(2436831,10000),//粉嫩花瓣伤害皮肤
    Array(2433775,10000),//奥尔卡伤害皮肤
    Array(2432526,10000),//键盘战士伤害皮肤
    Array(2438663,10000),//冒险岛字体(JP)伤害皮肤
    Array(2435549,10000),//嘿嘿嘿伤害皮肤
    Array(2436657,10000),//水彩画伤害皮肤
    Array(2438802,10000),//极道超女伤害皮肤
    Array(2436228,10000),//路西德蝴蝶伤害皮肤
    Array(2436133,10000),//小鸡喳喳伤害皮肤
    Array(2435802,10000),//巨龙烟花伤害皮肤 ?
    Array(2435565,10000),//英雄战神伤害皮肤
    Array(2435566,10000),//英雄夜光法师伤害皮肤
    Array(2435568,10000),//英雄隐月伤害皮肤
    Array(2435486,10000), //嘟嘟伤害皮肤
    Array(2439336,10000),//迷雾伤害皮肤
    Array(2436560,10000),//麦加伤害皮肤
    Array(2433913,10000),//白雪人x企鹅王伤害皮肤
    Array(2433980,10000),//绿水灵x花蘑菇伤害皮肤
    Array(2433981,10000),//品克缤伤害皮肤
    Array(2438885,10000),//15番街伤害皮肤
    Array(2439256,10000),//神兽伤害皮肤
    Array(2439926,10000),//侦探事务所
    Array(2436027,10000),//蓝色波浪伤害皮肤
    Array(2439395,10000),
    Array(2439895,10000),
    Array(2437009,10000),
    Array(2433570,10000),
    Array(2439572,10000),//Star Planet伤害皮肤（单元）
    Array(2433063,10000),///Star Planet伤害皮肤
    Array(2439337,10000),///迷雾伤害皮肤（单元）
    Array(2436679,10000),///阿尔卡纳（单元）
    Array(2439337,10000),
    Array(2630435,10000),//短中分正流行伤害皮肤
    Array(2630753,10000),
    Array(2439337,10000),
    Array(2437846,10000),//1071光与影伤害皮肤：
    Array(2438415,10000),//1380埃斯佩拉伤害皮肤：
    Array(2630214,10000),//230折纸：
    Array(2438171,10000),//58轻柔春风：
    Array(2438761,10000),//112青炎：
    Array(2630436,10000),//240短中分正流：
    Array(2630267,10000),//236甜蜜蜜：
    Array(2439928,10000),//225璀璨夺目：
    Array(2630746,10000),//253天族：
    Array(2630480,10000),//242新复古九尾狐：
    Array(2630263,10000),//235海蛇伤害：
    Array(2630104,10000),//55酥脆甜饼：
    Array(2434950,10000),//1058果冻：
    Array(2435667,10000),//1042本性森林：
    Array(2630400,10000),//238熟睡兔：
    Array(2438379,10000),//195怦怦爱心：
    Array(2630744,10000),//252虎影：
    Array(2438295,10000),//169星座
    Array(2431965,10000),
    Array(2630381,10000),
    Array(2433104,10000),
    Array(2434566,10000),
    Array(2432131,10000),
    Array(2432603,10000),
    Array(2432154,10000),
    Array(2432207,10000),
    Array(2432354,10000),
    Array(2432355,10000),
    Array(2432465,10000),
    Array(2432479,10000),
    Array(2432526,10000),
    Array(2432532,10000),
    Array(2432592,10000),
    Array(2432640,10000),
    Array(2432710,10000),
    Array(2432836,10000),
    Array(2434519,10000),
    Array(2433063,10000),
    Array(2433178,10000),
    Array(2433456,10000),
    Array(2433631,10000),
    Array(2433715,10000),
    Array(2433804,10000),
    Array(2435356,10000),
    Array(2433913,10000),
    Array(2433980,10000),
    Array(2433981,10000),
    Array(2433990,10000),
    Array(2435027,10000),
    Array(2434273,10000),
    Array(2434274,10000),
    Array(2434289,10000),
    Array(2434390,10000),
    Array(2434391,10000),
    Array(2434528,10000),
    Array(2434529,10000),
    Array(2434530,10000),
    Array(2434546,10000),
    Array(2434574,10000),
    Array(2434575,10000),
    Array(2434542,10000),
    Array(2434654,10000),
    Array(2434655,10000),
    Array(2434661,10000),
    Array(2434710,10000),
    Array(2434734,10000),
    Array(2434824,10000),
    Array(2431966,10000),
    Array(2433113,10000),
    Array(2435026,10000),
    Array(2435028,10000),
    Array(2438192,10000),
    Array(2434950,10000),
    Array(2434951,10000),
    Array(2435030,10000),
    Array(2435043,10000),
    Array(2435044,10000),
    Array(2435046,10000),
    Array(2435047,10000),
    Array(2435140,10000),
    Array(2435141,10000),
    Array(2435179,10000),
    Array(2435162,10000),
    Array(2435157,10000),
    Array(2435158,10000),
    Array(2435159,10000),
    Array(2434619,10000),
    Array(2434663,10000),
    Array(2435166,10000),
    Array(2435184,10000),
    Array(2435222,10000),
    Array(2435293,10000),
    Array(2435313,10000),
    Array(2438241,10000),
    Array(2438255,10000),
    Array(2438233,10000),
    Array(2435316,10000),
    Array(2435408,10000),
    Array(2435427,10000),
    Array(2435428,10000),
    Array(2435429,10000),
    Array(2435456,10000),
    Array(2437190,10000),
    Array(2435424,10000),
    Array(2435425,10000),
    Array(2438587,10000),
    Array(2438247,10000),
    Array(2435433,10000),
    Array(2435521,10000),
    Array(2435522,10000),
    Array(2435183,10000),
    Array(2437846,10000),
    Array(2439579,10000),
    Array(2436766,10000),
    Array(2438251,10000),
    Array(2438252,10000),
    Array(2438808,10000),
    Array(2438254,10000),
    Array(2435972,10000),
    Array(2436023,10000),
    Array(2436024,10000),
    Array(2436026,10000),
    Array(2436027,10000),
    Array(2436028,10000),
    Array(2436029,10000),
    Array(2438263,10000),
    Array(2436085,10000),
    Array(2438265,10000),
    Array(2438266,10000),
    Array(2438158,10000),
    Array(2438268,10000),
    Array(2438726,10000),
    Array(2436182,10000),
    Array(2437761,10000),
    Array(2438272,10000),
    Array(2436268,10000),
    Array(2436258,10000),
    Array(2436259,10000),
    Array(2436400,10000),
    Array(2436437,10000),
    Array(2436521,10000),
    Array(2436528,10000),
    Array(2436529,10000),
    Array(2436522,10000),
    Array(2436553,10000),
    Array(2436560,10000),
    Array(2436578,10000),
    Array(2436611,10000),
    Array(2436612,10000),
    Array(2436596,10000),
    Array(2436679,10000),
    Array(2437470,10000),
    Array(2436681,10000),
    Array(2436682,10000),
    Array(2436133,10000),
    Array(2436474,10000),
    Array(2438293,10000),
    Array(2438823,10000),
    Array(2439212,10000),
    Array(2438297,10000),
    Array(2438298,10000),
    Array(2437023,10000),
    Array(2438300,10000),
    Array(2437009,10000),
    Array(2438925,10000),
    Array(2437243,10000),
    Array(2437239,10000),
    Array(2434051,10000),
    Array(2434045,10000),
    Array(3801113,10000),
    Array(2438309,10000),
    Array(2438926,10000),
    Array(2438311,10000),
    Array(2438312,10000),
    Array(2438313,10000),
    Array(2439064,10000),
    Array(2438315,10000),
    Array(2437877,10000),
    Array(2438143,10000),
    Array(2439489,10000),
    Array(2438924,10000),
    Array(2438378,10000),
    Array(2438413,10000),
    Array(2438415,10000),
    Array(2438418,10000),
    Array(2438420,10000),
    Array(2438485,10000),
    Array(2438491,10000),
    Array(2438529,10000),
    Array(2438676,10000),
    Array(2432591,10000),
    Array(2432695,10000),
    Array(2432748,10000),
    Array(2432749,10000),
    Array(2432804,10000),
    Array(2434977,10000),
    Array(2433112,10000),
    Array(2433038,10000),
    Array(2433252,10000),
    Array(2433197,10000),
    Array(2433182,10000),
    Array(2433183,10000),
    Array(2433184,10000),
    Array(2439398,10000),
    Array(2439396,10000),
    Array(2433362,10000),
    Array(2433558,10000),
    Array(2433587,10000),
    Array(2433588,10000),
    Array(2433572,10000),
    Array(2433571,10000),
    Array(2433570,10000),
    Array(2433569,10000),
    Array(2433568,10000),
    Array(2438281,10000),
    Array(2434081,10000),
    Array(2433777,10000),
    Array(2433775,10000),
    Array(2433776,10000),
    Array(2433828,10000),
    Array(2433829,10000),
    Array(2433830,10000),
    Array(2433831,10000),
    Array(2433832,10000),
    Array(2433833,10000),
    Array(2433883,10000),
    Array(2434147,10000),
    Array(2434157,10000),
    Array(2438753,10000),
    Array(2434375,10000),
    Array(2438755,10000),
    Array(2438759,10000),
    Array(2434374,10000),
    Array(2435358,10000),
    Array(2434601,10000),
    Array(2438757,10000),
    Array(2438204,10000),
    Array(2434544,10000),
    Array(2434545,10000),
    Array(2434658,10000),
    Array(2434659,10000),
    Array(2435670,10000),
    Array(2435357,10000),
    Array(2434868,10000),
    Array(2434873,10000),
    Array(2434875,10000),
    Array(2434877,10000),
    Array(2434879,10000),
    Array(2434817,10000),
    Array(2434818,10000),
    Array(2435037,10000),
    Array(2437847,10000),
    Array(2437848,10000),
    Array(2437849,10000),
    Array(2435193,10000),
    Array(2435523,10000),
    Array(2435196,10000),
    Array(2435213,10000),
    Array(2435335,10000),
    Array(2435336,10000),
    Array(2435486,10000),
    Array(2435487,10000),
    Array(2435488,10000),
    Array(2435489,10000),
    Array(2435548,10000),
    Array(2435549,10000),
    Array(2435542,10000),
    Array(2435543,10000),
    Array(2435544,10000),
    Array(2435545,10000),
    Array(2435546,10000),
    Array(2435568,10000),
    Array(2435565,10000),
    Array(2435566,10000),
    Array(2435567,10000),
    Array(2435673,10000),
    Array(2435674,10000),
    Array(2435802,10000),
    Array(2435905,10000),
    Array(2435906,10000),
    Array(2435907,10000),
    Array(2435908,10000),
    Array(2435948,10000),
    Array(2435949,10000),
    Array(2435950,10000),
    Array(2435951,10000),
    Array(2435952,10000),
    Array(2435953,10000),
    Array(2435954,10000),
    Array(2435955,10000),
    Array(2435956,10000),
    Array(2435957,10000),
    Array(2438775,10000),
    Array(2438799,10000),
    Array(2436132,10000),
    Array(2436134,10000),
    Array(2438802,10000),
    Array(2436227,10000),
    Array(2436228,10000),
    Array(2436229,10000),
    Array(2436230,10000),
    Array(2436300,10000),
    Array(2436323,10000),
    Array(2436475,10000),
    Array(2436476,10000),
    Array(2436477,10000),
    Array(2436478,10000),
    Array(2436479,10000),
    Array(2436563,10000),
    Array(2436651,10000),
    Array(2436652,10000),
    Array(2436653,10000),
    Array(2436654,10000),
    Array(2436655,10000),
    Array(2436656,10000),
    Array(2436657,10000),
    Array(2436658,10000),
    Array(2436643,10000),
    Array(2436644,10000),
    Array(2436645,10000),
    Array(2436646,10000),
    Array(2435516,10000),
    Array(2436740,10000),
    Array(2436741,10000),
    Array(2436742,10000),
    Array(2436743,10000),
    Array(2436744,10000),
    Array(2436745,10000),
    Array(2436746,10000),
    Array(2436747,10000),
    Array(2436748,10000),
    Array(2436749,10000),
    Array(2436808,10000),
    Array(2436830,10000),
    Array(2436831,10000),
    Array(2436832,10000),
    Array(2437005,10000),
    Array(2437049,10000),
    Array(2437050,10000),
    Array(2437051,10000),
    Array(2437052,10000),
    Array(2436984,10000),
    Array(2436986,10000),
    Array(2437166,10000),
    Array(2437167,10000),
    Array(2437168,10000),
    Array(2437169,10000),
    Array(2437268,10000),
    Array(2437269,10000),
    Array(2437270,10000),
    Array(2437271,10000),
    Array(2437274,10000),
    Array(2437484,10000),
    Array(2437485,10000),
    Array(2437488,10000),
    Array(2437489,10000),
    Array(2437490,10000),
    Array(2437491,10000),
    Array(2437521,10000),
    Array(2437522,10000),
    Array(2437523,10000),
    Array(2437524,10000),
    Array(2437696,10000),
    Array(2437697,10000),
    Array(2437700,10000),
    Array(2437701,10000),
    Array(2437702,10000),
    Array(2437703,10000),
    Array(2437707,10000),
    Array(2437708,10000),
    Array(2437709,10000),
    Array(2437710,10000),
    Array(2437711,10000),
    Array(2437712,10000),
    Array(2437768,10000),
    Array(2437769,10000),
    Array(2437856,10000),
    Array(2438095,10000),
    Array(2438085,10000),
    Array(2438086,10000),
    Array(2438087,10000),
    Array(2438088,10000),
    Array(2438089,10000),
    Array(2438347,10000),
    Array(2438348,10000),
    Array(2438467,10000),
    Array(2438469,10000),
    Array(2438471,10000),
    Array(2438473,10000),
    Array(2438477,10000),
    Array(2438592,10000),
    Array(2438594,10000),
    Array(2438596,10000),
    Array(2438655,10000),
    Array(2438659,10000),
    Array(2438661,10000),
    Array(2438663,10000),
    Array(2438671,10000),
    Array(2438929,10000),
    Array(2438930,10000),
    Array(2438931,10000),
    Array(2438927,10000),
    Array(2438928,10000),
    Array(2436034,10000),
    Array(2438864,10000),
    Array(2439373,10000),
    Array(2439337,10000),
    Array(2439395,10000),
    Array(2439523,10000),
    Array(2439697,10000),
    Array(2439875,10000),
    Array(2439894,10000),
    Array(2630156,10000),
    Array(2630153,10000),
    Array(2630304,10000),
    Array(2439897,10000),
    Array(2439805,10000),
    Array(2439407,10000),
    Array(2439381,10000),
    Array(2439336,10000),
    Array(2439129,10000),
    Array(2438880,10000),
    Array(2438637,10000),
    Array(2438885,10000),
    Array(2439256,10000),
    Array(2630213,10000),//折纸伤害皮肤)
//12月2
    Array(2438871,10000),
    Array(2630969,10000),
    Array(2631091,10000),
    Array(2631451,10000),
//Array(2439895,1,10000)
//
//2月9日更新

    Array(2631892,10000),
    Array(2635056,10000),
    Array(2632123,10000),
    Array(2634929,10000),
    Array(2632348,10000),
    Array(2635081,10000),
    Array(2632815,10000),
    Array(2634925,10000),
    Array(2634925,10000),
    Array(2634728,10000),
    Array(2633306,10000),
    Array(2633994,10000),
    Array(2438872,10000),
    Array(2633074,10000),
    Array(2633048,10000),
    Array(2630754,10000),
    Array(2439572,10000),
    Array(2439394,10000),
    Array(2439265,10000),
    Array(2632287,10000)));
let title = "";
let haveMoney = 0;
while (true) {
    switch (type) {
        case 1:
            title = "点券"
            haveMoney = player.getCashShopCurrency(2);
            break;
        case 2:
            title = "抵用"
            haveMoney = player.getCashShopCurrency(2);
            break;
        case 3:
            title = "金币"
            haveMoney = "查阅背包";
            break;
        case 4:
            title = "余额"
            haveMoney = getHyPay(1);
            break;
        case 5:
            player.runScript("点券时装城店");
            break;
    }
    let str = "\t\t\t\t\t#fs16##r#e" + title + "商城#fs12##n";
    for (let i = 0; i < items.length; i++) {
        if (i % 4 == 0) {
            str += "\r\n";
        }
        str += "#L" + i + "#" + items[i][0] + "#l  "
    }

    let selected = npc.askMenu(str, 9900000);
    if (selected == 10087) {
        player.runScript(scriptName);
        break;
    } else {
        str = "#r请选购:\r\n"
        for (let i = 1; i < items[selected].length; i++) {

            str += "#L" + i + "##v" + items[selected][i][0] + "# #z" + items[selected][i][0] + "#  #b价格#r " + items[selected][i][1] + " " + title + "#l\r\n";
        }
        let selectedItem = npc.askMenu(str, 9900000);
        str = "#b当前选择物品 : #v" + items[selected][selectedItem][0] + "# 单价 :#r" + items[selected][selectedItem][1] + title + "\r\n";
        str += "#e请输入购买数量#n#b(当前剩余货币数量 #r" + haveMoney + "#b )";
        let number;
        while (true) {
            if (type != 3) {
                var maxNumber = haveMoney / items[selected][selectedItem][1] > 30000 ? 30000 : haveMoney / items[selected][selectedItem][1];
                number = npc.askNumber(str, "1", 0, maxNumber);
            } else {
                number = npc.askNumber(str, "1", 0, 9999);
            }
            if (number == 0) {
                npc.say("不可以输入 0 哦！", 9900000);
            } else {
                break;
            }
        }
        str = "#b请确认购买物品：\r\n";
        str += "#b当前" + title + "：" + haveMoney + "\r\n";
        str += "#b物品 : #v" + items[selected][selectedItem][0] + "# 单价 :#r" + items[selected][selectedItem][1] + title + "\r\n";
        str += "#b数量 : " + number + " 个#b 总价 :#r" + (items[selected][selectedItem][1] * number) + title + "\r\n";
        let YN = npc.askYesNo(str, 9900000);
        if (YN == 1) {
            if (player.canGainItem(items[selected][selectedItem][0], number)) {

                switch (type) {
                    case 1:
                        haveMoney = player.getCashShopCurrency(2);
                        break;
                    case 2:
                        haveMoney = player.getCashShopCurrency(2);
                        break;
                    case 4:
                        haveMoney = getHyPay(1);
                        break;
                }


                switch (type) {
                    case 1:
                        if (haveMoney >= (items[selected][selectedItem][1] * number)) {
                            player.modifyCashShopCurrency(2, -(items[selected][selectedItem][1] * number));
                            player.gainGachaponItem("[" + title + "商城]", items[selected][selectedItem][0], number, 1);
                            npc.say("购买成功");
                        }
                        break;
                    case 2:
                        if (haveMoney >= (items[selected][selectedItem][1] * number)) {
                            player.modifyCashShopCurrency(2, -(items[selected][selectedItem][1] * number));
                            player.gainGachaponItem("[" + title + "商城]", items[selected][selectedItem][0], number, 1);
                            npc.say("购买成功");
                        }
                        break;
                    case 3:
                        if (player.hasMesos((items[selected][selectedItem][1] * number))) {
                            player.gainGachaponItem("[" + title + "商城]", items[selected][selectedItem][0], number, 1);
                            player.loseMesos(items[selected][selectedItem][1] * number);
                            npc.say("购买成功");
                        } else {
                            npc.say("金币不足");
                        }
                        break;
                    case 4:
                        if (haveMoney >= (items[selected][selectedItem][1] * number)) {
                            gainHyPay(-(items[selected][selectedItem][1] * number))
                            player.gainGachaponItem("[" + title + "商城]", items[selected][selectedItem][0], number, 1);
                            npc.say("购买成功");
                        }
                        break;
                }
            } else {
                npc.say("请清理背包，您当前无法放下所购买物品", 9900000);
            }
        }
    }
}


function getHyPay(type) {
    var sql = "select * from hypay where accname = '" + getAccountName() + "'";
    var push = player.customSqlResult(sql);
    if (push.size() > 0) {
        var result = push.get(0);
        if (type == 1) {
            var pay = result.get("pay");
        } else if (type == 2) {
            var pay = result.get("payUsed");
        } else if (type == 3) {
            var pay = result.get("payReward");
        }
    } else {
        player.customSqlInsert("INSERT INTO `hypay` (`accname`, `name`) VALUES ('" + getAccountName() + "', '" + player.getName() + "')");
        return getHyPay(1);
    }

    return pay;
}

function getAccountName() {
    var i = -1;
    var sql = "select name,id from accounts where id=" + player.getAccountId() + " order by name limit 1;";
    var push = player.customSqlResult(sql);
    if (push.size() > 0) {
        var result = push.get(0);
        var name = result.get("name");
    }

    return name;
}

function gainHyPay(count) {
    var sql = "update hypay set pay =pay+? where accname = '" + getAccountName() + "';";
    player.customSqlUpdate(sql, count);
}