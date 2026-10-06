if not sm.hasMobsInField():
    sm.sendAskYesNo("*bzzt bzzt* Monsters will be generated! Proceed?")
else:
    sm.sendSayOkay("Please kill all monsters first.")
    
