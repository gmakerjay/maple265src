#   [Job Adv] (Lv.30)   Brawler of the High Seas
sm.lockInGameUI(True, False)
sm.removeEscapeButton()

darkMarble = 4031013
job = "Brawler"

sm.setSpeakerID(1090000)
sm.setBoxChat()
if sm.hasItem(darkMarble, 30):
    sm.sendNext("I am impressed, you surpassed the test. Only few are talented enough.\r\n"
                "You have proven yourself to be worthy, I shall mold your body into a #b"+ job +"#k.")
else:
    sm.sendSayOkay("You have not retrieved the #t"+ darkMarble+"#s yet, I will be waiting.")
    sm.lockInGameUI(False, False)
    #sm.dispose()

sm.completeQuestNoRewards(parentID)
sm.jobAdvance(510) # Brawler
sm.sendNext("You are now a #b"+ job +"#k.")
sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
sm.lockInGameUI(False, False)
