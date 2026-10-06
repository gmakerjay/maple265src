# Character field ID when accessed: 940011020
# ObjectID: 0
# ParentID: 940011020
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
KYLE = 3000140
VELDEROTH = 3000104
VELDEROTH_MOVE = 3000104
sm.lockInGameUI(True, False)
sm.removeEscapeButton()

sm.removeNpc(KYLE)
sm.removeNpc(VELDEROTH)

sm.spawnNpc(VELDEROTH,-1705,29)
sm.spawnNpc(KYLE,-1400,29)
sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)

sm.hideNpcByTemplateId(VELDEROTH,True)
sm.hideNpcByTemplateId(KYLE,True)


sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
sm.hideUser(True)
sm.sendDelay(1000)
sm.showFieldEffect("Effect/Direction10.img/effect/tuto/screenMsg0")
sm.sendDelay(3000)
sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)

sm.hideNpcByTemplateId(VELDEROTH,False)
sm.hideNpcByTemplateId(KYLE,False)
sm.flipNpcByTemplateId(VELDEROTH, False)
sm.hideUser(False)

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("It's so pretty out today! I wanna take a nap!")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("You're such a lazy bum,#h0#. Kyle and I manage to become knights already, and here you are trying to sleep more!")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("Hey. I'm not a fighter like you guys! Unless I magically sprout a set of super powers, I'm gonna lounge around allll day every day.")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("I'm pretty sure you've told me that one about a thousand times.")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("Oh, I'm sorry, am I boring you? Should I be congratulating you two on your fancy new titles? I'll join you one day!")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setSpeakerID(KYLE)
sm.setBoxChat()  
sm.sendNext("I don't think you really need to be a knight, #h0#.")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("What are you talking about? We're the Heliseum Force! We have to fight!")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("Yeah, but you don't use magic. You have to face the truth sometime...")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("Ugh, not everyboday HAS to use magic, ya know? You're so thickheaded sometimes....")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("I just want you to think sometimes. Anyway, I gotta get back.")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("Oh, I wish I could go....")

sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/0",2000,KYLE)
sm.sendDelay(2000)

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setSpeakerID(KYLE)
sm.setBoxChat()  
sm.sendNext("What was that?")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("What are you talking about? COme on, you can daydream about smooching with #h0# on the way back to camp.")

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 1500)
sm.setSpeakerID(KYLE)
sm.setBoxChat()  
sm.sendNext("No, something's wrong! on! We need to get to the East Sanctum!")

#sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 2000)
sm.setPlayerBoxChat()
sm.sendNext("Let's get moving! Heliseum Force, go!")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("Seriously? How in the world would you know what's going on at the East Sanctum?")

sm.setPlayerBoxChat()
sm.sendNext("C'mon Veldie! Kyle's gut is hardly ever wrong. Besides, I'm bored!")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("Why did you guys even make me captain if we're always going to follow Kyle's stupid gut?")

sm.moveNpcByTemplateId(VELDEROTH, False, 2000, 150)
sm.showBalloonMsg("Effect/Direction10.img/effect/tuto/BalloonMsg0/0",2000)
sm.forcedInput(2)
sm.flipNpcByTemplateId(KYLE, False)
sm.moveNpcByTemplateId(KYLE, False, 2000, 150)
sm.sendDelay(3000)
sm.forcedInput(0)
sm.warp(940011030,0)

sm.removeNpc(KYLE)
sm.removeNpc(VELDEROTH)
