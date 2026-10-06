if sm.getFieldID() == 807100101:
    sm.lockInGameUI(True, False)
    sm.showFade(500)
    sm.showFieldEffect("Map/Effect.img/JPKanna/magicCircle1")
    sm.sendDelay(8000)


    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("The barrier is weakening. It must have worked.")
    sm.sendNext("Now i just have to destroy the altar in basement.")
    sm.showFade(500)
    sm.warp(807100112)
    
    sm.lockInGameUI(False, False)