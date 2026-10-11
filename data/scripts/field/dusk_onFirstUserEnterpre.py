field = sm.getField()
mobId = 8644655 if field.getId() == 450009450 else 8644650
if not field.hasMobById(mobId):
    field.spawnMob(mobId, 0, -157, False)
    field.setBossSpawned(True)
