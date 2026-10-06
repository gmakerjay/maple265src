# Black Road | After the Battle
# Field ID: 910150000

sm.heal() # has less than full hp/mp at start for some reason
sm.setSpeakerID(1540801)
sm.removeEscapeButton()
sm.setBoxChat()
sm.lockInGameUI(True, False)
sm.hideUser(True)
if sm.sendAskYesNo("#eWould you like to skip the introduction?"):
    sm.lockInGameUI(False, False)
    sm.playVideoByScript("Mercedes.avi")
    sm.startQuestNoCheck(24005)
    sm.giveSkill(20021181, 1)
    sm.warp(101050010)
    #sm.dispose()

else:
    sm.hideUser(False)
    sm.giveSkill(20021181, 1)
    sm.lockInGameUI(False, False)
    #sm.dispose()
