# 925100300 - Fourth Map of the Lord Pirate PQ
if sm.getReactorQuantity() > 8 or sm.hasMobsInField(): # due to invisible reactor hidden on the map
    sm.chat("The portal is not opened.")
else:
    sm.setAchieveRatio(3 * 20)
    sm.warpParty(sm.getFieldID() + 100, chr.getParty())

