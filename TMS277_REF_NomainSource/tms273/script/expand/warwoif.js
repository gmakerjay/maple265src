/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let now = new Date();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
let currentSecond = now.getSeconds();

execute();

function execute() {
    let event = ctx.getEvent("marin_warwolf");
    if (event != null) {
        let players = event.getVariable("players");
        let judge = true;
        for (let i in players) {
            if (players[i].getCharacterId() == stage.getCharacterId()) {
                judge = false;
                break;
            }
        }
        let start = event.getVariable("start");
        if (start) {
            let stat = parseInt(event.getVariable("stat"));
            switch (stat) {
                case 1:
                    if (npc.meFlip().askYesNo("是否立即征戰世界本?") != 1) return;
                    players.push(stage);
                    stage.setEvent(event);
                    event.setVariable("cid_" + stage.getCharacterId() + "_damage", "0");
                    stage.setReviveCount(5);
                    stage.changeMap(993000520, 0);
                    break;
                case 2:
                    npc.meFlip().say("抱歉..正在戰鬥中!不能中途參與!");
                    break;
                default:
                    npc.meFlip().say("抱歉..目前還沒有開放團本!");
                    break;
            }
        } else {
            while (true) {
                now = new Date();
                currentHour = now.getHours();
                currentMinute = now.getMinutes();
                currentSecond = now.getSeconds();
                if (currentHour < 20) {
                    calculateCountdown(21, 0);
                } else {
                    calculateCountdown(21, 0);
                }
            }
        }
    }
}


function calculateCountdown(targetHour, targetMinute) {
    var targetTime;
    if (currentHour < targetHour || (currentHour === targetHour && currentMinute < targetMinute)) {
        targetTime = new Date(now);
        targetTime.setHours(targetHour, targetMinute, 0, 0);
    } else {
        var tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(targetHour, targetMinute, 0, 0);
        targetTime = tomorrow;
    }
    var timeDiff = targetTime - now;
    var timeDiffInSeconds = Math.floor(timeDiff / 1000);
    var hours = Math.floor(timeDiffInSeconds / 3600);
    var minutes = Math.floor((timeDiffInSeconds % 3600) / 60);
    var seconds = Math.floor(timeDiffInSeconds % 60);

    npc.meFlip().askMenu("\r\n\r\n#b#L0#距離 < 世界團本 > 開啟時間還有：#r" + hours + "小時 " + minutes + "分鐘 " + seconds + "秒#l");
}

