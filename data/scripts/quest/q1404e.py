# 1404 - Thieves of Kerning City
from net.swordie.ms.enums import Stat
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(1052001)
sm.setBoxChat()
response = sm.sendAskYesNo("So you want to become a Thief?")

if response:
    sm.completeQuestNoRewards(parentID)
    sm.jobAdvance(400)  # Thief
    sm.resetAP(False, 400)
    sm.giveItem(2070000, 500)
    sm.giveItem(1332063, 1)
    sm.giveItem(1472061, 1)
    sm.sendSayOkay("You are now a #bThief#k.")
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()