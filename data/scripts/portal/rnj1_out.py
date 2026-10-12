if chr.getField().getMobs().size() == 0:
    sm.warp(926100100)
    sm.setAchieveRatio(20)
else:
    sm.chat("This gate is locked.")
