#   [Job Adv] (Lv.60)   Way of the Crusader
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
blackCharm = 4031059
job = "Crusader"

sm.setSpeakerID(2020008)
sm.setBoxChat() 
if sm.hasItem(blackCharm, 1):
    sm.sendNext("I am impressed, you surpassed the test. Only few are talented enough.\r\n"
                "You have proven yourself to be worthy, thus I shall mold your body into a #b"+ job +"#k.")
else:
    sm.sendSayOkay("You have not retrieved the #t"+ blackCharm +"# yet, I will be waiting.")
    sm.lockInGameUI(False, False)
    #sm.dispose()

sm.completeQuestNoRewards(parentID)
sm.jobAdvance(111) # Crusader
sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
sm.sendSayOkay("You are now a #b"+ job +"#k.")
sm.lockInGameUI(False, False)
