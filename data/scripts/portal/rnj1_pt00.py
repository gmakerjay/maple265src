if sm.getInstance() is not None:
    if sm.getInstance().hasProperty("romeo1clear"):
        sm.warp(926100001)
    else:
        sm.chat("This gate is locked.")
else:
    sm.warp(926100700)
