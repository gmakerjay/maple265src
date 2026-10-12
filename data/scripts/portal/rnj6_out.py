if sm.getInstance() is not None:
    if sm.getInstance().hasProperty("romeo5clear"):
        sm.warp(926100400)
    else:
        sm.chat("This gate is locked.")
else:
    sm.warp(926100700)
