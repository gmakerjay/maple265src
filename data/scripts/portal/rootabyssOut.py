# Root Abyss Exit Portal (rootabyssOUT)
if sm.getFieldID() == 105200000:
    if sm.sendAskYesNo("Would you like to return to Sleepywood?"):
        sm.warp(105010000)
else:
    sm.exitBoss()