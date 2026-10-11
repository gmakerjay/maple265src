field = sm.getField()
if not field.hasMobById(8880602):
    field.spawnMob(8880602, 0, 275, False)
    field.setBossSpawned(True)
