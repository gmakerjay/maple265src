function start() { 
    let results = db.select(`select * from zsf_rank_reward where playerId = ${stage.getCharacterId()} and type = 'dojang'  and  \`check\` = 1`);
    let str = `您有如下道場獎勵可以領取\r\n`;
    if (results.length > 0) {
        
        let dojangState = '';
        for (let i in results) {
            let rank = parseInt(results[i].get("rank"));
            if (rank > 1000) {
                str += `#L${i}#參與獎: ${rank % 1000}層#l\n`;
            } else if (rank > 100) {
                str += `#L${i}#排名: 本職第${rank % 10}#l\n`;
            } else {
                str += `#L${i}#排名: 全職第${results[i].get("rank")}#l\n`;
            }
        }
        let sel = npc.askMenu(str);
        let selection = results[sel];
        const dateString = util.getStringDate(results[sel].get("time"), 'yyyy-MM-dd hh:mm:ss');
        let dateParts = dateString.split(' '); // 使用空格分隔字符串
        let datePart = dateParts[0].toString(); // 第一個部分就是日期
        dateParts = datePart.split('-');
        stage.showSystemMessage(dateParts)

        // npc.say(`玩家<${stage.getCharacterName()}>領取了<${dateParts[0]}-${dateParts[1]}-${dateParts[2]}>期 道場全職業第1的獎勵`);
        // return;
        switch (parseInt(selection.get("rank"))) {
            case 1:
                db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);

                stage.gainItem(2430049, 60);
                stage.gainItem(2048761, 5);

                util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場全職業第1的獎勵`);
                npc.say("領取成功\r\n" + "#v2430049# x 60 \r\n #v2048761# x 5");
                break;
            case 2:
            case 3:
                db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);
                stage.gainItem(2430049, 40);
                stage.gainItem(2048761, 3);
                util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場全職業第2-3的獎勵`);
                npc.say("領取成功\r\n" + "#v2430049# x 40 \r\n #v2048761# x 3");
                break;
            case 4:
            case 5:
            case 6:
                db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);
                stage.gainItem(2430049, 25);
                stage.gainItem(2048761, 3);
                util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場全職業第4-6的獎勵`);
                npc.say("領取成功\r\n" + "#v2430049# x 25 \r\n #v2048761# x 3");
                break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);
                stage.gainItem(2430049, 20);
                stage.gainItem(2048761, 2);
                util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場全職業第7-15的獎勵`);
                npc.say("領取成功\r\n" + "#v2430049# x 20 \r\n #v2048761# x 2");
                break;
            case 101:
                db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);
                stage.gainItem(2048761, 3);
                util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場本職業第1(80層以下)的獎勵`);
                npc.say("領取成功\r\n" + "#v2048761# x 3");
                break;
            case 111:
                db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);
                stage.gainItem(2430049, 10);
                stage.gainItem(2048761, 6);
                util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場本職業第1的獎勵`);
                npc.say("領取成功\r\n" + "#v2430049# x 10 \r\n #v2048761# x 6");
                break;
            default:
                let r = parseInt(selection.get("rank"));
                if (r > 1000) {
                    r = r % 1000;
                    db.update(`update zsf_rank_reward set \`check\` = 2, getTime = now() where id = ${selection.get('id')}`);
                    stage.gainItem(2048743, r);
                    util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 道場參與獎`);
                    npc.say("領取成功\r\n" + "#v2048743# x " + r);
                }
                break;
        }
 
    } else {
        npc.say("您沒有可領取的獎勵。");
    }
    // npc.say(results);
}

start();