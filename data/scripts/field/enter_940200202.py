if sm.hasQuest(34450):
    sm.lockUI()
    sm.sendDelay(1000)
    sm.rideVehicle(1932399)
    sm.forcedInput(2)
else:
    sm.warp(940200203)