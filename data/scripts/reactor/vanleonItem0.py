# Von Leon Chest | Aerial Prison

key = 4033191

reactor.incHitCount()
if reactor.getHitCount() == reactor.getMaxHitCount():
	sm.dropItem(key, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
	sm.removeReactorByObjectID(objectID)
