// getWorldShareRecord
// updateWorldShareRecord
const QuestId = 40502

const BreakBase = 1_0000_0000 // 單位億
const NeedBreak = 200 * BreakBase
//裝備組，對應EquipcCheckSolt的equipRequire的equipGroupId
//相同位置、相同階級的裝備為一組，例如：神秘之影帽子，六大職業群共計六件，分為一組
const EquipGroup = [
    //武器
    [1214022, 1302355, 1402268, 1312213, 1412189, 1322264, 1592022, 1422197, 1432227, 1302355, 1442285, 1232122, 1382274, 1372237, 1452266, 1462252, 1592022, 1332289, 1472275, 1492245, 1482232, 1532157, 1362149, 1272040, 1552130, 1542128, 1252106, 1212129, 1522152, 1242139, 1262051, 1282040, 1222122, 1582044],
    [1214018, 1212120, 1222113, 1292018, 1232113, 1242121, 1242122, 1262039, 1272017, 1282017, 1213018, 1302343, 1592020, 1312203, 1322255, 1332279, 1342104, 1362140, 1372228, 1382265, 1402259, 1412181, 1422189, 1432218, 1442274, 1452257, 1462243, 1472265, 1482221, 1492235, 1522143, 1532150, 1582023, 1690321, 1402224, 1542117, 1552119, 1252098],
    //護肩
    [1152200, 1152199, 1152198, 1152197, 1152196],
    //帽子
    [1005984, 1005983, 1005982, 1005981, 1005980],
    [1004808, 1004809, 1004810, 1004811, 1004812],
    //上衣
    [1042437, 1042436, 1042435, 1042434, 1042433],
    [1053063, 1053064, 1053065, 1053066, 1053067],
    //鞋子
    [1073158, 1073159, 1073160, 1073161, 1073162],
    //手套
    [1082695, 1082696, 1082697, 1082698, 1082699],
    //披風
    [1102940, 1102941, 1102942, 1102943, 1102944],
]
const EquipCheckSolt = [
    {
        "slot": -11,
        "equipRequire": [
            {
                "equipGroupId": 0,
                "level": 20,
            }, {
                "equipGroupId": 1,
                "level": 20,
            }
        ],
    }, {
        "slot": -30,
        "equipRequire": [
            {
                "equipGroupId": 2,
                "level": 20,
            }
        ],
    }, {
        "slot": -1,
        "equipRequire": [
            {
                "equipGroupId": 3,
                "level": 0,
            }, {
                "equipGroupId": 4,
                "level": 20,
            }
        ],
    }, {
        "slot": -5,
        "equipRequire": [
            {
                "equipGroupId": 5,
                "level": 0,
            }, {
                "equipGroupId": 6,
                "level": 20,
            }
        ],
    }, {
        "slot": -7,
        "equipRequire": [
            {
                "equipGroupId": 7,
                "level": 20,
            }
        ],
    }, {
        "slot": -8,
        "equipRequire": [
            {
                "equipGroupId": 8,
                "level": 20,
            }
        ],
    }, {
        "slot": -9,
        "equipRequire": [
            {
                "equipGroupId": 9,
                "level": 20,
            }
        ],
    }
]

const EquipCheckSolt2 = [
    {
        "slot": -11,
        "equipRequire": [
            {
                "equipGroupId": 0,
                "level": 1,
            }, {
                "equipGroupId": 1,
                "level": 20,
            }
        ],
    }, {
        "slot": -30,
        "equipRequire": [
            {
                "equipGroupId": 2,
                "level": 20,
            }
        ],
    }, {
        "slot": -1,
        "equipRequire": [
            {
                "equipGroupId": 3,
                "level": 0,
            }, {
                "equipGroupId": 4,
                "level": 20,
            }
        ],
    }, {
        "slot": -5,
        "equipRequire": [
            {
                "equipGroupId": 5,
                "level": 0,
            }, {
                "equipGroupId": 6,
                "level": 20,
            }
        ],
    }, {
        "slot": -7,
        "equipRequire": [
            {
                "equipGroupId": 7,
                "level": 20,
            }
        ],
    }, {
        "slot": -8,
        "equipRequire": [
            {
                "equipGroupId": 8,
                "level": 20,
            }
        ],
    }, {
        "slot": -9,
        "equipRequire": [
            {
                "equipGroupId": 9,
                "level": 20,
            }
        ],
    }
]

function canBecomeLeader(stage) {
    //玩家是否已經登記過leader
    if (isRegistedLeader(stage)) {
        return false
    }
    if (stage.getLevel() < 280) {
        stage.dropMessage(0x25, "角色等級不達標！需要角色等級達到280才可開宗立派。")
        return false;
    }
    //檢測裝備等級
    if (!checkEquipLevel(stage)) {
        stage.dropMessage(0x25, "強化等級不達標！需要神秘/創世/輝耀裝備20星滿足5件。")
        return false
    }
    return true
}

function canChushi(stage) {
    //玩家是否已經登記過leader
    if (isRegistedLeader(stage)) {
        return false
    }
    //檢測角色強化
    if (!checkWeaponBreak(stage)) {
        return false
    }
    if (stage.getLevel() < 260) {
        stage.dropMessage(0x25, "角色等級不達標！需要角色等級達到250才可出師。")
        return false;
    }
    return true
}

function isRegistedLeader(stage) {
    //玩家是否已經登記過leader 
    var isRegisted = stage.getWorldShareRecord(QuestId, "isRegisted")
    if (isRegisted != null && isRegisted == "1") {
        return true
    }
    return false
}

function checkEquipLevel(stage) {

    let anyFound = 0;
    for (var i = 0; i < EquipCheckSolt.length; i++) {
        var slot = EquipCheckSolt[i].slot
        var equip = stage.getItemBySlot(-1, slot)
        if (equip == null) {
            continue;
        }
        var equipId = equip.getDataId()
        var equipRequire = EquipCheckSolt[i].equipRequire
        for (var j = 0; j < equipRequire.length; j++) {
            var mayBeEquip = EquipGroup[equipRequire[j].equipGroupId]
            // var anyFound = false
            if (mayBeEquip == null) {
                stage.dropMessage(0x25, "配置錯誤，裝備組不存在，請聯繫管理員！")
            } else {
                if (mayBeEquip.indexOf(equipId) != -1 && equip.getChuc() >= equipRequire[j].level) {
                    anyFound++;
                }
            }
        }
    }
    if (anyFound < 5) {
        return false
    }
    return true
}

function checkEquipLevel2(stage) {
    for (var i = 0; i < EquipCheckSolt.length; i++) {
        var slot = EquipCheckSolt[i].slot
        var equip = stage.getItemBySlot(-1, slot)
        if (equip == null) {
            return false
        }
        var equipId = equip.getDataId()
        var equipRequire = EquipCheckSolt[i].equipRequire
        let anyFount = 0;
        for (var j = 0; j < equipRequire.length; j++) {
            var mayBeEquip = EquipGroup[equipRequire[j].equipGroupId]
            var anyFound = false
            if (mayBeEquip == null) {
                stage.dropMessage(0x25, "配置錯誤，裝備組不存在，請聯繫管理員！")
            } else {
                if (mayBeEquip.indexOf(equipId) != -1 && equip.getChuc() >= equipRequire[j].level) {
                    anyFound++;
                }
            }
        }
        if (anyFount < 1) {
            return false
        }
    }
    return true
}

function registeLeader(stage, db, declaration) {
    stage.updateWorldShareRecord(QuestId, "isRegisted", "1")
    db.insert("INSERT INTO `jili_leaders` (`charid`, `name`,`declaration`,`score`) VALUES ('" + stage.getCharacterId() + "', '" + stage.getCharacterName() + "','" + declaration + "','0')");
}

function updateLeaderDeclaration(stage, db, declaration) {
    db.update("update jili_leaders set declaration = '" + declaration + "' where charid = '" + stage.getCharacterId() + "'");
}

function getLeaderScore(stage, stageId) {
    var sql = "select score from jili_leaders where charid = " + stageId + " limit 1";
    var push = db.select(sql);
    if (push.length > 0) {
        return push[0].get("score");
    } else {
        return null;
    }
}

function updateLeaderScroe(stage, stageId, score) {
    db.update("update jili_leaders set score = '" + score + "' where charid = '" + stageId + "'");
    stage.dropMessage(0x12, "師徒積分更新成功！")
}

function selectLeaderById(stage) {
    var isRegisted = stage.getWorldShareRecord(QuestId, "isDisciple")
    if (isRegisted == null || isRegisted == "0") {
        return null
    }
    var leaderId = stage.getWorldShareRecord(QuestId, "leaderId")
    if (leaderId == null) {
        return null
    }
    var sql = "select * from jili_leaders where charid = " + leaderId + " limit 1";
    var push = db.select(sql);
    if (push.length > 0) {
        return push[0];
    } else {
        return null;
    }
}

//按照score從大到小排序
function getOrderdLeaderList(db) {
    var sql = "select * from jili_leaders order by score desc";
    var push = db.select(sql);
    if (push.length > 0) {
        return push;
    } else {
        return null;
    }
}

//是否可以註冊徒弟
function canRegisteDisciple(stage) {
    var isRegisted = stage.getWorldShareRecord(QuestId, "isRegisted")
    if (isRegisted != null && isRegisted == "1") {
        return false
    }
    var isDisciple = stage.getWorldShareRecord(QuestId, "isDisciple")
    if (isDisciple != null) {
        return false
    }
    return true
}

//註冊徒弟
function registeDisciple(stage, targetCharId) {
    if (!canRegisteDisciple(stage)) {
        return false
    }
    if (stage.getCharacterId() == targetCharId) {
        stage.dropMessage(0x25, "不能拜自己為師！")
        return false
    }

    stage.updateWorldShareRecord(QuestId, "isDisciple", "1")
    stage.updateWorldShareRecord(QuestId, "leaderId", targetCharId)
    insertDiscipleInfo(stage, targetCharId)
    return true
}

//是否需要畢業考核
function shouldGraduation(stage) {
    var isDisciple = stage.getWorldShareRecord(QuestId, "isDisciple")
    //isDisciple為1表示在職徒弟，為0表示已經畢業
    if (isDisciple != null && isDisciple == 1) {
        return true
    }
    return false
}

function checkDiscipleBelongToLeader(stage, leaderId) {
    var isRegisted = stage.getWorldShareRecord(QuestId, "isDisciple")
    if (isRegisted != null && isRegisted == "1" && stage.getWorldShareRecord(QuestId, "leaderId") == leaderId) {
        return true
    }
    return false
}

//畢業
function discipleGradution(stage) {
    if (!shouldGraduation(stage)) {
        return false
    }
    stage.updateWorldShareRecord(QuestId, "isDisciple", "0")
    //獲取出師獎
    // stage.gainItem(4031059, 6)
    updateDiscipleGraduation(stage)
}

//出師獎勵
function leaderGradutionReward(stage, num) {
    if (num == null || num <= 0) {
        stage.dropMessage(0x12, "出師數量錯誤")
        return
    }
    // stage.gainItem(2436828, num)
    stage.dropMessage(0x12, "感謝你對徒弟的辛勤付出！")
}

//執行sql語句，向jili_disciples表中插入徒弟的信息
function insertDiscipleInfo(stage, db, leaderId) {
    db.insert("INSERT INTO `jili_disciples` (`leaderid`, `discipleid`,`name`,`graduation`) VALUES ('" + leaderId + "','" + stage.getCharacterId() + "', '" + stage.getCharacterName() + "', " + 0 + ")");
}

//更新jili_disciples的graduation字段，表示已畢業
function updateDiscipleGraduation(stage) {
    if (db.select("select * from jili_disciples where discipleid = " + stage.getCharacterId()).length == 0) {
        //insert
        db.insert("INSERT INTO `jili_disciples` (`leaderid`, `discipleid`,`name`,`graduation`) VALUES ('" + stage.getWorldShareRecord(QuestId, "leaderId") + "','" + stage.getCharacterId() + "', '" + stage.getCharacterName() + "', " + 1 + ")");
    }

    db.update("update jili_disciples set graduation = 1 where discipleid = " + stage.getCharacterId());
}

//查詢所有屬於leadId的徒弟
function selectDiscipleByLeaderId(stage, leaderId) {
    var sql = "select * from jili_disciples where leaderid = " + leaderId;
    var push = db.select(sql);
    if (push.length > 0) {
        return push;
    } else {
        return null;
    }
}

module.exports = {
    canBecomeLeader, isRegistedLeader, registeLeader, updateLeaderDeclaration,
    updateLeaderScroe, getOrderdLeaderList, shouldGraduation, selectLeaderById,
    canRegisteDisciple, registeDisciple, discipleGradution, checkDiscipleBelongToLeader,
    getLeaderScore, selectDiscipleByLeaderId, NeedBreak,
    leaderGradutionReward, canChushi
}