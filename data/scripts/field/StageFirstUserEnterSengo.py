stage = chr.getFieldID() - 744000020
field = chr.getField()
hp = 200000000
damage = 1500
defense = 25

sm.removeNpc(9330279)
if stage == 21:
    field.spawnMob(9410248, 21, 257, False, hp, damage, damage, defense, defense, 1)
elif stage == 20:
    field.spawnMob(9410219, 34, 247, False, hp, damage, damage, defense, defense, 1)
elif stage == 19:
    field.spawnMob(9410218, 34, 247, False, hp, damage, damage, defense, defense, 1)
else:
    field.spawnMob(9410198 + stage, -20, 247, False, hp, damage, damage, defense, defense, 1)
