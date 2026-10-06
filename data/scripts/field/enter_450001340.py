if not sm.hasMobsInField():
    sm.spawnMob(8641010, 676, 177, False) # Spawn Arma
else:
    sm.killMobs()
    sm.spawnMob(8641010, 676, 177, False) # Spawn Arma
sm.spawnNpc(3003140, 329, 177)