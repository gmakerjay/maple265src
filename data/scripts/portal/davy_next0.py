# 925100000 - First Map  of the Lord Pirate PQ
if sm.getReactorQuantity() > 7 and sm.hasMobsInField():
    sm.chat("The portal is not opened.")
else:
    sm.setAchieveRatio(1 * 20)
    sm.warpParty(sm.getFieldID() + 100, chr.getParty())

