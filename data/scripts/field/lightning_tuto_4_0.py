# Hidden Street : Black Mage's Antechamber (927020060)  |  Used in Luminous' Tutorial

sm.lockInGameUI(True,False)
sm.curNodeEventEnd(True)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Looks like Freud and Mercedes are already inside. "
            "I hope I'm not too late.")
sm.sendDelay(750)

sm.curNodeEventEnd(True)
sm.forcedInput(2)
