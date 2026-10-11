field = sm.getField()
mobId = 8881650 if field.getId() == 410015200 else 8881600
if not field.hasMobById(mobId):
    field.spawnMob(mobId, 0, 18, False)
    field.setBossSpawned(True)
