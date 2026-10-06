# Manual Labor
#913070050
# Constants
NEINHEART = 1106000
CYGNUS = 1106001
JAAH = 1106005
CHECK = 0
if not sm.hasQuestCompleted(20034):
    sm.lockInGameUI(True,False)  
    sm.chatScript("General Store Yard")
    sm.forcedInput(2)
    sm.showBalloonMsg("Effect/Direction7.img/effect/tuto/step0/4", 2000)
    sm.sendDelay(3000)
    sm.forcedInput(2)
