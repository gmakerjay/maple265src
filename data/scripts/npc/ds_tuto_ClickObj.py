MASTEMA = 2159307
sm.removeEscapeButton()
if sm.hasQuest(23200):
    sm.lockInGameUI(True,False)
    sm.setPlayerBoxChat()
    sm.sendNext("#bMother! Where are you?!#k")
    sm.completeQuestNoRewards(23200)
    sm.startQuestNoCheck(23201)
    sm.lockInGameUI(False,False)
elif sm.hasQuest(23201):
    sm.lockInGameUI(True,False)
    sm.setPlayerBoxChat()
    sm.sendNext("Damien! Answer me!")
    sm.completeQuestNoRewards(23201)
    sm.startQuestNoCheck(23202)
    sm.lockInGameUI(False,False)
elif sm.hasQuest(23202):
    sm.completeQuestNoRewards(23202)
    sm.deleteQuest(23202)

    sm.lockInGameUI(True,False)
    sm.showBalloonMsg("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1000)
    sm.sendDelay(1000)

    sm.setPlayerBoxChat()
    sm.sendNext("#bThis is...#k")

    sm.showFieldEffect("demonSlayer/pendant", 0)
    sm.sendDelay(4200)

    sm.sendNext("#bMother... Damien...#k")
    sm.sendSay("#b...#k")

    sm.showBalloonMsg("Effect/Direction6.img/effect/tuto/balloonMsg1/5", 2000)
    sm.sendDelay(2000)

    sm.showBalloonMsg("Effect/Direction6.img/effect/tuto/balloonMsg1/6", 2000)
    sm.sendDelay(2000)

    sm.lockInGameUI(False,False)
    sm.showFade(500)
    sm.warpInstanceIn(chr, 927000081, 0)
else:
    sm.systemMessage("It's too far away to see clearly. I must get closer.")
