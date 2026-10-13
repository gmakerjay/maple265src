// Created by MetaMS
// [哈拉克]  |  [2010007]
// MapName:家族中心(英雄公館)

if (stage.hasGuild()) {
    let selection = npc.askMenu("有什麼可以幫你的嗎？\r\n#b#L0#我想要增加家族人數#l\r\n#L1#我想要解散家族#l\r\n#L3#我想要更改家族管理員#l\r\n#L2#我想要進一步了解家族系統#l");
    if (stage.getGuildGrade() == 1) {
        switch (selection) {
            case 0: {
                let capacity = ctx.getGuildCapacity();
                npc.next().say("你是想增加家族人數嗎？嗯，看來你的家族成長了不少～你也知道，要想增加家族人數，必須在家族本部重新登記。當然，必須使用GP作為手續費。此外，家族成員最多可以增加到2000個。");
                if (npc.askYesNo("當前家族最大人數為#b" + capacity + "名#k，擴增#b10名#k所需的手續費為#b楓幣 3 億楓幣#k。順便說下，你的家族當前擁有#b楓幣 " + stage.getMesos() + "#k的楓幣。怎麼樣，你能擴增家族人數嗎？")) {
                    /* Response is Yes */
                    if (capacity >= 2000) {
                        npc.next().say("家族人數已經達到最大容量了，不能再增加了！");
                    } else if (!stage.hasMesos(3E8)) {
                        npc.next().say("增加家族人數所需的楓幣好像不夠。楓幣可以在家族窗中確認。我再說一遍,增加家族人數所需的手續費是#b3億楓幣#k。");
                    } else {
                        stage.loseMesos(3E8);
                        ctx.incGuildCapacity(10);
                    }
                }
                break;
            }
            case 1:
                if (stage.getAllianceId() != 0) {
                    npc.say("在你解散家族之前，你需要先退出家族聯盟！");
                } else if (npc.askYesNo("你真的要解散家族嗎？哎呀……哎呀……解散之後，你的家族就會被永久刪除。很多家族特權也會一起消失。你真的要解散嗎？") == 1) {
                    if (npc.askYesNo("我再問你一次。你真的想放棄所有家族特權，解散家族嗎？")) {
                        ctx.disbandGuild();
                    } else {
                        npc.next().say("明智的選擇。艱難成長起來的家族，怎麼能說刪就刪了呢……");
                    }
                } else {
                    npc.next().say("明智的選擇。艱難成長起來的家族，怎麼能說刪就刪了呢……");
                }
                break;
            case 2:
                npc.next().say("你想了解更多有關家族的內容？如果是那樣的話，家族負責人#p2010011#會為你介紹的。");
                if (npc.noEsc().askYesNo("怎麼樣？你想抽點時間，接受家族集中培訓嗎？\r\n#r(點擊接受時，移動到聽取說明的場所。)#k")) {
                    /* Response is Yes */
                    /* Update Quest RecordEx | Id:26014 | Name: Unknown | Data: "play=1;map=200000301" */
                    stage.updateQuestRecordEx(26014, "map", map.getId());
                    stage.changeMap(920030300, 0);
                } else {
                    /* Response is No */
                    npc.next().say("聽到是培訓，就害怕了嗎？沒有你想像的那麼可怕。如果你改變了主意，就再來找我。");
                }
                break;
            case 3:
                npc.next().say("當家族管理員壓力太大了嗎？那就在家族成員列表中選擇委任對象，並點擊滑鼠右鍵。然後再點擊委任家族管理員按鈕，就能將家族管理員職務委任給其他人。但只有對方在線的狀態下才能委任。");
                break;
        }
    } else {
        npc.say("你不是公會的公會長！！這是只有公會的公會長才可以決定的工作。");
    }
} else {
    npc.next().say("你……是因為對家族感興趣，才會來找我的嗎？");
    let selection = npc.askMenu("你想知道什麼？說吧。\r\n\r\n#b#L0#請介紹一下什麼是家族#l\r\n#L1#如何才能創建家族？#l\r\n#L2#我想創建家族#l\r\n#L3#我想聽聽有關家族系統的詳細說明#l");
    if (selection == 0) {
        npc.next().say("家族……你可以把它理解成一個小的組織。是擁有相同理想的人為了同一個目的而聚集在一起成立的組織。 但是家族是經過家族總部的正式登記，是經過認可的組織。");
        npc.next().say("通過家族活動，可以獲得很多優惠。比如，可以獲得家族技能，以及家族專用物品。");
    } else if (selection == 1) {
        npc.next().say("等級至少必須達到101級，才能創建家族。");
        npc.next().say("此外還需要500萬金幣……這是創建家族必需的手續費。");
        npc.next().say("好了……如果你想註冊家族，就來找我吧～\r\n啊！當然，如果你已經加入了其他家族，那就不行了！！");
    } else if (selection == 2) {
        if (npc.askYesNo("哦！你是來創建家族的嗎……要想創建家族，需要500萬金幣。相信你應該準備好了。好的～你想創建家族嗎？")) {
            /* Response is Yes */
            if (stage.getLevel() < 101) {
                npc.next().say("哎呀，等級好像不夠。請再確認一下。要想創建家族，手續費是必須的。");
            } else if (!stage.hasMesos(5000000)) {
                npc.next().say("哎呀，手續費好像不夠。你帶夠錢了嗎？請再確認一下。要想創建家族，等級至少必須達到101級。");
            } else {
                npc.next().say("請輸入家族名稱。");
                ctx.inputGuildName();
            }
        } else {
            /* Response is No */
            npc.next().say("你覺得還不是時候嗎？如果你想創建家族，可以再來找我。");
        }
    } else if (selection == 3) {
        npc.next().say("你想了解更多有關家族的內容？如果是那樣的話，家族負責人#p2010011#會為你介紹的。");
        if (npc.noEsc().askYesNo("怎麼樣？你想抽點時間，接受家族集中培訓嗎？\r\n#r(點擊接受時，移動到聽取說明的場所。)#k")) {
            /* Response is Yes */
            /* Update Quest RecordEx | Id:26014 | Name: Unknown | Data: "play=1;map=200000301" */
            stage.updateQuestRecordEx(26014, "map", map.getId());
            stage.changeMap(920030300, 0);
        } else {
            /* Response is No */
            npc.next().say("聽到是培訓，就害怕了嗎？沒有你想像的那麼可怕。如果你改變了主意，就再來找我。");
        }
    }
}