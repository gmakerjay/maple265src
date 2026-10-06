if sm.hasQuest(34450):
    sm.lockUI()
    sm.sendDelay(1000)
    sm.rideVehicle(1932399)
    sm.forcedInput(2)
    sm.sendDelay(4000)
    sm.unlockUI()
    sm.removeBuffBySkill(61121053)
    sm.warp(940200202)
else:
    sm.warp(940200203)