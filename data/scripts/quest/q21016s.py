# 140000000
LILIN = 1201000
sm.lockInGameUI(True, False)
sm.setSpeakerID(LILIN)
sm.removeEscapeButton()
sm.setBoxChat() 
if sm.sendAskAccept("Shall we continue with your Basic Training? Before accepting, please make sure you have properly equipped your sword and your skills and potions are readily accessible."):
    sm.startQuest(parentID)

    sm.removeEscapeButton()
    sm.sendNext("Alright. This time, let's have you defeat #r#o0100132#s#k, which are slightly more powerful than #o0100131#s. Head over to #b#m140020100##k and defeat #r15#k of them. That should help you build your strength. Alright! Let's do this!")
    sm.lockInGameUI(False, False)
else:
    sm.sendNext("Are you not ready to hunt the #o0100132#s yet? Always proceed if and only if you are fully ready. There's nothing worse than engaging in battles without sufficient preparation.")
    sm.lockInGameUI(False, False)
    #sm.dispose()