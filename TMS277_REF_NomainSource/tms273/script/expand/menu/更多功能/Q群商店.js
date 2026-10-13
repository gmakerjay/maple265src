/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


var list

function getAccountId() {
    return stage.getAccountId();
}

function getCharacterId() {
    return stage.getCharacterId()
}


function start() {
    let list = db.select("SELECT * FROM item_warehouse WHERE character_id = " + getCharacterId() + " AND is_deleted = 0")
    var txt = '以下物品待領取'
    if (list.length != 0) {
        for (var i = 0; i < list.length; i++) {
            txt += '\r\n#L' + (i) + '##v' + list[i].get('item_id') + '##z' + list[i].get('item_id') + '# x ' + list[i].get('quantity') + '#l'
        }
    } else {
        txt += '\r\n#e空空如也'
        npc.say(txt);
        return;
    }
    let sel = npc.askMenu(txt);

    db.update("UPDATE item_warehouse SET is_deleted = 1, update_time = '" + nowDateText() + "' WHERE id = " + list[sel].get('id') + " AND is_deleted = 0");


    stage.gainItem(list[sel].get('item_id'), list[sel].get('quantity'))
    npc.say('獲得 #v' + list[sel].get('item_id') + '##z' + list[sel].get('item_id') + '# x ' + list[sel].get('quantity'));
    start();
}


/**
 * 獲取格式好的現在時間
 * @returns {string}
 */
function nowDateText() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()
    var hours = now.getHours()
    var minutes = now.getMinutes()
    var seconds = now.getSeconds()
    return year + '-'
        + (month > 9 ? month : '0' + month)
        + '-'
        + (day > 9 ? day : '0' + day)
        + ' '
        + (hours > 9 ? hours : '0' + hours)
        + ':'
        + (minutes > 9 ? minutes : '0' + minutes)
        + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
}


start();