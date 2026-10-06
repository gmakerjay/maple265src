# Start of Knight's Cavalier
KIMU = 1102004
FEATHERED_NOBLESSE_HAT = 1003769

sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.setSpeakerID(KIMU)
sm.flipSpeaker()
sm.setBoxChat()

sm.sendNext("I like to give all the new recruits a little gift when they come to Ereve. "
"It's important that the recruits look up to snuff, you know? Hit the #bI key#k to open up your inventory when we're done talking. "
"Double click on that hat I gave you!")

if not sm.canHold(FEATHERED_NOBLESSE_HAT):
	sm.sendSayOkay("Please free 1 equipment tab slot.")
        sm.lockInGameUI(False,False)
	#sm.dispose()

if not sm.hasItem(FEATHERED_NOBLESSE_HAT):
	sm.giveItem(FEATHERED_NOBLESSE_HAT)
        sm.lockInGameUI(False,False)
        

sm.showEffect("Effect/OnUserEff.img/guideEffect/cygnusTutorial/5", 0, 0)

sm.startQuest(parentID)