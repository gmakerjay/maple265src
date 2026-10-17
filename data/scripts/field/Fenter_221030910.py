# First enter script: Omega Sector Air Vent D-77 [221030910]
# Spawns OMNI-CLN (8880200) and Dr. Zindelblarp (8880202) on foothold (y=298)

field = chr.getField()
if not field.hasMobById(8880200):
    field.spawnMob(8880200, 615, 298, False)
if not field.hasMobById(8880202):
    field.spawnMob(8880202, 615, 298, False)
field.setBossSpawned(True)
