field = sm.getField()
mobId = 8880410 if field.getId() == 450010930 else 8880405
if not field.hasMobById(mobId):
    field.spawnMob(mobId, 0, 266, False)
    field.setBossSpawned(True)
