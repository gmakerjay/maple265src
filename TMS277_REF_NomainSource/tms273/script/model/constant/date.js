function timestampToTime(timestamp) {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}

function 本月還剩下多少天() {
    let today = new Date();
    let now = today.getDate();
    let month = today.getMonth();
    let monarr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (((today.getFullYear() % 4 === 0) && (today.getFullYear() % 100 !== 0)) || (today.getFullYear() % 400 === 0)) {
        monarr[1] = 29;
    }

    return monarr[month] - now + 1;
}

function 本週剩餘天() {
    let today = new Date();
    let weekday = today.getDay();
    return 7 - weekday;
}

function 日期查詢_日() {
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return {
        今日: today.toISOString().split('T')[0],
        昨日: yesterday.toISOString().split('T')[0],
        明日: tomorrow.toISOString().split('T')[0]
    };
}

function 日期查詢周() {
    let today = new Date();
    let firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());

    let lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    let previousWeekFirstDay = new Date(firstDayOfWeek);
    previousWeekFirstDay.setDate(firstDayOfWeek.getDate() - 7);

    let previousWeekLastDay = new Date(lastDayOfWeek);
    previousWeekLastDay.setDate(lastDayOfWeek.getDate() - 7);

    return {
        本週第一天: firstDayOfWeek.toISOString().split('T')[0],
        本週最後一天: lastDayOfWeek.toISOString().split('T')[0],
        上週第一天: previousWeekFirstDay.toISOString().split('T')[0],
        上週最後一天: previousWeekLastDay.toISOString().split('T')[0]
    };
}

function 日期查詢月() {
    let today = new Date();
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let previousMonthFirstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    let previousMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0);

    return {
        本月第一天: firstDayOfMonth.toISOString().split('T')[0],
        本月最後一天: lastDayOfMonth.toISOString().split('T')[0],
        上月第一天: previousMonthFirstDay.toISOString().split('T')[0],
        上月最後一天: previousMonthLastDay.toISOString().split('T')[0]
    };
}

function 當前第幾周() {
    let firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);
    let startOfYear = new Date(firstDay.getFullYear(), 0, 1);
    let weekNumber = Math.ceil((((firstDay - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);

    return weekNumber + 1;
}

function 當前第幾月() {
    return new Date().getMonth() + 1;
}

function 日期查詢() {
    const today = new Date();
    const 本月第一天 = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const 本月最後一天 = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
    const 上月第一天 = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
    const 上月最後一天 = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
    return {
        本月最後一天,
        本月第一天,
        上月第一天,
        上月最後一天
    };
}

module.exports = {
    timestampToTime,
    本月還剩下多少天,
    本週剩餘天,
    日期查詢,
    日期查詢周,
    日期查詢_日,
    當前第幾周,
    日期查詢月,
    當前第幾月
};
