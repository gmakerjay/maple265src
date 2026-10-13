// Created by MetaMS
// ID:[2436783]
// MapName:森林的起始點
// 選擇欄位8格擴充券


/* Response is Yes */
let selection = npc.askMenu("好！ 我可以利用我的擴充券，來增加#b#e8格#n#k欄位。 想擴充哪一種欄位？ 喔嘰？\r\n\r\n" +
        "#L0# #e#b道具裝備欄！#n#k#l\r\n" +
        "#L1# #e#b道具消耗欄！#n#k#l\r\n" +
        "#L2# #e#b道具裝飾欄！#n#k#l\r\n" +
        "#L3# #e#b道具其他欄！#n#k#l\r\n\r\n" +
        "#L5# #e...讓我再苦惱一下。#n#l");
if (selection == 0) {
        if (npc.askYesNo("裝備可以再增加8格欄位。 確定要擴充裝備欄位嗎？")) {
                /* Response is Yes */
                if (stage.increaseEquipInvSlot(8)) {
                        ctx.consume();
                        npc.next().say("成功了！ 裝備欄位增加了8格呢？");
                } else {
                        npc.next().say("喳喳？裝備欄似乎已經達到最大？");
                }
        } else {
                /* Response is No */
                npc.next().say("喳喳？裝備不是擴充欄位的喔？");
        }
} else if (selection == 1) {
        if (npc.askYesNo("消耗可以再增加8格欄位。 確定要擴充裝備欄位嗎？")) {
                /* Response is Yes */
                if (stage.increaseConsumeInvSlot(8)) {
                        ctx.consume();
                        npc.next().say("成功了！ 消耗欄位增加了8格呢？");
                } else {
                        npc.next().say("喳喳？消耗欄似乎已經達到最大？");
                }
        } else {
                /* Response is No */
                npc.next().say("喳喳？消耗不是擴充欄位的喔？");
        }
} else if (selection == 2) {
        if (npc.askYesNo("裝飾可以再增加8格欄位。 確定要擴充裝備欄位嗎？")) {
                /* Response is Yes */
                if (stage.increaseInstallInvSlot(8)) {
                        ctx.consume();
                        npc.next().say("成功了！ 裝飾欄位增加了8格呢？");
                } else {
                        npc.next().say("喳喳？裝飾欄似乎已經達到最大？");
                }
        } else {
                /* Response is No */
                npc.next().say("喳喳？裝飾不是擴充欄位的喔？");
        }
} else if (selection == 3) {
        if (npc.askYesNo("其他可以再增加8格欄位。 確定要擴充裝備欄位嗎？")) {
                /* Response is Yes */
                if (stage.increaseEtcInvSlot(8)) {
                        ctx.consume();
                        npc.next().say("成功了！ 其他欄位增加了8格呢？");
                } else {
                        npc.next().say("喳喳？其他欄似乎已經達到最大？");
                }
        } else {
                /* Response is No */
                npc.next().say("喳喳？其他不是擴充欄位的喔？");
        }
} else if (selection == 5) {
        npc.say("嗚嘰？ 我知道了。 但這個道具可能有#e#r有效期限#n#k。 太遲可能會消失不見，希望你能多加注意。 嗚嘰嘰…");
}
