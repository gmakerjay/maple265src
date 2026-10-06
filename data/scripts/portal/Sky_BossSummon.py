# Maps in Dragon Rider PQ  | Used in the Dragon Rider PQ 
if sm.getFieldID() == 240080500 and not sm.hasMobsInField() and not sm.getInstance().hasProperty("escape5clear"):
    sm.spawnMob(9303079, 315, -10, False) # Spawns Dragon Rider
