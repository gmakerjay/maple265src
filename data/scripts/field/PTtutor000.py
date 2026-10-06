sm.lockInGameUI(True,False)
sm.setSpeakerID(1540803)
sm.removeEscapeButton()
sm.setBoxChat()
if sm.sendAskYesNo("#eWould you like to skip the introduction?"):
    sm.lockInGameUI(False, False)
    sm.playVideoByScript("phantom.avi")
    sm.levelUntil(10)
    sm.jobAdvance(2400)
    sm.setSTR(4)
    sm.setINT(4)
    sm.setDEX(4)
    sm.setLUK(35)
    sm.setAP(23)
    sm.addMaxHP(150)
    sm.addMaxMP(50)
    sm.giveAndEquip(1362001)
    sm.giveAndEquip(1352100)

    sm.giveItem(1142375)
    sm.completeQuest(25000)
    sm.startQuest(25001)
    sm.warpInstanceOut(chr, 150000000, 2)
    #sm.dispose()
else:
    sm.playVideoByScript("phantom_memory.avi")

    sm.showFieldEffect("phantom/mapname1", 0)
    sm.forcedInput(1)
    sm.sendDelay(1000)

    sm.forcedInput(0)
    sm.sendDelay(1000)

    sm.forcedInput(2)
    sm.sendDelay(1000)

    sm.forcedInput(0)
    sm.sendDelay(1000)

    sm.forcedInput(1)
    sm.avatarOriented("Effect/OnUserEff.img/questEffect/phantom/tutorial")
    sm.sendDelay(1000)

    sm.forcedInput(0)
    sm.sendDelay(1000)

    sm.forcedInput(2)
    sm.sendDelay(1000)

    sm.forcedInput(0)
    sm.sendDelay(1000)

    sm.forcedInput(1)
    sm.sendDelay(500)

    sm.forcedInput(0)
    sm.sendDelay(1000)

    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("I believe it's time to make an appearance.")
    sm.sendSay("My heart is racing! It's been ages since I've felt so alive. Or anxious. I am terribly anxious.")
    sm.sendSay("If I stand here any longer, I'll lose the nerve. It's now or never!")

    sm.lockInGameUI(False,False)
    sm.giveItem(1352104)
    sm.giveSkill(20031211, 0)
    sm.giveSkill(20031211, 1)
    sm.giveSkill(20031212, 0)
    sm.giveSkill(20031212, 1)
    sm.giveSkill(20031205, 1)
    sm.showFade(500)
    sm.warpInstanceIn(chr, 915000100, 1)
