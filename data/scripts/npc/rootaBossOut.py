# Root Abyss Boss Exit NPC (Alicia / World Tree)
sm.setSpeakerID(1064002)

if sm.hasMobsInField():
    dialog = "Are you sure you want to leave the battlefield and abandon the fight?"
else:
    dialog = "The battle is complete. Would you like to return to the Colossal Root?"

if sm.sendAskYesNo(dialog):
    sm.exitBoss()