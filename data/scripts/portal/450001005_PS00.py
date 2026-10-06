sm.setSpeakerID(3003110)
sm.flipDialogue()
if sm.sendAskYesNo("...Sailing this boat is one of the few joys in my life...\r\n\r\n#b(You will ride the boat to Lake of Oblivion if you accept.)#k"):
    sm.flipDialogue()
    sm.sendNext("...Then let us depart...")
    sm.warp(450001105, 0)