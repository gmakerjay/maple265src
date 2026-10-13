/* marin 脚本订制 技术顾问 50009219 */
let bute = [
    { name: 4001715, num: 60, weight: 45 },
    { name: 4001715, num: 90, weight: 30 },
    { name: 4001715, num: 130, weight: 25 }
];
let grouping = [];

execute();

function execute() {
    const marin_comp = comp(db);
    if (marin_comp === 0) {
        grouping = [0, 10, 0, 1, 0, 1];
    } else {
        const exist_cid = marin_comp.group_cid.split(",");
        const exist_cname = marin_comp.group_cname.split(",");
        grouping = [
            exist_cid.length,
            10 - exist_cid.length,
            calculateWinningProbability(exist_cid.length),
            undefined,
            max_comp(db),
            exist_cname.includes(stage.getCharacterName()) ? 0 : 1
        ];
    }
    grouping[3] = grouping[4];
    var txt = "幸運輪盤\r\n";
    txt += "每回參與需 #r10億楓幣#k,參與後都會獲得參與次數\r\n";
    txt += "當開獎次數為0次的時候,隨機抽出一位幸運玩家獲得大獎\r\n";
    txt += "本期大獎獎勵如下\r\n";
    for (var i in bute) {
        txt += `#k[#r${(33.33).toFixed(2)}%#k#i${bute[i].name}#x ${bute[i].num}] `;

    }
    txt += "\r\n";
    txt += "#d當前全服購買次數 < #b  " + grouping[0] + "#d > 距離開獎還剩 < #r" + grouping[1] + "#d > 次\r\n";
    txt += "#r每人只能購買一次\r\n";
    txt += "#b#L0#立即購買#l\t\t#L1##r查詢往期開獎#l\r\n";
    const sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            if (!stage.hasMesos(1E9)) {
                npc.meFlip().say("抱歉..你沒有 10E 楓幣");
                return;
            }
            marin_comp = comp(db);
            if (marin_comp == 0) {
                db.insert(`INSERT INTO \`marin_fortune\` (\`group_cid\`, \`group_cname\`)
                           VALUES ('${stage.getCharacterId()}', '${stage.getCharacterName()}');`);
                stage.loseMesos(1E9);
                util.broadcastChatMsg(10, "[幸運轉盤] 玩家 " + stage.getCharacterName() + " 參與了幸運轉盤！！距離開獎還差 9 個人！！趕緊來參加吧！！");
                util.broadcastChatMsg(10, "[幸運轉盤] 玩家 " + stage.getCharacterName() + " 參與了幸運轉盤！！距離開獎還差 9 個人！！趕緊來參加吧！！");
                npc.meFlip().say("參與成功..等待開獎");
                return;
            } else {
                exist_cid = marin_comp.group_cid.split(",");
                exist_cname = marin_comp.group_cname.split(",");
                if (exist_cname.indexOf(String(stage.getCharacterName())) > -1) {
                    npc.meFlip().say("抱歉...你已經購買了..");
                    return;
                }
                exist_cid.push(stage.getCharacterId());
                exist_cname.push(stage.getCharacterName());
                const exist_cid_str = exist_cid.join(",");
                const exist_cname_str = exist_cname.join(",");
                db.update(`UPDATE \`marin_fortune\`
                           SET \`group_cid\`   = '${exist_cid_str}',
                               \`group_cname\` = '${exist_cname_str}'
                           WHERE \`id\` = ${marin_comp.id}`);
                util.broadcastChatMsg(10, "[幸運轉盤] 玩家 " + stage.getCharacterName() + " 參與了幸運轉盤！！距離開獎還差 " + (10 - exist_cname.length) + " 個人！！趕緊來參加吧！！");
                util.broadcastChatMsg(10, "[幸運轉盤] 玩家 " + stage.getCharacterName() + " 參與了幸運轉盤！！距離開獎還差 " + (10 - exist_cname.length) + " 個人！！趕緊來參加吧！！");
                if (exist_cid.length >= 10) {
                    var winner = marin_weight(bute);
                    const randomIndex = Math.floor(Math.random() * exist_cname.length);
                    const randomName = exist_cname[randomIndex];
                    const correspondingID = exist_cid[randomIndex];
                    db.update("UPDATE `marin_fortune` SET `stat` = 1, `will_num` = " + winner.num + ", `will_cid` = " + correspondingID + ", `will_name` = '" + randomName + "' WHERE `id` = " + marin_comp.id + ";");
                    util.broadcastChatMsg(10, "[幸運轉盤] 第 " + grouping[4] + " 期 獎品 " + util.getItemName(winner.name) + " x " + winner.num + " 已開出.本期幸運兒 " + randomName + " !!快恭喜吧!!")
                    util.broadcastChatMsg(10, "[幸運轉盤] 第 " + grouping[4] + " 期 獎品 " + util.getItemName(winner.name) + " x " + winner.num + " 已開出.本期幸運兒 " + randomName + " !!快恭喜吧!!")
                    util.broadcastChatMsg(10, "[幸運轉盤] 第 " + grouping[4] + " 期 獎品 " + util.getItemName(winner.name) + " x " + winner.num + " 已開出.本期幸運兒 " + randomName + " !!快恭喜吧!!")
                    Insert(db, stage.getAccountId(), correspondingID, randomName, false, 999, winner.name, winner.num, util);
                }
                stage.loseMesos(1E9);
                npc.meFlip().say("參與成功..等待開獎");
            }
            break;

        case 1:
            rank = rank_comp(db);
            txt = "往期幸運轉盤\r\n\r\n";
            if (rank.length <= 0) {
                txt += "目前沒有最新的記錄\r\n\r\n";
            } else {
                for (let i in rank) {
                    txt += "#d第[ " + marinString(" ", 5, String(rank[i].id).toString()) + " ] 期 #i" + 4001715 + "# x " + marinString(" ", 5, String(rank[i].will_num).toString()) + " 獲得者:#b" + rank[i].will_name + "\r\n";
                }
            }
            npc.meFlip().say(txt);
            break;
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

function max_comp(db) {
    const ret = db.select(`SELECT COUNT(*) AS total
                           FROM marin_fortune;`);
    return parseInt(ret[0].get("total")) + 1;
}

function comp(db) {
    const query = "SELECT * FROM `marin_fortune` WHERE `stat` = -1 LIMIT 1;";
    const ret = db.select(query);
    if (ret.length === 0) {
        return 0;
    } else {
        const result = ret[0];
        const id = result.get('id');
        const stat = result.get('stat');
        const will_num = result.get('will_num');
        const will_cid = result.get('will_cid');
        const will_name = result.get('will_name');
        const group_cid = result.get('group_cid');
        const group_cname = result.get('group_cname');

        return {
            id,
            stat,
            will_num,
            will_cid,
            will_name,
            group_cid,
            group_cname
        };
    }
}

function Insert(db, aid, cid, cname, ver, type, itemid, num, util) {
    switch (ver) {
        case true:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `cid` = '" + cid + "' AND `type` = '" + type + "' AND `itemid` = '" + itemid + "' AND `stat` = '" + 0 + "' LIMIT 0,1;";
            var ret = db.select(sql);
            if (ret.length <= 0) {
                var sql = "INSERT INTO `marin_warehouse`(`cid`, `cname`, `type`, `itemid`, `itemname`, `itemnum`, `stat`) VALUES (" + cid + ", '" + cname + "', " + type + ", " + itemid + ", '" + util.getItemName(itemid) + "', " + num + ",0);";
                db.insert(sql);
            } else {
                var sid = ret[0].get("id");
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+" + num + " WHERE `id` = " + sid + ";";
                db.update(sql);
            }
            break;
        default:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `aid` = '" + aid + "' AND `type` = '" + type + "' AND `itemid` = '" + itemid + "' AND `stat` = '" + 1 + "' LIMIT 0,1;";
            var ret = db.select(sql);
            if (ret.length <= 0) {
                var sql = "INSERT INTO `marin_warehouse`(`aid`, `aname`, `cid`, `cname`, `type`, `itemid`, `itemname`, `itemnum`, `stat`) VALUES (" + aid + ", 'NULL'," + cid + ", '" + cname + "', " + type + ", " + itemid + ", '" + util.getItemName(itemid) + "', " + num + ",1);";
                db.insert(sql);
            } else {
                var sid = ret[0].get("id");
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+" + num + " WHERE `id` = " + sid + ";";
                db.update(sql);
            }
            break;
    }
}

function calculateWinningProbability(numParticipants) {
    if (numParticipants <= 0) {
        return 0;
    }
    return (1 / numParticipants) * 100;
}

function marin_weight(prizes) {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    const randomNum = Math.random() * totalWeight;
    let accumulatedWeight = 0;
    for (prize of prizes) {
        accumulatedWeight += prize.weight;
        if (randomNum < accumulatedWeight) {
            return prize;
        }
    }
    return null;
}

function rank_comp(db) {
    ret = db.select("SELECT * FROM `marin_fortune` WHERE `stat` = '1' ORDER BY `id` DESC LIMIT 0,100;");
    let S = [];
    for (let i in ret) {
        let H = [];
        H['id'] = ret[i].get("id");
        H['will_num'] = ret[i].get("will_num");
        H['will_cid'] = ret[i].get("will_cid");
        H['will_name'] = ret[i].get("will_name");
        S.push(H);
    }
    return S;
}