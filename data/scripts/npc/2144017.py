# NPC 2144017 - Arkarium Entrance / Exit Portal
fieldID = sm.getFieldID()
if fieldID in [272020200, 272020210]:
    sm.exitBoss()
else:
    sm.startBossUI("Arkarium")
