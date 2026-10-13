/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let elog = require('check_log');
let quest_log = require('extend_log');
let party_check = exports;
party_check.isAllMembersAllowedEvent = function (party, db, pqlog, maxenter) {
    members = party.getLocalMembers();
    for (let i = 0; i < members.length; i++) {
        let stage = members[i];
        if (elog.getEventValue(stage, db, pqlog) >= maxenter) {
            return stage.getCharacterName();
        }
    }
    return null;
}

party_check.getNotHaveItemCharacter = function (party, itemId, count) {
    members = party.getLocalMembers();
    for (let i = 0; i < members.length; i++) {
        let stage = members[i];
        if (!stage.hasItem(itemId, count)) {
            return stage.getCharacterName();
        }
    }
    return null;
}

party_check.isAllMembersAllowedQuest = function (party, util, questId, resetDay, maxenter) {
    members = party.getLocalMembers();
    for (let i = 0; i < members.length; i++) {
        let stage = members[i];
        if (quest_log.getEventLog(stage, util, questId, resetDay) >= maxenter) {
            return stage.getCharacterName();
        }
    }
    return null;
}
