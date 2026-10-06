# Spawns mobs that drop Proof of Exam for Cygnus tutorial.
import random

TRAINING_TIMU = 9300732

reactor.incHitCount()
x, y = sm.getPosition(objectID).getX(), sm.getPosition(objectID).getY()
if reactor.getHitCount() >= reactor.getMaxHitCount():
	for x in range(2):
            sm.spawnMobOnChar(TRAINING_TIMU)
	sm.removeReactor()