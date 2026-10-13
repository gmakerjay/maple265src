// stage.showSystemMessage('1')
let e = stage.getEvent();
let info = e.getVariable(`info-${stage.getCharacterId()}`)
db.insert(`INSERT INTO zz_boss_event (player_name, accounts_id, player_id, finalTime, bossName, time, mode, memo, percent, status) VALUES ('${info[1]}', '${stage.getAccountId()}', '${info[0]}', ${1}, '${stage.getEvent().getVariable('bossName')}', now(), ${1}, '', ${1}, '1');`);