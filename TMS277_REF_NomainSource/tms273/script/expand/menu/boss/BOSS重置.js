/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * zsf BOSS次數重置 @mizhijitui
 */

const eventName = 'BOSS次數重置';
const log = require('check_log');
const blackList = [//這裏填寫不重置的BOSS
//  '黑魔法師[極限]'
];

function start() {
    if (log.getEventValue(stage, db, eventName + 賽季()) > 0 && !stage.isGm()) {
        npc.say('本周已重置過');
    } else {
        if (npc.askYesNo(`是否重置本周BOSS入場次數`) == 1) {
            let sql = `update zz_boss_event
                       set status = 6
                       where player_id = ${stage.getCharacterId()} `;
            if (blackList.length > 0) {
                let blackStr = blackList.map(i => `'${i}'`).join(',');
                sql += ` and bossName not in (${blackStr})`;
            }
            db.update(sql);
            log.addEventValue(stage, db, eventName + 賽季(), 1, -1);
            npc.say('重置成功');
        }
    }
}


function 賽季() {
    var date = new Date();
    var year = date.getFullYear()
    var 賽季標號 = year + "" + 當前第幾周();
    return 賽季標號
}

function 當前第幾周() {
    let temptTime = new Date()
    //周幾
    let weekday = temptTime.getDay() || 7
    //周1+5天=周六
    temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
    let firstDay = new Date(temptTime.getFullYear(), 0, 1)
    let dayOfWeek = firstDay.getDay()
    let spendDay = 1
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1
    }
    firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
    let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
    let result = Math.ceil(d / 7)
    return result + 1
}

start();