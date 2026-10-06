# 101050000
if sm.hasQuest(24006):
    sm.lockInGameUI(True, False)
    sm.showBalloonMsg("Effect/Direction5.img/effect/mercedesQuest/merBalloon/0", 2000)
    sm.sendDelay(2000)
    sm.showBalloonMsg("Effect/Direction5.img/effect/mercedesQuest/merBalloon/1", 2000)
    sm.sendDelay(2000)
    
    sm.setPlayerBoxChat()
    sm.sendSay("Wait... Something doesn't feel right... about ... my level?")
    sm.sendSay("Level....10??")
    sm.completeQuest(24006)
    sm.lockInGameUI(False, False)
else:
    sm.warp(101050100, 2)
    
