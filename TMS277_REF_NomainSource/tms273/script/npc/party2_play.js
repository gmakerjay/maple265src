// Created by MetaMS
// PQ:party2

let nowStage = 0;
switch (map.getId()) {
    case 922010100:
        nowStage = 1;
        break;
    case 922010400:
        nowStage = 2;
        break;
    case 922010600:
        nowStage = 3;
        break;
    case 922010700:
        nowStage = 4;
        break;
    case 922010800:
        nowStage = 5;
        break;
    case 922010900:
        nowStage = 6;
        break;
    case 922011000:
        nowStage = 7;
        break;
    case 922011100:
        nowStage = 8;
        break;

}
let event = stage.getEvent("pq_party2");
let log = require('check_log');

function clear(tStage, exp) {
    event.setVariable(tStage + "stageclear", true);
    let aRate = parseInt(tStage / 6 * 100);
    event.setAchieveRate(aRate);
    map.showScreenAutoLetterBox("quest/party/clear");
    map.playSoundEffect("Party1/Clear");
    map.showObjectEffect("gate");
    let members = event.getVariable("members");
    for (let i = 0; i < members.length; i++) {
        members[i].gainExp(exp);
    }
}

function failStage() {
    map.showScreenAutoLetterBox("quest/party/wrong_kor");
    map.playSoundEffect("Party1/Failed");
}

function rectangleStages(tStage) {
    let debug = false; //see which positions are occupied
    var stage8question = [
        "300+180+45+53 = ?",
        "90+42+15+11 = ?",
        "120+410+57-20 = ?",
        "342+256-144+35 = ?"
    ];
    let combos = [
        [0, 0, 0, 0, 1, 0, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 1]
    ];
    let objsets = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (stage.getCharacterId() == party.getLeaderId()) {
        let preamble = event.getVariable("leader5thpreamble");
        if (preamble == null || !preamble) {
            npc.next().say("歡迎來到五階段. 在這個階段你會看到一些箱子.我會出一個題目，你們需要算對答案，並找到正確答案所有對應數字的箱子，才能進入到下一階段#k. 你們需要有#b3個隊員來尋找正確的答案並站在上面.#k\r\n如果你站得離邊緣太近將得不到正確答案; 請靠近箱子中間. 當然只允許3名隊員在站上. 當他們已經站在上面, 隊長需要#b雙擊我來檢查是否是正確答案#k.好的，現在開始給題目並站上去，來尋找正確的箱子組合吧!");
            event.setVariable("leader5thpreamble", true);
            let sequenceNum = Math.floor(Math.random() * stage8question.length);
            event.setVariable("stage5combo", sequenceNum);
            map.blowWeather(5120018, stage8question[sequenceNum], 5);
        } else {
            // Check for stage completed
            let complete = event.getVariable(tStage + "stageclear");
            if (complete != null && complete) {
                npc.next().say("恭喜你完成當前階段，傳送口已經開啟,快點進入下一個階段吧!");
            } else { // Check for people on ropes and their positions
                let totplayers = 0;
                for (let j = 0; j < objsets.length; j++) {
                    let count = map.getNumEntityInArea(j);
                    if (count >= 1) {
                        objsets[j]++;
                        totplayers += count;
                    }
                }

                // Compare to correct positions
                // Don't even bother if there aren't three players.
                if (totplayers == 3 || debug) {
                    let combo = combos[event.getVariable("stage5combo")];
                    let testcombo = true;
                    for (let i = 0; i < objsets.length && testcombo; i++)
                        if (combo[i] != objsets[i])
                            testcombo = false;
                    if (debug) {
                        let str = "包含的物件:";
                        for (let i = 0; i < objsets.length; i++)
                            str += "\r\n" + (i + 1) + ". " + objsets[i];
                        str += "\r\n正確的組合: ";
                        for (let i = 0; i < combo.length; i++)
                            str += "\r\n" + (i + 1) + ". " + combo[i];
                        if (testcombo) {
                            str += "\r\n結果: #g通過#k";
                            npc.say(str);
                        } else {
                            str += "\r\n結果: #r錯誤#k";
                            str += "\r\n#b是否強制完成當前階段?#k";
                            debug = npc.askYesNo(str);
                        }
                    }
                    if (testcombo || debug) {
                        clear(tStage, Math.pow(2, tStage) * 50);
                    } else {
                        failStage();
                    }
                } else {
                    npc.next().say("3個隊友還沒有找到箱子嗎. 請快算出正確答案.只允許有3名隊友站在箱子上, 如果你站得離邊緣太近將得不到正確的答案, 所以請記住這一點。繼續加油!");
                }
            }
        }
    } else {
        let complete = event.getVariable(tStage + "stageclear");
        if (complete != null && complete) {
            npc.next().say("恭喜你完成當前階段，傳送口已經開啟,快點進入下一個階段吧!");
        } else {
            npc.next().say("請讓組隊長跟我交談.");
        }
    }
}

function getPrize() {
    let scrolls = [
        2040502, 1, 2040505, 1, // Overall DEX and DEF
        2040802, 1, // Gloves for DEX
        2040002, 1, 2040402, 1, 2040602, 1	// Helmet, Topwear and Bottomwear for DEF
    ];
    let potions = [
        2000001, 80, 2000002, 80, 2000003, 80, // Orange, White, Blue Potions
        2000006, 50, 2000004, 5, // Mana Elixir, Elixir
        2022000, 15, 2022003, 15				// Pure Water, Unagi
    ];
    let equips = [
        1032004, 1, 1032005, 1, 1032009, 1, // Level 20-25 Earrings
        1032006, 1, 1032007, 1, 1032010, 1, // Level 30 Earrings
        1032002, 1, // Level 35 Earring
        1002026, 1, 1002089, 1, 1002090, 1	// Bamboo Hats
    ];
    let etc = [
        4010000, 15, 4010001, 15, 4010002, 15, 4010003, 15, // Mineral Ores
        4010004, 8, 4010005, 8, 4010006, 8, // Mineral Ores
        4020000, 8, 4020001, 8, 4020002, 8, 4020003, 8, // Jewel Ores
        4020004, 8, 4020005, 8, 4020006, 8, // Jewel Ores
        4020007, 3, 4020008, 3, 4003000, 30					// Diamond and Black Crystal Ores and Screws
    ];

    let rewards;
    let itemSetSel = Math.random();
    if (itemSetSel < 0.3) //30% chance
        rewards = scrolls;
    else if (itemSetSel < 0.6) //30% chance
        rewards = equips;
    else if (itemSetSel < 0.9) //30% chance
        rewards = potions;
    else //10% chance
        rewards = etc;

    let index = Math.floor(Math.random() * (rewards.length / 2)) * 2;
    if (stage.gainItem(rewards[index], rewards[index + 1])) {
        stage.changeMap(922010000, 0);
    } else {
        npc.say("揹包空間不足，請清理揹包。");
    }
}

if (event != null) {
    switch (nowStage) {
        case 1:
            if (stage.getCharacterId() == party.getLeaderId()) {
                let preamble = event.getVariable("leader1stpreamble");
                if (preamble == null || !preamble) {
                    event.setVariable("leader1stpreamble", true);
                    npc.next().say("歡迎來到第一階段,看看周圍,是不是有很多#r老鼠#k請消滅它們並且帶來20張#b通行證給我#k,如果你成功拿到了1張通行證，請交給你們的組長，然後再轉交給我。");
                } else {
                    let complete = event.getVariable(nowStage + "stageclear");
                    if (complete != null && complete) {
                        npc.next().say("你們已經成功完成了第一階段,趕快向第二階段前進吧。");
                    } else {
                        // Check how many passes they have compared to number of party members
                        if (!stage.hasItem(4001022, 20)) {
                            npc.next().say("消滅了所有的老鼠並且帶來#b20#k張通行證才可以進入第二階段。請檢查一下你的揹包~");
                        } else {
                            clear(nowStage, 100);
                            stage.loseItem(4001022, 20);
                            npc.next().say("你們成功收集了#b20#k通行證。 已經成功完成了第一階段。好了，我將開啟通往下一個關卡的結界，時間不多了，你們趕快到那裡進行第二階段的挑戰吧。");
                        }
                    }
                }
            } else {
                let pVar = "member1stpreamble" + stage.getCharacterId();
                let preamble = event.getVariable(pVar);
                if (preamble == null || !preamble) {
                    npc.next().say("歡迎來到第二階段，看看周圍,是不是有很多#r老鼠#k請消滅它們並且獲取通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
                    event.setVariable(pVar, true);
                } else {
                    let complete = event.getVariable(nowStage + "stageclear");
                    if (complete != null && complete) {
                        npc.next().say("傳送口已經開啟,快點進入下一個階段吧...");
                    } else {
                        npc.next().say("快點消滅所有的怪物並收集通行證，然後交給組隊長！");
                    }
                }
            }
            break;
        case 2:
            if (stage.getCharacterId() == party.getLeaderId()) {
                let preamble = event.getVariable("leader2ndpreamble");
                if (preamble == null || !preamble) {
                    event.setVariable("leader2ndpreamble", true);
                    npc.next().say("歡迎來到第2階段，讓你的隊員在次元洞內殺死所有的怪物並且收集14張通行證在來與我談話。");
                } else {
                    let complete = event.getVariable(nowStage + "stageclear");
                    if (complete != null && complete) {
                        npc.next().say("恭喜你們完成第二階段。時間已經不多了,趕快進入下一階段吧。");
                    } else {
                        // Check how many passes they have compared to number of party members
                        if (!stage.hasItem(4001022, 14)) {
                            npc.next().say("次元洞內的怪物沒有清理完畢，趕快抓緊時間。");
                        } else {
                            clear(nowStage, 100);
                            stage.loseItem(4001022, 14);
                            npc.next().say("你們成功收集了#b14#k通行證。 已經成功完成了第二階段。好了，我將開啟通往下一個關卡的結界，時間不多了，你們趕快到那裡進行第三階段的挑戰吧。");
                        }
                    }
                }
            } else {
                let pVar = "member2ndpreamble" + stage.getCharacterId();
                let preamble = event.getVariable(pVar);
                if (preamble == null || !preamble) {
                    npc.next().say("歡迎來到第二階段，在次元洞內殺死黑暗中的怪物並且收集14張通行證，獲取通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
                    event.setVariable(pVar, true);
                } else {
                    let complete = event.getVariable(nowStage + "stageclear");
                    if (complete != null && complete) {
                        npc.next().say("傳送口已經開啟,快點進入下一個階段吧...");
                    } else {
                        npc.next().say("快點消滅所有的怪物並收集通行證，然後交給組隊長！");
                    }
                }
            }
            break;
        case 3:
            npc.next().say("你好！歡迎來到第三階段！ 看看這裡， 你會看到很多數字盒子， 如果你想通過這裡到達下一個階段，你必須找到正確的數字盒子。 但是，如果你選擇了錯誤的箱子，你將從原地重新開始！ 祝你好運。");
            break;
        case 4:
            if (stage.getCharacterId() == party.getLeaderId()) {
                let preamble = event.getVariable("leader4thpreamble");
                if (preamble == null || !preamble) {
                    event.setVariable("leader4thpreamble", true);
                    npc.next().say("歡迎來到第四階段,請和你的隊友消滅地圖上所有的怪物並且收集4張通行證在來和我說話吧。獲取通行證，然後交給我，就可以順利通關了，那麼祝你一切順利！");
                } else {
                    let complete = event.getVariable(nowStage + "stageclear");
                    if (complete != null && complete) {
                        npc.next().say("現在可以到下一個關卡了，如果不快點的話，門可能就關閉了。");
                    } else {
                        if (stage.hasItem(4001022, 4)) {
                            clear(nowStage, 100);
                            stage.loseItem(4001022, 4);
                            npc.next().say("你們成功收集了4張通行證。 已經成功完成了第四階段。好了，我將開啟通往下一個關卡的結界，時間不多了，你們趕快到那裡進行第五階段的挑戰吧。");
                        } else {
                            npc.next().say("快點消滅所有的怪物並收集通行證！");
                        }
                    }
                }
            } else {
                let pVar = "member4thpreamble" + stage.getCharacterId();
                let preamble = event.getVariable(pVar);
                if (preamble == null || !preamble) {
                    npc.next().say("歡迎來到第四階段,請和你的隊友消滅地圖上所有的怪物並且收集4張通行證，獲取通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
                    event.setVariable(pVar, true);
                } else {
                    let complete = event.getVariable(nowStage + "stageclear");
                    if (complete != null && complete) {
                        npc.next().say("傳送口已經開啟,快點進入下一個階段吧...");
                    } else {
                        npc.next().say("快點消滅所有的怪物並收集通行證，然後交給組隊長！");
                    }
                }
            }
            break;
        case 5:
            rectangleStages(nowStage);
            break;
        case 6:
            let complete = event.getVariable(nowStage + "stageclear");
            let boss = event.getVariable("bossclear");
            if (complete == null || !complete) {
                if (stage.getCharacterId() == party.getLeaderId()) {
                    if (boss != null && boss && stage.hasItem(4001023, 1)) {
                        stage.loseItem(4001023, 1);
                        clear(nowStage, 1500);
                        npc.next().say("恭喜你打敗了#b阿麗莎樂#k.再次跟我對話可以進入獎勵階段。");
                    } else {
                        npc.next().say("這裡是最後一個階段; 消滅#b阿麗莎樂#k獲得#b次元的鑰匙#k,就能通過考驗,祝你好運!");
                    }
                } else {
                    npc.next().say("請擊敗#b阿麗莎樂#k,並把#b次元的鑰匙#k交給組隊長讓他帶給我!");
                }
            } else {
                if (stage.getCharacterId() == party.getLeaderId()) {
                    npc.next().say("恭喜你們已經完成了所有階段的任務。我會給你們獎勵,你們準備好接受獎勵了嗎？");
                    let members = party.getLocalMembers();
                    // for (let i in members) {
                    //     log.addEventValue(members[i], db, "party2");
                    //     log.addEventValue(members[i], db, "通關玩具組隊");
                    //     if (members[i].getLevel() < 290) {
                    //         members[i].gainExp(ctx.getExpForLevelUp() * 0.2);
                    //     }
                    //     members[i].gainItem(4310224, 1);
                    //     members[i].gainItem(4001714, 5);
                        
                    // }
                    // map.transferTo(100030301, 0);
                    for (let i in members) {
                        members[i].runScript("expand/menu/組隊副本獎勵/玩具")
                    }
                    event.stopTimer("kick");
                    event.startTimer("clear", 60 * 1000);
                } else {
                    npc.say("請讓隊長與我對話！");
                }
            }
            break;
    }
} else if (map.getId() == 922011100) {
    getPrize();
}
