field = sm.getField()
if not field.hasMobById(8880800):
    field.spawnMob(8880800, -300, 398, False)
    field.setBossSpawned(True)
