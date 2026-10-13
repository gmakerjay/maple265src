# kenta_out00.py - Exit portal out00 in Kenta in Danger PQ
if sm.sendAskYesNo("Do you want to forfeit and leave the Kenta in Danger Party Quest?"):
    sm.setAchieveRatio(0, False)
    sm.warpInstanceOut(chr, 923040000)
