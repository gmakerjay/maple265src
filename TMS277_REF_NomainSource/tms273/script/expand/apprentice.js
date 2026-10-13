player = require("check_log");
let teacher = [];

marinStart();

function marinStart() {
    teacher = [];
    teacher[0] = getstat();
    if (teacher[0].teacher_stat == -2) {
        db.update("UPDATE `account` SET `teacher_id` = -1, `teacher_name` = NULL, `teacher_stat` = -1, `apprentice_name` = NULL, `apprentice_id` = -1 WHERE `id` = " + stage.getAccountId() + ";");
        npc.meFlip().say("真可惜...你拜師申請被拒絕了...！已為您重置拜師狀態");
        return;
    }
    var txt = "師徒系統\r\n\r\n";
    if (teacher[0].teacher_stat == -1) {
        teacher[1] = calculateDaysSinceRegistration(stage.getAccountId());
        txt += "#r1.#d註冊 #r30#d 天內允許拜師\r\n";
        txt += "#r2.#d註冊超過 #r30#d 天允許成為師傅且收徒\r\n";
        txt += "#r3.#d如果還是學徒期間需出師才允許收徒\r\n";
        txt += "#r4.#d成為師傅需 #r290#d 級 聯盟達到 #r8000#k\r\n";
        txt += "#r5.#d拜師時填寫#b 師傅#d 的唯一拜師 ID\r\n";
        txt += "#r6.#d當前賬號已入坑 #b" + teacher[1] + " #d天\r\n\r\n";
        if (teacher[1] < 30 && teacher[0].teacher_id == -1) {
            txt += "#L0#我想拜師#l\t#L2#獎勵說明#l\r\n";
        } else {
            txt += "#L1#我想收徒#l\t#L5#徒弟名單#l\t#L6#徒弟獎勵#l\r\n";
        }
    } else if (teacher[0].teacher_stat == 1) {
        txt += "#d當前師傅：#r" + teacher[0].teacher_name + "\r\n";
        txt += "#b出師需達到 275 級 且 聯盟達到 8000\r\n";
        txt += "#d當前級別：#r" + stage.getLevel() + "\r\n";
        txt += "#d當前聯盟：#r" + getMapleUnionLevel(stage.getAccountId()) + "\r\n";
        txt += "\r\n";
        txt += "#L3#我想出師#l\r\n";
    }
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            var txt = "\r\n";
            txt += "#r1.#d拜師對象需級別達到 #b290 #d級別\r\n";
            txt += "#r2.#d且拜師對象註冊時間 > #b30#d 天\r\n";
            txt += "\r\n";
            txt += "\t\t\t#r請輸入你想拜師對象的 ID\r\n\r\n";
            txt += " ";
            num = npc.meFlip().minNum(1).maxNum(99999).defNum(0).askNumber(txt);
            teacher[2] = getchar(num);
            if (teacher[2] == null) {
                npc.meFlip().say("真可惜..你查詢的 ID 不正確..");
                return;
            }
            if (teacher[2].aid == stage.getAccountId()) {
                npc.meFlip().say("抱歉..不可以拜師自己");
                return;
            }
            var txt = "\r\n";
            txt += "#d拜師對象：#b" + teacher[2].name + "　#dlv.#r" + teacher[2].level + "\r\n";
            txt += "#d拜師狀態：#b" + (calculateDaysSinceRegistration(teacher[2].aid) <= 30 ? "禁止拜師" : "允許拜師") + "\r\n";
            txt += "\r\n";
            txt += "\t　#r確認拜師當前角色嗎？一旦拜師不可撤銷..!\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            if (teacher[2].level < 290) {
                npc.meFlip().say("抱歉..對方級別沒有達到 290 不可以成為師傅");
                return;
            }

            if (calculateDaysSinceRegistration(teacher[2].aid) <= 30) {
                npc.meFlip().say("抱歉..對方註冊時間沒有超過 30 天 不可以成為師傅");
                return;
            }
            db.update("UPDATE `account` SET `teacher_id` = " + teacher[2].aid + ", `teacher_name` = '" + teacher[2].name + "', `apprentice_name` = '" + stage.getName() + "', `apprentice_id` = '" + stage.getId() + "' WHERE `id` = " + stage.getAccountId() + ";");
            npc.meFlip().say("恭喜..拜師成功!!請通知師傅進行通過拜師");
            break;

        case 1:
            if (stage.getLevel() < 290) {
                npc.meFlip().say("抱歉..成為師傅必須等級達到 290 級!");
                return;
            }
            if (getMapleUnionLevel(stage.getAccountId()) < 1) {
                npc.meFlip().say("抱歉..聯盟需達到 8000");
                return;
            }
            teacher[1] = calculateDaysSinceRegistration(stage.getAccountId());
            if (teacher[1] < 30) {
                npc.meFlip().say("抱歉..你註冊時間沒有達到 30 天禁止收徒");
                return;
            }
            teacher[3] = getteacher(-1);
            if (teacher[3].length <= 0) {
                npc.meFlip().say("抱歉..你沒有推薦人申請..");
                return;
            }
            var txt = "\r\n";
            txt += "#r請選擇申請名單的玩家是否通過拜師 or 拒絕拜師\r\n";
            for (var i in teacher[3]) {
                txt += "#L" + i + "##d申請拜師名單 <　#r" + marinString(" ", 12, teacher[3][i].apprentice_name.toString()) + "#d >#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            var txt = "\r\n";
            txt += "\r\n#b確認要將 #r" + teacher[3][url].apprentice_name + " #b收入徒弟嗎?\r\n";
            txt += "\r\n\r\n";
            txt += "#r是: #d通過徒弟驗證\t\t";
            txt += "#r否: #d拒絕徒弟驗證\r\n";
            yeno = npc.meFlip().askYesNo(txt);
            if (yeno == 1) {
                db.update("UPDATE `account` SET `teacher_stat` = 1 WHERE `id` = " + teacher[3][url].id + ";");
                npc.meFlip().say("恭喜!收徒成功!!");
            } else {
                db.update("UPDATE `account` SET `teacher_stat` = -2 WHERE `id` = " + teacher[3][url].id + ";");
                npc.meFlip().say("真可惜..你拒絕了此人的申請");
            }
            break;

        case 2:
            var txt = "\r\n";
            txt += "當徒弟級別達到 #r275#k 聯盟 #r8000#k\r\n";
            txt += "徒弟本身可領到 樂豆 x 500\r\n";
            txt += "那麼師傅可領到 樂豆 x 1000\r\n";
            txt += "\r\n";
            txt += "#b出師後通過管理員審核\r\n";
            npc.meFlip().say(txt);
            break;

        case 3:
            if (stage.getLevel() < 275) {
                npc.meFlip().say("抱歉..出師需達到 275");
                return;
            }
            if (getMapleUnionLevel(stage.getAccountId()) < 8000) {
                npc.meFlip().say("抱歉..聯盟需達到 8000");
                return;
            }
            npc.meFlip().say("恭喜..你已達到出師標準 聯繫管理員進行出師");
            break;

        case 4:
            if (stage.getLevel() < 275) {
                npc.meFlip().say("抱歉..出師需達到 275");
                return;
            }
            if (getMapleUnionLevel(stage.getAccountId()) < 8000) {
                npc.meFlip().say("抱歉..聯盟需達到 8000");
                return;
            }
            if (player.getEventValue(stage, db, "師徒_0_效驗") > 0) {
                npc.meFlip().say("抱歉..你領過了師徒獎勵");
                return;
            }
            player.addventValue(stage, db, "師徒_0_效驗", 1, 3650);
            stage.modifyCashShopCurrency(1, 500);
            npc.meFlip().say("恭喜..你領到了 500 樂豆");
            break;

        case 5:
            teacher[3] = getteacher(1);
            if (teacher[3].length <= 0) {
                npc.meFlip().say("抱歉..你沒有任何徒弟.");
                return;
            }
            var txt = "你的徒弟如下列所示\r\n\r\n";
            for (var i in teacher[3]) {
                txt += "#d徒弟 < #r" + marinString(" ", 12, teacher[3][i].apprentice_name.toString()) + "#d >\r\n";
            }
            npc.meFlip().say(txt);
            break;

        case 6:
            var txt = "徒弟獎勵\r\n\r\n";
            txt += "#r1.#b徒弟級別達到 #r275#b 級\r\n";
            txt += "#r2.#b徒弟聯盟達到 #r8000\r\n\r\n";
            teacher[3] = getteacher(1);
            if (teacher[3].length <= 0) {
                npc.meFlip().say("抱歉..你沒有任何徒弟.");
                return;
            }
            npc.meFlip().say("聯係管理員領取");
            return;
            for (var i in teacher[3]) {
                txt += "#L" + teacher[3][i].id + "##d< #r" + marinString(" ", 12, teacher[3][i].apprentice_name.toString()) + "#d > " + (player.getEventValue(stage, db, "師徒_key_" + teacher[3][i].id) > 0 ? "#b已領" : "#d未領") + "#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            if (player.getEventValue(stage, db, "師徒_key_" + url) > 0) {
                npc.meFlip().say("抱歉..你已領過了該徒弟獎勵");
                return;
            }
            if (getMapleUnionLevel(url) < 8000) {
                npc.meFlip().say("抱歉..該徒弟聯盟沒有達到 8000");
                return;
            }
            var ret = db.select("SELECT character_stat.name, character_stat.level FROM `character` JOIN character_stat ON character.id = character_stat.id WHERE character.account_id = " + url + " ORDER BY character_stat.level DESC LIMIT 1;");
            if (ret[0].get("level") < 275) {
                npc.meFlip().say("抱歉..該玩家級別沒有達到 275");
                return;
            }
            stage.modifyCurrency(1, 1000);
            player.addventValue(stage, db, "師徒_key_" + url, 1, 3650);
            npc.meFlip().say("恭喜..領取該徒弟獎勵成功");
            break;
    }
}

function getteacher(snum) {
    var ret = db.select("SELECT * FROM `account` WHERE `teacher_id` = '" + stage.getAccountId() + "' AND `teacher_stat` = '" + snum + "' LIMIT 0,1000;");
    var A = [];
    for (var i in ret) {
        var B = [];
        B['id'] = ret[i].get("id");
        B['teacher_id'] = ret[i].get("teacher_id");
        B['teacher_name'] = ret[i].get("teacher_name");
        B['teacher_integral'] = ret[i].get("teacher_integral");
        B['teacher_stat'] = ret[i].get("teacher_stat");
        B['apprentice_name'] = ret[i].get("apprentice_name");
        B['apprentice_id'] = ret[i].get("apprentice_id");
        A.push(B);
    }
    return A;
}

function getstat() {
    var ret = db.select("SELECT * FROM `account` WHERE `id` = '" + stage.getAccountId() + "' LIMIT 0,1;");
    return {
        teacher_id: ret[0].get("teacher_id"),
        teacher_name: ret[0].get("teacher_name"),
        teacher_integral: ret[0].get("teacher_integral"),
        teacher_stat: ret[0].get("teacher_stat")
    }
}

function getchar(cid) {
    var ret = db.select("SELECT account.id AS aid, account.create_date, character_stat.id AS cid, character_stat.name, character_stat.level FROM `character` JOIN account ON character.account_id = account.id JOIN character_stat ON character.id = character_stat.id WHERE character.id = '" + cid + "';");
    if (ret.length <= 0) {
        return null;
    } else {
        return {
            aid: ret[0].get('aid'),
            cid: ret[0].get('cid'),
            name: ret[0].get('name'),
            level: ret[0].get('level'),
            createdat: ret[0].get('create_date')
        }
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}

function calculateDaysSinceRegistration() {
    ret = db.select("SELECT `create_date` FROM `account` WHERE `id` = '" + stage.getAccountId() + "' LIMIT 0,1;");
    const registrationDateStr = String(ret[0].get("create_date"));
    const registrationDate = new Date(parseInt(registrationDateStr));
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - registrationDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

function convertToStandardDateFormat(dateStr) {
    // 移除末尾的 ".0"
    dateStr = dateStr.replace(".0", "");
    // 将空格替换为 "T"
    dateStr = dateStr.replace(" ", "T");
    return dateStr;
}

function getMapleUnionLevel(aid) {
    var ret = db.select("SELECT SUM(subquery.level) AS level_sum FROM ( SELECT MAX(cs.level) AS level FROM `character` c INNER JOIN character_stat cs ON c.id = cs.id WHERE c.account_id = " + aid + " AND c.del = 0 AND cs.job = 10112 GROUP BY cs.job UNION ALL SELECT cs.level FROM `character` c INNER JOIN character_stat cs ON c.id = cs.id WHERE c.account_id = " + aid + " AND c.del = 0 AND cs.job <> 10112 ) subquery ORDER BY subquery.level DESC LIMIT 42;");
    return ret[0].get("level_sum");
}