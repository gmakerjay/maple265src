field = sm.getField()
mobId = 8645066 if field.getId() == 450012600 else 8645009
if not field.hasMobById(mobId):
    field.spawnMob(mobId, 0, 29, False)
    field.setBossSpawned(True)
