response = sm.sendAskYesNo("Are you sure you want to leave?")

if response:
    sm.warpInstanceOut(chr, 401052104)
    #sm.dispose()
