field = sm.getField()
if not field.hasMobById(8880500):
    field.spawnMob(8880500, -375, 88, False, 32500000000000L)
if not field.hasMobById(8880501):
    field.spawnMob(8880501, 375, 88, False, 32500000000000L)
field.setBossSpawned(True)
