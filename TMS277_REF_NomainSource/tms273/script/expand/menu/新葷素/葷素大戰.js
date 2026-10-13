/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const log = require('check_log');
let betOptions = ['綠蝸牛', '藍蝸牛', '紅蝸牛', '綠蘑菇', '藍蘑菇', '花蘑菇', '蝸牛陣營', '蘑菇陣營', '綠色陣營', '藍色陣營', '紅花陣營'];
let betOptions1 = ['綠蝸牛', '藍蝸牛', '紅蝸牛', '綠蘑菇', '藍蘑菇', '花蘑菇'];
let betOptions2 = ['蝸牛陣營', '蘑菇陣營'];
let betOptions3 = ['綠色陣營', '藍色陣營', '紅花陣營'];

let colorOptions = ['綠色陣營', '藍色陣營', '紅花陣營', '綠色陣營', '藍色陣營', '紅花陣營'];
var state;
var myBets;

function start() {
    if (stage.getChannelId() != 1) {
        npc.say("請到1頻道參与。");
        return;
    }
    let e = ctx.getEvent("CatVsDog");
    if (e) {
        state = e.getVariable("STATE");
        let currentAmount = init();
        let sql = `SELECT COALESCE(SUM(amount), 0) AS sum
                   from zsf_cat_vs_dog
                   where account_id = ${stage.getAccountId()}
                     and state = ${state}
                     and type = ${option}
                     and COALESCE(result, \'NOT OK\') != \'OK\'`;
        myBets = betOptions.map(option => db.select(sql)[0].get("sum"));
        let str = `#b歡迎參加第#r${state}#b期葷素亂斗 \r\n`;
        str += "#d在這裏你可以自由投票，";
        str += "#d如果你押中了#r勝者#d，\n";
        str += "#d你將獲得#r6倍#d的金幣回報！";
        str += "#d你也可以選擇押注#r整個陣營#d，";
        str += "#d如果你押中的陣營的角色贏得了比賽，";
        str += "#d你將獲得#r2倍#d的金幣回報！\r\n";
        str += `#k您當前擁有金幣: #r${currentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}#k\r\n`;
        str += `#b#e#L${0}#${betOptions[0]}#l#k `;
        str += `#b#e#L${1}#${betOptions[1]}#l#k `;
        str += `#b#e#L${2}#${betOptions[2]}#l#k   `;
        str += `#b#e#L${6}#蝸牛陣營#l#k\r\n`;
        str += `#b#e#L${3}#${betOptions[3]}#l#k `;
        str += `#b#e#L${4}#${betOptions[4]}#l#k `;
        str += `#b#e#L${5}#${betOptions[5]}#l#k   `;
        str += `#b#e#L${7}#蘑菇陣營#l#k`;
        str += `\r\n`;
        str += `#b#e#L${8}#${betOptions[8]}#l#k `;
        str += `#b#e#L${9}#${betOptions[9]}#l#k `;
        str += `#b#e#L${10}#${betOptions[10]}#l#k   `;


        // str += betOptions1.map((option, i) => `#b#e#L${i}#${option}#l#k `).join('') + '\r\n';
        // str += "     " + `#b#L6#蝸牛陣營#l#k ` + "           " + `#b#L7#蘑菇陣營#l#k `;
        str += "\r\n\r\n";
        str += `#L18#領取金幣 可領取: #r${getWaitAmount()}億 #k  (領取時扣除5%)#l\r\n`;
        str += "     " + "#L19#我的投票#l#k "
        str += "           " + "#L20#歷史開獎#l#k#n";
        // if (player.isGm()) {

        str += "\r\n#e     " + "#L21#盈利榜單#l#k "
        str += "           " + "#L22#虧損榜單#l#k#n";
        // }

        let sel = npc.id(9300011).askMenu(str);
        if (sel < betOptions.length) {
            if (log.getEventValue(stage, db, "葷素大戰") >= 99999) {
                npc.say("次數上限，請明日再來");
                return;
            }
            let typeName = betOptions[sel];
            let toSend = npc.defNum(1).minNum(1).maxNum(999).askNumber(`您要支持${typeName}多少金幣(#r億#k):`)
            let totalAmount = myBets.reduce((a, b) => parseInt(a) + parseInt(b), 0);
            util.log(totalAmount);
            if (currentAmount < toSend * 1_0000_0000) {
                npc.say("金幣不足");
            } else if (parseInt(-totalAmount) + parseInt(toSend) > 100) {
                npc.say("超出上限，100億");
            } else {
                if (e.getVariable("STEP") == "開盤") {
                    let sqlToSend = `insert into zsf_cat_vs_dog(player_id, player_name, account_id, amount, state, type, time)
                                     values (?, ?, ?, ?, ?, ?, now())`;
                    db.insert(sqlToSend, stage.getCharacterId(), stage.getCharacterName(), player.getAccountId(), -toSend, e.getVariable("STATE"), typeName);
                    stage.loseMesos(toSend * 1_0000_0000);
                    util.broadcastChatMsg(21, `${typeName}: 感謝 < ${stage.getCharacterName()} > 支持的 ${toSend} 億金幣！`);
                    log.addEventValue(stage, db, "葷素大戰");
                    npc.say(`#b${typeName}#k: 感謝您支持的#r${toSend} 億 #k金幣,我會努力的！\r\n本日還可競猜 ${99999 - log.getEventValue(stage, db, "葷素大戰")} 次`);
                } else {
                    npc.say("不要急當前不是投票時間。");
                }
            }
        } else {
            switch (sel) {
                case 18:
                    takeMesos();
                    break;
                case 19:
                    showMyBets();
                    break;
                case 20:
                    showHistory();
                    break;
                case 21:
                    results = db.select(`select player_id,
                                                player_name,
                                                sum(CASE
                                                        WHEN type LIKE '%陣營%' THEN (amount / 2) * 0.95
                                                        ELSE (amount / 6) * 5 * 0.95
                                                    END) as sum
                                         from zsf_cat_vs_dog
                                         where amount > 0
                                         group by player_id
                                         order by sum desc
                                         limit 10`);
                    str = `歷史中獎紅榜：\r\n`;
                    // let sql = "select * from zsf_cat_vs_dog_result order by state desc limit 10";
                    // let results = player.customSqlResult(sql);
                    for (let i in results) {
                        str += `第${parseInt(i) + 1}名 <${results[i]["player_name"]}>` + " : " + parseInt(results[i]["sum"]).toFixed(2) + " 億\r\n";
                    }
                    npc.say(str);
                    break;
                case 22:
                    results = db.select(`select player_id, player_name, sum(amount) as sum
                                         from zsf_cat_vs_dog
                                         where amount < 0
                                         group by player_id
                                         order by sum asc
                                         limit 10`);
                    str = `歷史中獎黑榜：\r\n`;
                    // let sql = "select * from zsf_cat_vs_dog_result order by state desc limit 10";
                    // let results = player.customSqlResult(sql);
                    for (let i in results) {
                        str += `第${parseInt(i) + 1}名 <${results[i].get('player_name')}>` + " : " + results[i].get("sum") + " 億\r\n";
                    }
                    npc.say(str);
                    break;
            }
        }
    } else {
        if (stage.isGm()) {
            ctx.makeEvent("CatVsDog", true, null);
            npc.say("啟動");
            return;
        }
        npc.say("活動暫未開啟");
    }
}

function takeMesos() {
    if (getWaitAmount() <= 0) {
        npc.say("您沒有可領取的金幣");
    } else {

        let sql = "select id, amount from zsf_cat_vs_dog where account_id = " + stage.getAccountId() + " and result = 'OK' and amount > 0";
        let results = db.select(sql);
        let sum = 0;
        for (let i in results) {
            sum += results[i].get("amount");
            let sql1 = "update zsf_cat_vs_dog set result = 'DONE', time = now() where id = " + results[i].get("id");
            db.update(sql1);
        }
        // 扣除5%手續費 單位為億
        sum = sum * 9500_0000;
        stage.gainMesos(sum);
        npc.say("領取成功\r\n 扣掉貓糧狗糧錢\r\n本次領取金額為:#r " + sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
}

function showMyBets() {
    let str = `#b第#r${state}#b期葷素大戰,您的投票詳情#k \r\n`;
    let str1 = ``;
    for (let i in myBets) {
        str += betOptions[i] + " : #r#e" + -myBets[i] + "#n#k億\r\n";
    }
    npc.say(str);
}

function showHistory() {
    let str = `歷史10期賽果,當前為第#r${state}#k期：\r\n`;
    let sql = "select * from zsf_cat_vs_dog_result order by state desc limit 10";
    let results = db.select(sql);
    for (let i in results) {
        let res = results[i].get("result");
        let winnerIndex = betOptions1.indexOf(res);
        let winnerType = winnerIndex < 3 ? "蝸牛陣營" : "蘑菇陣營";
        let winnerColor = colorOptions[winnerIndex];
        str += `第${results[i].get("state")}期` + " : " + results[i].get("result") + `    ${winnerType.substring(0, 2)}    ${winnerColor.substring(0, 2)}\r\n`;
    }
    npc.say(str);
}

function init() {
    return stage.getMesos();
    // let currentAmount = 0;
    // let currentSql = `select sum(amount) amount_sum from zsf_cat_vs_dog where account_id = ${player.getAccountId()}`;
    // let currentResult = player.customSqlResult(currentSql).get(0);
    // if (currentResult.get("amount_sum") == null) {
    //     let initSql = `insert into zsf_cat_vs_dog(player_id, player_name, account_id, amount, state, type, time, result) values (?, ?, ?, ?, ?, ?, now(), ?)`;
    //     npc.customSqlInsert(initSql, player.getId(), player.getName(), player.getAccountId(), 0, -1, "init", "init");
    // } else {
    //     currentAmount = currentResult.get("amount_sum");
    // }
    // return currentAmount;
}

function getWaitAmount() {
    let sql = "select sum(amount) as sum from zsf_cat_vs_dog where account_id = " + stage.getAccountId() + " and result = 'OK' and amount > 0";
    // 獲取積分
    let waitAmount = db.select(sql)[0].get("sum");
    if (waitAmount == null) {
        waitAmount = 0;
    }
    return waitAmount;
}


start();
