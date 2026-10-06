# Leafre Tree Fruit [left-facing] (2402001)

import random

fruits = [2022086, 2022087, 2022088]

reactor.incHitCount()
reactor.increaseState()
if reactor.getHitCount() >= reactor.getMaxHitCount():
	sm.dropItem(random.choice(fruits), sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY())
	sm.removeReactor()