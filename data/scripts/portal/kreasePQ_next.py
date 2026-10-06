if sm.hasMobsInField():
    sm.progressMessageFont("Please eliminate all monsters before moving to the next stage.")
else:
    sm.warp(sm.getFieldID() + 100)
