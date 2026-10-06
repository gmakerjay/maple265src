# Summon Tree Boss (Krexel)

KREXEL = 9420521

reactor.incHitCount()
if reactor.getHitCount() >= reactor.getMaxHitCount():
    sm.spawnMob(KREXEL, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY(), False)
    sm.removeReactor()
