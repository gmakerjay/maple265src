# ObjectID: 0
# ParentID: 53245
# Character field ID when accessed: 620100027
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.setPlayerBoxChat()
sm.sendNext("I got it. Guess it's time to be going.")
sm.completeQuest(parentID)
sm.warp(620100028,0)