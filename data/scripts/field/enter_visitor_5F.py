import random

if random.randint(1,100) <= 10:
    sm.showEffectToField("Map/Effect.img/Visitor/rBoss")
    sm.spawnMob(9390113, 439, 32, False)
else:
    sm.showEffectToField("Map/Effect.img/Visitor/nBoss")
    sm.spawnMob(9390111, 439, 32, False)