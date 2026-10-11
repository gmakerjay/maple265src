field = sm.getField()
fId = field.getId()
mobId = 8881740
if fId == 410020100:
    mobId = 8881710
elif fId == 410022100:
    mobId = 8881770
elif fId == 410023100:
    mobId = 8881800
if not field.hasMobById(mobId):
    field.spawnMob(mobId, 0, 55, False)
    field.setBossSpawned(True)
