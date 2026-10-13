// Created by MetaMS
// Event
// [AWAKE] 剪刀石頭布
let point = stage.getIntQuestRecordEx(100624, "point");
db.insert(`insert into zsf_game(game, c_id, point) values('rps', ${stage.getCharacterId()}, ${point})`);
stage.showSystemMessage('您本次猜拳積分為: ' + point)