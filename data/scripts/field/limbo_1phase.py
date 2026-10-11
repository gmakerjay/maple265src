field = sm.getField()
mobId = 8881354 if field.getId() == 410011100 else 8881304
if not field.hasMobById(mobId):
    field.spawnMob(mobId, 0, 3, False)
    field.setBossSpawned(True)
