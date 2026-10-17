# User enter script: Omega Sector Air Vent D-77 [221030910]
field = chr.getField()
if not field.hasMobById(8880200):
    field.spawnMob(8880200, 615, 298, False)
if not field.hasMobById(8880202):
    field.spawnMob(8880202, 615, 298, False)
field.setBossSpawned(True)
