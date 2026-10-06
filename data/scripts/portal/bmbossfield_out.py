response = sm.sendAskYesNo("If you leave now, your whole party will be warped out. Are you sure you want to leave?")

if response:
    sm.warpInstanceOut(chr, 450012500)