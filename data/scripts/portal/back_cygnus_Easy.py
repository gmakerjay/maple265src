returnmap = sm.getPreviousFieldID()
if not sm.hasMobsInField():
    sm.warpNoReturn(returnmap, 0)
else:
    sm.chat("This portal is blocked!")