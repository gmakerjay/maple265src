const basicUnit = 10000_0000;//單位基數：億
const maxHP = 900_0000_0000;//最高boss血量，單位億

const BossType = Object.freeze({
    //普通類型的怪物，大部分情況下都是這種
    Normal: 0,
    //機制怪，隱藏木樁，非全屏情況下無法被玩家擊中，缺失可能導致boss機制失效
    Dummy: 1,
    //組合怪，這是組合怪的本體，組合怪reduceDamageR必須為0，否則會導致血條異常
    Group: 2,
    //組合怪的組件，需要設置減傷可以在這裏，注意減傷后的血量之和需要等於組合怪的血量
    GroupPart: 3,
    //掛件怪，屬於Normal召喚出來的小怪
    Pendant: 4,
    //監聽怪，不創建，僅僅是增加對他的監聽
    Listene: 5,
});

function getMapsByStages(stages) {
    var mapsReturn = []
    for (var i = 0; i < stages.length; i++) {
        mapsReturn.push(stages[i].mapId)
    }
    return mapsReturn
}

function getDirMapsByStages(stages) {
    var mapsDirReturn = []
    for (var i = 0; i < stages.length; i++) {
        mapsDirReturn.push(stages[i].mapDirId)
    }
    return mapsDirReturn
}

//獲取用於檢查擊殺的怪物ID
function getTrueMobId(stage) {
    var normalId, groupId
    var listeneIds = []
    for (var i = 0; i < stage.mobs.length; i++) {
        if (stage.mobs[i].type == BossType.Normal) {
            normalId = stage.mobs[i].mobId
        } else if (stage.mobs[i].type == BossType.Group) {
            groupId = stage.mobs[i].mobId
        } else if (stage.mobs[i].type == BossType.Listene) {
            listeneIds.push(stage.mobs[i].mobId)
        }
    }
    //是組合怪則優先組合怪，否則普通怪
    if (groupId == null) {
        //normalId放到listeneIds首位
        listeneIds.unshift(normalId)
    } else {
        listeneIds.unshift(groupId)
    }
    return listeneIds
}

//依據配置創建怪物
function makeMobsByConfig(player, mobs, map) {
    var groupRoot = null
    var group_expend = []
    for (var i = 0; i < mobs.length; i++) {
        if (mobs[i].type == BossType.Group) {
            groupRoot = mobs[i]
        }
        var ret = makeAMobByConfig(player, mobs[i], map)
        if (mobs[i].type == BossType.GroupPart) {
            group_expend.push(ret)
        }
    }
    if (groupRoot != null) {
        makeAMobByConfig(player, groupRoot, map, group_expend)
    }
}

function makeAMobByConfig(player, mob, map, group_expend) {
    var temp = null
    switch (mob.type) {
        case BossType.Normal:
        case BossType.Dummy:
        case BossType.Pendant:
        case BossType.GroupPart:
            temp = map.makeMob(mob.mobId);
            if (mob.maxHp) {
                temp.changeHp(mob.maxHp);
            }
            //temp.setReduceDamageR(mob.reduceDamageR);
            map.spawnMob(temp, mob.spawnPoint[0], mob.spawnPoint[1]);
            break;
        case BossType.Group:
            if (group_expend == null) {
                //若尚未傳入組件，則跳過這次創建
                break;
            }
            temp = map.makeMob(mob.mobId);
            if (mob.maxHp != null)
                temp.changeHp(mob.maxHp);
            map.spawnMob(temp, mob.spawnPoint[0], mob.spawnPoint[1]);
            break
        case BossType.Listene:
            //不做任何事情
            break;
    }

    return temp
}

function getVaildHP(targetHP) {
    if (targetHP > maxHP * basicUnit) {
        return maxHP * basicUnit
    } else {
        return targetHP
    }
}

//傷害統計
function calculateBossDamageByPlayer(event, player, damage) {
    var temp_damage = event.getVariable(player.getId() + "_damage");
    if (temp_damage == null) {
        temp_damage = 0;
    }
    temp_damage += damage;
    event.setVariable(player.getId() + "_damage", temp_damage);
}

//傷害統計結果
function getDamage(event, player) {
    var temp_damage = event.getVariable(player.getId() + "_damage");
    if (temp_damage == null) {
        temp_damage = 0;
    }
    return temp_damage;
}

//傷害統計結果比例
function getDamageR(event, player) {
    var temp_damage = getDamage(event, player)
    var bossTotalHp = event.getVariable("BOSS_TOTAL_HP");
    var result = Math.min(temp_damage / bossTotalHp, 1)
    return result;
}

//計算總血量
//計算總血量
function getTotalHP(stages) {
    var bossTotalHp = 0;
    for (var i in stages) {
        for (var j in stages[i].mobs) {
            if (stages[i].mobs[j].type == BossType.Normal
                || stages[i].mobs[j].type == BossType.Group) {
                bossTotalHp += stages[i].mobs[j].maxHp;
            }
        }
    }
    return bossTotalHp;
}

module.exports = {
    BossType, getMapsByStages, getDirMapsByStages, getTrueMobId, makeMobsByConfig, getVaildHP,
    calculateBossDamageByPlayer, getDamage, getDamageR, getTotalHP, basicUnit
}
