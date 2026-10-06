# 925100100 - Second Map  of the Lord Pirate PQ
if sm.getInstance() is not None:
    if not sm.getInstance().hasProperty("lordpirate1clear"):
        sm.chat("The portal is not opened.")
    else:
        sm.warpParty(sm.getFieldID() + 100, chr.getParty())
else:
    sm.warp(251010404)