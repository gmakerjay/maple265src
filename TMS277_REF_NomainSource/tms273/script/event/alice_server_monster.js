/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let monster = require('constant/model_monster');

function init() {
    for (let i in monster) {
        event.setVariable('monster_' + i, "true");
        event.setVariable('date_' + i, String(0));
        event.setVariable('name_' + i, "false");
    }
    event.startTimer("reset_monster", 60 * 1000);
    util.broadcastWorldChatMsg(0x12, "[ 野圖頭目 ] : 野圖頭目已初始化!");
}


function reset_monster() {
    let date = new Date().getTime();
    for (let i in monster) {
        let is_monster = event.getVariable('monster_' + i);
        if (is_monster == "false") {
            let re_date = event.getVariable('date_' + i);
            if (date >= re_date) {
                event.setVariable('monster_' + i, "true");
                event.setVariable('date_' + i, String(0));
            }
        }
    }
    event.startTimer("reset_monster", 60 * 1000);
}

function timerExpired(key) {
    switch (key) {
        case 'reset_monster':
            reset_monster();
            break;
    }
}
