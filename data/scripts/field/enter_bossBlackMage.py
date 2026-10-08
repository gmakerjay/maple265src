# Limina: Temple of Darkness (Black Mage 4-Phase Boss Encounter)
# Maps: 450013100 (Phase 1), 450013300 (Phase 2), 450013500 (Phase 3), 450013700 (Phase 4)

TIME = 30 * 60

MAP_P1 = 450013100
MAP_P2 = 450013300
MAP_P3 = 450013500
MAP_P4 = 450013700

AEONIAN_RISE = 8880500   # 32.5T HP
TANADIAN_RUIN = 8880501  # 32.5T HP
BLACK_MAGE_P2 = 8880502  # 135T HP
BLACK_MAGE_P3 = 8880503  # 200T HP
BLACK_MAGE_P4 = 8880504  # 100T HP

fieldId = field.getId()

if fieldId == MAP_P1:
    if not field.isBossSpawned():
        field.setBossSpawned(True)
        sm.setDeathCount(12)
        sm.setInstanceTime(TIME, 100000000)
        sm.chatScript("[Black Mage] The genesis of the new world begins now.")
        sm.spawnMob(AEONIAN_RISE, -942, 85, False, 32500000000000)
        sm.spawnMob(TANADIAN_RUIN, 942, 85, False, 32500000000000)
        
        # Wait for both knights to fall
        sm.waitForMobDeath(AEONIAN_RISE)
        sm.waitForMobDeath(TANADIAN_RUIN)
        sm.chatScript("[Black Mage] The darkness deepens...")
        sm.warpField(MAP_P2)

elif fieldId == MAP_P2:
    if not field.isBossSpawned():
        field.setBossSpawned(True)
        sm.chatScript("[Black Mage - Phase 2] Witness the despair of creation!")
        sm.spawnMob(BLACK_MAGE_P2, 0, 88, False, 135000000000000)
        
        sm.waitForMobDeath(BLACK_MAGE_P2)
        sm.chatScript("[Black Mage] Such futile resistance...")
        sm.warpField(MAP_P3)

elif fieldId == MAP_P3:
    if not field.isBossSpawned():
        field.setBossSpawned(True)
        sm.chatScript("[Black Mage - Phase 3] All lights fade into absolute nothingness!")
        sm.spawnMob(BLACK_MAGE_P3, 375, 88, False, 200000000000000)
        
        sm.waitForMobDeath(BLACK_MAGE_P3)
        sm.chatScript("[Black Mage] Can you reach the final truth?")
        sm.warpField(MAP_P4)

elif fieldId == MAP_P4:
    if not field.isBossSpawned():
        field.setBossSpawned(True)
        sm.chatScript("[Black Mage - Final Phase] Let everything be extinguished.")
        sm.spawnMob(BLACK_MAGE_P4, 375, 88, False, 100000000000000)
        
        sm.waitForMobDeath(BLACK_MAGE_P4)
        sm.chatScript("[System] Congratulations! You have defeated the Black Mage!")
        sm.showEffectToField("Map/Effect.img/killing/clear")
        sm.playSound("Party1/Clear", True)
