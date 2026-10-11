field = sm.getField()
if not field.hasMobById(8880600):
    field.spawnMob(8880600, 0, 275, False)
    field.setBossSpawned(True)
