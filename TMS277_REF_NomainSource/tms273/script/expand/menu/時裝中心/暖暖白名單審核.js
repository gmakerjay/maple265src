/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


function start() {
    if (!stage.isGm()) {
        return;
    }
    let str = `暖暖白名單系統\r\n`;
    str += `#L0#審核#l\r\n`;
    str += `#L1#查看已通過#l\r\n`;
    str += `#L2#查看已拒絕#l\r\n`;
    let sel = npc.askMenu(str);
    switch (sel) {
        case 0:
            let results = db.select(`select *
                                     from zsf_暖暖申請表
                                     where status = ${sel}`);
            if (results.length > 0) {
                str = `暖暖白名單系統(待審批)\r\n`;
                for (let i in results) {
                    str += `#L${i}##v${results[i].get("item_id")}:i##z${results[i].get("item_id")}:i#  ${results[i].get("item_id")}\r\n`;
                }
                sel = npc.askMenu(str);
                let yn = npc.askYesNo(`是否通過審批\r\n#v${results[sel].get("item_id")}:i# ${results[sel].get("item_id")}`);
                switch (yn) {
                    case 1:
                        db.update(`update zsf_暖暖申請表
                                   set status      = 1,
                                       update_time = now()
                                   where id = ${results[sel].get("id")}`);
                        let toDrop = util.makeItem(results[sel].get("item_id"), 1);
                        util.broadcastGachaponMsg("[暖暖辦事處]" + ` 經審核滿足條件,加入無屬性可兌換列表, id <{}>`, toDrop);
                        npc.say("審批成功");
                        break;
                    case 0:
                        db.update(`update zsf_暖暖申請表
                                   set status      = 2,
                                       update_time = now()
                                   where id = ${results[sel].get("id")}`);
                        npc.say("拒絕成功");
                        break;
                }
            } else {
                npc.say("暫時沒有需要審批的");
            }
            break;
        case 1:
            let results1 = db.select(`select *
                                      from zsf_暖暖申請表
                                      where status = ${sel}`);
            str = `暖暖白名單系統(已通過)\r\n`;
            for (let i in results1) {
                str += `#v${results1[i].get("item_id")}:i##z${results1[i].get("item_id")}:i#  ${results1[i].get("item_id")}\r\n`;
            }
            npc.say(str);
            break;
        case 2:
            let results2 = db.select(`select *
                                      from zsf_暖暖申請表
                                      where status = ${sel}`);
            str = `暖暖白名單系統(已拒絕)\r\n`;
            for (let i in results2) {
                str += `#v${results2[i].get("item_id")}:i##z${results2[i].get("item_id")}:i#  ${results2[i].get("item_id")}\r\n`;
            }
            npc.say(str);
            break;

    }
    start();
}


start();