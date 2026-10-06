sm.setSpeakerID(9010000)

def guide():
    sm.flipDialogue()
    sel = sm.sendNext("Do you have any questions about #b#eBeyond Burning#n#k?\r\n\r\n"
                    "#L1##bTell me about #eBeyond Burning#n.#k#l\r\n"
                    "#L2##bTell me about #eBeyond Burning rewards#n.#k#l\r\n"
                    "#L100#I don't have any questions.#l")
    if sel == 1:
        sm.sendNext("One character per account between #b#eLv. 260–268#n#k automatically qualifies for #b#eBeyond Burning#n#k.\r\n\r\n"
                    "#b#eBeyond Burning characters#n#k will gain an additional #b1 level#k every time they level up, #bup to Lv. 270#k.\r\n\r\n"
                    "You will receive #bvarious rewards#k based on the level milestones you achieve.")
        sm.sendNext("Each time your #b#eBeyond Burning character#n#k increases their level,\r\n"
                        "you will obtain the following rewards:\r\n\r\n"
                        "#eLv. 261 Reward:\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n\r\n"
                        "#eLv. 262 Reward:\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n\r\n"
                        "#eLv. 263 Reward:\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n\r\n"
                        "#eLv. 264 Reward:\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n\r\n"
                        "#eLv. 265 Reward:\r\n"
                        "#b#i2639960:# #t2639960:# #k\r\n\r\n"
                        "#eLv. 266 Reward:\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n\r\n"
                        "#eLv. 267 Reward:\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n\r\n"
                        "#eLv. 268 Reward:\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n\r\n"
                        "#eLv. 269 Reward:\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n"
                        "#b#i2639895:# #t2639895:##k\r\n\r\n"
                        "#eLv. 270 Reward:\r\n"
                        "#b#i2639961:# #t2639961:# #k\r\n"
                        "#b#i2639894:# #t2639894:##k\r\n\r\n"
                        "#r#e* All rewards are untradable.#n#k\r\n")
        guide()
    elif sel == 2:
        sm.sendNext("Each time your #b#eBeyond Burning character#n#k levels up,\r\n"
                        "you will obtain the following rewards:\r\n\r\n"
                        "#eLv. 261 Milestone:\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n\r\n"
                        "#eLv. 262 Milestone:\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n\r\n"
                        "#eLv. 263 Milestone:\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n\r\n"
                        "#eLv. 264 Milestone:\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n\r\n"
                        "#eLv. 265 Milestone:\r\n"
                        "#b#i2639960:# #t2639960:# #k\r\n\r\n"
                        "#eLv. 266 Milestone:\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n\r\n"
                        "#eLv. 267 Milestone:\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n\r\n"
                        "#eLv. 268 Milestone:\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n\r\n"
                        "#eLv. 269 Milestone:\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n"
                        "#b#i2639895:# #t2639895:##k\r\n\r\n"
                        "#eLv. 270 Milestone:\r\n"
                        "#b#i2639961:# #t2639961:# #k\r\n"
                        "#b#i2639894:# #t2639894:##k\r\n\r\n"
                        "#r#e* All rewards are untradable.#n#k")
        guide()

rewardIndex = parentID - 4000
if rewardIndex > 0 or parentID == 1001:
    rewardID = 0
    qty = 0

    if rewardIndex == 1 or rewardIndex == 3:
        rewardID = 2637338  # Sol Erda
        qty = 1
    elif rewardIndex == 2 or rewardIndex == 4:
        rewardID = 4009548  # Sol Erda Fragment
        qty = 20
    elif rewardIndex == 5:
        rewardID = 2639960  # Sacred Symbol: Arcus Lv 5 Coupon
        qty = 1
    elif rewardIndex == 6 or rewardIndex == 8:
        rewardID = 2637338  # Sol Erda
        qty = 2
    elif rewardIndex == 7:
        rewardID = 4009548  # Sol Erda Fragment
        qty = 30
    elif rewardIndex == 9:
        rewardID = 4009548  # Sol Erda Fragment
        qty = 30
    elif rewardIndex == 10:
        rewardID = 2639895  # Burning Flame Wings Coupon
        qty = 1
    elif rewardIndex == 11:
        rewardID = 2639961  # Sacred Symbol: Odium Lv 5 Coupon
        qty = 1
    elif rewardIndex == 12:
        rewardID = 2639894  # Beyond Burning Title Coupon
        qty = 1
    elif parentID == 1001:
        guide()

    if rewardIndex >= 1 and rewardIndex <= 12:
        level = 260 + rewardIndex
        msg = ("Congratulations on reaching Level #b#e" + str(level) + "#n#k!\r\n"
            "#kWould you like to claim the following rewards now?\r\n\r\n"
            "#b#e#i" + str(rewardID) + ":# #t" + str(rewardID) + ":# x" + str(qty) + "\r\n\r\n"
            "#r#n* These rewards are untradable.\r\n"
            "* Available until 23:59 (UTC+7) Thursday, 31/12/2026.\r\n")
        if sm.sendAskAccept(msg):
            if sm.canHold(rewardID, qty):
                chr.addItemToInventory(rewardID, qty, "day", 90)
                sm.setQRValueByKey(655, "r" + str(rewardIndex), "1")
        else:
            sm.dispose()