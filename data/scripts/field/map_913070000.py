# Limbert's General Store (913070000)
sm.lockInGameUI(True,False)
sm.setSpeakerID(1540451)
sm.removeEscapeButton()

sm.setBoxChat()
if sm.sendAskYesNo("Would you like to skip the tutorial questline."):
    sm.lockInGameUI(False,False)
    sm.showFade(100)
    sm.levelUntil(10)
    sm.jobAdvance(5100)
    sm.addAP(40)
    sm.startQuestNoCheck(29976)
    sm.completeQuestNoRewards(29976)
    sm.completeQuestNoRewards(20036)
    sm.completeQuestNoRewards(20031)
    sm.completeQuestNoRewards(20032)
    sm.completeQuestNoRewards(20033)
    sm.giveItem(1142399)# Newborn Light (Medal)
    sm.giveItem(1052444)# Apprentice Knight of Light Robe
    sm.giveItem(1302077)# Beginner Warrior's Sword
    sm.giveAndEquip(1098000)# Soul Shield of Protection
    sm.warpInstanceIn(chr, 913070071, 0)
else:    
    sm.chatScript("Mr. Limbert's General Store")
    sm.sendDelay(500)

    sm.chatScript("Month 3, Day 4")
    sm.sendDelay(1000)

    sm.showBalloonMsg("Effect/Direction7.img/effect/tuto/step0/0", 2000)
    sm.localEmotion(6, 10000, False)
    sm.sendDelay(2000)

    sm.showBalloonMsg("Effect/Direction7.img/effect/tuto/step0/1", 2000)
    sm.sendDelay(2000)

    sm.showBalloonMsg("Effect/Direction7.img/effect/tuto/step0/2", 3000)
    sm.localEmotion(4, 8000, False)
    sm.sendDelay(3000)

    sm.forcedInput(1)
# continue in portal_000.py