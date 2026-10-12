if sm.getInstance() is not None:
    if sm.getInstance().hasProperty("juliet1clear"):
        sm.warp(926110001)
    else:
        sm.chat("This gate is locked.")
else:
    sm.warp(261000021)