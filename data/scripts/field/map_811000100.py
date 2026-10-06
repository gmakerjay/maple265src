
map_811000100 = 0
while sm.hasMobById(9450041):
    sm.waitForMobDeath()
    if not sm.hasMobsInField():
        sm.spawnMob(9450062,192,-562,False) 