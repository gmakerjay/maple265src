# Character field ID when accessed: 940002040
# ParentID: 940002040
# ObjectID: 0
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
sm.lockInGameUI(True, True)
sm.hideUser(True)
sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
sm.showFieldEffect("Map/Effect.img/kaiser/text0")
sm.sendDelay(3000)

sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
sm.hideUser(False)
sm.warp(940001200)
sm.lockInGameUI(False, False)