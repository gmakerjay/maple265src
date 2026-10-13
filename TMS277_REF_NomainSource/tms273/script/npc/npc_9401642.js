// Created by MetaMS
// [恢復的氣息]  |  [9401642]
// MapName:入口

let maps = [870001200, 870001210];

if (stage.getIntQuestRecordEx(66703, "7") > 0) {
        maps.push(870001220);
}
if (stage.getIntQuestRecordEx(66703, "7") > 1) {
        maps.push(870001221);
}
if (stage.getIntQuestRecordEx(66703, "7") > 2) {
        maps.push(870001222);
}
if (stage.getIntQuestRecordEx(66703, "11") > 0) {
        maps.push(870001230);
}
if (stage.getIntQuestRecordEx(66703, "11") > 1) {
        maps.push(870001231);
}
if (stage.getIntQuestRecordEx(66703, "32") > 0) {
        maps.push(870001232);
}

let str = "神秘的氣息猶如引路般搖曳，跟著走似乎可以前往秘密據點的深處。\r\n\r\n";

for (let index in maps) {
        let mapId = maps[index]
        str += "#b#L" + index + "##m" + mapId + "##k\r\n";
}

let selection = npc.uiMax().me().askMenu(str);

let selMapId = maps[selection];
let key = selMapId - 870001200;
stage.enterGuildCastleRoom("Weekly_" + key, 0);
