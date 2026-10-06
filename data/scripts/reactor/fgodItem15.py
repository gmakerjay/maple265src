# Empty Box (2002016) | Treasure Room of Queen (926000010)

eleska = 3935
skyJewel = 4031574

reactor.incHitCount()
reactor.increaseState()

if reactor.getHitCount() >= reactor.getMaxHitCount():
	sm.removeReactor()
