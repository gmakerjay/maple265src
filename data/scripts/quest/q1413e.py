# 1413 - [Job Adv] (Lv.30) Way of the Spearman
sm.lockInGameUI(True, False)
sm.removeEscapeButton()

darkMarble = 4031013
job = "Spearman"

sm.setSpeakerID(1022000)
sm.setBoxChat()
if sm.hasItem(darkMarble, 30):
    sm.sendNext("I am impressed, you surpassed the test. Only few are talented enough.\r\n"
                "You have proven yourself to be worthy, thus I shall mold your body into a #b"+ job +"#k.")
else:
    sm.sendSayOkay("You have not retrieved the #t"+ darkMarble+"#s yet, I will be waiting.")
    sm.lockInGameUI(False, False)
    #sm.dispose()

sm.completeQuestNoRewards(parentID)
sm.jobAdvance(130) # Spearman
sm.sendNext("You are now a #b"+ job +"#k.")
sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
sm.lockInGameUI(False, False)
