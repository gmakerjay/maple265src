let stat = parseInt((map.getId() - 910340000) / 100);
let event = stage.getEvent();
let log = require('check_log');

function clear(stat, exp) {
    event.setVariable(stat + "stageclear", true);
    map.showScreenAutoLetterBox("quest/party/clear");
    map.playSoundEffect("Party1/Clear");
    map.showObjectEffect("gate");
    let members = event.getVariable("members");
    for (let i = 0; i < members.length; i++)
        if (members[i].getHp() > 0)
            members[i].gainExp(exp);
}

function failStage() {
    map.showScreenAutoLetterBox("quest/party/wrong_kor");
    map.playSoundEffect("Party1/Failed");
}


function rectangleStages(stat) {
    let debug = false; //see which positions are occupied
    let stages = ["第二", "第三", "第4"];
    let objs = ["繩子", "平臺", "木桶"];
    let verbs = ["爬", "站", "站"];
    let donts = ["處于繩子的位置太低", "站得離邊緣太近", "站得離邊緣太近"];
    let combos = [
        [//stage 2
            [0, 1, 1, 1],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [1, 1, 1, 0]
        ],
        [//stage 3
            [0, 0, 1, 1, 1],
            [0, 1, 0, 1, 1],
            [0, 1, 1, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 0],
            [1, 1, 0, 0, 1],
            [1, 1, 0, 1, 0],
            [1, 1, 1, 0, 0]
        ]
    ];
    let objsets = [
        [0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    let index = stat - 2;

    if (stage.getCharacterId() == party.getLeaderId()) {
        let preamble = event.getVariable("leader" + stages[index] + "preamble");
        if (preamble == null || !preamble) {
            npc.next().say("歡迎來到" + stages[index] + "階段. 在這個階段你會看到一些" + objs[index] + ".你們需要找到正確的" + objs[index] + "組合，才能進入到下一階段#k. 你們需要有#b3個隊員來尋找正確的" + objs[index] + "并" + verbs[index] + "在上面.#k\r\n如果你" + donts[index] + "將得不到正確答案; 請靠近" + objs[index] + "中間. 當然只允許3名隊員在" + objs[index] + "上. 當他們已經" + verbs[index] + "在上面, 隊長需要#b雙擊我來檢查是否是正確答案#k.好的，現在開始" + verbs[index] + "上去，來尋找正確的" + objs[index] + "組合吧!");
            event.setVariable("leader" + stages[index] + "preamble", true);
            let sequenceNum = Math.floor(Math.random() * combos[index].length);
            event.setVariable("stage" + stages[index] + "combo", sequenceNum);
        } else {
            // Check for stage completed
            let complete = event.getVariable(stat + "stageclear");
            if (complete != null && complete) {
                npc.next().say("恭喜你完成當前階段，傳送口已經打開,快點進入下一個階段吧!");
            } else { // Check for people on ropes and their positions
                let totstages = 0;
                for (let j = 0; j < objsets[index].length; j++) {
                    let count = map.getNumPlayersInArea(j);
                    if (count >= 1) {
                        objsets[index][j]++;
                        totstages += count;
                    }
                }
                // Compare to correct positions
                // Don't even bother if there aren't three stages.
                if (totstages == 3 || debug) {
                    let combo = combos[index][event.getVariable("stage" + stages[index] + "combo")];
                    let testcombo = true;
                    for (let i = 0; i < objsets[index].length && testcombo; i++)
                        if (combo[i] != objsets[index][i])
                            testcombo = false;
                    if (debug) {
                        let str = "包含的對象:";
                        for (let i = 0; i < objsets[index].length; i++)
                            str += "\r\n" + (i + 1) + ". " + objsets[index][i];
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
                        clear(stat, Math.pow(2, stat) * 50);
                    } else {
                        failStage();
                    }
                } else {
                    npc.next().say("3個隊友還沒有找到" + objs[index] + "嗎. 請考慮所有不同的組合.只允許有3名隊友" + verbs[index] + "在" + objs[index] + ", 如果你" + donts[index] + "將得不到正確的答案, 所以請記住這一點。繼續加油!");
                }
            }
        }
    } else {
        let complete = event.getVariable(stat + "stageclear");
        if (complete != null && complete)
            npc.next().say("恭喜你完成當前階段，傳送口已經打開,快點進入下一個階段吧!");
        else
            npc.next().say("請讓組隊長跟我交談.");
    }
}

switch (stat) {
    case 1:
        let questions = [
            "第一個問題：請收集60張 #v4001007# ？#b\r\n（打倒怪物，獲取相應數量的證書。）",
            "第一個問題：請收集70張 #v4001007# ？#b\r\n（打倒怪物，獲取相應數量的證書。）",
            "第一個問題：請收集80張 #v4001007# ？#b\r\n（打倒怪物，獲取相應數量的證書。）",
            "第一個問題：請收集90張 #v4001007# ？#b\r\n（打倒怪物，獲取相應數量的證書。）",
            "第一個問題：請收集100張 #v4001007# ？#b\r\n（打倒怪物，獲取相應數量的證書。）",
            "第一個問題：請收集100張 #v4001007# ？#b\r\n（打倒怪物，獲取相應數量的證書。）",
        ];
        let answers = [60, 70, 80, 90, 100, 100];
        if (stage.getCharacterId() == party.getLeaderId()) {
            let preamble = event.getVariable("leader1stpreamble");
            if (preamble == null || !preamble) {
                event.setVariable("leader1stpreamble", true);
                npc.next().say("你好，歡迎來到第一個階段，在這裡你可能會看到很多兇狠的鱷魚，跟我對話，我會給你們每一個人出一道題目，你們再打倒兇狠的鱷魚獲取#r相應數目#k的證書卡交給我，就行了。之後我會給你們一張通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
            } else {
                let complete = event.getVariable(stat + "stageclear");
                if (complete != null && complete) {
                    npc.next().say("現在可以到下一個關卡了，如果不快點的話，門可能就關閉了。");
                } else {
                    // Check how many passes they have compared to number of party members
                    let numPasses = event.getVariable("members").length - 1;
                    if (!stage.hasItem(4001008, numPasses)) {
                        npc.next().say("你們還需要" + numPasses + "通行證才可以過關。");
                    } else {
                        clear(stat, 100);
                        stage.loseItem(4001008, numPasses);
                        npc.next().say("你們成功收集了 " + numPasses + "通行證。 已經成功完成了第一階段。好了，我將開啟通往下一個關卡的結界，時間不多了，你們趕快到那裡進行第二階段的挑戰吧。");
                    }
                }
            }
        } else {
            let pVar = "member1stpreamble" + stage.getCharacterId();
            let qIndexVar = "member1st" + stage.getCharacterId();
            let preamble = event.getVariable(pVar);
            if (preamble == null || !preamble) {
                let qIndex = event.getVariable(qIndexVar);
                if (qIndex == null) {
                    // Select a random question to ask the stage.
                    qIndex = Math.floor(Math.random() * questions.length);
                    event.setVariable(qIndexVar, qIndex);
                }
                npc.next().say("你好，歡迎來到第一個階段，在這裡你可能會看到很多兇狠的鱷魚，跟我對話，我會給你們每一個人出一道題目，你們再打倒兇狠的鱷魚獲取相應數目的證書卡交給我，就行了。之後我會給你們一張通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
                npc.next().say("你需要回答的問題是:" + questions[qIndex]);
                event.setVariable(pVar, true);
            } else {
                let complete = event.getVariable(stat + "stageclear");
                if (complete != null && complete) {
                    npc.next().say("傳送口已經打開,快點進入下一個階段吧...");
                } else {
                    let dVar = "member1stdone" + stage.getCharacterId();
                    complete = event.getVariable(dVar);
                    // don't let one stage get more than one pass for his question
                    if (complete == null || !complete) {
                        // Reply to stage correct/incorrect response to the question they have been asked
                        let numcoupons = answers[event.getVariable(qIndexVar)];
                        if (!stage.hasItem(4001007, numcoupons + 1) && stage.hasItem(4001007, numcoupons)) {
                            stage.loseItem(4001007, numcoupons);
                            //there should already be at least one empty slot in the ETC inventory by now
                            stage.gainItem(4001008, 1);
                            npc.next().say("回答正確,請收好通行證,并把它交給隊長!");
                            event.setVariable(dVar, true);
                        } else {
                            npc.next().say("你給我的通行證和問題的答案不符合,請在想想。 你需要回答的問題是 : #b" + questions[event.getVariable(qIndexVar)] + "#k");
                        }
                    } else {
                        npc.next().say("恭喜你回答正確了答案，請把你的通行證交給隊長吧.");
                    }
                }
            }
        }
        break;
    case 2:
    case 3:
        rectangleStages(stat);
        break;
    case 4:
        if (stage.getCharacterId() == party.getLeaderId()) {
            let preamble = event.getVariable("leader1stpreamble");
            if (preamble == null || !preamble) {
                event.setVariable("leader1stpreamble", true);
                npc.next().say("你好，歡迎來到第四個階段，在這裡你可能會看到很多兇狠的火獨眼獸，消滅所有火獨眼獸，獲取通行證，然後交給我，就可以順利通關了，那麼祝你一切順利！");
            } else {
                let complete = event.getVariable(stat + "stageclear");
                if (complete != null && complete) {
                    npc.next().say("現在可以到下一個關卡了，如果不快點的話，門可能就關閉了。");
                } else {
                    if (stage.hasItem(4001008, 19)) {
                        clear(stat, 100);
                        stage.loseItem(4001008, 19);
                        npc.next().say("你們成功收集了19張通行證。 已經成功完成了第四階段。好了，我將開啟通往下一個關卡的結界，時間不多了，你們趕快到那裡進行第五階段的挑戰吧。");
                    } else {
                        npc.next().say("快點消滅所有的怪物并收集通行證！");
                    }
                }
            }
        } else {
            let pVar = "member1stpreamble" + stage.getCharacterId();
            let preamble = event.getVariable(pVar);
            if (preamble == null || !preamble) {
                npc.next().say("你好，歡迎來到第四個階段，在這裡你可能會看到很多兇狠的火獨眼獸，消滅所有火獨眼獸，獲取通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
                event.setVariable(pVar, true);
            } else {
                let complete = event.getVariable(stat + "stageclear");
                if (complete != null && complete) {
                    npc.next().say("傳送口已經打開,快點進入下一個階段吧...");
                } else {
                    npc.next().say("快點消滅所有的怪物并收集通行證，然後交給組隊長！");
                }
            }
        }
        break;
    case 5:
        let complete = event.getVariable(stat + "stageclear");
        if (complete == null || !complete) {
            if (stage.getCharacterId() == party.getLeaderId()) {
                if (stage.hasItem(4001008, 1)) {
                    stage.loseItem(4001008, 1);
                    clear(stat, 1500);
                    npc.next().say("恭喜,你們成功的通過第5階段。再次跟我對話可以領取獎勵。");
                } else {
                    npc.next().say("歡迎來到第5階段,你們需要收集一張#v4001008#才可以通關。");
                }
            } else {
                npc.next().say("歡迎來到第5階段,你們需要收集一張#v4001008#才可以通關。");
            }
        } else {
            if (stage.getCharacterId() == party.getLeaderId()) {
                npc.next().say("恭喜你們已經完成了所有階段的任務。我會給你們獎勵,你們準備好接受獎勵了嗎？");
                let members = party.getLocalMembers();
                // for (let i in members) {
                //     log.addEventValue(members[i], db, "party1");
                //     if (members[i].getLevel() < 290) {
                //         members[i].gainExp(ctx.getExpForLevelUp() * 0.2);
                //     }
                //     members[i].gainItem(4310224, 1);
                //     members[i].gainItem(4001714, 5);
                // }

                // map.transferTo(100030301, 0);
                for (let i in members) {
                    members[i].runScript("expand/menu/組隊副本獎勵/廢棄")
                }
                event.stopTimer("kick");
                event.startTimer("clear", 60 * 1000);
            } else {
                npc.say("請讓隊長與我對話！");
            }
        }
        break;
}