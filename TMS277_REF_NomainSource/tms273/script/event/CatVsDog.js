let FIELD;
let STATE;
let STEP;
let betOptions = ['绿蜗牛', '蓝蜗牛', '红蜗牛', '绿蘑菇', '蓝蘑菇', '花蘑菇'];
let colorOptions = ['绿色阵营', '蓝色阵营', '红花阵营', '绿色阵营', '蓝色阵营', '红花阵营'];
var winner;
var winnerType;
var winnerColor;
var enemyCamp;
var finalOpponentIndex;
var finalOpponent;
var competitors;
function init() {
    let lastState = event.customSqlResult(`select count(*) as count from zsf_cat_vs_dog_result;`).get(0).get("count");
    STATE = ++lastState;
    FIELD = event.getMap(100000205);
    event.startTimer("开盘", 1000);
    event.setVariable("STATE", STATE);
    event.setVariable("内幕", 999);
}
function timerExpired(key) {
    // event.broadcastPlayerNotice(21,`荤素乱斗进入休眠`);
    // event.destroyEvent();
    // return;
    if (event.getChannel() != 1) {
        return;
    }
    switch (key) {
        case "开盘":
            // FIELD.broadcastEventNotice(`第${STATE}届荤素乱斗------开始投票`);
            if (event.getChannel() == 1) {
                event.broadcastPlayerNotice(21,`第${STATE}届荤素乱斗------开始投票`);
            }
            event.startTimer("即将封盘", 164000);
            event.setVariable("STEP", "开盘");
            FIELD.showTimer(180);//显示计时器 1消失
            break;
        case "即将封盘":
            // FIELD.broadcastEventNotice(`第${STATE}届荤素乱斗------10秒后截至投票`);
            event.startTimer("封盘", 10000);
            break;
        case "封盘":
            event.setVariable("STEP", "封盘");
            if (event.getChannel() == 1) {
                let winnerIndex = 0;
                let randTimes = Math.floor(Math.random() * 20) + 1;
                for (let i = 0; i < randTimes; i++) {
                    winnerIndex = Math.floor(Math.random() * betOptions.length);
                }
                if (parseInt(event.getVariable("内幕")) != 999) {
                    winnerIndex = parseInt(event.getVariable("内幕"));
                    event.setVariable("内幕", 999);
                }
                winner = betOptions[winnerIndex];
                winnerType = winnerIndex < 3 ? "蜗牛阵营" : "蘑菇阵营";
                winnerColor = colorOptions[winnerIndex];
                competitors = betOptions.filter(option => option !== winner);  // 过滤出除了胜者以外的参赛者

                finalOpponentIndex = Math.floor(Math.random() * competitors.length);  // 随机选择一个对手
                finalOpponent = competitors.splice(finalOpponentIndex, 1)[0];  // 从参赛者中移除这个对手
                let result = event.customSqlResult(`SELECT SUM(CASE WHEN type = \'${betOptions[0]}\' THEN amount ELSE 0 END) AS cat1_amount, SUM(CASE WHEN type = \'${betOptions[1]}\' THEN amount ELSE 0 END) AS cat2_amount, SUM(CASE WHEN type = \'${betOptions[2]}\' THEN amount ELSE 0 END) AS cat3_amount, SUM(CASE WHEN type = \'${betOptions[3]}\' THEN amount ELSE 0 END) AS dog1_amount, SUM(CASE WHEN type = \'${betOptions[4]}\' THEN amount ELSE 0 END) AS dog2_amount, SUM(CASE WHEN type = \'${betOptions[5]}\' THEN amount ELSE 0 END) AS dog3_amount FROM zsf_cat_vs_dog WHERE state = ${STATE};`)
                let addResultSql = "insert into zsf_cat_vs_dog_result(state, result, cat1, cat2, cat3, dog1, dog2, dog3, time) values(?, ?, ?, ?, ?, ?, ?, ?, now())";
                event.customSqlInsert(addResultSql, STATE, winner, result.get(0).get("cat1_amount") || 0, result.get(0).get("cat2_amount") || 0, result.get(0).get("cat3_amount") || 0, result.get(0).get("dog1_amount") || 0, result.get(0).get("dog2_amount") || 0, result.get(0).get("dog3_amount") || 0);
                // FIELD.broadcastEventNotice(`第${STATE}届荤素乱斗------开奖中`);

                let rewardSql = `UPDATE zsf_cat_vs_dog SET amount = CASE WHEN type = \'${winnerColor}\' THEN -amount * 3 ELSE amount END, result = \'OK\' where state = ${STATE} and type IN (\'绿色阵营\', \'蓝色阵营\', \'红花阵营\') and COALESCE(result, \'NOT OK\') != \'OK\'`;
                // event.debug(rewardSql);
                event.customSqlUpdate(rewardSql);
                rewardSql = `UPDATE zsf_cat_vs_dog SET amount = CASE WHEN type = \'${winnerType}\' THEN -amount * 2 ELSE amount END, result = \'OK\' where state = ${STATE} and type IN (\'蜗牛阵营\', \'蘑菇阵营\') and COALESCE(result, \'NOT OK\') != \'OK\'`;
                event.customSqlUpdate(rewardSql);
                
                rewardSql = `UPDATE zsf_cat_vs_dog SET amount = CASE WHEN type = \'${winner}\' THEN -amount * 6 ELSE amount END, result = \'OK\' where state = ${STATE} and type IN (\'绿蜗牛\', \'蓝蜗牛\', \'红蜗牛\', \'绿蘑菇\', \'蓝蘑菇\', \'花蘑菇\') and COALESCE(result, \'NOT OK\') != \'OK\'`;
                event.customSqlUpdate(rewardSql);
                


            }
            event.startTimer("开奖", 2500);
            break;
        case "开奖":
            if (event.getChannel() == 1) {
                let winnerName = event.customSqlResult(`select result from zsf_cat_vs_dog_result where state = ${STATE};`).get(0).get("result");
                let winnerTypeName = winnerName.includes("蜗牛") ? "蜗牛阵营" : "蘑菇阵营"; 
                let winnerColorName = '红花阵营';
                if (winnerName.includes("绿")) {
                    winnerColorName = '绿色阵营';
                } else if (winnerName.includes("蓝")) {
                    winnerColorName = '蓝色阵营';
                }


                // event.debug(winnerName);
                // event.debug(winnerTypeName);
                // event.debug(winnerColorName);
                let winList = event.customSqlResult(`SELECT player_id, sum(amount)  AS sum, player_name, account_id FROM zsf_cat_vs_dog WHERE state = ${STATE} AND type = \'${winnerName}\' GROUP BY player_id;`);
                for (let i in winList) {
                    let winPlayer = winList.get(i);
                    let sum = winPlayer.get("sum");
                    let reward = parseInt(sum);
                    let playerName = winPlayer.get("player_name");
                    // FIELD.broadcastEventNotice(`${winner}:恭喜玩家: ${playerName} 赢得金币: ${-reward} 亿`);
                    event.broadcastPlayerNotice(21,`${winnerName}:恭喜玩家: ${playerName} 赢得金币: ${reward} 亿`);
                    // if (-sum >= 50) {
                    //     sh.broadcastWeatherEffectNotice(9, "蜗牛对决蘑菇: 恭喜玩家" + playerName + " 本次对决赢得金币: " + (-reward) + " 亿", 10000);
                    // }
                }
                let winTypeList = event.customSqlResult(`SELECT player_id, sum(amount)  AS sum, player_name, account_id FROM zsf_cat_vs_dog WHERE state = ${STATE} AND type = \'${winnerTypeName}\' GROUP BY player_id;`);
                for (let i in winTypeList) {
                    let winPlayer = winTypeList.get(i);
                    let sum = winPlayer.get("sum");
                    let reward = parseInt(sum);
                    let playerName = winPlayer.get("player_name");
                    // if ((winnerType === "蜗牛阵营" && winnerIndex < 3) || (winnerType === "蘑菇阵营" && winnerIndex >= 3)) {
                    //     reward = 0;
                    // }
                    // if (reward < 0) {
                        // FIELD.broadcastEventNotice(`${winnerType}:恭喜玩家: ${playerName} 赢得金币: ${-reward} 亿`);
                        event.broadcastPlayerNotice(21,`${winnerTypeName}:恭喜玩家: ${playerName} 赢得金币: ${reward} 亿`);
                        // if (-sum >= 50) {
                        //     sh.broadcastWeatherEffectNotice(9, "蜗牛对决蘑菇: 恭喜玩家" + playerName + " 本次对决赢得金币: " + (-reward) + " 亿", 10000);
                        // }
                    // }
                }

                let winColorList = event.customSqlResult(`SELECT player_id, sum(amount)  AS sum, player_name, account_id FROM zsf_cat_vs_dog WHERE state = ${STATE} AND type = \'${winnerColorName}\' GROUP BY player_id;`);
                for (let i in winColorList) {
                    let winPlayer = winColorList.get(i);
                    let sum = winPlayer.get("sum");
                    let reward = parseInt(sum);
                    let playerName = winPlayer.get("player_name");
                        event.broadcastPlayerNotice(21,`${winnerColorName}:恭喜玩家: ${playerName} 赢得金币: ${reward} 亿`);
                }


                // FIELD.broadcastEventNotice(`第${STATE++}届荤素乱斗--结算完毕--胜者是 <${winner}>`);
                event.broadcastPlayerNotice(21,`第${STATE}届荤素乱斗--结算完毕--胜者是 <${winner}>`);
                // STATE++;
            }
            event.startTimer("开盘", 5000);
            event.setVariable("STATE", ++STATE);
            FIELD.showTimer(5);//显示计时器 1消失
            break;
    }
}