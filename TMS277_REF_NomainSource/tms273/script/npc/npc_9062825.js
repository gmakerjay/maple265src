// Created by MetaMS
// Event
// 剪刀石頭布

let event = ctx.getEvent("event_rps");
if (event != null) {
        switch (map.getId()) {
                case 993030000: //等待地圖
                        if (npc.askYesNo("#r#e[主題活動 - 剪刀石頭布]#k#n\r\n\r\n怎麼不想等到活動開始進行就要離開這裡了嗎？")) {
                                npc.next().say("#r#e[主題活動 - 剪刀石頭布]#k#n\r\n\r\n好的那我送你回到原來的地方。");
                                let rMap = stage.getIntQuestRecordEx(100641, "rMap");
                                if (rMap == 0) {
                                        rMap = 100000000;
                                }
                                stage.changeMap(rMap, 0);
                        }
                        break;
                case 993030200://活動進行地圖
                        npc.say("#r#e[主題活動 - 剪刀石頭布]#k#n\r\n\r\n贏了就向上！輸了就向下！可以獲得積分，積分可以兌換好多獎勵！！加油喲！");
                        break;
                case 993030100://活動結束地圖
                        // let sel = npc.askMenu("#r#e[主題活動 - 剪刀石頭布]#k#n\r\n\r\n你好，你想要做什麼呢？\r\n#b#L0#檢視我的積分#l\r\n#b#L1#我要離開這裡#l");
                        // switch (sel) {
                        //         case 0:
                                        let results = db.select(`SELECT g.point, g.c_id, c.name
                                                FROM zsf_game g left join character_stat c on g.c_id = c.id
                                                WHERE DATE(create_time) = CURDATE()
                                                ORDER BY point DESC;
                                        `);
                                        let str = `排名信息:\r\n`;
                                        let myRank = -1;
                                        for (let i in results) {
                                                str += `${Number(i)+1}: ${results[i].get('name')} ${results[i].get('point')}\r\n`
                                                if (results[i].get('c_id') == stage.getCharacterId()) {
                                                        myRank = (Number(i)+1)
                                                }
                                        }
                                        npc.next().say(str + `\r\n您的排名為: ${myRank}`)
                                        switch (myRank) {
                                                case 1:
                                                        stage.gainItem(4001715, 6)
                                                        break;
                                                case 2:
                                                        stage.gainItem(4001715, 4)
                                                        break;
                                                case 3:
                                                        stage.gainItem(4001715, 2)
                                                        break;
                                                default:
                                                        stage.gainItem(4001714, 30)
                                                        break;
                                        }
                                        let rMap = stage.getIntQuestRecordEx(100641, "rMap");
                                        if (rMap == 0) {
                                                rMap = 100000000;
                                        }
                                        stage.changeMap(rMap, 0);
                                        // let point = stage.getIntQuestRecordEx(100624, "point");
                                        // npc.next().say("#r#e[主題活動 - 剪刀石頭布]#k#n\r\n\r\n 你當前的積分為:" + point);
                                        // break;
                                // ?
                        // break;
        }
} else {
        npc.next().say("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n活動好像有點問題，並沒有開放哦。");
        stage.changeMap(100000000, 0);
}
