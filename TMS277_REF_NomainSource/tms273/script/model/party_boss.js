let boss = exports;

//巴洛古
boss.Balrog = 0;
//炎魔
boss.Zakum = 1;
//闇黑龍王
boss.Hontale = 2;
//希拉
boss.Hillah = 3;
//比艾樂
boss.Pierre = 4;
//斑斑
boss.Banban = 5;
//血腥皇后
boss.Bloody = 6;
//貝倫
boss.Bellum = 7;
//凡雷恩
boss.Vanleon = 8;
//阿卡伊農
boss.Akayrum = 9;
//梅格耐斯
boss.Magnus = 10;
//皮卡啾
boss.Pinkbeen = 11;
//西格諾斯
boss.Shinas = 12;
//史烏
boss.Swoo = 13;
//烏勒斯
boss.Ursus = 14;
//戴米安
boss.Demian = 15;
//培羅德
boss.Beidler = 16;
//森蘭丸
boss.Ranmaru = 17;
//濃姬
boss.PrincessNo = 18;
//露希妲
boss.Lucid = 19;
//卡翁
boss.Caoong = 21;
//拉圖斯
boss.Papulatus = 22;
//威爾
boss.Will = 23;
//真‧希拉
boss.JinHillah = 24;
//黑魔法師
boss.BlackMage = 25;
//戴斯克
boss.Dusk = 26;
//頓凱爾
boss.Dunkel = 27;
//受選的賽蓮
boss.Seren = 28;
//守護天使綠水靈
boss.Slime = 29;
//監視者卡洛斯
boss.Kalos = 30;
//咖凌
boss.Karing = 31;
//Limbo
boss.Limbo = 33;
//Limbo
boss.Malitia={
                id: 110,
                name: "瑪麗西亞",
                enter: 875033004
        },

boss.Name = ["巴洛古", "炎魔", "闇黑龍王", "希拉", "比艾樂", "斑斑", "血腥皇后", "貝倫", "凡雷恩", "阿卡伊農", "梅格耐斯", "皮卡啾",
        "西格諾斯", "史烏", "烏勒斯", "戴米安", "培羅德", "森蘭丸", "濃姬", "露希妲", "UNK",
        "卡翁", "拉圖斯", "威爾", "真‧希拉", "黑魔法師", "戴斯克", "頓凱爾", "受選的賽蓮", "守護天使綠水靈", "監視者卡洛斯", "咖凌", "極限怪物公園", "林波"
];
boss.Name[110] = '瑪麗西亞';

boss.TimesJson = { 
        '巴洛古[easy]': {"type": 2, "times": 4},
        '凡雷恩[easy]': {"type": 2, "times": 4},
        '凡雷恩[normal]': {"type": 2, "times": 4},
        '凡雷恩[hard]': {"type": 2, "times": 4},
        '梅格耐斯[easy]': {"type": 2, "times": 4},
        '梅格耐斯[normal]': {"type": 2, "times": 4},
        '梅格耐斯[hard]': {"type": 2, "times": 4}, 
        '希拉[normal]': {"type": 2, "times": 4},
        '希拉[hard]': {"type": 2, "times": 4},
        '森蘭丸[normal]': {"type": 2, "times": 4},
        '森蘭丸[hard]': {"type": 2, "times": 4},
        '卡翁[normal]': {"type": 2, "times": 4},
        '炎魔[easy]': {"type": 2, "times": 4},
        '炎魔[normal]': {"type": 2, "times": 4},
        '炎魔[chaos]': {"type": 2, "times": 4},
        '拉圖斯[easy]': {"type": 2, "times": 4},
        '拉圖斯[normal]': {"type": 2, "times": 4},
        '拉圖斯[chaos]': {"type": 2, "times": 4},


        '守護天使綠水靈[normal]': {"type": 2, "times": 4},
        '守護天使綠水靈[chaos]': {"type": 2, "times": 4},
        '西格諾斯[easy]': {"type": 2, "times": 4},
        '西格諾斯[normal]': {"type": 2, "times": 4},
        '皮卡啾[normal]': {"type": 2, "times": 4},
        '皮卡啾[chaos]': {"type": 2, "times": 4},
        '濃姬[normal]': {"type": 2, "times": 4},
        '比艾樂[normal]': {"type": 2, "times": 4},
        '比艾樂[chaos]': {"type": 2, "times": 4},
        '斑斑[normal]': {"type": 2, "times": 4},
        '斑斑[chaos]': {"type": 2, "times": 4},
        '血腥皇后[normal]': {"type": 2, "times": 4},
        '血腥皇后[chaos]': {"type": 2, "times": 4},
        '貝倫[normal]': {"type": 2, "times": 4},
        '貝倫[chaos]': {"type": 2, "times": 4},
        '闇黑龍王[easy]': {"type": 2, "times": 4},
        '闇黑龍王[normal]': {"type": 2, "times": 4},
        '闇黑龍王[chaos]': {"type": 2, "times": 4},
        '阿卡伊農[easy]': {"type": 2, "times": 4},
        '阿卡伊農[normal]': {"type": 2, "times": 4},


        '史烏[normal]': {"type": 2, "times": 4},
        '史烏[hard]': {"type": 2, "times": 4},
        '史烏[extreme]': {"type": 2, "times": 1},
        '戴米安[normal]': {"type": 2, "times": 4},
        '戴米安[hard]': {"type": 2, "times": 4}, 
        '露希妲[normal]': {"type": 2, "times": 4},
        '露希妲[hard]': {"type": 2, "times": 4},
        '威爾[normal]': {"type": 2, "times": 4},
        '威爾[hard]': {"type": 2, "times": 4},
        '真‧希拉[normal]': {"type": 2, "times": 4},
        '真‧希拉[hard]': {"type": 2, "times": 4},
        '戴斯克[normal]': {"type": 2, "times": 4},
        '戴斯克[chaos]': {"type": 2, "times": 4},
        '頓凱爾[normal]': {"type": 2, "times": 4},
        '頓凱爾[hard]': {"type": 2, "times": 4},
        '黑魔法師[hard]': {"type": 2, "times": 1},
        '黑魔法師[extreme]': {"type": 2, "times": 1},
        '受選的賽蓮[normal]': {"type": 2, "times": 1},
        '受選的賽蓮[hard]': {"type": 2, "times": 1},
        '受選的賽蓮[extreme]': {"type": 2, "times": 1},
        '監視者卡洛斯[normal]': {"type": 2, "times": 1},
        '監視者卡洛斯[chaos]': {"type": 2, "times": 1},
        '監視者卡洛斯[extreme]': {"type": 2, "times": 1},
        '咖凌[normal]': {"type": 2, "times": 1},
        '咖凌[hard]': {"type": 2, "times": 1},
        '咖凌[extreme]': {"type": 2, "times": 1},
        '林波[normal]': {"type": 2, "times": 1},
        '林波[hard]': {"type": 2, "times": 1},
        '瑪麗西亞[hard]': {"type": 2, "times": 1},
        '瑪麗西亞[extreme]': {"type": 2, "times": 1},

 
}


boss.getBossEventDay = function (event1, aIds, db) {
        
 	var sql = `select COALESCE(SUM(1), 0) AS sum, player_name as p_name, accounts_id as a_id from zz_boss_event where accounts_id in(${aIds}) and bossName = '${event1}' AND DATE_FORMAT(time, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')  and status not in (2, 6)  group by a_id having sum >= 1`;
        var resultList = db.select(sql);   
	return resultList;
}
boss.getBossEventWeek = function (event1, aIds, db) {
 	var sql = `select COALESCE(SUM(1), 0) AS sum, player_name as p_name, accounts_id as a_id from zz_boss_event where accounts_id in(${aIds}) and bossName = '${event1}' AND DATE(time) BETWEEN DATE(NOW() - INTERVAL WEEKDAY(NOW()) DAY) AND DATE(NOW() + INTERVAL (7 - WEEKDAY(NOW())) DAY)  and status not in (2, 6)  group by a_id having sum >= ${boss.TimesJson[event1]['times']}`;
        var resultList = db.select(sql);   
	return resultList;
}
  

boss.difficulty = ["easy", "normal", "hard", "chaos", "extreme"];