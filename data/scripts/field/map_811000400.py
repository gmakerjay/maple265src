
map_811000100 = 0
while sm.hasMobById(9450051):
    sm.waitForMobDeath()
    if not sm.hasMobsInField():
        sm.spawnMob(9450020,120,-134,False) 