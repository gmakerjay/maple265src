import random

if chr.getField().getMobs().size() == 0:
    for i in range(30):
        sm.spawnMob(8644510, random.randint(-1800, -600), 215, False)