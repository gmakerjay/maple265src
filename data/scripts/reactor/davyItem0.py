# Chest in the Lord Pirate PQ
LORD_PIRATE_ENRAGED_KRU = 9300115
LORD_PIRATE_ENRAGED_CAPTAIN = 9300116

reactor.incHitCount()
if reactor.getHitCount() >= reactor.getMaxHitCount():
    for i in range(10):
        sm.spawnMob(LORD_PIRATE_ENRAGED_KRU, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY(), False)
        sm.spawnMob(LORD_PIRATE_ENRAGED_CAPTAIN, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY(), False)
    sm.removeReactor()

