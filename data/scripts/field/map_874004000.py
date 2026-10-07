# -*- coding: utf-8 -*-
# Fort Asura - Ritual Altar (Akechi Mitsuhide Boss Battle)
# Map ID: 874004000

AKECHI_P1 = 9601622 # Phase 1 (500B HP)
AKECHI_P2 = 9601623 # Phase 2 (300B HP)
ECHO_1 = 9601624
ECHO_2 = 9601625
ECHO_3 = 9601626
CRYSTAL_ITEM = 4001886 # Intense Power Crystal / Boss Drop
AKECHI_CRYSTAL_ID = 9601635

if not field.isBossSpawned():
    field.setBossSpawned(True)
    sm.setDeathCount(10)
    sm.setInstanceTime(30 * 60, 874000100)
    
    # Broadcast encounter start
    sm.chatScript("[Akechi Mitsuhide] Have I finally met a worthy adversary? Prepare yourself!")
    sm.showFieldEffect("Map/EffectTW.img/arisan/clear")
    
    # Spawn Phase 1 (500 Billion HP)
    sm.spawnMob(AKECHI_P1, 0, 85, False, 500000000000)
    
    # Wait for Phase 1 defeat
    if sm.waitForMobDeath(AKECHI_P1):
        sm.chatScript("[Akechi Mitsuhide] Magnificent swordplay! Now witness the supreme technique of the Demon King!")
        sm.showFieldEffect("Map/Effect.img/rootabyss/firework")
        
        # Spawn Phase 2 (300 Billion HP) + Swordsman Echoes
        sm.spawnMob(AKECHI_P2, 0, 85, False, 300000000000)
        sm.spawnMob(ECHO_1, -300, 85, False, 10000000000)
        sm.spawnMob(ECHO_2, 300, 85, False, 10000000000)
        sm.spawnMob(ECHO_3, -150, 85, False, 10000000000)
        
        # Wait for Phase 2 defeat
        if sm.waitForMobDeath(AKECHI_P2):
            sm.killMobs()
            sm.showEffectToField("Map/Effect.img/killing/clear")
            sm.playSound("Party1/Clear", True)
            sm.chatScript("[System] Congratulations! You have vanquished Akechi Mitsuhide!")
