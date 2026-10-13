/* 50009219 腳本訂製 技術顧問 */

let bute = [
    [0, 500000],
    [1, 0],
    [2, 0],
    [3, 2022154, 100, null],
    [3, 2432022, 1, null],
    [3, 1703173, 1, null],
    [3, 1005431, 1, null],
    [3, 1053472, 1, null],
    [3, 1022048, 1, null],
    [3, 1012635, 1, null],
    [3, 1032024, 1, null],
    [3, 1082102, 1, null],
    [3, 1102039, 1, null],
    [3, 1072153, 1, null],
    [3, 3018621, 1, null],
    [3, 2500001, 1, null],
    [3, 2501000, 1, null],
    [3, 2450054, 4, 3],
    [3, 2000005, 9999, null],
    [3, 5044005, 1, 30 * 24],
    [3, 5510000, 100, null],
    [3, 5133000, 100, null],
    [3, 5190011, 3, null],
    [3, 5190001, 3, null],
    [3, 5190006, 3, null],
    [3, 5190000, 3, null],
    [3, 2120000, 9999, null],
    [4, 5002199, 1, 30, null],
    [4, 5002197, 1, 30, null],
    [4, 5002198, 1, 30, null],
    [3, 1142358, 1, 30, 100, 100, 100, 100, 100, 100, 9999, 9999]
]

marinStart();

function marinStart() {
    util.broadcastWorldChatMsg(52, "歡迎 " + stage.getCharacterName() + " 來到測試谷,我是黑魔法師,是兄弟就來砍我!")
    util.broadcastWorldChatMsg(52, "歡迎 " + stage.getCharacterName() + " 來到測試谷,我是黑魔法師,是兄弟就來砍我!")
    util.broadcastWorldChatMsg(52, "歡迎 " + stage.getCharacterName() + " 來到測試谷,我是黑魔法師,是兄弟就來砍我!")
    dir.setInGameCurNodeEventEnd(true);
    //stage.setTemporarySkillSet(0);
    dir.lockUI().setInGameDirectionMode();
    dir.removeAdditionalEffectEx();
    eff.uol("Bgm00.img/Silence").changeBGM();
    eff.blind(true).binary(200).duration(1300).setLayerBlind();
    dir.setDelay(1600);
    dir.setMonologue("              #fs30##e歡 迎 來 到 測試谷\r\n");
    dir.setMonologue("       #fs20##e本 服 仍 處 於 不 斷 完 善 狀 態\r\n");
    dir.setMonologue("  #fs20##e有 什 么 好 的 建 議 都 可 以 提 供 給 我 們\r\n");
    dir.setMonologue("#fs20##e祝 您 游 戲 愉 快 給 您 帶 來 的 不 便 敬 請 諒 解\r\n");
    dir.end(true).setMonologue("#fs20##e所 有 功 能 均 在 拍 賣 卷");
    eff.duration(1300).setLayerBlind();
    dir.setDelay(1600);
    dir.block().setInGameDirectionMode();

    stage.increaseEquipInvSlot(128);
    stage.increaseConsumeInvSlot(128);
    stage.increaseInstallInvSlot(128);
    stage.increaseEtcInvSlot(128);
    stage.increaseTrunkCapacity(128);

    for (var i in bute) {
        switch (bute[i][0]) {
            case 0:
                stage.gainMesos(bute[i][1])
                //txt += "金　幣:" + bute[i][1] + "\r\n";
                break;
            case 1:
                stage.modifyCurrency(1, bute[i][1]);
                //txt += "點　卷:" + bute[i][1] + "\r\n";
                break;
            case 2:
                stage.modifyCurrency(2, bute[i][1]);
                //txt += "抵用卷:" + bute[i][1] + "\r\n";
                break;
            case 3:
                if (bute[i][4] == null) {
                    if (bute[i][3] == null) {
                        stage.gainItem(bute[i][1], bute[i][2]);
                    } else {
                        var snum = bute[i][2];
                        for (var n = 1; n <= snum; n++) {
                            marinperiod(bute[i][1], bute[i][3]);
                        }
                    }
                } else {
                    var Equip = util.makeItem(bute[i][1], 1);
                    Equip.setBaseStr(bute[i][4])
                    Equip.setBaseDex(bute[i][5])
                    Equip.setBaseInt(bute[i][6])
                    Equip.setBaseLuk(bute[i][7])

                    Equip.setPad(bute[i][8])
                    Equip.setMad(bute[i][9])
                    Equip.setMaxHp(bute[i][10])
                    Equip.setMaxMp(bute[i][11])
                    var timestamp = (new Date()).getTime();
                    Equip.setExpireDate(timestamp + bute[i][3] * 24 * 60 * 60 * 1000);
                    stage.gainItem(Equip);
                }
                //txt += "物　品:" + bute[i][1] + " x " + bute[i][2] + " " + (bute[i][3] != null ? bute[i][3] + "天" : "") + "\r\n";
                break;
            case 4:
                stage.gainItem(bute[i][1], 1);
                break;
        }
    }
    for (var i = 0; i < 200; i++) {
        if (stage.getLevel() < 200) {
            stage.gainExp(ctx.getExpForLevelUp());
        }
    }
    stage.changeMap(100000000, 0);
    npc.meFlip().say("恭喜 道具已發放");
}


function marinperiod(item, date) {
    var timestamp = (new Date()).getTime();
    var Equip = util.makeItem(item, 1);
    Equip['expireDate'] = timestamp + date * 60 * 60 * 1000;
    stage.gainItem(Equip);
}