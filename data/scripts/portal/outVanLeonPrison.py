# Aerial Prison

key = 4033191

returnmap = sm.getPreviousFieldID()
if sm.hasItem(key):
    sm.consumeItem(key)
    sm.warpNoReturn(returnmap, 0)
else:
    sm.chat("This portal is blocked!")