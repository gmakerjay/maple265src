# Peaceful Music  ( Mercedes Intro )
MUSIC_BOX = 1033110
sm.removeEscapeButton()
if sm.hasQuest(24000): # Astilda's Request
    sm.lockInGameUI(True, False)
    sm.setSpeakerID(MUSIC_BOX)
    sm.setBoxChat()
    if sm.sendAskYesNo("(Activate the Music Box to play a gentle melody.)"):
        sm.sendNext("(Serene music fills the town. May your people find peace in their dreams...)")
        sm.chatScript("Click an NPC with the book icon above his/her head to complete a quest.")
        sm.playExclSoundWithDownBGM("Bgm03.img/Elfwood", 100)
        sm.startQuest(parentID)
        sm.completeQuest(parentID)
        sm.lockInGameUI(False, False)
    #sm.completeQuestNoRewards(24000) # Astilda's Request
    else:
        sm.lockInGameUI(False, False)
