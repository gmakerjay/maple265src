/*
 * 150級獎勵腳本（僅GM可領取 + 原生API版 + 四維生效）
 * 核心：用setBaseXXX(原有值+自定义值)替代addXXX，兼容所有私服
 */

var rewardLists = {
    A: [1005980, 1005981, 1005982, 1005983, 1005984],//鷹眼盔甲系列
    B: [1042433, 1042434, 1042435, 1042436, 1042437],//魔術師短褲系列
    C: [1062285, 1062286, 1062287, 1062288, 1062289],//頭部系列
    D: [1152212, 1152213, 1152214, 1152215, 1152216],//配件系列
    E: [1103433, 1103434, 1103435, 1103436, 1103437],//飾品系列
    F: [1082760, 1082761, 1082762, 1082763, 1082764],//護具系列
    G: [1073629, 1073630, 1073631, 1073632, 1073633],//輔具系列
    H: [1190555, 1190557, 1190556, 1190558, 1190559]//新增H列表
};

var universalRewards = [
    1012632, // 150扎昆頭
    1022278, // 170滅龍
    1672095, // 150鞋子
    1132308, // 160航海手套
    1122430, // 扎昆腰帶
    1182285, // 航海護肩
    1032316, // 暴擊戒指
    1113306, // 暴擊戒指
	1113211,
	1113341,
	1113316,
	1122296,
	1143353,
    1162080  // 通用飾品
];

var weaponMap = {
    1252106: [17212,],//琳恩
    1403022: [17512,],//墨軒
    1292022: [16412,],//狐影
    1213022: [15112,],//阿呆
    1404022: [15412,],//飛人
    1214022: [6312,],//龍溪
    1592022: [332,],//魔弓
    1262051: [14212,],//超能
    1212129: [2712,],//夜光
    1272040: [6412,],//磨練
    1282040: [15212,],//聖經
    1222122: [6512,],//天使
    1232122: [3122,],//復仇
    1242139: [3612,],//兼并
    1242141: [3612,],//煎餅
    1302355: [5112,], //單手劍
    1312213: [3112,], //單手斧
    1322264: [3112,],//單手鈍器
    1332289: [434, 422,],//短刀
    1362149: [2412,],//幻影
    1372237: [2217, 16212],//短杖
    1382274: [222, 212, 232, 1212, 3212,],//長杖
    1402268: [112, 1112, 122, 6112,],//雙手劍
    1412189: [2112,],//雙手斧
    1422197: [112, 122,],//雙手鈍器
    1432227: [132,],//長槍
    1442285: [2112,],//長矛
    1452266: [312, 1312,],//弓
    1462252: [322, 3312,],//弩
    1472275: [412, 1412,],//拳套
    1482232: [512, 2512, 15512, 1512,],//指節
    1492245: [522, 3512,],//短槍
    1522152: [2312,],//雙弩
    1532157: [532,],//火炮
    1252106: [11212,],//凌志玲
    1542128: [4112,],//劍豪
    1552130: [4212,],//陰陽師
    1582044: [3712,]//爆破
};

var weaponList = [];
for (var key in weaponMap) {
    if (weaponMap.hasOwnProperty(key)) {
        weaponList.push(Number(key));
    }
}

/**
 * 核心修正：用「原有值+自定义值」设置基础属性，替代addXXX
 */
function createEnhancedItem(itemId, extra) {
    extra = extra || {};
    var item = util.makeItem(itemId, 1);
    
    // 基礎屬性：移除重複卷軸，避免衝突
    item.setChuc(30);    // 星级（私服自定義）
    item.setGrade(20);   // SS級
    item.setOption1(40086); 
    item.setOption2(40086); 
    item.setOption3(40051); 
    item.setOption4(40603); 
    item.setOption5(40056); 
    item.setOption6(40056);
    item.setRuc(0);      

    // ========== 原生API實現「追加屬性」效果 ==========
    if (extra.cuc) item.setCuc(extra.cuc);
    if (extra.pad) item.setPad(item.getPad() + extra.pad);
    if (extra.mad) item.setMad(item.getMad() + extra.mad);
    
    // 力量：原有基礎值 + 自定义值（比如999）
    if (extra.str) item.setBaseStr(item.getBaseStr() + extra.str);
    // 敏捷：原有基礎值 + 自定义值
    if (extra.dex) item.setBaseDex(item.getBaseDex() + extra.dex);
    // 智力：原有基礎值 + 自定义值
    if (extra.int) item.setBaseInt(item.getBaseInt() + extra.int);
    // 幸運：原有基礎值 + 自定义值
    if (extra.luk) item.setBaseLuk(item.getBaseLuk() + extra.luk);

    return item;
}

function start() {
    if (!stage.isGm()) {
        npc.say("此獎勵僅管理員可領取！");
        return;
    }

    var jobId = stage.getJob();
    var jobIdx = stage.getJobCategory() - 1;

    // 武器選擇菜單
    var weaponMenu = "【GM專屬150級獎勵】請選擇武器：\r\n";
    for (var i = 0; i < weaponList.length; i++) {
        var weaponId = weaponList[i];
        if (weaponMap[weaponId].includes(jobId)) {
            weaponMenu += "#L" + i + "##v" + weaponId + ":i##z" + weaponId + ":i##l\r\n";
        }
    }
    if (weaponMenu === "【GM專屬150級獎勵】請選擇武器：\r\n") {
        npc.say("當前職業無可選武器！");
        return;
    }
    var selectedWeaponIdx = npc.askMenu(weaponMenu);
    var selectedWeaponId = weaponList[selectedWeaponIdx];

    // ========== 防具系列：四維屬性生效（原生API） ==========
    stage.gainItem(createEnhancedItem(rewardLists.A[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.B[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.C[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.D[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.E[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.F[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.G[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 
    stage.gainItem(createEnhancedItem(rewardLists.H[jobIdx], { 
        cuc: 30, 
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999, 
        mad: 999 
    })); 

    // ========== 通用獎勵：補充四維屬性 ==========
    for (var j = 0; j < universalRewards.length; j++) {
        var uniItemId = universalRewards[j];
        stage.gainItem(createEnhancedItem(uniItemId, { 
            cuc: 30, 
            str: 999,
            dex: 999,
            int: 999,
            luk: 999,
            pad: 999, 
            mad: 999 
        }));
    }

    // ========== 武器：四維屬性生效 ==========
    stage.gainItem(createEnhancedItem(selectedWeaponId, {
        cuc: 30,
        str: 999,
        dex: 999,
        int: 999,
        luk: 999,
        pad: 999,
        mad: 999
    }));

    npc.say(" GM專屬150級獎勵發放成功！\n已發放：A(盔甲)+B(短褲)+C(頭部)+D(配件)+E(飾品)+F(護具)+G(輔具)+H(武器)\n所有獎勵已全部發放到背包！");
}

start();
stage.gainItem(2436274,1),//直達260
stage.gainItem(5044010,1),//傳送
stage.gainItem(2000070,1),//無限藥水
stage.gainItem(2438871,1),//基本傷害皮膚
stage.gainItem(2439572,1),
stage.gainItem(2630380,1),
stage.gainItem(2631091,1),
stage.gainItem(2632123,1),
stage.gainItem(2632287,1),
stage.gainItem(5680862,1),
stage.gainItem(2634811,1),
stage.gainItem(1202193,1),
stage.gainItem(1712001,1),//秘法符文
stage.gainItem(1712002,1),
stage.gainItem(1712003,1),
stage.gainItem(1712004,1),
stage.gainItem(1712005,1),
stage.gainItem(1712006,1),
stage.gainItem(1713000,1),//yuanchu
stage.gainItem(1713001,1),
stage.gainItem(1713002,1),
stage.gainItem(1713003,1),
stage.gainItem(1713004,1),
stage.gainItem(1713005,1),
stage.gainItem(2434727,1),
stage.gainItem(4009495,9999),
stage.gainItem(4001715,9999),//1000E
stage.gainItem(4310356,9999)//1000E