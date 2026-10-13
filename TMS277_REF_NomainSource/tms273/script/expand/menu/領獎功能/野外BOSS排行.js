function start() {
    let results = db.select(`select *
                             from zsf_rank_reward
                             where playerId = ${stage.getCharacterId()}
                               and type = '野外BOSS'
                               and \`check\` = 1`);

    let str = "\t\t#v3996147##e#d 星語谷野外BOSS中心 #v3996145#\r\n\r\n#n";
    if (results.length > 0) {
        str += `您有如下野外BOSS獎勵可以領取\r\n`;

        let dojangState = '';
        for (let i in results) {
            let rank = parseInt(results[i].get("rank"));
            str += `#L${i}#排名: 第${results[i].get("rank")}#l\n`;
        } 
        let sel = npc.askMenu(str);
        let selection = results[sel];
 
        const dateString = util.getStringDate(results[sel].get("time"), 'yyyy-MM-dd hh:mm:ss');
        let dateParts = dateString.split(' '); // 使用空格分隔字符串
        let datePart = dateParts[0].toString(); // 第一個部分就是日期
        dateParts = datePart.split('-'); 


        util.broadcastWorldChatMsg(6, `玩家<${stage.getCharacterName()}>領取了<${dateParts[1]}-${dateParts[2]}>期 野外BOSS狩獵第${selection.get("rank")}獎勵`);
        db.update(`update zsf_rank_reward
                           set \`check\` = 2,
                               getTime   = now()
                           where id = ${selection.get("id")}`);
        switch (Number(selection.get('rank'))) {
            case 1: 
                stage.gainItem(2635748, 100);
                stage.gainMesos(1000000000); 
                stage.modifyCurrency(2, 10000);
                npc.say("領取成功\r\n");
                break;
            case 2: 
            case 3:
            case 4:
            case 5: 

                stage.gainMesos(500000000); 
                stage.modifyCurrency(2, 5000); 
                stage.gainItem(2635748, 50);
                npc.say("領取成功\r\n");
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10: 
                stage.gainItem(2635748, 20);
                stage.modifyCurrency(2, 5000); 
                stage.gainItem(2635748, 50);
                npc.say("領取成功\r\n");
                break;
            default: 
                npc.say("領取成功\r\n");
                break;
        }

    } else {
        str += `您沒有可領取的獎勵。`;
        npc.say(str);
    }
}

start();