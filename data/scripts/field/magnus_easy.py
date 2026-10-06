sm.setSpeakerID(3001000)
sm.flipDialogue()
sm.sendNext("Step through that portal to enter the Magnus Simulator. It's not on par with Magnus's true battle powers, but it's a close approximation.")

if sm.sendAskYesNo("Enter the Magnus Simulator (Easy Mode)?\r\n#b<You can attempt the Magnus Simulator once a day.>\r\n<All party members must be Lv. 115 or higher.>#k"):
    sm.warp(401060399)