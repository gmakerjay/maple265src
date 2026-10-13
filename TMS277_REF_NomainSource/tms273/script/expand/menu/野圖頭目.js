let monster = require('constant/model_monster');
execute();

function execute() {
    let event = stage.getEvent();
    if (event != null) {
        let r_event = ctx.getEvent('alice_server_monster');
        let r_monster = event.getVariable('kill_monster');
        r_event.setVariable('monster_' + r_monster, 'false');
        r_event.setVariable('name_' + r_monster, stage.getCharacterName());
        r_event.setVariable('date_' + r_monster, String(new Date().getTime() + monster[r_monster].mobtime * 60 * 1000));
        util.broadcastWorldChatMsg(7, "野外BOSS：" + util.getMobName(r_monster) + " 被 " + stage.getCharacterName() + " 擊殺了！" + formatCountdown(new Date().getTime() + monster[r_monster].mobtime * 60 * 1000) + " 後刷新！");
        db.insert("INSERT INTO `zsf_collect`(`charid`, `charname`, `item`, `itemname`, `points`, `point`) VALUES (" + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + 4310224 + ", '" + util.getMobName(r_monster) + "', " + 1 + ", " + monster[r_monster].socre + ");")
        //stage.changeMap(100000000, 0);
    }
}

function formatCountdown(endTimestamp) {
    let now = new Date().getTime();
    let diff = endTimestamp - now;

    if (diff <= 0) {
        return "";
    } else if (diff >= 60 * 1000) {
        return Math.floor(diff / 60000) + " 分鐘";
    } else {
        return Math.floor(diff / 1000) + " 秒";
    }
}
