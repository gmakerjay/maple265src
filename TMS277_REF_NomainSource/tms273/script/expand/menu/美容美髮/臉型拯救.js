/*
 * 髮型拯救
 */
var list = Array();
var selStr = "這裏可以將您換臉型后出錯的角色拯救回來。\r\n注意:沒有出錯的角色別使用！\r\n請選擇您要拯救的角色:\r\n";

var sql = "SELECT cs.* FROM character_stat cs JOIN \`character\` c ON cs.id = c.id WHERE c.account_id = " + stage.getAccountId() + ";";
var push = db.select(sql);
var i = 0;
while (i < push.length) {
    selStr += "#L" + i + "# " + (i + 1) + " . " + push[i].get("name") + "#l  \r\n";
    list.push(push[i].get("name"));
    i++;
}

let selection = npc.askMenu(selStr);
//更改髮型
db.update("UPDATE `character_stat` SET `face`= 55661 WHERE `name` = '" + list[selection] + "';")
npc.say("拯救成功！");
