function init(attachment) {
    let result = getTimeDifference();
    event.setVariable("date_notice", result.milliseconds);
}

function timerExpired(key) {
    switch (key) {
        case 'date_notice':
            var now = new Date();
            if (now.getDay() === 6 || now.getDay() === 0) { // Only trigger on Saturday or Sunday
                var currentHour = now.getHours();
                if (currentHour === 21) {
                    util.broadcastWeatherEffectNotice("管理員向大家發放了周末福利，請前往福利中心領取！", 328, 10000, true);
                }
            }
            break;
        case "resetting":
            var result = getTimeDifference();
            event.startTimer("game", result.milliseconds);
            break;
    }
}

function getTimeDifference() {
    var now = new Date();
    var target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
    var dayOfWeek = now.getDay();
    if ((dayOfWeek === 6 && now.getHours() >= 21) || dayOfWeek === 0) { // If it's already past 21:00 on Saturday, or it's Sunday
        target.setDate(target.getDate() + 1);
    }
    var diff = target.getTime() - now.getTime();
    diff = diff < 0 ? 0 : diff;
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    var pad = function (n) {
        return n < 10 ? '0' + n : n;
    };
    var timeString = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    return {
        milliseconds: diff,
        timeString: timeString
    };
}
