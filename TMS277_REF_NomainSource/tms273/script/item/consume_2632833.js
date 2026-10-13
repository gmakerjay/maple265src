Icon = [
    ["三角", "#fUI/StatusBar.img/base/iconMemo#"],
    ["獎盃", "#fUI/UIAchievement.img/achievement/pages/main/achievementForm/basic/difficultyIcon/unique#"],
    ["王冠", "#fUI/GuildMark/Mark/Etc/00009023/11#"],
    ["大鎚", "#fEffect/CharacterEff.img/MeisterEff/Equipment/10#"],
    ["翅膀", "#fEffect/ItemEff.img/1102982/effect/proneStab/1#"],
    ["奔跑", "#fEffect/ItemEff.img/1103020/effect/move/1#"],
    ["翅膀", "#fEffect/ItemEff.img/1102982/effect/default/4#"]
]

var title = ['炭治郎', '彌豆子', '我妻善逸', '嘴平伊之助', '義勇', '蝴蝶忍', '宇隨天元', '煉獄杏壽郎', '鬼舞什無慘', '香奈乎'];

var group = [
    [0, 1103740],
    [0, 1054199],
    [0, 1703528],
    [0, 1073962],
    [0, 1022344],

    [1, 1054200],
    [1, 1073963],
    [1, 1012832],

    [2, 1054201],
    [2, 1703529],
    [2, 1073964],

    [3, 1006567],
    [3, 1050783],
    [3, 1703530],
    [3, 1073965],

    [4, 1054203],
    [4, 1073967],

    [5, 1054202],
    [5, 1073966],

    [6, 1103741],
    [6, 1082820],
    [6, 1054206],
    [6, 1073970],
    [6, 1022345],

    [7, 1054205],
    [7, 1073969],

    [8, 1006568],
    [8, 1054207],
    [8, 1073971],

    [9, 1054204],
    [9, 1073968],

];

const beautyList = {
    // 頭， 臉
    0: [42280, 55074],
    1: [42350, 55083],
    2: [42290, 55075],
    // 3: [],
    4: [42300, 55076],
    5: [42360, 55084],
    6: [42320, 55078],
    7: [42310, 55077],
    8: [42330, 55079],
    9: [42370, 55085],
};

CStart();

function CStart() {
    txt = "在下列選擇你所需套裝\r\n";
    for (var i in title) {
        txt += "#r#L" + i + "#" + title[i] + " #d套裝#l\r\n";
    }
    sel = npc.askMenu(txt);

    txt = "你所選的套裝 #r" + title[sel] + " #k嗎？\r\n\r\n";
    for (var i in group) {
        if (group[i][0] != sel) continue;
        txt += "#i" + group[i][1] + "#"
    }
    txt += "\r\n\r\n";
    txt += "#b是否立即領取?";

    yeno = npc.askYesNo(txt);
    if (yeno != 1) return;

    stage.loseItem(ctx.getDataId(), 1);
    let newGroup = [];
    for (var i in group) {
        if (group[i][0] != sel) continue;
        newGroup.push(group[i]);
    }

    newGroup = shuffle(newGroup);
    for (var i in newGroup) {
        var Equip = util.makeItem(newGroup[i][1], 1);
        if (i < 2) {
            Equip['baseStr'] += 5;
            Equip['baseDex'] += 5;
            Equip['baseInt'] += 5;
            Equip['baseLuk'] += 5;
            Equip['pad'] += 5;
            Equip['mad'] += 5;
        }

        stage.gainItem(Equip);
    }
    if (beautyList[sel]) {

        let hair = beautyList[sel][0];
        let face = beautyList[sel][1];
        let isAngel = false;
        if (stage.getJob() == 6512) {
            //isAngel = npc.askAngelicBuster() != 0;
        }
        if (!isAngel) {
            stage.setHair(hair);
            stage.setFace(face);

        } else {
            //stage.setSubHair(hair);
            //stage.setSubFace(face);

        }
    }

    stage.dropAlertNotice("恭喜，領取成功！");
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // 當還剩下要打亂的元素時…
    while (currentIndex !== 0) {
        // 從剩下的元素中隨機選一個索引
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // 交換當前元素和隨機選中的元素
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}