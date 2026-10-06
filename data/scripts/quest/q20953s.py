# Character field ID when accessed: 130090000
# ObjectID: 0
# ParentID: 20953
MAP = 924010300
NPC = 1064022
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(NPC)
sm.setBoxChat()
if sm.sendAskYesNo("Dear,knight....Do you hear my voice? If you can, then come find me. You have the right to know the truth"):
    sm.lockInGameUI(False,False)
    sm.showFade(100)
    sm.warpInstanceIn(chr, MAP, 0)
    sm.startQuest(parentID)
    #sm.dispose()
else:
    sm.lockInGameUI(False,False)
    #sm.dispose()