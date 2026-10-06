# Mu Lung Peach [right-facing] (2502001)

peach = 2022116

reactor.incHitCount()
reactor.increaseState()
if reactor.getHitCount() >= reactor.getMaxHitCount():
	sm.dropItem(peach, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
	sm.removeReactor()