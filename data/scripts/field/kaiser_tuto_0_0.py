# ObjectID: 0
# Character field ID when accessed: 940001000
# ParentID: 940001000

FENELLE = 3000106
CARTALION = 3000107
sm.lockInGameUI(True, False)
sm.setSpeakerID(9201535)
sm.removeEscapeButton()
sm.setBoxChat()
if sm.sendAskYesNo("#eWould you like to skip the tutorial questline."):
    sm.lockInGameUI(False, False)
    sm.showFade(100)
    sm.levelUntil(10)
    sm.jobAdvance(6100)
    sm.giveItem(1142484)
    sm.warpInstanceOut(chr, 400000000)
else:
    sm.removeNpc(CARTALION)
    sm.removeNpc(FENELLE)

    sm.spawnNpc(CARTALION,-596,27)
    sm.spawnNpc(FENELLE,512,27)
    sm.flipNpcByTemplateId(CARTALION, False)

    sm.sendDelay(2000)
    sm.showFade(500)
    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("We're in trouble!.")

    sm.forcedInput(1)
    sm.sendDelay(2000)
    sm.forcedInput(0)

    sm.sendDelay(2000)
    sm.moveCamera(False ,500, -596, 27)
    sm.setCameraOnNpc(CARTALION)
    sm.sendDelay(2000)
    sm.moveNpcByTemplateId(CARTALION, False, 500, 100)
    sm.sendDelay(2000)
    sm.showBalloonMsgOnNpc("Effect/Direction9.img/effect/tuto/BalloonMsg1/0", 2000, CARTALION )
    sm.sendDelay(2000)

    sm.sendNext("The capital of Verdant Flora has fallen!")  
    sm.showNpcSpecialActionByTemplateId(CARTALION, "say", 5000)

    sm.moveCamera(True, 0, 0, 0)
    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("It all came down to Darmoor in the end.")

    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Who is left that can stand against Darmoor?")

    sm.showNpcSpecialActionByTemplateId(CARTALION, "eye", 90000)

    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("We still have the Anima..")

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("No, they never measured up to us in military might. They're too passive, as well....they won't take arms against Darmoor unless Darmoor strikes first.")

    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Darmoor is surely going to attack our captial. Heliseum. I will head to Heliseum immediately to prepare our defenses.")

    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("But... Is there any way for us to win? Darmoor has defeated another Transcendent and now has power over life and time.")

    sm.forcedInput(2)
    sm.sendDelay(1000)
    sm.forcedInput(0)

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("At the very least, we can delay him with Heliseum's Shield. The balance of power is not in our favor, but we cannot give up just because things look grim.")

    sm.forcedInput(1)
    sm.sendDelay(500)
    sm.forcedInput(0)

    sm.sendNext("Cartalion, stay here and protect the people.")

    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("But I want to fight! I'm a warrior of Nova, too")

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("We need someone to look after Pantheon, in case we fail. And we need someone with experience to survive if all of the other commanders fail.")

    sm.setSpeakerID(CARTALION)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("....")

    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Kaiser... Don't push yourself too hard.")

    sm.forcedInput(2)
    sm.sendDelay(500)
    sm.forcedInput(0)

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("Don't worry, Fenelle. Kaiser does what Kaiser must.")

    sm.setSpeakerID(FENELLE)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("But....")

    sm.lockInGameUI(False, False)
    sm.removeNpc(CARTALION)
    sm.removeNpc(FENELLE)
    sm.showFade(500)
    sm.warpInstanceIn(chr, 940001010)
