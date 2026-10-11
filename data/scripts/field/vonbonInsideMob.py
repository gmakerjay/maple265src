# Von Bon Inner Realm (Clockwork Void)
curField = sm.getFieldID()
exitMap = 105200110 if curField < 105200500 else 105200510
disembodiedVonBon = 8910101 if curField < 105200500 else 8910001
sm.spawnMob(disembodiedVonBon)
sm.createTimerGauge(30)
sm.invokeAfterDelay(30000, "warp", exitMap)
sm.waitForMobDeath(disembodiedVonBon)
sm.warp(exitMap)
sm.stopEvents()