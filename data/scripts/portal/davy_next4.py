# 925100400 - Fifth Map of the Lord Pirate PQ
if sm.getReactorQuantity() > 1:
    sm.chat("The portal is not opened.")
else:
    sm.setAchieveRatio(3 * 20)
    sm.warpParty(sm.getFieldID() + 100, chr.getParty())

