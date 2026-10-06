# [Elodin]
import random

Lotus1 = 4036504
Lotus2 = 4036507

reactor.incHitCount()
if reactor.getHitCount() == reactor.getMaxHitCount():
    if random.randint(1,100) <= 50:
        if sm.hasQuest(37176):
            sm.dropItem(Lotus2, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
        elif sm.hasQuest(37174):
            sm.dropItem(Lotus1, sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
    sm.removeReactor()