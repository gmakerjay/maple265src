# Character field ID when accessed: 940011100
# ObjectID: 0
# ParentID: 940011100
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
ESKALADE = 3000018
sm.removeEscapeButton()
sm.showBalloonMsg("Effect/Direction10.img/effect/tuto/BalloonMsg2/0",2000)
sm.sendDelay(2000)
sm.setSpeakerID(ESKALADE)
sm.setBoxChat() 
sm.sendNext("Just put that on your little finger.")
sm.setPlayerBoxChat()
sm.sendNext("Is this gonna shock me or something? I hate pranks")
sm.setSpeakerID(ESKALADE)
sm.setBoxChat() 
sm.sendNext("Would you jsut put the stupid thing on so I can make you powerful?!")
sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
sm.hideUser(True)
sm.showFieldEffect("Effect/Direction10.img/effect/tuto/illust0/0")
sm.sendDelay(8000)
sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
sm.warp(940011110)


