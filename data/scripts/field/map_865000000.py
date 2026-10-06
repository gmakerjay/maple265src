# San Commerci | Used to complete a Quest:  [Commerci Republic] Ciao, Until Next Time
sm.showEffect("Map/EffectBT.img/dawnveil1/temaD") # San Commerci Theme Dungeon Effect


if sm.hasQuest(17614): # [Commerci Republic] Ciao, Until Next Time
    sm.lockInGameUI(True, True)
    sm.removeEscapeButton()
    sm.flipDialoguePlayerAsSpeaker()
    sm.sendNext("Is this #e#bSan Commerci#k#n, the portal of Commerci?")
    sm.moveCamera(False, 200, 5639, 526)
    sm.sendDelay(1000)
    sm.moveCameraBack(5000)
    sm.sendNext("#b(This place is huge! How am I ever going to find Leon? I guess I'lll head to the Daniella Merchant.)#k")
    sm.sendSayOkay("Maybe I can ask this guy for directions")
    sm.lockInGameUI(False, False)
    sm.completeQuest(17614)

elif sm.hasQuest(17617): # [Commerci Republic] Missing Goods
    sm.chatScript("You were told the impostor was last seen heading south")