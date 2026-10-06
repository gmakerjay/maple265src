# Secret Swamp (Part of Root Abyss Quest Line)

if sm.hasQuest(30000):
    sm.lockInGameUI(True)
    sm.removeEscapeButton()
    sm.setPlayerAsSpeaker()
    sm.sendDelay(3000)
    sm.sendNext("This fog is too thich! I gotta keep my senses sharp. Who knows what's lurking out there...")
    sm.lockInGameUI(False)
elif sm.hasQuest(30003):
    sm.setPlayerAsSpeaker()
    sm.sendNext("Hmm.. It seems to work fine. Let's go back to tell her about the exit.")
else:
    sm.setPlayerAsSpeaker()
    sm.sendNext("This fog is too thick! I gotta keep my senses sharp. Who knows what's lurking out there...")
    sm.lockInGameUI(False)
