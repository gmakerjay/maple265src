const {getBossEventReal} = require('constant/event');
let nextQuestId = 1;

const ICONS = {
    TASK_INFO: "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#",
    TASK_REWARD: "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#",
    REWARD_ICON: "#fUI/UIWindow2.img/QuestIcon/4/0#",
    CHICKEN1: "#fEffect/CharacterEff/1112908/0/1#",
    CHICKEN: "#fEffect/CharacterEff.img/1022223/3/0#",
    XUEREN: [
        "#fMap/MapHelper.img/weather/LINEFRIENDS_2/4#",
        "#fMap/MapHelper.img/weather/WorldRecord2/3#",
        "#fMap/MapHelper.img/weather/WorldRecord1/3#",
        "#fMap/MapHelper.img/weather/WorldRecord1/0#"
    ]
};

const ID_LIST = {
    大軍團: 2439138,
    小軍團: 2439137,
    萬盟稱號一個月: 3700660,
    金幣1E: 4001715,
    綠魔方: 5062500,
    唯一魔方: 5062026,
    LCD石頭: 4001879,
    威爾石頭: 4001890,
	魔法畫框: 5060086,
	
};

const QUEST_LIST = [
    [],
    ["等級達成", 100],              // 1
    ["拜師", 1],                    // 2
    ["BOSS", '史烏[normal]'],        // 3
    ["神秘之力", 180],              // 4
    ["通關副本", "新一條龍組隊", 1], // 5
    ["達成聯盟等級", 2000],         // 6
    ["等級達成", 200],              // 7
    ["等級達成", 225],              // 7
    ["BOSS", '戴米安[normal]'],        // 9
    ["神秘之力", 240],              // 10
    ["通關副本", "通關玩具組隊", 1], // 11
    ["達成聯盟等級", 4000],         // 12
    ["等級達成", 250],              // 13
    ["等級達成", 255],              // 13
    ["BOSS", '露希妲[normal]'],        // 15
    ["神秘之力", 300],              // 16
    ["通關副本", "新一條龍組隊", 1], // 17
    ["達成聯盟等級", 6000],         // 18
    ["等級達成", 260],              // 19
    ["等級達成", 265],              // 20
    ["BOSS", '威爾[normal]'],          // 21
    ["原初之力", 60],               // 22
    ["原初之力", 150], // 23
    ["達成聯盟等級", 8000],         // 24
    ["等級達成", 270],              // 25
    ["等級達成", 275],              // 26
    ["BOSS", '戴斯克[normal]'],      // 27
    ["原初之力", 250],              // 28
    ["等級達成", 285], // 29
    ["達成聯盟等級", 10000],        // 30
];

const REWARD_LIST = [
    [],
    [   // 1 等級
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 2 拜師
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 3 BOSS
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 4 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 5 通關副本
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 6 達成聯盟
        ['item', ID_LIST.金幣1E, 5],
        ['item', ID_LIST.大軍團, 20],
        ['item', ID_LIST.小軍團, 20],
        ['item', ID_LIST.綠魔方, 10],
        ['item', ID_LIST.唯一魔方, 10],
        ['item', ID_LIST.LCD石頭, 1],
        ['item', ID_LIST.威爾石頭, 1],
        ['', '兩條掉落首飾 x 1'],
    ],
    [   // 7 等級
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 8 拜師
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 9 BOSS
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 10 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 11 通關副本
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 12 達成聯盟
        ['item', ID_LIST.金幣1E, 10],
        ['item', ID_LIST.大軍團, 40],
        ['item', ID_LIST.小軍團, 40],
        ['item', ID_LIST.綠魔方, 20],
        ['item', ID_LIST.唯一魔方, 10],
        ['item', ID_LIST.LCD石頭, 2],
        ['item', ID_LIST.威爾石頭, 2],
        ['', '兩條掉落首飾 x 1'],
    ],
    [   // 13 達成聯盟
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 14 等級
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 15 拜師
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 16 BOSS
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 17 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 18 通關副本
        ['item', ID_LIST.金幣1E, 15],
        ['item', ID_LIST.大軍團, 60],
        ['item', ID_LIST.小軍團, 60],
        ['item', ID_LIST.綠魔方, 30],
        ['item', ID_LIST.唯一魔方, 10],
        ['item', ID_LIST.LCD石頭, 3],
        ['item', ID_LIST.威爾石頭, 3],
        ['', '兩條掉落首飾 x 1'],
    ],
    [   // 19 達成聯盟
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 20 等級
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 21 拜師
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 22 BOSS
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 23 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
    [   // 24 通關副本
        ['item', 1182016, 1],
        ['item', ID_LIST.金幣1E, 15],
        ['item', ID_LIST.大軍團, 80],
        ['item', ID_LIST.小軍團, 80],
        ['item', ID_LIST.綠魔方, 40],
        ['item', ID_LIST.唯一魔方, 25],
        ['item', ID_LIST.LCD石頭, 4],
        ['item', ID_LIST.威爾石頭, 4],
    ],
	[   // 25 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.綠魔方, 5],
    ],
	[   // 26 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.魔法畫框, 2],
    ],
	[   // 27 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.魔法畫框, 2],
    ],
	[   // 28 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.魔法畫框, 2],
    ],
	[   // 29 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.魔法畫框, 3],
    ],
	[   // 30 神秘之力
        ['item', ID_LIST.金幣1E, 1],
        ['item', ID_LIST.魔法畫框, 5],
    ],
	
];

let log = require('check_log');

function startQuest() {
    let str = `\t\t  ${ICONS.XUEREN[0]}  #e#r星語谷-主線任務 ${ICONS.XUEREN[0]}\r\n\r\n#n#r`;
    loadQuestStatus();

    if (nextQuestId >= QUEST_LIST.length) {
        npc.say(str + getTextAllDone());
        return;
    }
    let stepInfo = getTextForQuest();
    if (!stepInfo[1]) {
        npc.say(stepInfo[0]);
        return;
    }

    if (npc.askYesNo(stepInfo[0]) === 1) {
        completeQuest();
    }
}

function getTextForQuest() {
    const questInfo = QUEST_LIST[nextQuestId];
    let questStatus = false;
    let progressText = '';
    switch (questInfo[0]) {
        case "等級達成":
            questStatus = stage.getLevel() >= questInfo[1];
            progressText = `請達到角色等級：#r ${questInfo[1]} #k級\r\n`;
            break;
        case "拜師":
            questStatus = true; // 可以直接完成
            progressText = `玩家可以找合適的前輩進行拜師，會大大提升遊戲體驗\r\n`;
            break;
        case "BOSS":
            questStatus = getBossEventReal(questInfo[1], db, stage) > 0;
            progressText = `請通關BOSS: #r ${questInfo[1]} #k\r\n`;
            break;
        case "神秘之力":
            let arcCount = getItemCountBySlot(-6, -1600, 5, 'getArc');
            questStatus = arcCount >= questInfo[1];
            progressText = `神秘之力達到(來自神秘徽章): #r ${questInfo[1]} #b(${arcCount})#k\r\n`;
            break;
        case "原初之力":
            let autCount = getItemCountBySlot(-9, -1700, 5, 'getAut');
            questStatus = autCount >= questInfo[1];
            progressText = `原初達到(來自原初徽章): #r ${questInfo[1]} #b(${autCount})#k\r\n`;
            break;
        case "通關副本":
            let cTimes = log.getEventValue(stage, db, questInfo[1])
            questStatus = cTimes >= questInfo[2];
            progressText = `通關副本: #r ${questInfo[1]} #k ${cTimes}/${questInfo[2]}次\r\n`;
            break;
        // 達成聯盟等級的邏輯可以添加...
        case "達成聯盟等級": 
            questStatus = stage.getMapleUnionUpgradeInfo()[5] > questInfo[1];
            progressText += `達成聯盟等級: #r ${questInfo[1]}  #b(${stage.getMapleUnionUpgradeInfo()[5]})#k\r\n`;
            break;



    }

    if (stage.isGm()) {
        questStatus = true;
    }

    let questProgressText = `\t  ${ICONS.XUEREN[1]}#d#e 任務進度：#n#b${nextQuestId - 1} / ${QUEST_LIST.length - 1} #k( ${questStatus ? "#g可完成#k" : "#r未完成#k"} ) ${ICONS.XUEREN[1]}\r\n\r\n`;
    return [
        `${ICONS.TASK_INFO}#n#k\r\n${questProgressText}${progressText}${ICONS.TASK_REWARD}#n#k\r\n${getRewardTextForQuest()}`,
        questStatus
    ];
}

function getItemCountBySlot(slotPrefix, start, count, property) {
    let total = 0;
    for (let i = start; i > start - count; i--) {
        const item = stage.getItemBySlot(slotPrefix, i);
        if (item) {
            total += item[property]();
        }
    }
    return total;
}

function getRewardTextForQuest() {
    return REWARD_LIST[nextQuestId].map(reward => {
        return reward[0] === 'item' ?
            `#v${reward[1]}# #b#z${reward[1]}##r * ${reward[2]}${reward[3] ? ` x ${reward[3]}天` : ""}\r\n` :
            reward[1] + "\r\n";
    }).join('');
}

function completeQuest() {
    const questId = nextQuestId;
    const sql = `INSERT INTO zsf_主線任務(account_id, player_id, quest_id, time)
                 VALUES (${stage.getAccountId()}, ${stage.getCharacterId()}, ${questId}, NOW());`;
    db.insert(sql);

    let rewardText = `#r${ICONS.XUEREN[0]}${ICONS.REWARD_ICON}\r\n`;

    REWARD_LIST[questId].forEach(reward => {
        if (reward[0] === 'item') {
            stage.gainItem(reward[1], reward[2]);
            rewardText += `#v${reward[1]}# #b#z${reward[1]}##k * ${reward[2]}\r\n\r\n`;
        }
        // 其他奖励逻辑...
    });

    rewardText += "#r點擊確認按鈕返回查看下一個任務。#k";
    util.broadcastChatMsg(6, `主線任務: ${stage.getCharacterName()} 完成主線任務-${questId}`);
    npc.say(rewardText);
    startQuest();
}

function getTextAllDone() {
    return `\r\n#r${ICONS.XUEREN[3]} 恭喜您已經完成所有的任務，請繼續您的冒險島吧！#k`;
}

function loadQuestStatus() {
    const sql = `SELECT quest_id
                 FROM zsf_主線任務
                 WHERE account_id = ${stage.getAccountId()}
                 ORDER BY quest_id DESC
                 LIMIT 1`;
    const results = db.select(sql);
    if (results.length > 0) {
        nextQuestId = parseInt(results[0].get("quest_id")) + 1;
    }
}

startQuest();