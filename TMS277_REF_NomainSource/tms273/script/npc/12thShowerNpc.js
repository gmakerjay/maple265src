/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * mortal 腳本訂製 技術顧問 50009219
 */
let monster = [
    [1110100, '綠菇菇'],
    [1110101, '黑木妖'],
    [1110130, '挫折的綠菇菇'],
    [1120100, '三眼章魚'],
    [1130100, '斧木妖'],
    [1140100, '發芽木妖'],
    [1140130, '奸笑的發芽木妖'],
    [1150000, '巡邏機器人'],
    [1150001, '奇怪的里程碑'],
    [1150002, '大蛇王'],
    [1210100, '肥肥'],
    [1210101, '緞帶肥肥'],
    [1210102, '菇菇寶貝'],
    [1210103, '藍水靈'],
    [1210104, '藍色緞帶肥肥'],
    [1210111, '奇怪的肥肥'],
    [9309001, '綠水靈'],
    [9309002, '猴子'],
    [9309003, '火肥肥'],
    [9309004, '黑鱷魚'],
    [9309005, '鱷魚'],
    [9309008, '烏龜'],
    [9309012, '野狼'],
    [9309013, '白狼'],
    [9309014, '沙漠蛇'],
    [9309015, '蜥蜴'],
    [9309016, '狐蒙'],
    [9309017, '禿鷹'],
    [9309018, '沙漠地鼠'],
    [9309019, '沙漠毒蠍'],
    [9309020, '蟠猴'],
    [9309021, '功夫熊'],
    [9309022, '柔道貓熊'],
    [9309023, '橡木甲蟲'],
    [9309024, '金屬甲蟲'],
    [9309025, '哈維'],
    [9309026, '血腥哈維'],
    [9309027, '幼年龍'],
    [9309028, '幼龍保護者'],
    [9309032, '火獨眼獸'],
    [9309033, '魔龍'],
    [2600408, '大蛇王'],
    [2600409, '安全第一'],
    [2600410, '小岩石熊'],
    [2600411, '大岩石熊'],
    [2600412, '大石臉'],
    [2600413, '拉奇'],
    [2600414, '大蜘蛛'],
    [9309003, '火肥肥'],
    [9309004, '黑鱷魚'],
    [9309005, '鱷魚']
];
start();


function start() {

    let event = stage.getEvent();
    if (event == null) return;
    let stat = parseInt(event.getVariable("stat"));

    stage.dropMessage(0x15, "event : " + event.getVariable("subject_" + stat));
    stage.dropMessage(0x15, "event : " + event.getVariable("monster"));
    stage.dropMessage(0x15, "stat : " + event.getVariable("stat"));
    switch (map.getId()) {
        case 911006000://出題
            switch (stat) {
                case 3:
                    npc.meFlip().say("恭喜~完成第一層的默契問答~現在前往第二關\r\n");
                    memrs = party.getLocalMembers();
                    for (let i in memrs) {
                        memrs[i].changeMap(911001300, 0);
                    }
                    break;

                default:
                    txt = "#d-情侶副本\r\n\r\n";
                    txt += "#b考驗你們的默契時間到了!你出題 玩伴猜!\r\n";
                    if (event.getVariable("subject_" + stat) == null) {
                        txt += "準備好了嗎 ？ 要開始給你的玩伴出題了嗎？回答不出來很糟糕呢!\r\n";
                        txt += "\r\n";
                        txt += "#L0#準備好了!我要出題!\r\n";
                        let sel = npc.meFlip().askMenu(txt);
                        switch (sel) {
                            case 0:
                                if (event.getVariable("tier_" + stat) == null) {
                                    let mobs = randItems(monster);
                                    maps = event.getMap(911006500);
                                    maps.spawnMob(mobs[0][0], 64, -321);
                                    eff.type(6).r(1).g(1).b(1).duration(0).changeFiledObjectColor();
                                    event.setVariable("tier_" + stat, true);
                                    event.setVariable("subject_" + stat, true);
                                    event.setVariable("monster", mobs[0][1]);
                                    let memrs = party.getLocalMembers();
                                    for (let i in memrs) {
                                        if (memrs[i].getCharacterId() == stage.getCharacterId()) continue;
                                        memrs[i].runScript("expand/playmate");
                                    }
                                    npc.meFlip().say("已出題！請玩伴進行猜題並通過組隊模式告訴你正確答案~");
                                }
                                break;
                        }
                    } else {
                        txt += "你已經知道正確答案了嗎？那麼請告訴我你的答案吧\r\n";
                        txt += "\r\n ";
                        let name = npc.meFlip().minLen(2).maxLen(20).defText("").askText(txt);

                        if (name != event.getVariable("monster")) {
                            let correct = parseInt(event.getVariable("correct"));
                            if (correct <= 0) {
                                event.startTimer("kick", 5 * 1000);
                                npc.meFlip().say("真可惜！回答出錯！而且沒有機會了！你們沒有默契下次再來吧！");
                            }
                            correct -= 1;
                            event.setVariable("correct", String(correct));
                            npc.meFlip().say("真可惜！猜錯了!!!你還有 " + correct + " 次機會！");
                            return;
                        } else {
                            stat += 1;
                            event.setVariable("stat", String(stat));
                            event.getMap(911006500).killAllMob();
                            npc.meFlip().say("回答正確！請繼續出題！");
                        }
                    }
                    break;
            }
            break;

        case 911006500://猜題
            npc.meFlip().say("等待出題中...");
            break;
    }
}

function randItems(arr) {
    //新建一箇陣列,將傳入的陣列複制過來,用於運算,而不要直接操作傳入的陣列;
    var return_array = [];
    for (var index in arr) {
        return_array.push(arr[index]);
    }
    return_array.sort(function () {
        return 0.5 - Math.random();
    });
    return return_array;
}
