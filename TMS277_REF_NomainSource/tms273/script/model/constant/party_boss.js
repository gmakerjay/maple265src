let boss = {};
//蝙蝠怪
boss.Balrog = 0;
//扎昆
boss.Zakum = 1;
//闇黑龍王
boss.Hontale = 2;
//希拉
boss.Hillah = 3;
//比艾樂
boss.Pierre = 4;
//半半
boss.Banban = 5;
//血腥女王
boss.Bloody = 6;
//貝倫
boss.Bellum = 7;
//班·雷昂
boss.Vanleon = 8;
//阿卡伊農
boss.Akayrum = 9;
//麥格納斯
boss.Magnus = 10;
//品克繽
boss.Pinkbeen = 11;
//西格諾斯
boss.Shinas = 12;
//史烏
boss.Siwu = 13;
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
//路西德
boss.Lucid = 19;
//卡雄
boss.Caoong = 21;
//拉圖斯
boss.Papulatus = 22;
//威爾
boss.Will = 23;
//覺醒希拉
boss.JinHillah = 24;
//黑魔法師
boss.BlackMage = 25;
//至暗魔晶
boss.Dusk = 26;
//頓凱爾
boss.Dunkel = 27;
//受選的賽蓮
boss.Seren = 28;
//守護天使綠水靈
boss.Slime = 29;
//監視者卡洛斯
boss.Kalos = 30;
//卡琳
boss.Karing = 31;

boss.Name = ["蝙蝠怪", "扎昆", "暗黑龍王", "希拉", "皮埃爾", "半半", "血腥女王", "貝倫", "班雷昂", "阿卡伊勒", "麥格納斯", "品克繽",
    "希納斯", "斯烏", "烏勒斯", "戴米安", "貝勒德", "森蘭丸", "濃姬", "路西德", "UNK",
    "卡雄", "帕普拉圖斯", "威爾", "覺醒希拉", "黑魔法師", "至暗魔晶", "敦凱爾", "神選者塞倫", "守護天使綠水靈", "監視者卡爾洛斯", "卡琳"
];


boss.NameE = [
    'Balrog'
    , 'Zakum'
    , 'Hontale'
    , 'Hillah'
    , 'Pierre'
    , 'Banban'
    , 'Bloody'
    , 'Bellum'
    , 'Vanleon'
    , 'Akayrum'
    , 'Magnus'
    , 'Pinkbeen'
    , 'Shinas'
    , 'Siwu'
    , 'Ursus'
    , 'Demian'
    , 'Beidler'
    , 'Ranmaru'
    , 'PrincessNo'
    , 'Lucid'
    , 'Caoong'
    , 'Papulatus'
    , 'Will'
    , 'JinHillah'
    , 'BlackMage'
    , 'Dusk'
    , 'Dunkel'
    , 'Seren'
    , 'Slime'
    , 'Kalos'
    , 'Karing'

];

boss.RewardJson = {};
boss.Times = {
    'Balrog': [0],
    'Zakum': [0, 1, 3],
    'Hontale': [0, 1, 3],
    'Hillah': [1, 2],
    'Pierre': [1, 3],
    'Banban': [1, 3],
    'Bloody': [1, 3],
    'Bellum': [1, 3],
    'Vanleon': [0, 1, 2],
    'Akayrum': [0, 1],
    'Magnus': [0, 1, 2],
    'Pinkbeen': [1, 3],
    'Shinas': [0, 1],
    'Siwu': [1, 2],
    'Demian': [1, 2],
    'Beidler': [1],
    'Ranmaru': [1, 2],
    'PrincessNo': [1],
    'Lucid': [1, 2],
    'Caoong': [1],
    'Papulatus': [0, 1, 3],
    'Will': [1, 2],
    'JinHillah': [1, 2],
    'BlackMage': [2, 4],
    'Dusk': [1, 3],
    'Dunkel': [1, 2],
    'Seren': [1, 2, 4],
    'Slime': [1, 3],
    'Kalos': [1, 3, 4],
    'Karing': [1, 2, 4],


};
boss.DifficultyJson = {
    'Balrog': [0],
    'Zakum': [0, 1, 3],
    'Hontale': [0, 1, 3],
    'Hillah': [1, 2],
    'Pierre': [1, 3],
    'Banban': [1, 3],
    'Bloody': [1, 3],
    'Bellum': [1, 3],
    'Vanleon': [0, 1, 2],
    'Akayrum': [0, 1],
    'Magnus': [0, 1, 2],
    'Pinkbeen': [1, 3],
    'Shinas': [0, 1],
    'Siwu': [1, 2],
    'Demian': [1, 2],
    'Beidler': [1],
    'Ranmaru': [1, 2],
    'PrincessNo': [1],
    'Lucid': [1, 2],
    // 'Lucid': [0,1,2],
    'Caoong': [1],
    'Papulatus': [0, 1, 3],
    'Will': [1, 2],
    'JinHillah': [1, 2],
    'BlackMage': [2, 4],
    'Dusk': [1, 3],
    'Dunkel': [1, 2],
    'Seren': [1, 2, 4],
    'Slime': [1, 3],
    'Kalos': [1, 3, 4],
    'Karing': [1, 2, 4],
};


boss.TimesJson = {
    // type : 1(日)/2(周)
    '蝙蝠怪[簡單]': {"type": 1, "times": 1},
    '扎昆[簡單]': {"type": 1, "times": 1},
    '扎昆[普通]': {"type": 1, "times": 1},
    '扎昆[進階]': {"type": 2, "times": 1},
    '暗黑龍王[簡單]': {"type": 1, "times": 1},
    '暗黑龍王[普通]': {"type": 1, "times": 1},
    '暗黑龍王[進階]': {"type": 1, "times": 1},
    '希拉[普通]': {"type": 1, "times": 1},
    '希拉[困難]': {"type": 2, "times": 1},
    '皮埃爾[普通]': {"type": 1, "times": 1},
    '皮埃爾[進階]': {"type": 2, "times": 1},
    '半半[普通]': {"type": 1, "times": 1},
    '半半[進階]': {"type": 2, "times": 1},
    '血腥女王[普通]': {"type": 1, "times": 1},
    '血腥女王[進階]': {"type": 2, "times": 1},
    '貝倫[普通]': {"type": 1, "times": 1},
    '貝倫[進階]': {"type": 2, "times": 1},
    '班雷昂[簡單]': {"type": 1, "times": 1},
    '班雷昂[普通]': {"type": 1, "times": 1},
    '班雷昂[困難]': {"type": 1, "times": 1},
    '阿卡伊勒[簡單]': {"type": 1, "times": 1},
    '阿卡伊勒[普通]': {"type": 1, "times": 1},
    '麥格納斯[簡單]': {"type": 1, "times": 1},
    '麥格納斯[普通]': {"type": 1, "times": 1},
    '麥格納斯[困難]': {"type": 2, "times": 1},
    '品克繽[普通]': {"type": 1, "times": 1},
    '品克繽[進階]': {"type": 2, "times": 1},
    '希納斯[簡單]': {"type": 2, "times": 1},
    '希納斯[普通]': {"type": 2, "times": 1},
    '斯烏[普通]': {"type": 2, "times": 1},
    '斯烏[困難]': {"type": 2, "times": 1},
    '戴米安[普通]': {"type": 2, "times": 1},
    '戴米安[困難]': {"type": 2, "times": 1},
    '貝勒德[普通]': {"type": 4, "times": 3},
    '森蘭丸[普通]': {"type": 1, "times": 1},
    '森蘭丸[困難]': {"type": 1, "times": 1},
    '濃姬[普通]': {"type": 2, "times": 1},
    '路西德[簡單]': {"type": 1, "times": 1},
    '路西德[普通]': {"type": 2, "times": 1},
    '路西德[困難]': {"type": 2, "times": 1},
    '卡雄[普通]': {"type": 1, "times": 1},
    '帕普拉圖斯[簡單]': {"type": 1, "times": 1},
    '帕普拉圖斯[普通]': {"type": 1, "times": 1},
    '帕普拉圖斯[進階]': {"type": 2, "times": 1},
    '威爾[簡單]': {"type": 1, "times": 1},
    '威爾[普通]': {"type": 2, "times": 1},
    '威爾[困難]': {"type": 2, "times": 1},
    '覺醒希拉[普通]': {"type": 2, "times": 1},
    '覺醒希拉[困難]': {"type": 2, "times": 1},
    '黑魔法師[困難]': {"type": 2, "times": 1},
    '黑魔法師[極限]': {"type": 3, "times": 1},
    '至暗魔晶[普通]': {"type": 2, "times": 1},
    '至暗魔晶[進階]': {"type": 2, "times": 1},
    '敦凱爾[普通]': {"type": 2, "times": 1},
    '敦凱爾[困難]': {"type": 2, "times": 1},
    '神選者塞倫[普通]': {"type": 2, "times": 1},
    '神選者塞倫[困難]': {"type": 2, "times": 1},
    '神選者塞倫[極限]': {"type": 3, "times": 1},
    '守護天使綠水靈[普通]': {"type": 1, "times": 1},
    '守護天使綠水靈[進階]': {"type": 1, "times": 1},
    // '監視者卡爾洛斯[簡單]': {"type": 2, "times": 1},
    '監視者卡爾洛斯[普通]': {"type": 2, "times": 1},
    '監視者卡爾洛斯[進階]': {"type": 2, "times": 1},
    '監視者卡爾洛斯[極限]': {"type": 3, "times": 1},
    // '卡琳[簡單]': {"type": 1, "times": 1},
    '卡琳[普通]': {"type": 2, "times": 1},
    '卡琳[困難]': {"type": 2, "times": 1},
    '卡琳[極限]': {"type": 3, "times": 1}
}

boss.difficulty = ["easy", "normal", "hard", "chaos", "extreme"];
boss.difficultyName = ["簡單", "普通", "困難", "進階", "極限"];

module.exports = boss;