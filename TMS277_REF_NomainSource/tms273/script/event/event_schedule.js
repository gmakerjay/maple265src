
function init(attachment) {

    // event.destroyEvent();
    // return;
    if (event.getChannel() != 1) {
        return;
    }

    next();
}

function timerExpired(key) {
    if (event.getChannel() != 1) {
        return;
    }
    switch (key) {
        case "time2":
            // let event1 = ctx.getEvent("event_bingo");
            // if (event1 != null) {
            //         if ("1".equals(event1.getVariable("Open"))) {
            //                 util.log("賓果遊戲活動已開啟，請不要重複開啟。");
            //         } else {
            //                 event1.startTimer("Event_Open", 500);
            //                 util.broadcastQuestOpen(100642, 30); 
            
            const targetDays = [2, 4, 6]; // 周二、四、六
            let now = new Date();
            let week = now.getDay();
            if ([2, 4, 6].includes(week)) { 
                util.broadcastWeatherEffectNotice("【BINGO】請前往1頻道主城游戲機參與！！！", 371, 6000, true);
            } else if ([1, 3, 5].includes(week)) { 
                util.broadcastWeatherEffectNotice("【猜拳大賽】請前往1頻道主城游戲機參與！！！", 371, 6000, true);
            }
            //                 util.log("賓果遊戲活動開啟成功！");
            //         }
            // } else {
            //         util.log("賓果遊戲活動指令碼不存在或者未設定載入。");
            // }
            next();
            // event.startTimer("time", 22 * 60 * 60 * 1000);
            break;
    }
}

function next() {
    let now = new Date();
    let day = now.getDay(); // 当前星期几（0=周日，1=周一，..., 6=周六）

    // 目标时间：当天 16:55:10
    const targetHour = 21, targetMinute = 0, targetSecond = 5;
    let target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, targetSecond);

    const targetDays = [1, 2, 3, 4, 5, 6]; // 周二、四、六

    function getNextTargetDayOffset(currentDay) {
        for (let i = 1; i <= 7; i++) {
            let nextDay = (currentDay + i) % 7;
            if (targetDays.includes(nextDay)) return i;
        }
        return 1;
    }

    let offsetDays = 0;

    if (targetDays.includes(day)) {
        // 今天是目标日
        if (now >= target) {
            // 已超过今天目标时间，找下一个目标日
            offsetDays = getNextTargetDayOffset(day);
        } else {
            // 今天还没到目标时间
            offsetDays = 0;
        }
    } else {
        // 今天不是目标日，找下一个目标日
        offsetDays = getNextTargetDayOffset(day);
    }

    if (offsetDays > 0) {
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offsetDays, targetHour, targetMinute, targetSecond);
    }

    // 时间差
    let diffInMillis = target.getTime() - now.getTime();
    util.log(`距离下次触发还有 ${Math.floor(diffInMillis / 1000)} 秒`);
    event.startTimer("time2", diffInMillis);

}

