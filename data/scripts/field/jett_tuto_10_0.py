# Character field ID when accessed: 620100041
# ParentID: 620100041
# ObjectID: 0
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
BLACK_BARK = 9270086
sm.lockInGameUI(True)
sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
sm.hideUser(True)
sm.hideNpcByTemplateId(BLACK_BARK,True)
sm.showFade(500)
sm.showFieldEffect("Map/Effect.img/newPirate/Shuttle/0")
sm.sendDelay(4000)
sm.showFade(500)
sm.showFieldEffect("Map/Effect.img/newPirate/TimeTravel/0")
sm.sendDelay(5000)
sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
sm.hideUser(False)
sm.hideNpcByTemplateId(BLACK_BARK,False)
sm.lockInGameUI(False)
sm.lockInGameUI(True,False)
sm.forcedInput(4)
sm.sendDelay(2000)
sm.forcedInput(2)
sm.sendDelay(1100)
sm.forcedInput(0)
sm.showBalloonMsg("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/11",2000)
