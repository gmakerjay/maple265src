/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let txt = "\r\n";
let event = ctx.getEvent("server_monster");
let game = event.getVariable('game');
let ranking = [];
let myRank = -1;
let myCharacterId = stage.getCharacterId();


function formatDamage(num) {
    return (num / 100000000).toFixed(3);
}


for (let cid in game.combination) {
    if (game.combination.hasOwnProperty(cid)) {
        let info = game.combination[cid];
        ranking.push({
            cid: parseInt(cid),
            name: info.name,
            damage: info.damage
        });
    }
}


ranking.sort(function (a, b) {
    return b.damage - a.damage;
});


for (let i = 0; i < ranking.length; i++) {
    let player = ranking[i];
    txt += `#brank ${i + 1}：cname ${player.name}，damage ${formatDamage(player.damage)} 億#k\r\n`;
    if (player.cid === myCharacterId) {
        myRank = i + 1;
    }
}


let rewards = [
    [2432206, 5],
    [4001714, 50],
    [2472000, 5],
    [2636884, 2],
    [4009548, 30],
    [4009548, 1]
];


if (myRank > 0) {
    txt += `\r\n#e#r你目前排名第 ${myRank} 名！#k#n\r\n\r\n`;

    if (myRank === 1) {
        rewards.push([5060025, 5], [5060048, 5], [5060086, 5], [5060087, 5]);
    } else if (myRank === 2) {
        rewards.push([5060025, 3], [5060048, 3], [5060086, 3]);
    } else if (myRank === 3) {
        rewards.push([5060025, 3], [5060048, 3]);
    }

    for (let i = 0; i < rewards.length; i++) {
        let [itemId, count] = rewards[i];
        txt += `#i${itemId}#*${count} `;
        stage.gainItem(itemId, count);
    }
    txt += "\r\n";
} else {
    txt += `\r\n#e#r你未參與此次傷害統計。#k#n`;
}

npc.say(txt);
