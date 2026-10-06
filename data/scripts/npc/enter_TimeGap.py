# Mastema (2450017) | Demon 4th job advancement

sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(parentID)
sm.setBoxChat()
if sm.getChr().getLevel() >= 100 \
        and sm.getChr().getJob() == 3111 \
        and sm.sendAskYesNo("Are you ready, #h0#? If you are, I'll send you to the past through the Crack in Time. "
                            "You were powerful in the past, #h0#, so be careful."):
        
        sm.sendNext("Good luck, #h0#")
        sm.lockInGameUI(False, False)
        sm.showFade(500)
        sm.warpInstanceIn(chr, 927000100)
else:
    sm.lockInGameUI(False, False)