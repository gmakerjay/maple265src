/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/*
 * 髮型拯救
 */

var list = Array();
var selStr = "這裡可以將您換髮型後出錯的角色拯救回來。\r\n注意:沒有出錯的角色別使用！\r\n請選擇您要拯救的角色:\r\n";

let sql = `select c.id as character_id, s.\`name\` as character_name
           from \`character\` c
                    left join character_stat s on c.id = s.id
           where c.account_id = ${stage.getAccountId()}`;
// var sql = " SELECT name FROM characters WHERE accountid = '" + player.getAccountId() + "'";
var push = db.select(sql);
var i = 0;
while (i < push.length) {
    selStr += "#L" + i + "# " + i + " . " + push[i].get("character_name") + "#l  \r\n";
    list.push(push[i].get("character_name"));
    i++;
}

let selection = npc.askMenu(selStr);
//更改髮型
db.update(`update character_dress_up
           set hair = 0
           where character_id = ${push[selection].get('character_id')}`);
npc.say("拯救成功！");
