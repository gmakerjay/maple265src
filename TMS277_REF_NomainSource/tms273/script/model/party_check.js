let eLog = require("extend_log");
let partyCheck = exports;

partyCheck.getNotEnterCountCharacter = function (party, type, sel) {
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                if (stage.checkBossEnterLog(type, sel)) {
                        return stage.getCharacterName();
                }
        }
        return null;
}

partyCheck.getNotClearCountCharacter = function (party, type, sel) {
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                if (stage.checkBossClearLog(type, sel)) {
                        return stage.getCharacterName();
                }
        }
        return null;
}

partyCheck.getNotHaveItemCharacter = function (party, itemId, count) {
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                if (!stage.hasItem(itemId, count)) {
                        return stage.getCharacterName();
                }
        }
        return null;
}

partyCheck.checkAllHaveItem = function (party, itemId, count) {
        let find = true;
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                find &= stage.hasItem(itemId, count);
        }
        return find;
}


partyCheck.checkHaveItem = function (party, itemId, count) {
        let find = false;
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                if (stage.hasItem(itemId, count)) {
                        find = true;
                        break;
                }
        }
        return find;
}

partyCheck.checkQuestComplete = function (party, questId) {
        let check = true;
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                if (!stage.isQuestCompleted(questId)) {
                        check = false;
                        break;
                }
        }
        return check;
}

partyCheck.getNotPQLogCharacter = function (party, util, questId, resetDay, maxCount) {
        members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let stage = members[i];
                if (eLog.getPQLog(stage, util, questId, resetDay) >= maxCount) {
                        return stage.getCharacterName();
                }
        }
        return null;
}