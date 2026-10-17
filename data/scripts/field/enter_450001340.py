# id 450001340 (Cave of Repose : Arma's Hideout)
if not sm.hasMobsInField():
    sm.spawnMob(8641010, 676, 177, False) # Spawn Arma
if field.getLifeByTemplateId(3003140) is None:
    sm.spawnNpc(3003140, 329, 177)