# Warrior 4th Job NPC Warp Script
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
HARMONIA = 2081100
MANON_PREV_MAP = 240020400
GRIFFEY_PREV_MAP = 240020100
sm.setBoxChat()
selection = sm.sendNext("Where would you like to warp to?\r\n\r\n#L0##bManon\r\n#L1#Griffey#l#n")
if selection == 0:
    sm.lockInGameUI(False, False)
    sm.showFade(100)
    sm.warp(MANON_PREV_MAP, 4)
elif selection == 1:
    sm.lockInGameUI(False, False)
    sm.showFade(100)
    sm.warp(GRIFFEY_PREV_MAP, 6)