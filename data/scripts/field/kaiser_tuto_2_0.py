# ParentID: 940001050
# Character field ID when accessed: 940001050
# ObjectID: 0
#NPC
CARTALION = 3000107

sm.removeNpc(CARTALION)
sm.lockInGameUI(True, False)

sm.spawnNpc(CARTALION,-2023,29)
sm.flipNpcByTemplateId(CARTALION, False)
sm.showNpcSpecialActionByTemplateId(CARTALION, "say", 80000)
sm.forcedInput(1)
sm.sendDelay(1000)
sm.forcedInput(0)

sm.sendDelay(2000)
sm.showFade(500)

sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("There are Specters here as well?")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("The situalion might be more serious than I expected.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("This isn't good. Go back and activate the shield as soon as possible.")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("This is precisely when you need the most help. Even if you are Kaiser, you can't make it by yourself.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Cartalion, you are a knight of Nova. Your first duty is always to the people of Nova. You must protect the,, not me. As Kaiser, I fight for others, not the other way around.")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("As you wish. Good luck out there.")

sm.lockInGameUI(False, False)
sm.removeNpc(CARTALION)
sm.showFade(500)
sm.warp(940001100)
