function getLastWeekMondayAndSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // 今天是本周的第几天，周日作为一周的第七天处理
    const diffMonday = today.getDate() - dayOfWeek - 6; // 上周周一的日期
    const lastMonday = new Date(today.setDate(diffMonday));
    const lastSunday = new Date(today.setDate(lastMonday.getDate() + 7)); // 上周周日的日期
    return {
        lastMonday: lastMonday.getFullYear() + '-' + (lastMonday.getMonth() + 1).toString().padStart(2, '0') + '-' + lastMonday.getDate().toString().padStart(2, '0'),
        lastSunday: lastSunday.getFullYear() + '-' + (lastSunday.getMonth() + 1).toString().padStart(2, '0') + '-' + lastSunday.getDate().toString().padStart(2, '0')
    };
}

function 野外BOSS排行(dayList) {
    // 起源排行
    let toAdd7 = [];
    let rankStr7 = "";
        let rankList = db.select(`SELECT SUM(point) AS count, charid, charname FROM zsf_collect WHERE lasttime >= '${dayList[0][0]}' and lasttime < '${dayList[0][1]}' GROUP BY charid ORDER BY count DESC LIMIT 0, 1000;`); 


    for (let i in rankList) {
        let rankInfo = rankList[i];
        toAdd7.push([rankInfo.get('charid'), parseInt(i) + 1, dayList[0][0] + ' 0:00:00', '野外BOSS']);
        rankStr7 += `${parseInt(i) + 1} ${dayList[0][0]}： ${rankInfo.get("charid")} ${rankInfo.get("charname")} ${rankInfo.get("count")} \r\n`;
    } 
    // rankStr = '';
    for (let i in toAdd7) {
        // rankStr +=`insert into zsf_rank_reward(playerId, rank, type, check, time) values(${toAdd[i][0]}, ${toAdd[i][1]}, 'dojang', 0, '${toAdd[i][2]}')`
        db.insert(`insert into zsf_rank_reward(playerId, \`rank\`, \`type\`, \`check\`, \`time\`) values(${parseInt(toAdd7[i][0])}, ${parseInt(toAdd7[i][1])}, '${toAdd7[i][3]}', 0, '${toAdd7[i][2]}')`);
    }
}


function start() {
 
    const dayList = [
        // ['2023-10-30', '2023-11-06'],
        [getLastWeekMondayAndSunday().lastMonday, getLastWeekMondayAndSunday().lastSunday],
        // ['2023-09-18', '2023-09-25'],
        // ['2023-09-25', '2023-10-02'],
    ];
    野外BOSS排行(dayList);
}
start();