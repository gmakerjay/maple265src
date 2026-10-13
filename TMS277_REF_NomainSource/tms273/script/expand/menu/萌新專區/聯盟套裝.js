/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const {getPay} = require('vipCommon');

const list = [
    1152090, // 月秒肩
    1022067, // 黑狐猴
    1012056, // 狗狗鼻
    1132039, // 不速腰帶
    1122084, // 不速項鍊
    1032083, // 不速耳環
    1112400, // 鍊金戒指
    1112400, // 鍊金戒指
    1112400, // 鍊金戒指
    1112400, // 鍊金戒指
    1112400, // 鍊金戒指
    1112400, // 鍊金戒指
];

const product = [
    ["套餐A(白板)      ", 18],
    ["套餐B(17星SS潛能)", 188],
];
let log = require('check_log');

function start() {
    let str = `             #e聯盟套裝#k\r\n\r\n`;
    str += `#b#L0#${product[0][0]} ${product[0][1]}星語幣#l\r\n`;
    str += `#b#L1#${product[1][0]} ${product[1][1]}星語幣#l\r\n`;
    let sel = 1;
    if (npc.askYesNo(`是否要免費租借聯盟套裝`) == 1) {
        if (log.getPQLog(stage, db, "聯盟套裝") > 0) {
            npc.say("租過了哦");
            return;
        } else if (stage.getFreeSlot(1) > 12) {
            log.addPQLog(stage, db, "聯盟套裝");
            for (let i in list) {
                let newItem = util.makeItem(list[i], 1);
                if (sel == 1) {
                    newItem.setChuc(17);
                    newItem.setPad(50);
                    newItem.setMad(50);
                    newItem.setOption1(60067);
                    newItem.setOption2(60067);
                    newItem.setOption3(60067);
                    newItem.setExpireDate(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
                    newItem.setGrade(20);
                    newItem.setAttribute(8)
                }
                stage.gainItem(newItem);
            }
            npc.say("領取成功,一路暢通");
        } else {
            npc.say("請清理揹包");
        }
    }
}

start();