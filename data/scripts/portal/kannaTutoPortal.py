if sm.hasMobsInField():
    sm.chat("Eliminate all monster before proceeding.")
    
else:
    sm.lockInGameUI(True, False)
    sm.showFade(500)
    sm.showFieldEffect("Map/Effect.img/JPKanna/magicCircle2")
    sm.sendDelay(8000)
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("It seems like the others have succeeded as well. The barrier is collapsing.")
    sm.sendNext("I need to hurry to the basement and take care of the altar.")
    sm.showFade(500)
    sm.warp(807100103)
    sm.lockInGameUI(False, False)
    
    