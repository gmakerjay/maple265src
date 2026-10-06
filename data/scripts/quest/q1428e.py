
KYRIN = 1090000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(KYRIN)
sm.setBoxChat() 
REQ = sm.getQuantityOfItem(4031013)

if sm.sendAskYesNo("I see you brought the Dark Marble. Excellent work! I think you might be better at this even Cuitler expected. Right, I'll make you a Cannoneer now."):
    sm.completeQuest(parentID)
    sm.jobAdvance(530)
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.sendNext("From now on, you are a full #bCannoneer#k. As a Cannoneer, you will blow your enemies away at long range, and look awesome doing it. I expect you to devote yourself fully to your training, and push your destructive limits!")
    sm.sendNext("To carry such heavy cannons, you'll need more space, right? I raised your Master of Organization skill even more, Check out your spacious Inventory!")
    sm.sendNext("A Cannoneer must be strong, but it's not right to use that strength on the weak. Using your power for good... That's even more difficult than becoming stronger.")
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)