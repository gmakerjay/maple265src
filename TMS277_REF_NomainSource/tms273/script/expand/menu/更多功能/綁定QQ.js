
var accountId = stage.getAccountId();
var qq

function start() {
    qq = loadQQ()
    let str = ``;

    if (qq) { 
        return;
    } 
    const tz3 = "#fEffect/CharacterEff/1082588/0/0#";       // 橙色圓圈
    const tz4 = "#fEffect/CharacterEff/1082588/3/0#";       // 藍色圓圈
    str = `\t\t#e#fc0xFF13376A#${tz4 + tz3 + tz4 + tz3} 歡迎來到星語谷 ${tz3 + tz4 + tz4 + tz3}#k\r\n#n`;
    str += `檢測到您還未綁定QQ，請確保您在主群並操作綁定QQ\r\n群: #r#e123456#n#k\r\n請輸入QQ`;
    stage.showSystemMessage('start');
    let qq = npc.minLen(4).maxLen(13).askText(str); 
    if (qq != Number(qq).toString()) {
        start();
    } else {
        qq = Number(qq);
        let code = generateVerificationCode()
        let endTime = parseInt(Date.now() / 1000 / 60 + 5)
        if (db.select(`select * from zsf_robot_bind where qq = ${qq}`).length > 0) {
            npc.say('該QQ已被綁定');
        } else {
            let okFlg = false;
            while (!okFlg) {
                if (npc.askMenu('請 5 分鐘內在群里發送 "[#r#e綁定賬號 ' + code + ']#n#k" 完成綁定\r\n#L1#我已發送#l') == 1) {
                    if (db.select(`SELECT code FROM verification_code_pool WHERE app_id = ${qq} AND type = '綁定QQ' AND code = ${code} AND end_time BETWEEN '${endTime - 5}' AND '${endTime}'`).length > 0) {
                        okFlg = true;
                        setQQ(getAccountName(db, stage), stage.getAccountId(), qq, stage.getCharacterId(), stage.getCharacterName(), 0)
                        npc.say('綁定成功');
                    } else {
                        npc.say('未檢測到您在群里輸入過驗證碼, 可能的原因\r\n1. 網絡波動\r\n2. 超過 5 分鐘\r\n3. 你輸入了錯誤的QQ, 正確為: ' + qq);
                    }
                }
            }
        }
    }
 
}

start();


/**
 * 生成驗證碼 6 位
 * @param length
 * @returns {string}
 */
function generateVerificationCode() {
    var length = 6
    var code = '';
    for (var i = 0; i < length; i++) {
        var randomDigit = Math.floor(Math.random() * 10); // 生成 0 到 9 之間的隨機數字
        code += randomDigit; // 將隨機數字添加到驗證碼中
    }
    return code;
}

 

function loadQQ() {
    if (!qq) {
        try {
            let results = db.select(`SELECT qq FROM zsf_robot_bind WHERE account_id = ${accountId}`);
            if (results.size() > 0) {
                return results[0].qq;
            }
        } catch (e) {
        }
    }
    return null;
}
 


function setQQ(accName, accId, qq, pId, pName, status) {
    // try {
    db.insert(`insert into zsf_robot_bind (username, account_id, qq, player_id, player_name, status) values ('${accName}', ${accId}, ${qq}, ${pId}, '${pName}', ${status})`)
    // } catch (e) { }
 
}
 

function getAccountName(db, stage) {
    const ret = db.select("SELECT * FROM account WHERE id = " + stage.getAccountId() + " LIMIT 0, 1"); // 参数化查询
    return ret.length > 0 ? ret[0].get("name") : null; // 确保返回值存在
}





