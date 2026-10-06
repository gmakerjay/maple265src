import random

RedBeans = 4034641
glutinousRice = 4034642

reactor.incHitCount()
if reactor.getHitCount() == reactor.getMaxHitCount():
    if random.randint(0, 2) == 1:
        sm.dropItem(glutinousRice, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
    else:
        sm.dropItem(RedBeans, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
    sm.removeReactor()
