/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
const payUtils = require('constant/PayUtils.js');
execute();

function execute() {
    let txt = "#fn微軟正黑體##fs12##e\r\n";
    txt += "親愛的　 #r" + stage.getCharacterName() + "#k 歡迎來到楓之谷\r\n";
    txt += "識別碼　 #r" + stage.getAccountId() + "-" + stage.getCharacterId() + "#k 遇到問題找管理需提供此編號\r\n";
    txt += "楓之幣　 #r" + formatNumberToMoney(payUtils.getPay(1, db, stage)) + "#k\r\n";
    txt += "樂　豆　 #r" + formatNumberToMoney(stage.getCurrency(1)) + "#k\r\n";
    txt += "楓　點　 #r" + formatNumberToMoney(stage.getCurrency(2)) + "#k\r\n";
    txt += "楓　幣　 #r" + formatNumberToMoney(stage.getMesos()) + "#k\r\n";
    txt += "累　計　 #r" + formatNumberToMoney(payUtils.getPay(3, db, stage)) + "#k\r\n";
    let minutes = stage.getOnlineTime();
    txt += "遊戲時間 #r" + (Math.floor(minutes / 60)) + " 小時 " + minutes % 60 + " 分鐘#k\r\n";
    txt += "角色年齡 #r" + create_date() + " 天#k\r\n";
    npc.meFlip().say(txt);
}

function formatNumberToMoney(n) {
    if (isNaN(n)) return '0';
    const isNegative = n < 0;
    const numStr = Math.abs(n).toString();
    const formatted = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return isNegative ? '-' + formatted : formatted;
}

function create_date() {
    let ret = db.select('SELECT * FROM `character_stat` WHERE `id` = ' + stage.getCharacterId() + ' LIMIT 0,1');
    let timestamp = ret[0].get('create_date');
    let now = Date.now();
    let diffMs = now - timestamp;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

